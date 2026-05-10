import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
import { LoadingCard } from "@/components/learning-ui";

export default function SignupPage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <AuthForm mode="signup" />
    </Suspense>
  );
}

function AuthFallback() {
  return <LoadingCard>Loading signup...</LoadingCard>;
}
