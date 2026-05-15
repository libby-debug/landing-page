"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/logout-button";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-provider";
import {
  useDailyDuration,
  useWeeklyDailyDuration,
} from "@/components/daily-duration-tracker";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { isDemoUserEmail } from "@/lib/demo-user";
import {
  PageShell,
  cardBaseClass,
  eyebrowClass,
  leadClass,
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
  countTodaysCompletedLearnLessons,
  readMostRecentSavedProgressLocation,
  useModuleProgress,
} from "./tco-6/progression";

const developerShortcutSections = tcoSections.filter((section) =>
  ["a", "b", "c", "d", "e", "f", "g", "h", "i"].includes(section.slug),
);

const dashboardGradientTextClass =
  "inline-block overflow-visible bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 bg-clip-text px-2 pb-2 leading-[1.15] text-transparent [-webkit-text-fill-color:transparent] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]";

const dashboardPageTitleClass =
  `mt-2 max-w-full text-5xl font-extrabold tracking-tight ${dashboardGradientTextClass}`;

const dashboardGradientClass =
  "bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400";

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
  const weeklyDuration = useWeeklyDailyDuration();
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>(
    {},
  );
  const [lastSavedLocation, setLastSavedLocation] = useState<string | null>(
    null,
  );
  const [todaysCompletedLessons, setTodaysCompletedLessons] = useState(0);

  useEffect(() => {
    async function loadSavedModuleProgress() {
      const progressBySlug: Record<string, number> = {};

      tcoSections.forEach((section) => {
        progressBySlug[section.slug] = calculateSavedModuleProgressPercent(
          section.slug,
          getMiniLessons(section).length,
          section.progress,
        );
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

        });
      }

      setModuleProgress(progressBySlug);
      setProgressLoaded(true);
    }

    function syncSavedModuleProgress() {
      setTodaysCompletedLessons(countTodaysCompletedLearnLessons());
      setLastSavedLocation(
        readMostRecentSavedProgressLocation(
          tcoSections.map((section) => section.slug),
        )?.currentLocation ?? null,
      );
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
    window.addEventListener(
      "aba-mastered-daily-learn-progress",
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
      window.removeEventListener(
        "aba-mastered-daily-learn-progress",
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
  const finalExamUnlocked = progressLoaded && averageProgress >= 100;
  const firstIncompleteSection =
    tcoSections.find((section) => getSectionProgress(section) < masteryThreshold) ??
    tcoSections[0];
  const lastSavedSection = lastSavedLocation
    ? tcoSections.find((section) =>
        lastSavedLocation.startsWith(`/dashboard/tco-6/${section.slug}`),
      )
    : undefined;
  const continueSection = lastSavedSection ?? firstIncompleteSection;
  const continueHref =
    lastSavedLocation ?? `/dashboard/tco-6/${firstIncompleteSection.slug}`;
  const continueSectionProgress = getSectionProgress(continueSection);
  const startedCount = tcoSections.filter(
    (section) => getSectionProgress(section) > 0,
  ).length;
  const completedDescription = !progressLoaded
    ? "Loading your saved lesson completion data."
    : todaysCompletedLessons > 0
      ? "Mini-lessons completed at 100% today, midnight to midnight in your local timezone."
      : startedCount > 0
        ? "No mini-lessons completed today yet. Continue a saved Learn path."
        : "Complete a mini-lesson at 100% to start today's count.";
  const showDeveloperShortcuts =
    process.env.NODE_ENV === "development" && !isDemoUserEmail(user?.email);
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

          <h1 className={dashboardPageTitleClass}>Dashboard</h1>

          <p className={leadClass}>
            Track your progress through our colorful, interactive platform.
            Save as you go and see your progress real-time in your Dashboard!
          </p>

          <p className="mt-4 text-sm font-semibold text-slate-950">
            Signed in as {user?.email}
          </p>

          <div className="mt-4 hidden w-full max-w-xs lg:block">
            <LogoutButton />
          </div>
        </div>

      </section>

      <section className="mt-8 grid w-full gap-6 md:grid-cols-3">
        <SummaryCard
          eyebrow="Daily Duration"
          value={dailyDuration.loaded ? dailyDuration.formatted : "..."}
          valueTone="purple"
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
          eyebrow="Completed Lessons"
          value={progressLoaded ? `${todaysCompletedLessons}` : "..."}
          valueTone="blue"
          description={completedDescription}
          tone="purple"
        />

        <SummaryCard
          eyebrow="Overall progress"
          value={progressLoaded ? `${averageProgress}%` : "..."}
          valueTone="teal"
          description={overallDescription}
          tone="teal"
        />
      </section>

      <DailyEngagementGraph
        days={weeklyDuration.days}
        loaded={weeklyDuration.loaded}
      />

      {/* Development-only QA panel. These links are stripped from production UI by NODE_ENV. */}
      {showDeveloperShortcuts ? (
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

          {/* Temporary developer preview shortcut for reviewing the Final Exam before full-course completion. */}
          <Link
            href="/dashboard/final-exam?preview=dev"
            className="mx-auto mt-5 inline-block rounded-xl border border-slate-950 bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-slate-800"
          >
            Developer Preview: Final Exam
          </Link>

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
                    className="rounded-xl border border-blue-200 bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 px-4 py-3 text-sm font-black text-slate-950 transition hover:shadow-md"
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
            href={continueHref}
            className={`inline-block rounded-xl ${dashboardGradientClass} px-5 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-teal-200/60 transition hover:opacity-90`}
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
              finalExamUnlocked={finalExamUnlocked}
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

function DailyEngagementGraph({
  days,
  loaded,
}: {
  days: Array<{ dateKey: string; dayLabel: string; minutes: number }>;
  loaded: boolean;
}) {
  const chartDays =
    days.length > 0
      ? days
      : Array.from({ length: 7 }, (_, index) => ({
          dateKey: `loading-${index}`,
          dayLabel: "Day",
          minutes: 0,
        }));
  const maxMinutes = Math.max(...chartDays.map((day) => day.minutes), 1);

  return (
    <section className={`${cardBaseClass} mt-6 w-full border-blue-200 bg-blue-50 text-center shadow-xl shadow-teal-100/60`}>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-black uppercase tracking-wide text-blue-700">
          7-Day Engagement
        </p>
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          Daily Duration
        </h2>
        <p className="max-w-2xl text-sm font-semibold leading-6 text-slate-950">
          Total minutes engaged with ABA Mastered for each of the last 7 days.
        </p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div
          className="mx-auto grid min-w-[560px] max-w-5xl grid-cols-7 items-end gap-3 rounded-3xl border border-blue-100 bg-white/80 p-5 sm:gap-4"
          role="img"
          aria-label="Bar graph showing daily engagement minutes for the last 7 days"
        >
          {chartDays.map((day) => {
            const heightPercent = loaded
              ? Math.max((day.minutes / maxMinutes) * 100, day.minutes > 0 ? 8 : 2)
              : 2;

            return (
              <div
                key={day.dateKey}
                className="flex min-h-64 flex-col items-center justify-end gap-3"
              >
                <div className="flex h-44 w-full items-end justify-center rounded-2xl bg-blue-100/70 p-2">
                  <div
                    className="w-full max-w-14 rounded-t-2xl bg-gradient-to-t from-purple-600 via-blue-500 to-teal-400 shadow-sm shadow-teal-200/60 transition-all"
                    style={{ height: `${heightPercent}%` }}
                    aria-label={`${day.dayLabel}: ${loaded ? day.minutes : 0} minutes`}
                    title={`${day.dayLabel}: ${loaded ? day.minutes : 0} minutes`}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-slate-950">
                    {day.dayLabel}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                    {loaded ? day.minutes : "..."}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                    minutes
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SummaryCard({
  eyebrow,
  value,
  valueTone,
  description,
  tone,
}: {
  eyebrow: string;
  value: string;
  valueTone: "blue" | "purple" | "teal";
  description: string;
  tone: "blue" | "purple" | "teal";
}) {
  const toneClass = {
    blue: "border-blue-200 bg-blue-50 text-blue-600",
    purple: "border-purple-200 bg-purple-50 text-purple-600",
    teal: "border-blue-200 bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 text-slate-950",
  }[tone];
  const valueClass = {
    blue: "text-blue-600",
    purple: "text-purple-600",
    teal: "text-teal-600",
  }[valueTone];

  return (
    <div className={`${cardBaseClass} ${toneClass} text-center`}>
      <p className="text-sm font-bold uppercase tracking-wide text-slate-950">
        {eyebrow}
      </p>

      <div className={`mt-4 inline-block text-5xl font-extrabold tracking-tight ${valueClass}`}>
        {value}
      </div>

      <p className="mt-4 text-base leading-relaxed text-slate-950">
        {description}
      </p>
    </div>
  );
}

function TcoSectionCard({
  finalExamUnlocked,
  progressPercent,
  section,
}: {
  finalExamUnlocked: boolean;
  progressPercent: number;
  section: TcoSection;
}) {
  const { user } = useAuth();
  const { progress: savedProgress } = useModuleProgress(section.slug);
  const showDeveloperAccess =
    process.env.NODE_ENV === "development" &&
    !isDemoUserEmail(user?.email) &&
    ["a", "b", "c", "d", "e", "f", "g", "h", "i"].includes(section.slug);
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
          ? "border-blue-200 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 shadow-teal-100"
          : "border-white/70 bg-white/95"
      }`}
    >
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${dashboardGradientClass} text-3xl font-black text-white shadow-lg shadow-teal-300/30`}>
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
        className={`mt-6 inline-block rounded-xl ${dashboardGradientClass} px-5 py-3 text-center text-sm font-black text-white shadow-sm shadow-teal-200/60 transition hover:opacity-90`}
      >
        {actionLabel}
      </Link>

      {section.slug === "i" && finalExamUnlocked ? (
        <Link
          href="/dashboard/final-exam"
          className="mt-3 inline-block rounded-xl border border-emerald-300 bg-emerald-600 px-5 py-3 text-center text-sm font-black text-white shadow-sm shadow-emerald-600/20 transition hover:border-emerald-400 hover:bg-emerald-700 active:bg-emerald-800"
        >
          Final Exam
        </Link>
      ) : null}

      {showDeveloperAccess ? (
        <div className="mt-3 grid gap-2">
          <Link
            href={`/dashboard/tco-6/${section.slug}/practice`}
            className="inline-block rounded-xl border border-blue-200 bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:shadow-md"
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
      ? "bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-white"
      : status === "In Progress"
        ? "bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 text-slate-950"
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
          className={`h-3 rounded-full ${dashboardGradientClass}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
