import Link from "next/link";
import { notFound } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-route";
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
  getTcoSection,
  tcoSections,
  type TcoSection,
} from "../../data";
import { getMiniLessons } from "../../mini-lesson-data";
import { MiniLessonView } from "../../mini-lesson-ui";
import {
  MasteryCheckQuiz,
  PlaceholderPracticeQuestionCard,
  PracticeQuestionCard,
} from "../../question-interactions";
import {
  ActivityGate,
  ActivityProgressNav,
  CompleteLearnLink,
  CompletePracticeLink,
  type ActivitySlug,
} from "../../progression";
import {
  sectionBMasteryQuestions,
  sectionBPracticeQuestions,
} from "../../section-b-content";

const activities = ["learn", "practice", "mastery-check"] as const;

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
            TCO 6 Module {section.code} / {activityLabels[activity]}
          </p>

          <h1 className={pageTitleClass}>
            {section.code}. {section.title}
          </h1>

          <p className={leadClass}>{section.description}</p>

          <ActivityProgressNav
            activeActivity={activity}
            sectionSlug={section.slug}
          />

          <Link
            href={`/dashboard/tco-6/${section.slug}`}
            className="mt-6 text-sm font-black text-blue-600 transition hover:text-blue-700"
          >
            Back to Module {section.code}
          </Link>
        </div>

        <ActivityGate activity={activity} sectionSlug={section.slug}>
          {activity === "learn" ? <LearnView section={section} /> : null}
          {activity === "practice" ? <PracticeView section={section} /> : null}
          {activity === "mastery-check" ? (
            <MasteryCheckView section={section} />
          ) : null}
        </ActivityGate>
      </PageShell>
    </ProtectedRoute>
  );
}

function LearnView({ section }: { section: TcoSection }) {
  const miniLessons = getMiniLessons(section);

  if (miniLessons.length > 0) {
    return (
      <MiniLessonView
        lesson={miniLessons[0]}
        lessonIndex={0}
        section={section}
      />
    );
  }

  return (
    <section className={`${cardBaseClass} mt-8 w-full border-white/70 bg-white/95 text-center shadow-xl shadow-slate-900/10`}>
      <p className={eyebrowClass}>Lesson content</p>
      <h2 className={sectionTitleClass}>
        Module {section.code} learning path
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
              This lesson area will hold visual explanations, term comparisons,
              examples, and nonexamples for this TCO 6 checklist item.
            </p>
          </article>
        ))}
      </div>
      <CompleteLearnLink sectionSlug={section.slug} />
    </section>
  );
}

function PracticeView({ section }: { section: TcoSection }) {
  const practiceQuestions =
    section.slug === "b" ? sectionBPracticeQuestions : [];
  const practicePrompts = section.checklistItems.slice(0, 3);

  return (
    <section className={`${cardBaseClass} mt-8 w-full border-white/70 bg-white/95 text-center shadow-xl shadow-slate-900/10`}>
      <p className={eyebrowClass}>BCBA-style practice</p>

      <h2 className={sectionTitleClass}>
        Practice Module {section.code}
      </h2>

      <div className="mt-6 grid gap-6">
        {practiceQuestions.length > 0
          ? practiceQuestions.map((question, index) => (
              <PracticeQuestionCard
                index={index}
                key={question.prompt}
                mode="practice"
                question={question}
                sectionSlug={section.slug}
                totalQuestions={practiceQuestions.length}
              />
            ))
          : practicePrompts.map((item, index) => (
              <PlaceholderPracticeQuestionCard
                index={index}
                item={item}
                key={item}
                sectionSlug={section.slug}
              />
            ))}
      </div>
      {practiceQuestions.length === 0 ? (
        <CompletePracticeLink sectionSlug={section.slug} />
      ) : null}
    </section>
  );
}

function MasteryCheckView({ section }: { section: TcoSection }) {
  const status = getMasteryStatus(section.progress);
  const masteryQuestions =
    section.slug === "b" ? sectionBMasteryQuestions : [];

  return (
    <section className={`${cardBaseClass} mt-8 w-full border-white/70 bg-white/95 text-center shadow-xl shadow-slate-900/10`}>
      <p className={eyebrowClass}>Mastery check</p>

      <h2 className={sectionTitleClass}>
        Module {section.code} mastery
      </h2>

      {masteryQuestions.length > 0 ? (
        <MasteryCheckQuiz
          questions={masteryQuestions}
          sectionCode={section.code}
          sectionSlug={section.slug}
        />
      ) : (
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-black uppercase tracking-wide text-blue-600">
            Score placeholder
          </p>

          <div className="mt-3 text-7xl font-black tracking-tight text-slate-950">
            {section.progress}%
          </div>

          <p className="mt-3 text-lg font-black text-slate-950">
            100% required to master
          </p>

          <div className="mt-6 h-4 rounded-full bg-white">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              style={{ width: `${section.progress}%` }}
            />
          </div>

          <p className="mt-4 rounded-2xl bg-white/80 p-4 text-sm font-bold text-slate-950">
            Current status: {status}. Future mastery checks will save score data
            to Supabase and unlock progression when the learner reaches the 100%
            mastery threshold.
          </p>

          <button
            type="button"
            className="mt-6 rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:opacity-90"
          >
            Retry
          </button>
        </div>
      )}
    </section>
  );
}
