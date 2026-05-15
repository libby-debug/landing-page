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
import { buildPublicUrl } from "@/lib/env/public";
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
  const [showPassword, setShowPassword] = useState(false);

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

    const normalizedEmail = email.trim().toLowerCase();

    if (process.env.NODE_ENV === "development") {
      console.info("ABA Mastered auth debug", {
        emailLength: normalizedEmail.length,
        passwordLength: password.length,
      });
    }

    const result = isSignup
      ? await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            emailRedirectTo: buildPublicUrl(
              "/dashboard",
              typeof window !== "undefined" ? window.location.origin : undefined,
            ),
          },
        })
      : await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

    if (result.error) {
      setError(result.error.message);
      setStatus("idle");
      return;
    }

    if (isSignup && !result.data.session) {
      setStatus("success");
      return;
    }

    if (!isSignup) {
      if (!result.data.session) {
        setError("Login did not return an active session. Please try again.");
        setStatus("idle");
        return;
      }

      await supabase.auth.setSession({
        access_token: result.data.session.access_token,
        refresh_token: result.data.session.refresh_token,
      });

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError("Login session could not be saved. Please try again.");
        setStatus("idle");
        return;
      }

      window.location.replace(nextPath);
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
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="email"
                  spellCheck={false}
                  inputMode="email"
                  enterKeyHint="next"
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
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    spellCheck={false}
                    enterKeyHint="done"
                    minLength={6}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="w-full rounded-xl border bg-slate-50 px-4 py-3 pr-14 text-left font-bold text-slate-800 transition-all focus:bg-white focus:text-blue-700 focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
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
