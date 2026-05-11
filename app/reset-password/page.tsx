"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Updating password...");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully. You can now log in.");
    }
  }

  return (
    <main className="min-h-screen bg-transparent p-8">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
        <form
          onSubmit={handleUpdate}
          className="w-full rounded-3xl border bg-white p-8 shadow-xl"
        >
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            ABA Mastered
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-950">
            Create New Password
          </h1>

          <p className="mt-3 text-slate-950">
            Enter your new password below.
          </p>

          <input
            className="mt-6 w-full rounded-xl border p-4"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="mt-5 w-full rounded-xl bg-blue-600 p-4 font-bold text-white hover:bg-blue-700">
            Update Password
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
            Go to login
          </Link>
        </form>
      </div>
    </main>
  );
}
