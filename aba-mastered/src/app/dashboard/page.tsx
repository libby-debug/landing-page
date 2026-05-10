"use client";

import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-provider";
import {
  PageShell,
  cardBaseClass,
  eyebrowClass,
  gradientTextClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";

const masteryThreshold = 90;

const studySubjects = [
  {
    title: "Differential reinforcement",
    focus: "DRA, DRO, DRI, DRL, and DRH distinctions",
    progress: 92,
  },
  {
    title: "Stimulus control",
    focus: "Discriminative stimuli, stimulus delta, and generalization",
    progress: 84,
  },
  {
    title: "Motivating operation",
    focus: "EOs, AOs, value-altering effects, and behavior-altering effects",
    progress: 76,
  },
  {
    title: "Functional analysis",
    focus: "Attention, escape, tangible, and automatic reinforcement conditions",
    progress: 88,
  },
  {
    title: "Preference assessment",
    focus: "Paired-stimulus, multiple-stimulus, and free-operant formats",
    progress: 94,
  },
  {
    title: "Respondent vs operant behavior",
    focus: "Antecedent stimulus relations and consequence-shaped behavior",
    progress: 67,
  },
  {
    title: "Tact, mand, intraverbal",
    focus: "Verbal operants and controlling variables",
    progress: 81,
  },
  {
    title: "Single-subject design",
    focus: "Baseline logic, reversal, multiple baseline, and changing criterion",
    progress: 90,
  },
];

const masteredCount = studySubjects.filter(
  (subject) => subject.progress >= masteryThreshold,
).length;

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const nextSubject =
    studySubjects.find((subject) => subject.progress < masteryThreshold) ??
    studySubjects[0];

  return (
    <PageShell maxWidth="6xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className={eyebrowClass}>
            Mastery dashboard
          </p>

          <h1 className={pageTitleClass}>
            Build comprehension before memorization.
          </h1>

          <p className={leadClass}>
            Study ABA concepts visually, preserve the technical distinctions,
            and keep every subject moving toward the 90% mastery criterion.
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="#study-subjects"
              className="inline-block rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Start studying
            </Link>

            <p className="text-sm font-semibold text-slate-600">
              Signed in as {user?.email}
            </p>
          </div>
        </div>

        <LogoutButton />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className={`${cardBaseClass} border-blue-200 bg-blue-50`}>
          <p className={eyebrowClass}>
            Mastery criterion
          </p>

          <div className={`mt-4 text-6xl font-extrabold tracking-tight ${gradientTextClass}`}>
            {masteryThreshold}%
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Subjects are marked mastered at or above the 90% threshold.
          </p>
        </div>

        <div className={`${cardBaseClass} border-purple-200 bg-purple-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Mastered subjects
          </p>

          <div className="mt-4 text-6xl font-extrabold tracking-tight text-purple-600">
            {masteredCount}
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            {masteredCount} of {studySubjects.length} subjects currently meet
            the mastery threshold.
          </p>
        </div>

        <div className={`${cardBaseClass} border-pink-200 bg-pink-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
            Next study focus
          </p>

          <div className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">
            {nextSubject.title}
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            {nextSubject.focus}
          </p>
        </div>
      </div>

      <div id="study-subjects" className="mt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={eyebrowClass}>
              Study subjects
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              ABA concepts by mastery status
            </h2>
          </div>

          <p className="text-sm font-semibold text-slate-600">
            Mastery threshold: {masteryThreshold}%
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {studySubjects.map((subject) => {
            const isMastered = subject.progress >= masteryThreshold;

            return (
              <article
                key={subject.title}
                className={`${cardBaseClass} border-blue-200 bg-white`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                      {subject.title}
                    </h3>

                    <p className="mt-2 text-base leading-relaxed text-slate-600">
                      {subject.focus}
                    </p>
                  </div>

                  <span
                    className={`rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wide ${
                      isMastered
                        ? "bg-purple-100 text-purple-700"
                        : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {isMastered ? "Mastered" : "In progress"}
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>

                  <div
                    className="mt-2 h-3 rounded-full bg-slate-100"
                    aria-label={`${subject.title} progress: ${subject.progress}%`}
                    role="img"
                  >
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="#study-subjects"
                    className="inline-block rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Start studying
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
