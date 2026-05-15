"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type MouseEvent, type TouchEvent } from "react";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigurationMessage,
} from "@/lib/supabase/client";

type LogoutEvent = MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>;

function logLogoutDebug(message: "logout tapped" | "signOut success" | "signOut error") {
  if (process.env.NODE_ENV === "development") {
    console.info(message);
  }
}

export function clearLogoutSessionStorage() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    for (const storage of [window.localStorage, window.sessionStorage]) {
      for (let index = storage.length - 1; index >= 0; index -= 1) {
        const key = storage.key(index);

        if (
          (key?.startsWith("sb-") && key.includes("auth-token")) ||
          key?.startsWith("aba-mastered:auth:") ||
          key === "aba-mastered:last-authenticated-location"
        ) {
          storage.removeItem(key);
        }
      }
    }
  } catch {
    // Storage cleanup should never block logout or redirect.
  }
}

export function useAuthenticatedLogout() {
  const router = useRouter();
  const logoutStartedRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout(event?: LogoutEvent) {
    event?.preventDefault();
    event?.stopPropagation();
    logLogoutDebug("logout tapped");

    if (logoutStartedRef.current || loading) {
      return;
    }

    logoutStartedRef.current = true;

    if (!isSupabaseConfigured) {
      setError(supabaseConfigurationMessage);
      logoutStartedRef.current = false;
      return;
    }

    setLoading(true);
    setError("");

    const { error: logoutError } = await supabase.auth.signOut({
      scope: "global",
    });

    if (logoutError) {
      logLogoutDebug("signOut error");
      setError(logoutError.message);
      logoutStartedRef.current = false;
      setLoading(false);
      return;
    }

    logLogoutDebug("signOut success");
    clearLogoutSessionStorage();
    router.replace("/login");
    router.refresh();
  }

  return { error, handleLogout, loading };
}
