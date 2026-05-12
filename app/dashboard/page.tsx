"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/logout-button";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-provider";
import { useDailyDuration } from "@/components/daily-duration-tracker";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
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
import { getMiniLessons } from "./tco-6/mini-lesson-data";
import {
  calculateSavedModuleProgressPercent,
  readProgress,
  useModuleProgress,
} from "./tco-6/progression";

const developerShortcutSections = tcoSections.filter((section) =>
  ["a", "b", "c", "d"].includes(section.slug),
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
  const dailyDuration = useDailyDuration();
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>(
    {},
  );
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadSavedModuleProgress() {
      const completed = new Set<string>();
      const progressBySlug: Record<string, number> = {};

      tcoSections.forEach((section) => {
        progressBySlug[section.slug] = calculateSavedModuleProgressPercent(
          section.slug,
          getMiniLessons(section).length,
          section.progress,
        );
        const progress = readProgress(section.slug);

        if (progress.masteryCompleted) {
          completed.add(section.slug);
        }
      });

      if (isSupabaseConfigured && user) {
        const { data } = await supabase
          .from("module_mastery_scores")
          .select("module_slug, score, mastered")
          .eq("user_id", user.id);

        data?.forEach((row) => {
          const section = tcoSections.find(
            (item) => item.slug === row.module_slug,
          );

          if (!section) {
            return;
          }

          const remoteScore =
            typeof row.score === "number" ? row.score : 0;
          progressBySlug[section.slug] = Math.max(
            progressBySlug[section.slug] ?? 0,
            remoteScore,
          );

          if (row.mastered || remoteScore >= masteryThreshold) {
            completed.add(section.slug);
          }
        });
      }

      setModuleProgress(progressBySlug);
      setCompletedSlugs(completed);
      setProgressLoaded(true);
    }

    function syncSavedModuleProgress() {
      void loadSavedModuleProgress();
    }

    syncSavedModuleProgress();
    window.addEventListener("aba-mastered-progress", syncSavedModuleProgress);
    window.addEventListener(
      "aba-mastered-learn-progress",
      syncSavedModuleProgress,
    );
    window.addEventListener(
      "aba-mastered-progress-saved",
      syncSavedModuleProgress,
    );

    return () => {
      window.removeEventListener(
        "aba-mastered-progress",
        syncSavedModuleProgress,
      );
      window.removeEventListener(
        "aba-mastered-learn-progress",
        syncSavedModuleProgress,
      );
      window.removeEventListener(
        "aba-mastered-progress-saved",
        syncSavedModuleProgress,
      );
    };
  }, [user]);

  const getSectionProgress = (section: TcoSection) =>
    moduleProgress[section.slug] ?? 0;
  const averageProgress = Math.round(
    tcoSections.reduce(
      (total, section) => total + getSectionProgress(section),
      0,
    ) / tcoSections.length,
  );
  const continueSection =
    tcoSections
      .filter((section) => getSectionProgress(section) < masteryThreshold)
      .sort((a, b) => getSectionProgress(b) - getSectionProgress(a))[0] ??
    tcoSections[0];
  const continueSectionProgress = getSectionProgress(continueSection);
  const completedCount = tcoSections.filter(
    (section) =>
      completedSlugs.has(section.slug) ||
      getSectionProgress(section) >= masteryThreshold,
  ).length;
  const startedCount = tcoSections.filter(
    (section) => getSectionProgress(section) > 0,
  ).length;
  const completedDescription = !progressLoaded
    ? "Loading your saved module completion data."
    : completedCount > 0
      ? "Calculated from saved mastery checks and completed module progress."
      : startedCount > 0
        ? "No modules mastered yet. Keep going from your saved progress."
        : "No modules completed yet. Start a Learn path to begin tracking.";
  const overallDescription = !progressLoaded
    ? "Loading saved Learn, Practice, and Mastery Check progress."
    : startedCount > 0
      ? "Calculated from your saved Learn, Practice, and Mastery Check progress."
      : "Your progress will appear here after your first saved lesson check.";

  return (
    <PageShell maxWidth="6xl" className="pt-4">
      <section className="flex w-full flex-col items-center gap-5 text-center">
        <div className="flex flex-col items-center">
          <p className={eyebrowClass}>BACB Test Content Outline 6</p>

          <h1 className={pageTitleClass}>Dashboard</h1>

          <p className={leadClass}>
            Track your progress through our colorful, interactive platform.
            Save as you go and see your progress real-time in your Dashboard!
          </p>

          <p className="mt-4 text-sm font-semibold text-slate-950">
            Signed in as {user?.email}
          </p>
        </div>

        <LogoutButton />
      </section>

      <section className="mt-8 grid w-full gap-6 md:grid-cols-3">
        <SummaryCard
          eyebrow="Daily Duration"
          value={dailyDuration.loaded ? dailyDuration.formatted : "..."}
          description={
            dailyDuration.loaded
              ? dailyDuration.totalMs > 0
                ? "Tracked from midnight to midnight in your local timezone."
                : "Engagement time will appear here as you use the platform today."
              : "Loading today's engagement time."
          }
          tone="blue"
        />

        <SummaryCard
          eyebrow="Completed modules"
          value={progressLoaded ? `${completedCount}/${tcoSections.length}` : "..."}
          description={completedDescription}
          tone="purple"
        />

        <SummaryCard
          eyebrow="Overall progress"
          value={progressLoaded ? `${averageProgress}%` : "..."}
          description={overallDescription}
          tone="pink"
        />
      </section>

      {/* Development-only QA panel. These links are stripped from production UI by NODE_ENV. */}
      {process.env.NODE_ENV === "development" ? (
        <section className={`${cardBaseClass} mt-8 w-full border-amber-200 bg-amber-50 text-center`}>
          <p className="text-sm font-black uppercase tracking-wide text-amber-700">
            Developer Shortcuts
          </p>

          <h2 className={sectionTitleClass}>
            Preview practice and mastery checks
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-950">
            These links are visible only in local development and bypass
            progression locks only for preview/testing.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {developerShortcutSections.map((section) => (
              <div
                key={section.slug}
                className="rounded-2xl border border-amber-200 bg-white/80 p-4 text-center"
              >
                <p className="text-sm font-black uppercase tracking-wide text-amber-700">
                  Module {section.code}
                </p>
                <h3 className="mt-1 text-base font-black text-slate-950">
                  {section.title}
                </h3>
                <div className="mt-4 grid gap-2">
                  <Link
                    href={`/dashboard/tco-6/${section.slug}/practice`}
                    className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-black text-green-700 transition hover:border-green-300 hover:bg-green-100"
                  >
                    Module {section.code} Practice
                  </Link>
                  <Link
                    href={`/dashboard/tco-6/${section.slug}/mastery-check`}
                    className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-black text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                  >
                    Module {section.code} Mastery
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

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
          label={`${continueSection.code}. ${continueSection.title} module completion status`}
          progress={continueSectionProgress}
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
            Each module is structured for visual learning, interactive
            practice, and mastery checks to retain ABA terminology outlined in
            TCO 6.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tcoSections.map((section) => (
            <TcoSectionCard
              key={section.code}
              progressPercent={getSectionProgress(section)}
              section={section}
            />
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

function TcoSectionCard({
  progressPercent,
  section,
}: {
  progressPercent: number;
  section: TcoSection;
}) {
  const { progress: savedProgress } = useModuleProgress(section.slug);
  const showDeveloperAccess =
    process.env.NODE_ENV === "development" && ["a", "b", "c", "d"].includes(section.slug);
  const completed = savedProgress.masteryCompleted;
  const status = getMasteryStatus(progressPercent);
  const displayedStatus = completed ? "Completed" : status;
  const displayedProgress = completed ? 100 : progressPercent;
  const actionLabel = completed
    ? "Review Module"
    : progressPercent === 0
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
          label={`${section.code}. ${section.title} module completion status`}
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
            href={`/dashboard/tco-6/${section.slug}/practice`}
            className="inline-block rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-center text-sm font-black text-green-700 transition hover:border-green-300 hover:bg-green-100"
          >
            Preview Interactive Practice Test
          </Link>
          <Link
            href={`/dashboard/tco-6/${section.slug}/mastery-check`}
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
