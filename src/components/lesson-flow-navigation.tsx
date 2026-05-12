import Link from "next/link";
import type { LessonStepSlug } from "@/lib/modules/differential-reinforcement";

type LessonStep = {
  slug: LessonStepSlug;
  title: string;
  label: string;
};

type LessonStepTrackerProps = {
  steps: LessonStep[];
  currentStepSlug: LessonStepSlug;
  procedureSlug: string;
};

type LessonNavigationProps = {
  backHref: string;
  nextHref?: string;
  nextLabel?: string;
};

export function ProgressIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const progress = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm font-semibold text-slate-950">
        <span>
          Step {current} of {total}
        </span>
        <span>{progress}% complete</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function LessonStepTracker({
  steps,
  currentStepSlug,
  procedureSlug,
}: LessonStepTrackerProps) {
  const currentIndex = steps.findIndex((step) => step.slug === currentStepSlug);

  return (
    <nav
      aria-label="Lesson steps"
      className="mt-8 grid w-full gap-3 sm:grid-cols-5"
    >
      {steps.map((step, index) => {
        const isCurrent = step.slug === currentStepSlug;
        const isAvailable = index <= currentIndex;
        const href = `/modules/differential-reinforcement/${procedureSlug}/${step.slug}`;

        return isAvailable ? (
          <Link
            key={step.slug}
            href={href}
            aria-current={isCurrent ? "step" : undefined}
            className={`rounded-2xl border px-3 py-4 text-center text-xs font-extrabold uppercase tracking-wide transition ${
              isCurrent
                ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-700"
            }`}
          >
            <span>{index + 1}. {step.label}</span>
          </Link>
        ) : (
          <div
            key={step.slug}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-center text-xs font-extrabold uppercase tracking-wide text-slate-400"
            aria-label={`${step.title} locked until earlier lesson steps are complete`}
          >
            {index + 1}. {step.label}
          </div>
        );
      })}
    </nav>
  );
}

export function LessonNavigation({
  backHref,
  nextHref,
  nextLabel = "Next Lesson",
}: LessonNavigationProps) {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
      <Link
        href={backHref}
        className="inline-block rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-300 hover:shadow-md"
      >
        Back
      </Link>

      {nextHref ? (
        <Link
          href={nextHref}
          className="inline-block rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          {nextLabel}
        </Link>
      ) : null}
    </div>
  );
}
