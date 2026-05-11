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

type TcoSection = {
  code: string;
  title: string;
  progress: number;
  subtopicCount: number;
  quizCount: number;
  href: string;
};

const tcoSections: TcoSection[] = [
  {
    code: "A",
    title: "Behaviorism and Philosophical Foundations",
    progress: 72,
    subtopicCount: 0,
    quizCount: 0,
    href: "/dashboard",
  },
  {
    code: "B",
    title: "Concepts and Principles",
    progress: 84,
    subtopicCount: 0,
    quizCount: 0,
    href: "/dashboard",
  },
  {
    code: "C",
    title: "Measurement, Data Display, and Interpretation",
    progress: 58,
    subtopicCount: 0,
    quizCount: 0,
    href: "/dashboard",
  },
  {
    code: "D",
    title: "Experimental Design",
    progress: 41,
    subtopicCount: 0,
    quizCount: 0,
    href: "/dashboard",
  },
  {
    code: "E",
    title: "Ethical and Professional Issues",
    progress: 92,
    subtopicCount: 0,
    quizCount: 0,
    href: "/dashboard",
  },
  {
    code: "F",
    title: "Behavior Assessment",
    progress: 66,
    subtopicCount: 0,
    quizCount: 0,
    href: "/dashboard",
  },
  {
    code: "G",
    title: "Behavior-Change Procedures",
    progress: 79,
    subtopicCount: 0,
    quizCount: 0,
    href: "/dashboard",
  },
  {
    code: "H",
    title: "Selecting and Implementing Interventions",
    progress: 35,
    subtopicCount: 0,
    quizCount: 0,
    href: "/dashboard",
  },
  {
    code: "I",
    title: "Personnel Supervision and Management",
    progress: 24,
    subtopicCount: 0,
    quizCount: 0,
    href: "/dashboard",
  },
];

const masteredSections = tcoSections.filter(
  (section) => section.progress >= masteryThreshold,
);

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

  return (
    <PageShell maxWidth="6xl">
      <section className="flex w-full flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center">
          <p className={eyebrowClass}>BACB Test Content Outline 6</p>

          <h1 className={pageTitleClass}>Welcome back.</h1>

          <p className={leadClass}>
            Study ABA Mastered through the canonical TCO 6 structure, track
            mastery placeholders, and prepare each section for future subtopics
            and quizzes.
          </p>

          <p className="mt-4 text-sm font-semibold text-slate-600">
            Signed in as {user?.email}
          </p>
        </div>

        <LogoutButton />
      </section>

      <section className="mt-10 grid w-full gap-6 md:grid-cols-3">
        <div className={`${cardBaseClass} border-blue-200 bg-blue-50`}>
          <p className={eyebrowClass}>Mastery threshold</p>

          <div
            className={`mt-4 text-6xl font-extrabold tracking-tight ${gradientTextClass}`}
          >
            {masteryThreshold}%
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            TCO 6 sections are marked mastered when progress reaches 90% or
            higher.
          </p>
        </div>

        <div className={`${cardBaseClass} border-purple-200 bg-purple-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Mastered sections
          </p>

          <div className="mt-4 text-6xl font-extrabold tracking-tight text-purple-600">
            {masteredSections.length}
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            {masteredSections.length} of {tcoSections.length} TCO 6 sections
            currently meet the mastery criterion.
          </p>
        </div>

        <div className={`${cardBaseClass} border-pink-200 bg-pink-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
            Overall progress
          </p>

          <div className="mt-4 text-6xl font-extrabold tracking-tight text-pink-600">
            {averageProgress}%
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Placeholder progress is ready to be replaced by Supabase progress
            tracking.
          </p>
        </div>
      </section>

      <section className={`${cardBaseClass} mt-10 w-full border-blue-200 bg-white text-center`}>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <p className={eyebrowClass}>Continue studying</p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              {continueSection.code}. {continueSection.title}
            </h2>

            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
              Continue this TCO 6 section and move it toward the 90% mastery
              threshold.
            </p>
          </div>

          <Link
            href={continueSection.href}
            className="inline-block rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Continue studying
          </Link>
        </div>

        <ProgressBar
          label={`${continueSection.code}. ${continueSection.title} mastery progress`}
          progress={continueSection.progress}
          className="mt-6"
        />
      </section>

      <section id="tco-6-sections" className="mt-10 w-full">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex flex-col items-center">
            <p className={eyebrowClass}>TCO 6 study categories</p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              BACB Test Content Outline 6
            </h2>
          </div>

          <p className="text-sm font-semibold text-slate-600">
            Mastery threshold: {masteryThreshold}%
          </p>
        </div>

        <div className="mt-6 grid gap-6">
          {tcoSections.map((section) => (
            <TcoSectionCard key={section.code} section={section} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function TcoSectionCard({ section }: { section: TcoSection }) {
  const isMastered = section.progress >= masteryThreshold;

  return (
    <details className={`${cardBaseClass} border-blue-200 bg-white text-center`} open>
      <summary className="flex cursor-pointer list-none flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-extrabold ${gradientTextClass}`}
          >
            {section.code}
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
              {section.code}. {section.title}
            </h3>

            <p className="mt-2 text-base leading-relaxed text-slate-600">
              Expand this section to prepare future subtopics, quizzes, and
              Supabase-backed progress tracking.
            </p>
          </div>
        </div>

        <StatusBadge isMastered={isMastered} />
      </summary>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center justify-center gap-4 text-sm font-semibold text-slate-600">
            <span>Mastery progress</span>
            <span>{section.progress}%</span>
          </div>

          <ProgressBar
            label={`${section.code}. ${section.title} mastery progress`}
            progress={section.progress}
            className="mt-2"
          />

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={section.href}
              className="inline-block rounded-xl bg-slate-950 px-4 py-2 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start studying
            </Link>

            <button
              type="button"
              disabled
              className="inline-block rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-400"
            >
              Quiz placeholder
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <PlaceholderPanel
            label="Future subtopics"
            value={section.subtopicCount}
            description="Ready for official TCO 6 task-list content."
          />

          <PlaceholderPanel
            label="Future quizzes"
            value={section.quizCount}
            description="Ready for section quizzes and mastery checks."
          />
        </div>
      </div>
    </details>
  );
}

function StatusBadge({ isMastered }: { isMastered: boolean }) {
  return (
    <span
      className={`w-fit rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wide ${
        isMastered
          ? "bg-purple-100 text-purple-700"
          : "bg-pink-100 text-pink-700"
      }`}
    >
      {isMastered ? "Mastered" : "In progress"}
    </span>
  );
}

function PlaceholderPanel({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
        {value}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
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
