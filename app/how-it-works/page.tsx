import Image from "next/image";
import Link from "next/link";
import {
  PageShell,
  eyebrowClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";

export default function HowItWorksPage() {
  return (
    <PageShell maxWidth="6xl" align="center">
      <p className={eyebrowClass}>ABA Mastered</p>

      <h1 className={pageTitleClass}>How It Works</h1>

      <p className={leadClass}>
        Visual BCBA exam prep built around comprehension, comparison, practice,
        and mastery tracking.
      </p>

      <Image
        src="/homepage-graphic.png"
        alt="ABA Mastered visual study features"
        width={941}
        height={650}
        priority
        className="mt-10 h-auto w-full max-w-4xl object-contain"
      />

      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
        <Link
          href="/login"
          className="w-full rounded-2xl border border-slate-300 bg-white/80 px-8 py-4 text-center text-lg font-bold leading-normal text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-white sm:w-auto"
        >
          Login
        </Link>

        <Link
          href="/pricing"
          className="w-full rounded-2xl border border-slate-300 bg-white/80 px-8 py-4 text-center text-lg font-bold leading-normal text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-white sm:w-auto"
        >
          Pricing
        </Link>

        <Link
          href="/signup"
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 px-8 py-4 text-center text-lg font-bold leading-normal text-white shadow-lg shadow-pink-300/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-300/40 sm:w-auto"
        >
          Sign Up
        </Link>
      </div>
    </PageShell>
  );
}
