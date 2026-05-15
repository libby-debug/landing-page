"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { readAndClearInactivityLogoutMessage } from "@/components/inactivity-auto-logout";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigurationMessage,
} from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const { loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setMessage(supabaseConfigurationMessage);
      return;
    }

    setIsSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();

    if (process.env.NODE_ENV === "development") {
      console.info("ABA Mastered login debug", {
        emailLength: normalizedEmail.length,
        passwordLength: password.length,
      });
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
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
            id="login-email"
            name="email"
            aria-label="Email address"
            className="mt-6 w-full rounded-xl border border-slate-950 p-4 text-left"
            type="email"
            placeholder="Email address"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="email"
            spellCheck={false}
            inputMode="email"
            enterKeyHint="next"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative mt-4">
            <input
              id="login-password"
              name="password"
              aria-label="Password"
              className="w-full rounded-xl border border-slate-950 p-4 pr-14 text-left"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="current-password"
              spellCheck={false}
              enterKeyHint="done"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              {showPassword ? (
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="m3 3 18 18" />
                  <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                  <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 9 4.6 10 8a12.7 12.7 0 0 1-3.1 4.8" />
                  <path d="M6.6 6.6A12.4 12.4 0 0 0 2 12c1 3.4 5 8 10 8a10.9 10.9 0 0 0 4.1-.8" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

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
