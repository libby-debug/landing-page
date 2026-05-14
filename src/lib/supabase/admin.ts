import "server-only";

import { createClient } from "@supabase/supabase-js";
import {
  formatMissingEnvVars,
  getMissingEnvVars,
  getPublicEnv,
  getServerEnv,
} from "@/lib/env";

const requiredSupabaseAdminEnv = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

const supabaseUrl = getPublicEnv("NEXT_PUBLIC_SUPABASE_URL");
const serviceRoleKey = getServerEnv("SUPABASE_SERVICE_ROLE_KEY");

export const missingSupabaseAdminEnvVars = getMissingEnvVars(
  requiredSupabaseAdminEnv,
  {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey,
  },
);

export const isSupabaseAdminConfigured =
  missingSupabaseAdminEnvVars.length === 0;

export const supabaseAdminConfigurationMessage =
  missingSupabaseAdminEnvVars.length === 0
    ? ""
    : `Supabase admin configuration is incomplete. Missing server environment variable(s): ${formatMissingEnvVars(missingSupabaseAdminEnvVars)}.`;

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
