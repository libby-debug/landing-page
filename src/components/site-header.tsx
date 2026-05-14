"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

const navLinkClass =
  "shrink-0 rounded-lg px-2 py-1.5 text-xs font-bold transition hover:bg-white/80 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:rounded-xl sm:px-3 sm:py-2 sm:text-sm";

export function SiteHeader() {
  const { user } = useAuth();
  const loginHref = user ? "/dashboard" : "/login";

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-2 pt-2 sm:px-6 sm:pt-4">
      <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-center rounded-2xl border border-white/60 bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur-md sm:justify-end sm:px-5 sm:py-3">
        <nav
          aria-label="Primary navigation"
          className="flex w-full flex-nowrap items-center justify-start gap-1 overflow-x-auto whitespace-nowrap text-slate-800 [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-end sm:gap-2 [&::-webkit-scrollbar]:hidden"
        >
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/how-it-works" className={navLinkClass}>
            How It Works
          </Link>
          <Link href="/pricing" className={navLinkClass}>
            Pricing
          </Link>
          <Link href="/signup" className={navLinkClass}>
            Sign Up
          </Link>
          <Link href={loginHref} className={navLinkClass}>
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
