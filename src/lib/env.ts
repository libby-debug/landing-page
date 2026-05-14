type EnvVarName =
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  | "STRIPE_SECRET_KEY"
  | "STRIPE_WEBHOOK_SECRET"
  | "NEXT_PUBLIC_SITE_URL";

const publicEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
} satisfies Partial<Record<EnvVarName, string | undefined>>;

const serverEnv = {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
} satisfies Partial<Record<EnvVarName, string | undefined>>;

export const requiredClientSupabaseEnv = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

export const requiredServerSupabaseEnv = ["SUPABASE_SERVICE_ROLE_KEY"] as const;

export const requiredStripeEnv = [
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
] as const;

export const requiredDeploymentEnv = [
  ...requiredClientSupabaseEnv,
  ...requiredServerSupabaseEnv,
  ...requiredStripeEnv,
  "NEXT_PUBLIC_SITE_URL",
] as const;

export function getPublicEnv(name: keyof typeof publicEnv) {
  return publicEnv[name];
}

export function getServerEnv(name: keyof typeof serverEnv) {
  return serverEnv[name];
}

export function getMissingEnvVars(
  names: readonly EnvVarName[],
  values: Partial<Record<EnvVarName, string | undefined>> = {
    ...publicEnv,
    ...serverEnv,
  },
) {
  return names.filter((name) => !values[name]);
}

export function formatMissingEnvVars(names: readonly string[]) {
  return names.length > 0 ? names.join(", ") : "none";
}

export function getSupabaseClientConfigStatus() {
  const missing = getMissingEnvVars(requiredClientSupabaseEnv, publicEnv);

  return {
    configured: missing.length === 0,
    missing,
    message:
      missing.length === 0
        ? ""
        : `Supabase client configuration is incomplete. Missing public environment variable(s): ${formatMissingEnvVars(missing)}. Add them in Vercel Project Settings > Environment Variables and redeploy.`,
  };
}

export function getStripeCheckoutConfigStatus() {
  const required = [...requiredStripeEnv, "NEXT_PUBLIC_SITE_URL"] as const;
  const missing = getMissingEnvVars(required, { ...publicEnv, ...serverEnv });

  return {
    configured: missing.length === 0,
    missing,
    message:
      missing.length === 0
        ? ""
        : `Stripe production configuration is incomplete. Missing environment variable(s): ${formatMissingEnvVars(missing)}.`,
  };
}
