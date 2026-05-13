"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

const primaryButtonClass =
  "w-full rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 px-8 py-4 text-center text-lg font-bold leading-normal text-white shadow-lg shadow-teal-300/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-300/40 sm:w-auto";

const secondaryButtonClass =
  "w-full rounded-2xl border border-slate-300 bg-white/80 px-8 py-4 text-center text-lg font-bold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-white sm:w-auto";

export function HomepageCtaButtons() {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
        <Link href="/how-it-works" className={secondaryButtonClass}>
          How It Works
        </Link>

        <Link href="/dashboard" className={primaryButtonClass}>
          My Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
      <Link href="/signup" className={primaryButtonClass}>
        Sign Up
      </Link>

      <Link href="/how-it-works" className={secondaryButtonClass}>
        How It Works
      </Link>
    </div>
  );
}
