"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { PageShell, cardBaseClass } from "@/components/learning-ui";
import { hydrateUserProgressFromSupabase } from "../tco-6/progression";
import { isFinalExamUnlocked } from "../tco-6/program-progress";

const sparkleDots = [
  "left-[8%] top-[18%] h-3 w-3 bg-purple-500",
  "left-[18%] top-[72%] h-2 w-2 bg-blue-500",
  "left-[31%] top-[12%] h-4 w-4 bg-teal-400",
  "left-[72%] top-[16%] h-3 w-3 bg-emerald-400",
  "left-[84%] top-[62%] h-2.5 w-2.5 bg-purple-500",
  "left-[64%] top-[82%] h-3 w-3 bg-blue-500",
  "left-[44%] top-[70%] h-2 w-2 bg-teal-400",
  "left-[91%] top-[32%] h-4 w-4 bg-emerald-400",
];

export default function CelebrationPage() {
  return (
    <ProtectedRoute>
      <CelebrationGate />
    </ProtectedRoute>
  );
}

function CelebrationGate() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      await hydrateUserProgressFromSupabase();

      if (!active) {
        return;
      }

      const unlocked = isFinalExamUnlocked();
      setAllowed(unlocked);
      setChecked(true);

      if (!unlocked) {
        router.replace("/dashboard");
      }
    }

    void checkAccess();

    return () => {
      active = false;
    };
  }, [router]);

  if (!checked || !allowed) {
    return (
      <PageShell maxWidth="5xl" className="pt-8">
        <section className={`${cardBaseClass} w-full border-blue-200 bg-white/90 text-center`}>
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">
            Checking progress
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Course celebration
          </h1>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell maxWidth="5xl" className="pt-8">
      <section className="relative w-full overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-purple-100 via-blue-100 to-teal-100 p-2 shadow-2xl shadow-teal-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(147,51,234,0.24),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(20,184,166,0.26),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.24),transparent_32%)] motion-safe:animate-pulse" />

        {sparkleDots.map((dot, index) => (
          <span
            aria-hidden="true"
            className={`absolute rounded-full opacity-80 shadow-lg motion-safe:animate-bounce ${dot}`}
            key={dot}
            style={{ animationDelay: `${index * 120}ms`, animationDuration: "2.4s" }}
          />
        ))}

        <div className="relative rounded-[1.75rem] border border-white/80 bg-white/75 px-6 py-16 text-center backdrop-blur-xl sm:px-10">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-5xl font-black text-white shadow-xl shadow-teal-300/40 motion-safe:animate-pulse">
            100%
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl bg-gradient-to-r from-purple-700 via-blue-600 to-teal-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl">
            Congratulations! You did it! You have completed the course to 100%!!
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl font-black leading-8 text-slate-950">
            When you&apos;re ready, take the Final Exam.
          </p>

          <Link
            href="/dashboard/final-exam"
            className="mt-8 inline-block rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 px-8 py-4 text-base font-black text-white shadow-lg shadow-teal-300/40 transition hover:scale-[1.01] hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Final Exam
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
