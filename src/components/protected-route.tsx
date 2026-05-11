"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/components/auth-provider";
import { LoadingCard } from "@/components/learning-ui";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, pathname, router, user]);

  if (loading) {
    return <LoadingCard>Loading your dashboard...</LoadingCard>;
  }

  if (!user) {
    return <LoadingCard>Redirecting to login...</LoadingCard>;
  }

  return children;
}
