"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Creating account...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Account created! Check your email to confirm your account.");
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
            <img
              src="/images/aba-mastered-hero-logo.png"
              alt="ABA Mastered"
              className="h-auto w-full max-w-[180px] object-contain"
            />
          </div>

          <h1 className="mt-6 text-center text-4xl font-extrabold text-slate-950">
            Create your account
          </h1>

          <input
            className="mt-6 w-full rounded-xl border p-4"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="mt-4 w-full rounded-xl border p-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="mt-5 w-full rounded-xl bg-blue-600 p-4 font-bold text-white hover:bg-blue-700">
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
