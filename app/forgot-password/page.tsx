"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigurationMessage,
} from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"success" | "error" | "idle">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleResetRequest(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setTone("idle");

    if (!email.trim()) {
      setTone("error");
      setMessage("Enter your email address.");
      return;
    }

    if (!isSupabaseConfigured) {
      setTone("error");
      setMessage(supabaseConfigurationMessage);
      return;
    }

    setIsSubmitting(true);

    const submittedEmail = email.trim();
    const redirectTo = `${window.location.origin}/reset-password`;
    const response = await supabase.auth.resetPasswordForEmail(submittedEmail, {
      redirectTo,
    });

    setIsSubmitting(false);

    if (response.error) {
      setTone("error");
      setMessage(response.error.message);
      return;
    }

    setTone("success");
    setMessage("Check your email for a password reset link.");
  }

  return (
    <main className="min-h-screen bg-transparent p-8">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
        <form
          onSubmit={handleResetRequest}
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
            Forgot password?
          </h1>

          <p className="mt-3 text-sm font-semibold text-slate-950">
            Enter your email and we&apos;ll send you a reset link.
          </p>

          <label className="mt-6 block text-left text-sm font-black text-slate-950">
            Email Address
            <input
              className="mt-2 w-full rounded-xl border border-slate-950 p-4 font-semibold text-slate-950"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <button
            className="mt-5 w-full rounded-xl bg-blue-600 p-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending reset link..." : "Send Reset Link"}
          </button>

          {message ? (
            <p
              className={`mt-5 rounded-2xl p-4 font-semibold ${
                tone === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </p>
          ) : null}

          <Link
            href="/login"
            className="mt-6 block text-center font-semibold text-blue-600 hover:text-blue-700"
          >
            Back to login
          </Link>
        </form>
      </div>
    </main>
  );
}
