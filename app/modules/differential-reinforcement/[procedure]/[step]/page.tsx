import { notFound } from "next/navigation";
import { DifferentialReinforcementQuiz } from "@/components/differential-reinforcement-quiz";
import {
  LessonNavigation,
  LessonStepTracker,
  ProgressIndicator,
} from "@/components/lesson-flow-navigation";
import {
  PageShell,
  cardBaseClass,
  eyebrowClass,
  gradientTextClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";
import {
  differentialReinforcementProcedures,
  getLessonStep,
  getProcedure,
  getStepHref,
  lessonSteps,
  masteryThreshold,
  moduleConfusions,
  tcoAlignment,
  type LessonStepSlug,
} from "@/lib/modules/differential-reinforcement";

type LessonPageProps = {
  params: Promise<{
    procedure: string;
    step: string;
  }>;
};

export function generateStaticParams() {
  return differentialReinforcementProcedures.flatMap((procedure) =>
    lessonSteps.map((step) => ({
      procedure: procedure.slug,
      step: step.slug,
    })),
  );
}

export default async function DifferentialReinforcementLessonPage({
  params,
}: LessonPageProps) {
  const { procedure: procedureSlug, step: stepSlug } = await params;
  const procedure = getProcedure(procedureSlug);
  const step = getLessonStep(stepSlug);

  if (!procedure || !step) {
    notFound();
  }

  const stepIndex = lessonSteps.findIndex((item) => item.slug === step.slug);
  const previousStep = lessonSteps[stepIndex - 1];
  const nextStep = lessonSteps[stepIndex + 1];
  const backHref = previousStep
    ? getStepHref(procedure.slug, previousStep.slug)
    : "/modules/differential-reinforcement";
  const nextHref = nextStep ? getStepHref(procedure.slug, nextStep.slug) : undefined;
  const nextLabel = nextStep?.slug === "mastery-quiz" ? "Start Mastery Quiz" : "Next Lesson";

  return (
    <PageShell maxWidth="6xl">
      <p className={eyebrowClass}>TCO 6 G.1-G.4 Behavior-Change Procedures</p>

      <h1 className={pageTitleClass}>
        {procedure.abbreviation}:{" "}
        <span className={gradientTextClass}>{step.title}</span>
      </h1>

      <p className={leadClass}>
        {procedure.name}. {step.description}
      </p>

      <section className={`${cardBaseClass} mt-8 w-full border-blue-200 bg-white`}>
        <ProgressIndicator current={stepIndex + 1} total={lessonSteps.length} />
        <LessonStepTracker
          steps={lessonSteps}
          currentStepSlug={step.slug}
          procedureSlug={procedure.slug}
        />
      </section>

      <LessonScreen procedureSlug={procedure.slug} stepSlug={step.slug} />

      {step.slug !== "mastery-quiz" ? (
        <LessonNavigation
          backHref={backHref}
          nextHref={nextHref}
          nextLabel={nextLabel}
        />
      ) : (
        <LessonNavigation backHref={backHref} />
      )}
    </PageShell>
  );
}

function LessonScreen({
  procedureSlug,
  stepSlug,
}: {
  procedureSlug: string;
  stepSlug: LessonStepSlug;
}) {
  const procedure = getProcedure(procedureSlug);

  if (!procedure) {
    notFound();
  }

  if (stepSlug === "visual-comparison") {
    return (
      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Visual comparison</p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          What gets reinforced?
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article
            className={`${cardBaseClass} ${procedure.border} ${procedure.bg}`}
          >
            <div
              className={`text-6xl font-extrabold tracking-tight ${procedure.color}`}
            >
              {procedure.abbreviation}
            </div>

            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950">
              {procedure.name}
            </h3>

            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              {procedure.rule}
            </p>
          </article>

          <aside className={`${cardBaseClass} border-purple-200 bg-purple-50`}>
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
              Mastery gate
            </p>
            <div
              className={`mt-4 text-6xl font-extrabold tracking-tight ${gradientTextClass}`}
            >
              {masteryThreshold}%
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              The mastery quiz appears only after the comparison, discrimination,
              examples, and common confusions screens.
            </p>
          </aside>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {differentialReinforcementProcedures.map((item) => (
            <article
              key={item.abbreviation}
              className={`${cardBaseClass} ${item.border} ${item.bg}`}
            >
              <div
                className={`text-5xl font-extrabold tracking-tight ${item.color}`}
              >
                {item.abbreviation}
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {item.rule}
              </p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (stepSlug === "discrimination-practice") {
    const relatedProcedures = differentialReinforcementProcedures.filter(
      (item) => item.slug !== procedure.slug,
    );

    return (
      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Discrimination practice</p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          Discriminate {procedure.abbreviation} from related procedures
        </h2>

        <article className={`${cardBaseClass} mt-6 border-blue-200 bg-blue-50`}>
          <p className="text-xl font-extrabold tracking-tight text-slate-950">
            Decision rule
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            {procedure.discrimination}
          </p>
        </article>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {relatedProcedures.map((item) => (
            <article
              key={item.slug}
              className={`${cardBaseClass} ${item.border} bg-white`}
            >
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                {procedure.abbreviation} vs. {item.abbreviation}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {procedure.abbreviation}: {procedure.rule}
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                {item.abbreviation}: {item.rule}
              </p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (stepSlug === "examples") {
    return (
      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Examples and nonexamples</p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          See {procedure.abbreviation} in context
        </h2>

        <article className={`${cardBaseClass} mt-6 border-blue-200 bg-white`}>
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
            {procedure.abbreviation}: {procedure.name}
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
                Example
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-700">
                {procedure.example}
              </p>
            </div>

            <div className="rounded-2xl border border-pink-200 bg-pink-50 p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
                Nonexample
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-700">
                {procedure.nonexample}
              </p>
            </div>
          </div>
        </article>
      </section>
    );
  }

  if (stepSlug === "common-confusions") {
    return (
      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Common confusions</p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          Protect the technical distinction
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article
            className={`${cardBaseClass} ${procedure.border} ${procedure.bg}`}
          >
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
              {procedure.abbreviation} confusion
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {procedure.confusion}
            </p>
          </article>

          <div className="grid gap-4">
            {moduleConfusions.map((confusion) => (
              <article
                key={confusion.title}
                className="rounded-2xl border border-purple-200 bg-purple-50 p-4"
              >
                <h3 className="text-lg font-extrabold tracking-tight text-slate-950">
                  {confusion.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  {confusion.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 w-full">
      <p className={eyebrowClass}>Mastery quiz</p>

      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
        Score {masteryThreshold}% or higher to master {procedure.abbreviation}
      </h2>

      <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
        The quiz appears at the end of the lesson sequence so users review the
        visual comparison, discrimination practice, examples, and common
        confusions before attempting mastery.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {tcoAlignment.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-slate-700"
          >
            {item}
          </div>
        ))}
      </div>

      <DifferentialReinforcementQuiz procedure={procedure} />
    </section>
  );
}
