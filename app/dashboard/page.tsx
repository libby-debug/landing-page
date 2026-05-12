"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/logout-button";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-provider";
import {
  PageShell,
  cardBaseClass,
  eyebrowClass,
  leadClass,
  pageTitleClass,
  sectionTitleClass,
} from "@/components/learning-ui";
import {
  getMasteryStatus,
  masteryThreshold,
  tcoSections,
  type TcoSection,
} from "./tco-6/data";
import { useModuleProgress } from "./tco-6/progression";

const continueSection =
  tcoSections
    .filter((section) => section.progress < masteryThreshold)
    .sort((a, b) => b.progress - a.progress)[0] ?? tcoSections[0];

const averageProgress = Math.round(
  tcoSections.reduce((total, section) => total + section.progress, 0) /
    tcoSections.length,
);

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    function loadCompletedModules() {
      const completed = new Set<string>();

      tcoSections.forEach((section) => {
        const stored = window.localStorage.getItem(
          `aba-mastered:tco6:${section.slug}:progress`,
        );

        if (!stored) {
          return;
        }

        try {
          const progress = JSON.parse(stored) as { masteryCompleted?: boolean };

          if (progress.masteryCompleted) {
            completed.add(section.slug);
          }
        } catch {
          // Ignore malformed local progress and keep the dashboard stable.
        }
      });

      setCompletedSlugs(completed);
    }

    loadCompletedModules();
    window.addEventListener("aba-mastered-progress", loadCompletedModules);

    return () =>
      window.removeEventListener("aba-mastered-progress", loadCompletedModules);
  }, []);

  const completedCount = tcoSections.filter(
    (section) =>
      completedSlugs.has(section.slug) || section.progress >= masteryThreshold,
  ).length;

  return (
    <PageShell maxWidth="6xl" className="pt-4">
      <section className="flex w-full flex-col items-center gap-5 text-center">
        <div className="flex flex-col items-center">
          <p className={eyebrowClass}>BACB Test Content Outline 6</p>

          <h1 className={pageTitleClass}>Dashboard</h1>

          <p className={leadClass}>
            Track ABA Mastered study progress through the canonical TCO 6
            structure, with every module prepared for future lessons,
            practice, and 90% mastery checks.
          </p>

          <p className="mt-4 text-sm font-semibold text-slate-950">
            Signed in as {user?.email}
          </p>
        </div>

        <LogoutButton />
      </section>

      <section className="mt-8 grid w-full gap-6 md:grid-cols-3">
        <SummaryCard
          eyebrow="Mastery threshold"
          value={`${masteryThreshold}%`}
          description="Practice tests and mastery checks pass at 90% or higher."
          tone="blue"
        />

        <SummaryCard
          eyebrow="Mastered modules"
          value={`${completedCount}/${tcoSections.length}`}
          description="Progress is ready to connect to Supabase mastery tracking."
          tone="purple"
        />

        <SummaryCard
          eyebrow="Overall progress"
          value={`${averageProgress}%`}
          description="Current values are placeholders for the first dashboard experience."
          tone="pink"
        />
      </section>

      <section className={`${cardBaseClass} mt-8 w-full border-blue-200 bg-white text-center`}>
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:text-left">
          <div className="flex max-w-3xl flex-col items-center md:items-start">
            <p className={eyebrowClass}>Continue studying</p>

            <h2 className={sectionTitleClass}>
              {continueSection.code}. {continueSection.title}
            </h2>

            <p className="mt-3 text-base leading-relaxed text-slate-950">
              Continue this TCO 6 module and move it toward the 90% mastery
              threshold.
            </p>
          </div>

          <Link
            href={`/dashboard/tco-6/${continueSection.slug}`}
            className="inline-block rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Continue
          </Link>
        </div>

        <ProgressBar
          label={`${continueSection.code}. ${continueSection.title} mastery progress`}
          progress={continueSection.progress}
          className="mt-6"
        />
      </section>

      <section id="tco-6-sections" className="mt-8 w-full">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className={eyebrowClass}>Study categories</p>

          <h2 className={sectionTitleClass}>
            BACB Test Content Outline 6
          </h2>

          <p className="max-w-3xl text-base font-semibold leading-7 text-slate-950">
            Each module is structured for visual learning, practice, and
            mastery checks while preserving official ABA terminology.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tcoSections.map((section) => (
            <TcoSectionCard key={section.code} section={section} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function SummaryCard({
  eyebrow,
  value,
  description,
  tone,
}: {
  eyebrow: string;
  value: string;
  description: string;
  tone: "blue" | "purple" | "pink";
}) {
  const toneClass = {
    blue: "border-blue-200 bg-blue-50 text-blue-600",
    purple: "border-purple-200 bg-purple-50 text-purple-600",
    pink: "border-pink-200 bg-pink-50 text-pink-600",
  }[tone];

  return (
    <div className={`${cardBaseClass} ${toneClass} text-center`}>
      <p className="text-sm font-semibold uppercase tracking-wide">{eyebrow}</p>

      <div className="mt-4 text-5xl font-extrabold tracking-tight text-slate-950">
        {value}
      </div>

      <p className="mt-4 text-base leading-relaxed text-slate-950">
        {description}
      </p>
    </div>
  );
}

function TcoSectionCard({ section }: { section: TcoSection }) {
  const { progress: savedProgress } = useModuleProgress(section.slug);
  const showDeveloperAccess =
    process.env.NODE_ENV === "development" && section.slug === "b";
  const completed = savedProgress.masteryCompleted;
  const status = getMasteryStatus(section.progress);
  const displayedStatus = completed ? "Completed" : status;
  const displayedProgress = completed ? 100 : section.progress;
  const actionLabel = completed
    ? "Review Module"
    : section.progress === 0
      ? "Start Learning"
      : "Continue";

  return (
    <article
      className={`${cardBaseClass} flex h-full flex-col text-center shadow-xl shadow-slate-900/10 ${
        completed
          ? "border-green-300 bg-green-50 shadow-green-100"
          : "border-white/70 bg-white/95"
      }`}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-3xl font-black text-white shadow-lg shadow-pink-300/30">
        {section.code}
      </div>

      <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
        {section.title}
      </h3>

      <p className="mt-3 flex-1 text-base font-semibold leading-7 text-slate-950">
        {section.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <StatusBadge status={displayedStatus} />
        <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black uppercase tracking-wide text-slate-950">
          {section.checklistItems.length} checklist items
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm font-black text-slate-950">
          <span>Progress</span>
          <span>{displayedProgress}%</span>
        </div>

        <ProgressBar
          label={`${section.code}. ${section.title} mastery progress`}
          progress={displayedProgress}
          className="mt-2"
        />
      </div>

      <Link
        href={`/dashboard/tco-6/${section.slug}`}
        className="mt-6 inline-block rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:opacity-90"
      >
        {actionLabel}
      </Link>

      {showDeveloperAccess ? (
        <div className="mt-3 grid gap-2">
          <Link
            href="/dashboard/tco-6/b/practice"
            className="inline-block rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-center text-sm font-black text-green-700 transition hover:border-green-300 hover:bg-green-100"
          >
            Preview Practice Check
          </Link>
          <Link
            href="/dashboard/tco-6/b/mastery-check"
            className="inline-block rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-center text-sm font-black text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
          >
            Preview Mastery Check
          </Link>
        </div>
      ) : null}
    </article>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusClass =
    status === "Completed" || status === "Mastered"
      ? "bg-purple-100 text-purple-700"
      : status === "In Progress"
        ? "bg-blue-100 text-blue-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`rounded-xl px-3 py-2 text-xs font-black uppercase tracking-wide ${statusClass}`}
    >
      {status}
    </span>
  );
}

function ProgressBar({
  label,
  progress,
  className = "",
}: {
  label: string;
  progress: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className="h-3 rounded-full bg-slate-100"
        aria-label={`${label}: ${progress}%`}
        role="img"
      >
        <div
          className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
