import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
import { LoadingCard } from "@/components/learning-ui";

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <AuthForm mode="login" />
    </Suspense>
  );
}

function AuthFallback() {
  return <LoadingCard>Loading login...</LoadingCard>;
}
