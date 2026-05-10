"use client";

import { useState } from "react";
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
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <form onSubmit={handleSignup} className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">Create your account</h1>

        <input
          className="mb-4 w-full rounded-lg border p-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="mb-4 w-full rounded-lg border p-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white">
          Sign Up
        </button>

        {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}
      </form>
    </main>
  );
}
