"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { readAndClearInactivityLogoutMessage } from "@/components/inactivity-auto-logout";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const { loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    const nextPath = new URLSearchParams(window.location.search).get("next");
    router.replace(nextPath ?? "/dashboard");
  }, [loading, router, user]);

  useEffect(() => {
    const reason = new URLSearchParams(window.location.search).get("reason");
    const inactivityMessage = readAndClearInactivityLogoutMessage();

    if (reason !== "inactive" && !inactivityMessage) {
      return;
    }

    const messageTimeoutId = window.setTimeout(() => {
      setMessage(
        inactivityMessage ||
          "You were logged out due to inactivity. Your progress was saved.",
      );
    }, 0);

    return () => window.clearTimeout(messageTimeoutId);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!isSupabaseConfigured) {
      setMessage("Supabase is not configured yet.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    const nextPath = new URLSearchParams(window.location.search).get("next");
    router.replace(nextPath ?? "/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-transparent p-8">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-full rounded-3xl border border-slate-950 bg-white p-8 text-center shadow-xl"
        >
          <div className="flex justify-center">
            <Image
              src="/images/aba-mastered-hero-logo.png"
              alt="ABA Mastered"
              width={180}
              height={120}
              className="h-auto w-full max-w-[180px] object-contain p-1"
            />
          </div>

          <h1 className="mt-6 text-4xl font-extrabold text-slate-950">
            Welcome back
          </h1>

          <p className="mt-3 text-sm font-semibold text-slate-950">
            Log in to continue your learning journey.
          </p>

          <input
            className="mt-6 w-full rounded-xl border border-slate-950 p-4 text-left"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="mt-4 w-full rounded-xl border border-slate-950 p-4 text-left"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Link
            href="/forgot-password"
            className="mt-3 block text-right text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Forgot your password?
          </Link>

          <button
            className="mt-5 w-full rounded-xl bg-blue-600 p-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>

          {message && (
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 font-semibold text-slate-950">
              {message}
            </p>
          )}

          <p className="mt-6 text-center font-semibold text-slate-950">
            Don&rsquo;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
