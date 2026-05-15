"use client";

import { useEffect, useRef, useState } from "react";
import { clearLogoutSessionStorage } from "@/components/use-authenticated-logout";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigurationMessage,
} from "@/lib/supabase/client";

function logLogoutRouteDebug(
  message: "logout route reached" | "Supabase signOut success" | "Supabase signOut failure",
) {
  if (process.env.NODE_ENV === "development") {
    console.info(message);
  }
}

export default function LogoutPage() {
  const logoutStartedRef = useRef(false);
  const [message, setMessage] = useState("Logging you out...");

  useEffect(() => {
    if (logoutStartedRef.current) {
      return;
    }

    logoutStartedRef.current = true;
    logLogoutRouteDebug("logout route reached");

    async function completeLogout() {
      try {
        if (!isSupabaseConfigured) {
          setMessage(supabaseConfigurationMessage);
        } else {
          const { error } = await supabase.auth.signOut({ scope: "global" });

          if (error) {
            logLogoutRouteDebug("Supabase signOut failure");
            setMessage(error.message);
          } else {
            logLogoutRouteDebug("Supabase signOut success");
          }
        }
      } catch {
        logLogoutRouteDebug("Supabase signOut failure");
      } finally {
        clearLogoutSessionStorage();
        window.location.replace("/login");
      }
    }

    void completeLogout();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <section className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-8 shadow-xl">
        <p className="text-sm font-black uppercase tracking-wide text-blue-600">
          ABA Mastered
        </p>
        <h1 className="mt-3 text-3xl font-black text-slate-950">Log Out</h1>
        <p className="mt-4 text-base font-semibold leading-7 text-slate-950">
          {message}
        </p>
      </section>
    </main>
  );
}
