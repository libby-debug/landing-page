import Link from "next/link";
import { notFound } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-route";
import {
  PageShell,
  cardBaseClass,
  eyebrowClass,
  gradientTextClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";
import {
  getMasteryStatus,
  getTcoSection,
  tcoSections,
  type TcoSection,
} from "../../data";

const activities = ["learn", "practice", "mastery-check"] as const;

type ActivitySlug = (typeof activities)[number];

type TcoActivityPageProps = {
  params: Promise<{
    section: string;
    activity: string;
  }>;
};

const activityLabels: Record<ActivitySlug, string> = {
  learn: "Learn",
  practice: "Practice",
  "mastery-check": "Mastery Check",
};

export function generateStaticParams() {
  return tcoSections.flatMap((section) =>
    activities.map((activity) => ({
      section: section.slug,
      activity,
    })),
  );
}

function isActivitySlug(activity: string): activity is ActivitySlug {
  return activities.includes(activity as ActivitySlug);
}

export default async function TcoActivityPage({
  params,
}: TcoActivityPageProps) {
  const { section: sectionSlug, activity } = await params;
  const section = getTcoSection(sectionSlug);

  if (!section || !isActivitySlug(activity)) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <PageShell maxWidth="6xl" className="pt-4">
        <div className="flex w-full flex-col items-center text-center">
          <p className={eyebrowClass}>
            TCO 6 Section {section.code} / {activityLabels[activity]}
          </p>

          <h1 className={pageTitleClass}>
            <span className={gradientTextClass}>{section.code}.</span>{" "}
            {section.title}
          </h1>

          <p className={leadClass}>{section.description}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <ModeLink section={section} activity="learn" />
            <ModeLink section={section} activity="practice" />
            <ModeLink section={section} activity="mastery-check" />
          </div>

          <Link
            href={`/dashboard/tco-6/${section.slug}`}
            className="mt-6 text-sm font-black text-blue-600 transition hover:text-blue-700"
          >
            Back to Section {section.code}
          </Link>
        </div>

        {activity === "learn" ? <LearnView section={section} /> : null}
        {activity === "practice" ? <PracticeView section={section} /> : null}
        {activity === "mastery-check" ? (
          <MasteryCheckView section={section} />
        ) : null}
      </PageShell>
    </ProtectedRoute>
  );
}

function ModeLink({
  section,
  activity,
}: {
  section: TcoSection;
  activity: ActivitySlug;
}) {
  return (
    <Link
      href={`/dashboard/tco-6/${section.slug}/${activity}`}
      className="rounded-xl border border-white/70 bg-white/80 px-4 py-2 text-sm font-black text-slate-950 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      {activityLabels[activity]}
    </Link>
  );
}

function LearnView({ section }: { section: TcoSection }) {
  return (
    <section className="mt-8 grid w-full gap-6 lg:grid-cols-[0.75fr_1.45fr]">
      <aside className={`${cardBaseClass} border-blue-200 bg-blue-50 text-center lg:text-left`}>
        <p className={eyebrowClass}>Lesson navigation</p>

        <div className="mt-5 grid gap-3">
          {section.checklistItems.map((item, index) => (
            <a
              key={item}
              href={`#lesson-${index + 1}`}
              className="rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm font-bold leading-6 text-slate-950 transition hover:border-blue-300 hover:bg-white"
            >
              Lesson {index + 1}: {item.split(". ").slice(1).join(". ")}
            </a>
          ))}
        </div>
      </aside>

      <div className={`${cardBaseClass} border-white/70 bg-white/95 text-center shadow-xl shadow-slate-900/10`}>
        <p className={eyebrowClass}>Lesson content</p>

        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          Section {section.code} learning path
        </h2>

        <div className="mt-6 grid gap-5">
          {section.checklistItems.map((item, index) => (
            <article
              id={`lesson-${index + 1}`}
              key={item}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-black uppercase tracking-wide text-blue-600">
                Lesson {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-black text-slate-950">
                {item}
              </h3>
              <p className="mt-3 text-base font-semibold leading-7 text-slate-950">
                This lesson area will hold visual explanations, term
                comparisons, examples, and nonexamples for this TCO 6 checklist
                item.
              </p>
            </article>
          ))}
        </div>

        <Link
          href={`/dashboard/tco-6/${section.slug}/practice`}
          className="mt-8 inline-block rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:opacity-90"
        >
          Next Lesson
        </Link>
      </div>
    </section>
  );
}

function PracticeView({ section }: { section: TcoSection }) {
  const practicePrompts = section.checklistItems.slice(0, 3);

  return (
    <section className={`${cardBaseClass} mt-8 w-full border-white/70 bg-white/95 text-center shadow-xl shadow-slate-900/10`}>
      <p className={eyebrowClass}>BCBA-style practice</p>

      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
        Practice Section {section.code}
      </h2>

      <div className="mt-6 grid gap-6">
        {practicePrompts.map((item, index) => (
          <article
            key={item}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left"
          >
            <p className="text-sm font-black uppercase tracking-wide text-purple-600">
              Question {index + 1}
            </p>

            <h3 className="mt-2 text-xl font-black text-slate-950">
              Which answer best matches this TCO 6 item?
            </h3>

            <p className="mt-3 text-base font-semibold leading-7 text-slate-950">
              {item}
            </p>

            <div className="mt-5 grid gap-3">
              {[
                "Correct section concept placeholder",
                "Related but less precise ABA term",
                "Common exam distractor",
                "Clinically incomplete answer",
              ].map((choice) => (
                <label
                  key={choice}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-950"
                >
                  <input
                    type="radio"
                    name={`practice-${section.slug}-${index}`}
                    className="h-4 w-4"
                  />
                  {choice}
                </label>
              ))}
            </div>

            <button
              type="button"
              className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:opacity-90"
            >
              Submit Answer
            </button>

            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-center">
              <p className="text-sm font-black uppercase tracking-wide text-blue-600">
                Explanation placeholder
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
                Rationale feedback will explain why the correct answer matches
                the TCO 6 checklist item and why each distractor is less
                precise.
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MasteryCheckView({ section }: { section: TcoSection }) {
  const status = getMasteryStatus(section.progress);

  return (
    <section className={`${cardBaseClass} mt-8 w-full border-white/70 bg-white/95 text-center shadow-xl shadow-slate-900/10`}>
      <p className={eyebrowClass}>Mastery check</p>

      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
        Section {section.code} mastery
      </h2>

      <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <p className="text-sm font-black uppercase tracking-wide text-blue-600">
          Score placeholder
        </p>

        <div className="mt-3 text-7xl font-black tracking-tight text-slate-950">
          {section.progress}%
        </div>

        <p className="mt-3 text-lg font-black text-slate-950">
          90% required to master
        </p>

        <div className="mt-6 h-4 rounded-full bg-white">
          <div
            className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            style={{ width: `${section.progress}%` }}
          />
        </div>

        <p className="mt-4 rounded-2xl bg-white/80 p-4 text-sm font-bold text-slate-950">
          Current status: {status}. Future mastery checks will save score data
          to Supabase and unlock progression when the learner reaches the 90%
          mastery threshold.
        </p>

        <button
          type="button"
          className="mt-6 rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:opacity-90"
        >
          Retry
        </button>
      </div>
    </section>
  );
}
