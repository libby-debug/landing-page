"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { hydrateUserProgressFromSupabase } from "../../tco-6/progression";
import { readFinalExamProgress } from "../final-exam-progress";

const fireworks = [
  "left-[9%] top-[16%] border-purple-500",
  "left-[18%] top-[76%] border-blue-500",
  "left-[30%] top-[28%] border-teal-500",
  "left-[48%] top-[14%] border-emerald-500",
  "left-[66%] top-[24%] border-purple-500",
  "left-[82%] top-[72%] border-blue-500",
  "left-[90%] top-[18%] border-teal-500",
  "left-[58%] top-[84%] border-emerald-500",
];

const confetti = [
  "left-[6%] bg-purple-500",
  "left-[14%] bg-blue-500",
  "left-[22%] bg-teal-500",
  "left-[31%] bg-emerald-500",
  "left-[43%] bg-purple-500",
  "left-[55%] bg-blue-500",
  "left-[68%] bg-teal-500",
  "left-[79%] bg-emerald-500",
  "left-[91%] bg-purple-500",
];

export default function FinalExamCompletionPage() {
  return (
    <ProtectedRoute>
      <FinalExamCompletionGate />
    </ProtectedRoute>
  );
}

function FinalExamCompletionGate() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkCompletion() {
      await hydrateUserProgressFromSupabase();

      if (!active) {
        return;
      }

      const progress = readFinalExamProgress();
      const passed = Boolean(progress?.passed && progress.score >= 90);

      setAllowed(passed);
      setChecked(true);

      if (!passed) {
        router.replace("/dashboard/final-exam");
      }
    }

    void checkCompletion();

    return () => {
      active = false;
    };
  }, [router]);

  if (!checked || !allowed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <section className="rounded-3xl border border-blue-200 bg-white/90 p-8 shadow-xl shadow-teal-100/50">
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">
            Checking Final Exam result
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Loading celebration
          </h1>
        </section>
      </main>
    );
  }

  return <FinalExamCompletionCelebration />;
}

function FinalExamCompletionCelebration() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(147,51,234,0.26),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.26),transparent_28%),radial-gradient(circle_at_50%_88%,rgba(20,184,166,0.28),transparent_34%),linear-gradient(135deg,#f8fbff_0%,#ecfeff_50%,#f0fdf4_100%)] px-6 py-16 text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {fireworks.map((firework, index) => (
          <span
            className={`absolute h-24 w-24 rounded-full border-4 opacity-70 motion-safe:animate-ping ${firework}`}
            key={firework}
            style={{
              animationDelay: `${index * 180}ms`,
              animationDuration: "2.6s",
            }}
          />
        ))}
        {confetti.map((piece, index) => (
          <span
            className={`absolute top-[-12%] h-5 w-2 rounded-full opacity-80 motion-safe:animate-bounce ${piece}`}
            key={piece}
            style={{
              animationDelay: `${index * 110}ms`,
              animationDuration: "2.1s",
            }}
          />
        ))}
      </div>

      <section className="relative z-10 mx-auto max-w-5xl rounded-[2.5rem] border border-white/80 bg-white/80 px-6 py-14 shadow-2xl shadow-teal-200/50 backdrop-blur-xl sm:px-10">
        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-4xl font-black text-white shadow-xl shadow-teal-300/40 motion-safe:animate-pulse">
          90%+
        </div>

        <h1 className="bg-gradient-to-r from-purple-700 via-blue-600 to-teal-500 bg-clip-text text-6xl font-black tracking-tight text-transparent sm:text-8xl">
          YOU DID IT!!!
        </h1>

        <p className="mx-auto mt-8 max-w-4xl text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
          You passed the ABA Mastered Final Exam!!
        </p>

        <p className="mx-auto mt-8 max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
          Now, GO PASS THAT BCBA EXAM!
        </p>

        <Link
          className="mt-10 inline-block rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 px-8 py-4 text-base font-black text-white shadow-lg shadow-teal-300/40 transition hover:scale-[1.01] hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
          href="/dashboard"
        >
          Return to Dashboard
        </Link>
      </section>
    </main>
  );
}
