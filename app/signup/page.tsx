"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { buildPublicUrl } from "@/lib/env/public";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigurationMessage,
} from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setMessage(supabaseConfigurationMessage);
      return;
    }

    setMessage("Creating account...");

    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo: buildPublicUrl(
          "/pricing",
          typeof window !== "undefined" ? window.location.origin : undefined,
        ),
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/pricing");
    }
  }

  return (
    <main className="min-h-screen bg-transparent p-8">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
        <form
          onSubmit={handleSignup}
          className="w-full rounded-3xl border bg-white p-8 shadow-xl"
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

          <h1 className="mt-6 text-center text-4xl font-extrabold text-slate-950">
            Create your account
          </h1>

          <input
            className="mt-6 w-full rounded-xl border p-4"
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
              className="w-full rounded-xl border p-4 pr-14"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="new-password"
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

          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-blue-600 p-4 font-bold text-white hover:bg-blue-700"
          >
            Sign Up
          </button>

          {message && (
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 font-semibold text-slate-950">
              {message}
            </p>
          )}

          <Link
            href="/login"
            className="mt-6 block text-center font-semibold text-blue-600"
          >
            Already have an account? Log in
          </Link>
        </form>
      </div>
    </main>
  );
}
