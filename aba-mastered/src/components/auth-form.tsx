"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, Notice, PageShell } from "@/components/learning-ui";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [error, setError] = useState("");

  const isSignup = mode === "signup";
  const nextPath = searchParams.get("next") ?? "/dashboard";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!isSupabaseConfigured) {
      setError(
        "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment.",
      );
      return;
    }

    setStatus("submitting");

    const result = isSignup
      ? await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              typeof window !== "undefined"
                ? `${window.location.origin}/dashboard`
                : undefined,
          },
        })
      : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setError(result.error.message);
      setStatus("idle");
      return;
    }

    if (isSignup && !result.data.session) {
      setStatus("success");
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  return (
    <PageShell maxWidth="6xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Secure practice portal
      </p>

      <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-slate-950">
        {isSignup ? "Create your ABA Mastered account" : "Welcome back"}
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        {isSignup
          ? "Start tracking learning plans, sessions, and progress from one focused workspace."
          : "Log in to continue your client-ready session planning and progress tracking."}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl md:col-span-2">
          {status === "success" ? (
            <Notice tone="success">
              Check your email to confirm your account, then return here to log
              in.
            </Notice>
          ) : (
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className="text-sm font-semibold uppercase tracking-wide text-blue-600"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-left font-bold text-slate-800 transition-all focus:bg-white focus:text-blue-700 focus:outline-none"
                />
              </div>

              <div>
                <label
                  className="text-sm font-semibold uppercase tracking-wide text-blue-600"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-left font-bold text-slate-800 transition-all focus:bg-white focus:text-blue-700 focus:outline-none"
                />
              </div>

              {error ? <Notice tone="error">{error}</Notice> : null}
              {!isSupabaseConfigured ? (
                <Notice tone="error">
                  Supabase is not configured yet. Add your public project URL
                  and anon key before using authentication.
                </Notice>
              ) : null}

              <Button
                className="mt-2 w-full"
                type="submit"
                disabled={status === "submitting" || !isSupabaseConfigured}
              >
                {status === "submitting"
                  ? isSignup
                    ? "Creating account..."
                    : "Logging in..."
                  : isSignup
                    ? "Create account"
                    : "Log in"}
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-slate-600">
            {isSignup ? "Already have an account?" : "New to ABA Mastered?"}{" "}
            <Link
              className="font-bold text-blue-700 hover:text-blue-800"
              href={isSignup ? "/login" : "/signup"}
            >
              {isSignup ? "Log in" : "Create an account"}
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
