"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { TcoSection } from "./data";
import { getMiniLessons } from "./mini-lesson-data";
import {
  readCompletedLearnLessonSlugs,
  readProgress,
  readSavedModuleProgress,
} from "./progression";
import type { MiniLessonContent } from "./section-b-content";

function extractObjectiveNumbers(text: string) {
  const matches = text.match(/\d+/g) ?? [];
  return matches.map((value) => Number(value)).filter(Number.isFinite);
}

function getChecklistLessonHref({
  checklistItem,
  checklistIndex,
  lessons,
  section,
}: {
  checklistItem: string;
  checklistIndex: number;
  lessons: MiniLessonContent[];
  section: TcoSection;
}) {
  if (lessons.length === 0) {
    return `/dashboard/tco-6/${section.slug}/learn`;
  }

  const objectiveNumbers = extractObjectiveNumbers(checklistItem);
  const firstObjective = objectiveNumbers[0];
  const lastObjective = objectiveNumbers[objectiveNumbers.length - 1];
  const matchingLessonIndex = lessons.findIndex((lesson) => {
    const lessonNumber = extractObjectiveNumbers(lesson.label)[0];

    return (
      typeof firstObjective === "number" &&
      typeof lastObjective === "number" &&
      typeof lessonNumber === "number" &&
      lessonNumber >= firstObjective &&
      lessonNumber <= lastObjective
    );
  });

  const fallbackLessonIndex = Math.min(
    Math.floor((checklistIndex / section.checklistItems.length) * lessons.length),
    lessons.length - 1,
  );
  const lessonIndex =
    matchingLessonIndex >= 0 ? matchingLessonIndex : fallbackLessonIndex;

  return lessonIndex === 0
    ? `/dashboard/tco-6/${section.slug}/learn`
    : `/dashboard/tco-6/${section.slug}/learn/${lessonIndex + 1}`;
}

function getSavedLearnHref(sectionSlug: string) {
  const savedProgress = readSavedModuleProgress(sectionSlug);
  const savedLocation = savedProgress.snapshots.learn?.currentLocation;

  return savedLocation || `/dashboard/tco-6/${sectionSlug}/learn`;
}

function isLearnComplete(sectionSlug: string, totalLessons: number) {
  if (readProgress(sectionSlug).learnCompleted) {
    return true;
  }

  return (
    totalLessons > 0 &&
    readCompletedLearnLessonSlugs(sectionSlug).length >= totalLessons
  );
}

export function ChecklistButtons({ section }: { section: TcoSection }) {
  const lessons = useMemo(() => getMiniLessons(section), [section]);
  const [learnComplete, setLearnComplete] = useState(() =>
    isLearnComplete(section.slug, lessons.length),
  );
  const [savedLearnHref, setSavedLearnHref] = useState(() =>
    getSavedLearnHref(section.slug),
  );

  useEffect(() => {
    function syncChecklistState() {
      setLearnComplete(isLearnComplete(section.slug, lessons.length));
      setSavedLearnHref(getSavedLearnHref(section.slug));
    }

    syncChecklistState();
    window.addEventListener("aba-mastered-progress", syncChecklistState);
    window.addEventListener("aba-mastered-learn-progress", syncChecklistState);
    window.addEventListener("aba-mastered-progress-saved", syncChecklistState);

    return () => {
      window.removeEventListener("aba-mastered-progress", syncChecklistState);
      window.removeEventListener(
        "aba-mastered-learn-progress",
        syncChecklistState,
      );
      window.removeEventListener(
        "aba-mastered-progress-saved",
        syncChecklistState,
      );
    };
  }, [lessons.length, section.slug]);

  return (
    <div className="mt-6 grid gap-4">
      {section.checklistItems.map((item, index) => {
        const href = learnComplete
          ? getChecklistLessonHref({
              checklistIndex: index,
              checklistItem: item,
              lessons,
              section,
            })
          : savedLearnHref;

        return (
          <Link
            aria-label={
              learnComplete
                ? `Open ${item}`
                : `Return to saved Learn progress before opening ${item}`
            }
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm transition hover:border-blue-500 hover:bg-blue-600 hover:shadow-blue-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            href={href}
            key={item}
          >
            <p className="text-base font-bold leading-7 text-slate-950 transition group-hover:text-white">
              {item}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
