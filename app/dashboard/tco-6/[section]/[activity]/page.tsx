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
  getTcoSection,
  tcoSections,
  type TcoSection,
} from "../../data";
import { getMiniLessons } from "../../mini-lesson-data";
import { MiniLessonView } from "../../mini-lesson-ui";
import { getModuleContent } from "../../module-content";
import {
  MasteryCheckQuiz,
  PracticeCompletionButton,
  PracticeQuestionCard,
} from "../../question-interactions";
import {
  ActivityGate,
  ActivityProgressNav,
  CompleteLearnLink,
  SaveProgressButton,
  type ActivitySlug,
} from "../../progression";

const activities = ["learn", "practice", "mastery-check"] as const;

type TcoActivityPageProps = {
  params: Promise<{
    section: string;
    activity: string;
  }>;
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
      <SaveProgressButton
        activity="learn"
        currentLocation={`/dashboard/tco-6/${section.slug}/learn`}
        sectionSlug={section.slug}
        totalQuestions={section.checklistItems.length}
      />
      <div className="mt-6 grid gap-5">
        {section.checklistItems.map((item, index) => (
          <article
            id={`lesson-${index + 1}`}
            key={`${index}-${item}`}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-sm font-black uppercase tracking-wide text-blue-600">
              Lesson {index + 1}
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-950">
              {item}
            </h3>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-950">
              Learning content is not available for this topic right now. Return
              to the module dashboard or choose another activity while this
              lesson refreshes.
            </p>
          </article>
        ))}
      </div>
      <CompleteLearnLink sectionSlug={section.slug} />
    </section>
  );
}

function PracticeView({ section }: { section: TcoSection }) {
  const practiceQuestions = getModuleContent(section.slug).practiceQuestions;

  return (
    <section className={`${cardBaseClass} mt-8 w-full border-white/70 bg-white/95 text-center shadow-xl shadow-slate-900/10`}>
      <p className={eyebrowClass}>Interactive Practice</p>

      <h2 className={sectionTitleClass}>
        Module {section.code}: Interactive Practice Test
      </h2>

      <p className="mx-auto mt-3 max-w-2xl rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-black text-blue-700">
        Practice completion requires 100% correct.
      </p>

      <SaveProgressButton
        activity="practice"
        currentLocation={`/dashboard/tco-6/${section.slug}/practice`}
        sectionSlug={section.slug}
        storageKeys={{
          results: `aba-mastered:tco6:${section.slug}:practice-results`,
          selectedAnswers: `aba-mastered:tco6:${section.slug}:practice-answers`,
        }}
        totalQuestions={practiceQuestions.length}
      />

      <div className="mt-6 grid gap-6">
        {practiceQuestions.map((question, index) => (
          <PracticeQuestionCard
            index={index}
            key={question.prompt}
            mode="practice"
            question={question}
            sectionSlug={section.slug}
            totalQuestions={practiceQuestions.length}
          />
        ))}
      </div>

      <PracticeCompletionButton
        sectionSlug={section.slug}
        totalQuestions={practiceQuestions.length}
      />
    </section>
  );
}

function MasteryCheckView({ section }: { section: TcoSection }) {
  const masteryQuestions = getModuleContent(section.slug).masteryQuestions;
  const masteryHeading = `Module ${section.code}: Mastery Check`;

  return (
    <section className={`${cardBaseClass} mt-8 w-full border-white/70 bg-white/95 text-center shadow-xl shadow-slate-900/10`}>
      <p className={eyebrowClass}>Mastery check</p>

      <h2 className={sectionTitleClass}>
        {masteryHeading}
      </h2>

      <MasteryCheckQuiz
        questions={masteryQuestions}
        sectionCode={section.code}
        sectionSlug={section.slug}
      />
    </section>
  );
}
