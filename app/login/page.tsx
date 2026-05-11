import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { LoadingCard } from "@/components/learning-ui";

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <AuthForm
        mode="login"
        afterSubmitAction={
          <Link
            className="text-sm font-bold text-blue-700 transition hover:text-blue-800"
            href="/reset-password"
          >
            Forgot password?
          </Link>
        }
      />
    </Suspense>
  );
}

function AuthFallback() {
  return <LoadingCard>Loading login...</LoadingCard>;
}
