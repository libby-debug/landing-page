export type PublicEnvVarName =
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  | "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  | "NEXT_PUBLIC_SITE_URL";

const publicEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
} satisfies Record<PublicEnvVarName, string | undefined>;

export const requiredClientSupabaseEnv = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

export const requiredPublicStripeEnv = [
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
] as const;

export function getPublicEnv(name: PublicEnvVarName) {
  return publicEnv[name];
}

export function getMissingPublicEnvVars(
  names: readonly PublicEnvVarName[],
  values: Partial<Record<PublicEnvVarName, string | undefined>> = publicEnv,
) {
  return names.filter((name) => !values[name]);
}

export function formatMissingEnvVars(names: readonly string[]) {
  return names.length > 0 ? names.join(", ") : "none";
}

export function getSupabaseClientConfigStatus() {
  const missing = getMissingPublicEnvVars(requiredClientSupabaseEnv);

  return {
    configured: missing.length === 0,
    missing,
    message:
      missing.length === 0
        ? ""
        : `Supabase client configuration is incomplete. Missing public environment variable(s): ${formatMissingEnvVars(missing)}. Add them in Vercel Project Settings > Environment Variables and redeploy.`,
  };
}

export function getPublicSiteUrlConfigStatus() {
  const missing = getMissingPublicEnvVars(["NEXT_PUBLIC_SITE_URL"]);

  return {
    configured: missing.length === 0,
    missing,
    message:
      missing.length === 0
        ? ""
        : `Site URL configuration is incomplete. Missing public environment variable(s): ${formatMissingEnvVars(missing)}. Add it in Vercel Project Settings > Environment Variables and redeploy.`,
  };
}

export function getConfiguredSiteOrigin(fallbackOrigin?: string) {
  const configuredOrigin = getPublicEnv("NEXT_PUBLIC_SITE_URL")?.replace(
    /\/$/,
    "",
  );

  return configuredOrigin || fallbackOrigin?.replace(/\/$/, "");
}

export function buildPublicUrl(path: string, fallbackOrigin?: string) {
  const origin = getConfiguredSiteOrigin(fallbackOrigin);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return origin ? `${origin}${normalizedPath}` : normalizedPath;
}
