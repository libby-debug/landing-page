import Link from "next/link";
import {
  PageShell,
  eyebrowClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";
import { HowItWorksFeatureGraphic } from "@/components/how-it-works-feature-graphic";

export default function HowItWorksPage() {
  return (
    <PageShell maxWidth="6xl" align="center">
      <p className={eyebrowClass}>ABA Mastered</p>

      <h1 className={pageTitleClass}>How It Works</h1>

      <p className={leadClass}>
        Visual BCBA exam prep built around comprehension, comparison, practice,
        and mastery tracking.
      </p>

      <HowItWorksFeatureGraphic />

      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
        <Link
          href="/pricing"
          className="w-full rounded-2xl border border-slate-300 bg-white/80 px-8 py-4 text-center text-lg font-bold leading-normal text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-white sm:w-auto"
        >
          Pricing
        </Link>

        <Link
          href="/signup"
          className="w-full rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 px-8 py-4 text-center text-lg font-bold leading-normal text-white shadow-lg shadow-teal-300/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-300/40 sm:w-auto"
        >
          Sign Up
        </Link>
      </div>
    </PageShell>
  );
}
