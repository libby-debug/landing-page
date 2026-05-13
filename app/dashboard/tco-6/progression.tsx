"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { masteryThreshold, miniLessonMasteryThreshold } from "./data";

export type ModuleProgress = {
  learnCompleted: boolean;
  practiceCompleted: boolean;
  masteryCompleted: boolean;
};

export type ActivitySlug = "learn" | "practice" | "mastery-check";

export type SavedProgressSnapshot = {
  activity: string;
  completedQuestions?: string[];
  currentLocation: string;
  lessonSlug?: string;
  masteryProgress?: ModuleProgress;
  passed?: boolean;
  questionOrder?: string[];
  questionResults?: Record<string, boolean>;
  score?: number;
  selectedAnswers?: Record<string, string>;
  submitted?: boolean;
  totalQuestions?: number;
  updatedAt: string;
};

export type SavedModuleProgress = {
  currentLocation?: string;
  masteryProgress: ModuleProgress;
  snapshots: Record<string, SavedProgressSnapshot>;
  updatedAt: string;
};

export type LastSavedProgressLocation = {
  currentLocation: string;
  sectionSlug: string;
  updatedAt: string;
};

type PersistedProgressRow = {
  progress_data: unknown;
  progress_key: string;
};

const emptyProgress: ModuleProgress = {
  learnCompleted: false,
  practiceCompleted: false,
  masteryCompleted: false,
};

const remoteProgressStateTable = "user_progress_state";
const remoteProgressHydratedEvent = "aba-mastered-remote-progress-hydrated";

function progressKey(sectionSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:progress`;
}

function savedProgressKey(sectionSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:saved-progress`;
}

function lastSavedProgressLocationKey() {
  return "aba-mastered:tco6:last-saved-progress-location";
}

function learnCompletionKey(sectionSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:learn-completed-lessons`;
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function dailyLearnCompletionKey(dateKey = localDateKey()) {
  return `aba-mastered:tco6:daily-learn-completions:${dateKey}`;
}

export function practiceAnswersKey(sectionSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:practice-answers`;
}

