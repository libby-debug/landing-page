"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import {
  PageShell,
  cardBaseClass,
  eyebrowClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";
import { hydrateUserProgressFromSupabase } from "../tco-6/progression";
import { isFinalExamUnlocked } from "../tco-6/program-progress";

export default function FinalExamPage() {
  return (
    <ProtectedRoute>
      <FinalExamGate />
    </ProtectedRoute>
  );
}

function FinalExamGate() {
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
          <p className={eyebrowClass}>Checking progress</p>
          <h1 className={pageTitleClass}>Checking access</h1>
          <p className={leadClass}>
            Access unlocks after the full course reaches 100%.
          </p>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell maxWidth="5xl" className="pt-8">
      <section className={`${cardBaseClass} w-full border-teal-200 bg-white/90 text-center shadow-xl shadow-teal-100/60`}>
        <p className={eyebrowClass}>Course complete</p>
        <h1 className={pageTitleClass}>Final Exam</h1>
        <p className={leadClass}>
          Your Final Exam is unlocked. This page is ready for the cumulative
          exam build.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-black text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
