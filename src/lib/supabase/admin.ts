import "server-only";

import { createClient } from "@supabase/supabase-js";
import {
  getPublicEnv,
  getServerEnv,
  getSupabaseAdminConfigStatus,
} from "@/lib/env/server";

const supabaseUrl = getPublicEnv("NEXT_PUBLIC_SUPABASE_URL");
const serviceRoleKey = getServerEnv("SUPABASE_SERVICE_ROLE_KEY");
const supabaseAdminConfigStatus = getSupabaseAdminConfigStatus();

export const missingSupabaseAdminEnvVars = supabaseAdminConfigStatus.missing;
export const isSupabaseAdminConfigured = supabaseAdminConfigStatus.configured;
export const supabaseAdminConfigurationMessage =
  supabaseAdminConfigStatus.message;

export function createSupabaseAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(supabaseAdminConfigurationMessage);
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