export function practiceResultsKey(sectionSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:practice-results`;
}

export function persistProgressValueSoon(
  progressStorageKey: string,
  progressData: unknown,
) {
  if (typeof window === "undefined") {
    return;
  }

  void persistProgressValue(progressStorageKey, progressData);
}

async function persistProgressValue(
  progressStorageKey: string,
  progressData: unknown,
) {
  if (!isSupabaseConfigured) {
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    await supabase.from(remoteProgressStateTable).upsert(
      {
        progress_data: progressData ?? null,
        progress_key: progressStorageKey,
        updated_at: new Date().toISOString(),
        user_id: user.id,
      },
      { onConflict: "user_id,progress_key" },
    );
  } catch {
    // Local progress remains the offline fallback if remote sync is unavailable.
  }
}

export async function hydrateUserProgressFromSupabase() {
  if (typeof window === "undefined" || !isSupabaseConfigured) {
    return 0;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return 0;
    }

    const { data, error } = await supabase
      .from(remoteProgressStateTable)
      .select("progress_key, progress_data")
      .eq("user_id", user.id);

    if (error || !data) {
      return 0;
    }

    const rows = data as PersistedProgressRow[];

    rows.forEach((row) => {
      if (typeof row.progress_key === "string") {
        window.localStorage.setItem(
          row.progress_key,
          JSON.stringify(row.progress_data),
        );

        const moduleProgressMatch = row.progress_key.match(
          /^aba-mastered:tco6:([^:]+):progress$/,
        );
        if (moduleProgressMatch) {
          window.dispatchEvent(
            new CustomEvent("aba-mastered-progress", {
              detail: {
                progress: row.progress_data as ModuleProgress,
                sectionSlug: moduleProgressMatch[1],
              },
            }),
          );
        }
      }
    });

    window.dispatchEvent(
      new CustomEvent(remoteProgressHydratedEvent, {
        detail: { count: rows.length },
      }),
    );
    window.dispatchEvent(new Event("aba-mastered-progress-saved"));
    window.dispatchEvent(new Event("aba-mastered-progress"));
    window.dispatchEvent(new Event("aba-mastered-learn-progress"));
    window.dispatchEvent(new Event("aba-mastered-daily-learn-progress"));

    return rows.length;
  } catch {
    return 0;
  }
}

export function ProgressStorageHydrator() {
  useEffect(() => {
    void hydrateUserProgressFromSupabase();
  }, []);

  return null;
}

function safeReadRecord(key?: string) {
  if (!key || typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) as Record<string, string | boolean> : {};
  } catch {
    return {};
  }
}

export function readProgress(sectionSlug: string): ModuleProgress {
  if (typeof window === "undefined") {
    return emptyProgress;
  }

  try {
    const stored = window.localStorage.getItem(progressKey(sectionSlug));
    return stored
      ? { ...emptyProgress, ...JSON.parse(stored) }
      : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

function writeProgress(sectionSlug: string, progress: ModuleProgress) {
  const key = progressKey(sectionSlug);
  window.localStorage.setItem(key, JSON.stringify(progress));
  persistProgressValueSoon(key, progress);
  window.dispatchEvent(
    new CustomEvent("aba-mastered-progress", {
      detail: { sectionSlug, progress },
    }),
  );
}

export async function persistModuleScore(
  sectionSlug: string,
  score: number,
  mastered: boolean,
) {
  if (!isSupabaseConfigured) {
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase.from("module_mastery_scores").upsert(
    {
      mastered,
      module_slug: sectionSlug,
      score,
      updated_at: new Date().toISOString(),
      user_id: user.id,
    },
    { onConflict: "user_id,module_slug" },
  );
}

export function readCompletedLearnLessonSlugs(sectionSlug: string) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(learnCompletionKey(sectionSlug));
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.filter((slug): slug is string => typeof slug === "string")
      : [];
  } catch {
    return [];
  }
}

function readDailyCompletedLearnLessonIds(dateKey = localDateKey()) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(dailyLearnCompletionKey(dateKey));
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function countTodaysCompletedLearnLessons() {
  return readDailyCompletedLearnLessonIds().length;
}

function writeDailyCompletedLearnLesson(sectionSlug: string, lessonSlug: string) {
  if (typeof window === "undefined") {
    return;
  }

  const completionId = `${sectionSlug}:${lessonSlug}`;
  const completedToday = Array.from(
    new Set([...readDailyCompletedLearnLessonIds(), completionId]),
  );

  window.localStorage.setItem(
    dailyLearnCompletionKey(),
    JSON.stringify(completedToday),
  );
  persistProgressValueSoon(dailyLearnCompletionKey(), completedToday);
  window.dispatchEvent(
    new CustomEvent("aba-mastered-daily-learn-progress", {
      detail: { completedLessons: completedToday },
    }),
  );
}

function writeCompletedLearnLessonSlugs(
  sectionSlug: string,
  lessonSlugs: string[],
) {
  const uniqueLessonSlugs = Array.from(new Set(lessonSlugs));
  const key = learnCompletionKey(sectionSlug);
  window.localStorage.setItem(key, JSON.stringify(uniqueLessonSlugs));
  persistProgressValueSoon(key, uniqueLessonSlugs);
  window.dispatchEvent(
    new CustomEvent("aba-mastered-learn-progress", {
      detail: { completedLessons: uniqueLessonSlugs, sectionSlug },
    }),
  );

  return uniqueLessonSlugs;
}

export function calculateSavedModuleProgressPercent(
  sectionSlug: string,
  totalLessons: number,
  fallbackProgress = 0,
) {
  if (typeof window === "undefined") {
    return fallbackProgress;
  }

  const progress = readProgress(sectionSlug);

  if (progress.masteryCompleted) {
    return 100;
  }

  const completedLessons = readCompletedLearnLessonSlugs(sectionSlug).length;
  const learnRatio =
    totalLessons > 0 ? Math.min(completedLessons / totalLessons, 1) : 0;
  const practiceProgress = progress.practiceCompleted ? 25 : 0;
  const masteryProgress = progress.masteryCompleted ? 25 : 0;
  const savedPercent = Math.round(
    learnRatio * 50 + practiceProgress + masteryProgress,
  );

  return Math.max(savedPercent, fallbackProgress);
}

export function markLearnLessonComplete({
  currentLocation,
  lessonSlug,
  sectionSlug,
  totalLessons,
}: {
  currentLocation: string;
  lessonSlug: string;
  sectionSlug: string;
  totalLessons: number;
}) {
  if (typeof window === "undefined") {
    return;
  }

  const previouslyCompleted = readCompletedLearnLessonSlugs(sectionSlug);
  const isNewCompletion = !previouslyCompleted.includes(lessonSlug);
  const completedLessons = writeCompletedLearnLessonSlugs(sectionSlug, [
    ...previouslyCompleted,
    lessonSlug,
  ]);

  if (isNewCompletion) {
    writeDailyCompletedLearnLesson(sectionSlug, lessonSlug);
  }

  const learnCompleted =
    totalLessons > 0 && completedLessons.length >= totalLessons;
  const nextProgress = {
    ...readProgress(sectionSlug),
    learnCompleted,
  };
  const score =
    totalLessons > 0
      ? Math.round((completedLessons.length / totalLessons) * 100)
      : 0;

  writeProgress(sectionSlug, nextProgress);
  void persistModuleScore(sectionSlug, score, learnCompleted);

  return saveModuleProgressSnapshot(sectionSlug, {
    activity: "learn",
    completedQuestions: completedLessons,
    currentLocation,
    lessonSlug,
    passed: learnCompleted,
    score,
    submitted: true,
    totalQuestions: totalLessons,
  });
}

export function readSavedModuleProgress(sectionSlug: string): SavedModuleProgress {
  const fallback: SavedModuleProgress = {
    masteryProgress: readProgress(sectionSlug),
    snapshots: {},
    updatedAt: "",
  };

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(savedProgressKey(sectionSlug));
    return stored
      ? { ...fallback, ...JSON.parse(stored) }
      : fallback;
  } catch {
    return fallback;
  }
}

function isDashboardModuleLocation(location?: string) {
  return Boolean(location?.startsWith("/dashboard/tco-6/"));
}

function writeLastSavedProgressLocation(
  sectionSlug: string,
  currentLocation: string,
  updatedAt: string,
) {
  if (
    typeof window === "undefined" ||
    !isDashboardModuleLocation(currentLocation)
  ) {
    return;
  }

  const lastSavedLocation: LastSavedProgressLocation = {
    currentLocation,
    sectionSlug,
    updatedAt,
  };

  window.localStorage.setItem(
    lastSavedProgressLocationKey(),
    JSON.stringify(lastSavedLocation),
  );
  persistProgressValueSoon(lastSavedProgressLocationKey(), lastSavedLocation);
}

export function readMostRecentSavedProgressLocation(sectionSlugs: string[]) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(lastSavedProgressLocationKey());
    const parsed = stored
      ? JSON.parse(stored) as Partial<LastSavedProgressLocation>
      : null;

    if (
      parsed?.currentLocation &&
      parsed.sectionSlug &&
      sectionSlugs.includes(parsed.sectionSlug) &&
      isDashboardModuleLocation(parsed.currentLocation)
    ) {
      return parsed as LastSavedProgressLocation;
    }
  } catch {
    // Fall back to existing per-module snapshots below.
  }

  const savedLocations = sectionSlugs
    .flatMap((sectionSlug) => {
      const savedProgress = readSavedModuleProgress(sectionSlug);
      return Object.values(savedProgress.snapshots)
        .filter((snapshot) => isDashboardModuleLocation(snapshot.currentLocation))
        .map((snapshot) => ({
          currentLocation: snapshot.currentLocation,
          sectionSlug,
          updatedAt: snapshot.updatedAt,
        }));
    })
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));

  return savedLocations[0] ?? null;
}

export function saveModuleProgressSnapshot(
  sectionSlug: string,
  snapshot: Omit<SavedProgressSnapshot, "masteryProgress" | "updatedAt">,
) {
  const updatedAt = new Date().toISOString();
  const previous = readSavedModuleProgress(sectionSlug);
  const masteryProgress = readProgress(sectionSlug);
  const nextSnapshot: SavedProgressSnapshot = {
    ...snapshot,
    masteryProgress,
    updatedAt,
  };
  const nextState: SavedModuleProgress = {
    ...previous,
    currentLocation: snapshot.currentLocation,
    masteryProgress,
    snapshots: {
      ...previous.snapshots,
      [snapshot.activity]: nextSnapshot,
    },
    updatedAt,
  };

  const key = savedProgressKey(sectionSlug);
  window.localStorage.setItem(key, JSON.stringify(nextState));
  persistProgressValueSoon(key, nextState);
  writeLastSavedProgressLocation(sectionSlug, snapshot.currentLocation, updatedAt);
  window.dispatchEvent(
    new CustomEvent("aba-mastered-progress-saved", {
      detail: { sectionSlug, savedProgress: nextState },
    }),
  );

  return nextState;
}

export function useModuleProgress(sectionSlug: string) {
  const [progress, setProgress] = useState<ModuleProgress>(() =>
    readProgress(sectionSlug),
  );

  useEffect(() => {
    function sync(event: Event) {
      const customEvent = event as CustomEvent<{
        sectionSlug: string;
        progress: ModuleProgress;
      }>;

      if (customEvent.detail?.sectionSlug === sectionSlug) {
        setProgress(customEvent.detail.progress);
      }
    }

    window.addEventListener("aba-mastered-progress", sync);

    return () => window.removeEventListener("aba-mastered-progress", sync);
  }, [sectionSlug]);

  function updateProgress(next: Partial<ModuleProgress>) {
    const merged = { ...readProgress(sectionSlug), ...next };
    writeProgress(sectionSlug, merged);
    setProgress(merged);
  }

  return { progress, updateProgress };
}

export function useSavedModuleProgressPercent(
  sectionSlug: string,
  totalLessons: number,
  fallbackProgress = 0,
) {
  const [progressPercent, setProgressPercent] = useState(() =>
    calculateSavedModuleProgressPercent(
      sectionSlug,
      totalLessons,
      fallbackProgress,
    ),
  );

  useEffect(() => {
    function sync() {
      setProgressPercent(
        calculateSavedModuleProgressPercent(
          sectionSlug,
          totalLessons,
          fallbackProgress,
        ),
      );
    }

    sync();
    window.addEventListener("aba-mastered-progress", sync);
    window.addEventListener("aba-mastered-learn-progress", sync);
    window.addEventListener("aba-mastered-progress-saved", sync);

    return () => {
      window.removeEventListener("aba-mastered-progress", sync);
      window.removeEventListener("aba-mastered-learn-progress", sync);
      window.removeEventListener("aba-mastered-progress-saved", sync);
    };
  }, [fallbackProgress, sectionSlug, totalLessons]);

  return progressPercent;
}

export function isActivityUnlocked(
  activity: ActivitySlug,
  progress: ModuleProgress,
) {
  if (activity === "learn") {
    return true;
  }

  if (activity === "practice") {
    return progress.learnCompleted;
  }

  return progress.learnCompleted && progress.practiceCompleted;
}

function hasDeveloperPreviewAccess(
  activity: ActivitySlug,
  sectionSlug: string,
) {
  // Development-only bypass for QA shortcuts. Production learners still follow
  // normal Learn -> Practice -> Mastery Check progression.
  return (
    process.env.NODE_ENV === "development" &&
    ["a", "b", "c", "d", "e", "f", "g", "h", "i"].includes(sectionSlug) &&
    (activity === "practice" || activity === "mastery-check")
  );
}

export function ActivityProgressNav({
  activeActivity,
  sectionSlug,
}: {
  activeActivity: ActivitySlug;
  sectionSlug: string;
}) {
  const { progress } = useModuleProgress(sectionSlug);
  const items: {
    activity: ActivitySlug;
    label: string;
    completed: boolean;
  }[] = [
    {
      activity: "learn",
      label: "Learn",
      completed: progress.learnCompleted,
    },
    {
      activity: "practice",
      label: "Practice",
      completed: progress.practiceCompleted,
    },
    {
      activity: "mastery-check",
      label: "Mastery Check",
      completed: progress.masteryCompleted,
    },
  ];

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      {items.map((item) => {
        const unlocked =
          isActivityUnlocked(item.activity, progress) ||
          hasDeveloperPreviewAccess(item.activity, sectionSlug);
        const active = item.activity === activeActivity;
        const baseClass =
          "rounded-xl border px-4 py-2 text-sm font-black shadow-sm transition";
        const stateClass = item.completed
          ? "border-green-200 bg-green-100 text-green-800 shadow-green-100"
          : active
            ? "border-blue-200 bg-blue-100 text-blue-800"
            : unlocked
              ? "border-white/70 bg-white/80 text-slate-950 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400";

        return unlocked ? (
          <Link
            key={item.activity}
            href={`/dashboard/tco-6/${sectionSlug}/${item.activity}`}
            className={`${baseClass} ${stateClass}`}
          >
            {item.completed ? "Completed - " : ""}
            {item.label}
          </Link>
        ) : (
          <span
            key={item.activity}
            aria-disabled="true"
            className={`${baseClass} ${stateClass}`}
            title={
              item.activity === "practice"
                ? `Practice unlocks after Learn is completed with ${miniLessonMasteryThreshold}%.`
                : "Mastery Check unlocks after Practice is completed with 100% correct."
            }
          >
            Locked · {item.label}
          </span>
        );
      })}
    </div>
  );
}

export function ActivityGate({
  activity,
  children,
  sectionSlug,
}: {
  activity: ActivitySlug;
  children: ReactNode;
  sectionSlug: string;
}) {
  const { progress } = useModuleProgress(sectionSlug);
  const unlocked =
    isActivityUnlocked(activity, progress) ||
    hasDeveloperPreviewAccess(activity, sectionSlug);

  if (!unlocked && activity !== "learn") {
    return <LockedActivityCard activity={activity} />;
  }

  return <>{children}</>;
}

export function LockedActivityCard({
  activity,
}: {
  activity: Exclude<ActivitySlug, "learn">;
}) {
  const requirement =
    activity === "practice"
      ? `Complete Learn with ${miniLessonMasteryThreshold}% correct to unlock Practice.`
      : "Complete Practice with 100% correct to unlock Mastery Check.";

  return (
    <section className="mt-8 w-full rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-slate-600">
        Locked
      </p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">
        Finish the previous step first
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-950">
        {requirement}
      </p>
    </section>
  );
}

export function SavedModuleProgressCard({
  fallbackProgress,
  label,
  sectionSlug,
  totalLessons,
}: {
  fallbackProgress: number;
  label: string;
  sectionSlug: string;
  totalLessons: number;
}) {
  const progressPercent = useSavedModuleProgressPercent(
    sectionSlug,
    totalLessons,
    fallbackProgress,
  );
  const status =
    progressPercent >= masteryThreshold
      ? "Mastered"
      : progressPercent > 0
        ? "In Progress"
        : "Not Started";

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-black uppercase tracking-wide text-blue-600">
        Module Completion Status
      </p>

      <div className="mt-3 flex items-end justify-center gap-3">
        <span className="text-6xl font-black tracking-tight text-slate-950">
          {progressPercent}%
        </span>
        <span className="pb-2 text-sm font-black uppercase tracking-wide text-slate-950">
          {status}
        </span>
      </div>

      <div
        aria-label={`${label}: ${progressPercent}%`}
        className="mt-5 h-3 rounded-full bg-slate-100"
        role="img"
      >
        <div
          className="h-3 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export function CompleteLearnLink({ sectionSlug }: { sectionSlug: string }) {
  const { updateProgress } = useModuleProgress(sectionSlug);

  return (
    <Link
      href={`/dashboard/tco-6/${sectionSlug}/practice`}
      onClick={() => updateProgress({ learnCompleted: true })}
      className="mt-8 inline-block rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:opacity-90"
    >
      Complete Learn and Unlock Practice
    </Link>
  );
}

export function SaveProgressButton({
  activity,
  completedQuestions,
  currentLocation,
  lessonSlug,
  passed,
  questionOrder,
  score,
  sectionSlug,
  selectedAnswers,
  storageKeys,
  submitted,
  totalQuestions,
}: {
  activity: string;
  completedQuestions?: string[];
  currentLocation?: string;
  lessonSlug?: string;
  passed?: boolean;
  questionOrder?: string[];
  score?: number;
  sectionSlug: string;
  selectedAnswers?: Record<string, string>;
  storageKeys?: {
    selectedAnswers?: string;
    results?: string;
  };
  submitted?: boolean;
  totalQuestions?: number;
}) {
  const pathname = usePathname();
  const [message, setMessage] = useState("");

  function saveProgress() {
    const storedAnswers = safeReadRecord(storageKeys?.selectedAnswers);
    const storedResults = safeReadRecord(storageKeys?.results);
    const resultValues = Object.values(storedResults);
    const correctCount = resultValues.filter(Boolean).length;
    const resolvedScore =
      score ??
      (totalQuestions && resultValues.length > 0
        ? Math.round((correctCount / totalQuestions) * 100)
        : undefined);
    const resolvedCompletedQuestions =
      completedQuestions ??
      Object.entries(storedResults)
        .filter(([, value]) => Boolean(value))
        .map(([key]) => key);

    saveModuleProgressSnapshot(sectionSlug, {
      activity,
      completedQuestions: resolvedCompletedQuestions,
      currentLocation: currentLocation ?? pathname,
      lessonSlug,
      passed,
      questionOrder,
      score: resolvedScore,
      selectedAnswers:
        selectedAnswers ?? Object.fromEntries(
          Object.entries(storedAnswers).map(([key, value]) => [key, String(value)]),
        ),
      submitted,
      totalQuestions,
    });

    setMessage("Progress saved.");
    window.setTimeout(() => setMessage(""), 2200);
  }

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-2 text-center">
      <button
        type="button"
        onClick={saveProgress}
        className="rounded-xl border border-emerald-600 bg-emerald-600 px-6 py-3 text-sm font-black text-white shadow-sm shadow-emerald-600/20 transition hover:border-emerald-700 hover:bg-emerald-700 active:border-emerald-800 active:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2"
      >
        Save Progress
      </button>
      {message ? (
        <p className="rounded-2xl border border-[#86efac] bg-[#dcfce7] px-4 py-2 text-sm font-black text-[#15803d]">
          {message}
        </p>
      ) : null}
    </div>
  );
}
