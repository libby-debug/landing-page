"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  Button,
  Notice,
  PageShell,
  cardBaseClass,
  eyebrowClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigurationMessage,
} from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "signup";
  afterSubmitAction?: ReactNode;
};

export function AuthForm({ mode, afterSubmitAction }: AuthFormProps) {
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
        supabaseConfigurationMessage,
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
    <PageShell maxWidth="6xl" align="center">
      <p className={eyebrowClass}>
        Visual BCBA exam prep
      </p>

      <h1 className={pageTitleClass}>
        {isSignup ? "Start mastering ABA concepts" : "Welcome back"}
      </h1>

      <p className={leadClass}>
        {isSignup
          ? "Create an account to learn visually, compare confusing terms, practice with quizzes, and track mastery as you prepare for the BCBA exam."
          : "Log in to keep building comprehension, review weak areas, and continue your ABA Mastered study path."}
      </p>

      <div className="mt-10 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          className={`${cardBaseClass} border-blue-200 bg-blue-50 text-center md:col-span-2`}
        >
          {status === "success" ? (
            <Notice tone="success">
              Check your email to confirm your account, then return here to log
              in.
            </Notice>
          ) : (
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className={`block ${eyebrowClass}`}
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
                  className={`block ${eyebrowClass}`}
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
                  {supabaseConfigurationMessage}
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

              {afterSubmitAction ? (
                <div className="text-center">{afterSubmitAction}</div>
              ) : null}
            </form>
          )}

          <p className="mt-6 text-center text-slate-950">
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
