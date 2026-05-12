"use client";

import Link from "next/link";
import { useState } from "react";
import {
  InteractiveVisualBlock,
  readSavedLearnInteractionState,
} from "./mini-lesson-interactions";
import {
  FormattedConceptText,
  cardBaseClass,
  eyebrowClass,
} from "@/components/learning-ui";
import type { TcoSection } from "./data";
import { getMiniLessons } from "./mini-lesson-data";
import {
  SaveProgressButton,
  readSavedModuleProgress,
  useModuleProgress,
} from "./progression";
import {
  type MiniLessonContent,
} from "./section-b-content";

export function MiniLessonView({
  lesson,
  lessonIndex,
  section,
}: {
  lesson: MiniLessonContent;
  lessonIndex: number;
  section: TcoSection;
}) {
  const lessons = getMiniLessons(section);
  const previousHref =
    lessonIndex === 0
      ? `/dashboard/tco-6/${section.slug}`
      : `/dashboard/tco-6/${section.slug}/learn/${lessonIndex}`;
  const nextHref =
    lessonIndex + 1 < lessons.length
      ? `/dashboard/tco-6/${section.slug}/learn/${lessonIndex + 2}`
      : `/dashboard/tco-6/${section.slug}/practice`;
  const { updateProgress } = useModuleProgress(section.slug);
  const [passedLessonSlug, setPassedLessonSlug] = useState(() => {
    const savedLesson = readSavedModuleProgress(section.slug).snapshots.learn;
    const savedInteraction = readSavedLearnInteractionState(section.slug, lesson.slug);

    return (savedLesson?.lessonSlug === lesson.slug &&
      savedLesson.completedQuestions?.includes(lesson.slug)) ||
      savedInteraction.completed
      ? lesson.slug
      : "";
  });
  const isFinalLesson = lessonIndex + 1 >= lessons.length;
  const lessonPassed = passedLessonSlug === lesson.slug;

  function handlePassedChange(passed: boolean) {
    setPassedLessonSlug(passed ? lesson.slug : "");

    if (passed && isFinalLesson) {
      updateProgress({ learnCompleted: true });
    }
  }

  return (
    <section className={`${cardBaseClass} mt-8 w-full border-white/70 bg-white/95 text-center shadow-xl shadow-slate-900/10`}>
      <p className={eyebrowClass}>
        Lesson {lessonIndex + 1} of {lessons.length}
      </p>

      <div className="mx-auto mt-4 h-3 max-w-xl rounded-full bg-slate-100">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{
            width: `${((lessonIndex + 1) / lessons.length) * 100}%`,
          }}
        />
      </div>

      <p className="mt-6 text-sm font-black uppercase tracking-wide text-blue-600">
        {lesson.label}
      </p>

      <h2 className="mx-auto mt-2 max-w-4xl text-4xl font-black tracking-tight text-slate-950">
        {lesson.title}
      </h2>

      <div className="mx-auto mt-5 grid max-w-3xl gap-3">
        {lesson.body.map((sentence) => (
          <p
            key={sentence}
            className="text-lg font-semibold leading-8 text-slate-950"
          >
            <FormattedConceptText text={sentence} />
          </p>
        ))}
      </div>

      <InteractiveVisualBlock
        lessonSlug={lesson.slug}
        onPassedChange={handlePassedChange}
        sectionSlug={section.slug}
        visual={lesson.visual}
      />

      <SaveProgressButton
        activity="learn"
        completedQuestions={lessonPassed ? [lesson.slug] : []}
        currentLocation={`/dashboard/tco-6/${section.slug}/learn/${lessonIndex + 1}`}
        lessonSlug={lesson.slug}
        passed={lessonPassed}
        score={lessonPassed ? 100 : 0}
        sectionSlug={section.slug}
        totalQuestions={1}
      />

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={previousHref}
          className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:border-slate-400 sm:w-auto"
        >
          Previous
        </Link>

        {lessonPassed ? (
          <Link
            href={nextHref}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 text-center text-sm font-black text-white shadow-sm transition hover:opacity-90 sm:w-auto"
          >
            {isFinalLesson ? "Unlock Practice" : "Next"}
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-xl bg-slate-200 px-6 py-3 text-center text-sm font-black text-slate-500 sm:w-auto"
          >
            Pass check to continue
          </button>
        )}
      </div>
    </section>
  );
}
