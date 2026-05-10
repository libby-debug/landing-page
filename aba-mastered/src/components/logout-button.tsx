"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/learning-ui";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    if (!isSupabaseConfigured) {
      setError("Supabase is not configured yet.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      setError(logoutError.message);
      setLoading(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end">
      <Button
        className="w-full sm:w-auto"
        variant="secondary"
        type="button"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? "Logging out..." : "Log out"}
      </Button>
      {error ? (
        <p className="text-sm font-semibold text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
