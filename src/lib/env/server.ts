import "server-only";

import {
  formatMissingEnvVars,
  getPublicEnv,
  type PublicEnvVarName,
} from "@/lib/env/public";

export { getPublicEnv } from "@/lib/env/public";

export type ServerEnvVarName =
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "STRIPE_SECRET_KEY"
  | "STRIPE_WEBHOOK_SECRET";

export type DeploymentEnvVarName = PublicEnvVarName | ServerEnvVarName;

const serverEnv = {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
} satisfies Record<ServerEnvVarName, string | undefined>;

export const requiredServerSupabaseEnv = ["SUPABASE_SERVICE_ROLE_KEY"] as const;

export const requiredServerStripeEnv = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
] as const;

export const requiredDeploymentEnv = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_SITE_URL",
] as const;

export function getServerEnv(name: ServerEnvVarName) {
  return serverEnv[name];
}

export function getMissingServerEnvVars(
  names: readonly ServerEnvVarName[],
  values: Partial<Record<ServerEnvVarName, string | undefined>> = serverEnv,
) {
  return names.filter((name) => !values[name]);
}

export function getMissingDeploymentEnvVars(
  names: readonly DeploymentEnvVarName[] = requiredDeploymentEnv,
) {
  return names.filter((name) => {
    if (name.startsWith("NEXT_PUBLIC_")) {
      return !getPublicEnv(name as PublicEnvVarName);
    }

    return !serverEnv[name as ServerEnvVarName];
  });
}

export function getSupabaseAdminConfigStatus() {
  const missing = [
    ...getMissingDeploymentEnvVars(["NEXT_PUBLIC_SUPABASE_URL"]),
    ...getMissingServerEnvVars(requiredServerSupabaseEnv),
  ];

  return {
    configured: missing.length === 0,
    missing,
    message:
      missing.length === 0
        ? ""
        : `Supabase admin configuration is incomplete. Missing environment variable(s): ${formatMissingEnvVars(missing)}.`,
  };
}

export function getStripeCheckoutConfigStatus() {
  const missing = [
    ...getMissingServerEnvVars(["STRIPE_SECRET_KEY"]),
    ...getMissingDeploymentEnvVars(["NEXT_PUBLIC_SITE_URL"]),
  ];

  return {
    configured: missing.length === 0,
    missing,
    message:
      missing.length === 0
        ? ""
        : `Stripe Checkout configuration is incomplete. Missing environment variable(s): ${formatMissingEnvVars(missing)}.`,
  };
}
