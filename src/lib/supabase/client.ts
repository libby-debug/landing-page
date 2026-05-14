import { createClient } from "@supabase/supabase-js";
import {
  getPublicEnv,
  getSupabaseClientConfigStatus,
} from "@/lib/env/public";

const supabaseUrl = getPublicEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabaseAnonKey = getPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
const supabaseConfigStatus = getSupabaseClientConfigStatus();

export const isSupabaseConfigured = supabaseConfigStatus.configured;
export const missingSupabaseEnvVars = supabaseConfigStatus.missing;
export const supabaseConfigurationMessage = supabaseConfigStatus.message;

export const supabase = createClient(
  supabaseUrl ?? "https://example.supabase.co",
  supabaseAnonKey ?? "missing-anon-key",
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
);
