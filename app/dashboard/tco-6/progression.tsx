"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
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

const emptyProgress: ModuleProgress = {
  learnCompleted: false,
  practiceCompleted: false,
  masteryCompleted: false,
};

function progressKey(sectionSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:progress`;
}

function savedProgressKey(sectionSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:saved-progress`;
}

export function practiceAnswersKey(sectionSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:practice-answers`;
}

export function practiceResultsKey(sectionSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:practice-results`;
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

function readProgress(sectionSlug: string): ModuleProgress {
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
  window.localStorage.setItem(progressKey(sectionSlug), JSON.stringify(progress));
  window.dispatchEvent(
    new CustomEvent("aba-mastered-progress", {
      detail: { sectionSlug, progress },
    }),
  );
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

  window.localStorage.setItem(savedProgressKey(sectionSlug), JSON.stringify(nextState));
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
  return (
    process.env.NODE_ENV === "development" &&
    sectionSlug === "b" &&
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
                : `Mastery Check unlocks after Practice is completed with ${masteryThreshold}% or higher.`
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
      : `Complete Practice with ${masteryThreshold}% or higher to unlock Mastery Check.`;

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

export function CompleteLearnLink({ sectionSlug }: { sectionSlug: string }) {
  const { updateProgress } = useModuleProgress(sectionSlug);

  return (
    <Link
      href={`/dashboard/tco-6/${sectionSlug}/practice`}
      onClick={() => updateProgress({ learnCompleted: true })}
      className="mt-8 inline-block rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:opacity-90"
    >
      Complete Learn and Unlock Practice
    </Link>
  );
}

export function CompletePracticeLink({ sectionSlug }: { sectionSlug: string }) {
  const { updateProgress } = useModuleProgress(sectionSlug);

  return (
    <Link
      href={`/dashboard/tco-6/${sectionSlug}/mastery-check`}
      onClick={() => updateProgress({ practiceCompleted: true })}
      className="mt-8 inline-block rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:opacity-90"
    >
      Complete Practice and Unlock Mastery Check
    </Link>
  );
}

export function SaveProgressButton({
  activity,
  completedQuestions,
  currentLocation,
  lessonSlug,
  passed,
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
        className="rounded-xl border border-green-300 bg-green-600 px-6 py-3 text-sm font-black text-white shadow-sm shadow-green-100 transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        Save Progress
      </button>
      {message ? (
        <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-black text-green-700">
          {message}
        </p>
      ) : null}
    </div>
  );
}
