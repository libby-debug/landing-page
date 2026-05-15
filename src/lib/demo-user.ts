export const demoUserEmail = "demo@abamastered.com";

export function isDemoUserEmail(email?: string | null) {
  return email?.trim().toLowerCase() === demoUserEmail;
}
