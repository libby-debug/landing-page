"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/auth-provider";

export function SiteHeader() {
  const { user } = useAuth();
  const loginHref = user ? "/dashboard" : "/login";

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6">
      <div className="pointer-events-auto mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <Link href="/" aria-label="ABA Mastered home" className="inline-flex">
          <Image
            src="/images/aba-mastered-updated-header-logo.png"
            alt="ABA Mastered"
            width={1024}
            height={1024}
            priority
            sizes="56px"
            className="h-14 w-14 object-contain p-1"
          />
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-800 sm:justify-end">
          <Link
            href="/"
            className="rounded-xl px-3 py-2 transition hover:bg-white/80 hover:text-blue-700"
          >
            Main Page
          </Link>
          <Link
            href="/how-it-works"
            className="rounded-xl px-3 py-2 transition hover:bg-white/80 hover:text-blue-700"
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl px-3 py-2 transition hover:bg-white/80 hover:text-blue-700"
          >
            Pricing
          </Link>
          <Link
            href="/signup"
            className="rounded-xl px-3 py-2 transition hover:bg-white/80 hover:text-blue-700"
          >
            Sign Up
          </Link>
          <Link
            href={loginHref}
            className="rounded-xl px-3 py-2 transition hover:bg-white/80 hover:text-blue-700"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
