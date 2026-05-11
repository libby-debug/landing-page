import { notFound } from "next/navigation";
import { DifferentialReinforcementQuiz } from "@/components/differential-reinforcement-quiz";
import { DiscriminationPractice } from "@/components/discrimination-practice";
import {
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
  getConfusionPairs,
  getLessonStep,
  getNextProcedureSlug,
  getProcedure,
  getProcedureLessonDetails,
  getStepHref,
  lessonSteps,
  masteryThreshold,
  tcoAlignment,
  type DifferentialReinforcementProcedure,
  type LessonScenario,
  type LessonStepSlug,
  type QuizQuestion,
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

      <LessonScreen
        procedure={procedure}
        stepSlug={step.slug}
        backHref={backHref}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    </PageShell>
  );
}

function LessonScreen({
  procedure,
  stepSlug,
  backHref,
  nextHref,
  nextLabel,
}: {
  procedure: DifferentialReinforcementProcedure;
  stepSlug: LessonStepSlug;
  backHref: string;
  nextHref?: string;
  nextLabel: string;
}) {
  const details = getProcedureLessonDetails(procedure);

  if (stepSlug === "visual-comparison") {
    return (
      <VisualComparison
        procedure={procedure}
        details={details}
        backHref={backHref}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    );
  }

  if (stepSlug === "discrimination-practice") {
    return (
      <DiscriminationLesson
        procedure={procedure}
        details={details}
        backHref={backHref}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    );
  }

  if (stepSlug === "examples") {
    return (
      <ExamplesLesson
        procedure={procedure}
        details={details}
        backHref={backHref}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    );
  }

  if (stepSlug === "common-confusions") {
    return (
      <CommonConfusionsLesson
        procedure={procedure}
        backHref={backHref}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    );
  }

  return <MasteryQuizLesson procedure={procedure} backHref={backHref} />;
}

function VisualComparison({
  procedure,
  details,
  backHref,
  nextHref,
  nextLabel,
}: {
  procedure: DifferentialReinforcementProcedure;
  details: ReturnType<typeof getProcedureLessonDetails>;
  backHref: string;
  nextHref?: string;
  nextLabel: string;
}) {
  return (
    <section className="mt-10 w-full">
      <p className={eyebrowClass}>Visual comparison</p>

      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
        What gets reinforced?
      </h2>

      <div className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <article className="rounded-3xl border border-pink-200 bg-pink-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
            {details.targetLabel}
          </p>
          <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">
            {details.targetBehavior}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-slate-950">
            This is the response dimension or response class being targeted for
            decrease or change.
          </p>
        </article>

        <div className="flex items-center justify-center">
          <div
            className={`rounded-full border ${procedure.border} ${procedure.bg} px-6 py-4 text-center shadow-sm`}
          >
            <div
              className={`text-5xl font-extrabold tracking-tight ${procedure.color}`}
            >
              {procedure.abbreviation}
            </div>
            <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-slate-950">
              Reinforcement rule
            </p>
          </div>
        </div>

        <article className={`${cardBaseClass} ${procedure.border} ${procedure.bg}`}>
          <p className={`text-sm font-semibold uppercase tracking-wide ${procedure.color}`}>
            {details.reinforcementLabel}
          </p>
          <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">
            {details.reinforcementCriterion}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-slate-950">
            {details.whatGetsReinforced}
          </p>
        </article>
      </div>

      <section className={`${cardBaseClass} mt-8 border-blue-200 bg-blue-50`}>
        <p className={eyebrowClass}>Procedure identity</p>
        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
          {procedure.name}
        </h3>
        <p className="mx-auto mt-4 max-w-4xl text-lg leading-relaxed text-slate-950">
          {procedure.rule}
        </p>
      </section>

      <div className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-3">
        {details.visualExamples.map((item) => (
          <ScenarioCard key={item.title} item={item} tone="blue" />
        ))}
      </div>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Compare across procedures</p>
        <div className="mx-auto mt-6 grid max-w-6xl justify-center gap-6 md:grid-cols-2 xl:grid-cols-5">
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
              <p className="mt-4 text-base leading-relaxed text-slate-950">
                {item.rule}
              </p>
            </article>
          ))}
        </div>
      </section>

      <DiscriminationPractice
        questions={getVisualCheckQuestions(procedure, details)}
        title="Visual comparison check"
        description="Pass this page check before moving forward."
        backHref={backHref}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    </section>
  );
}

function DiscriminationLesson({
  procedure,
  details,
  backHref,
  nextHref,
  nextLabel,
}: {
  procedure: DifferentialReinforcementProcedure;
  details: ReturnType<typeof getProcedureLessonDetails>;
  backHref: string;
  nextHref?: string;
  nextLabel: string;
}) {
  const practiceQuestions = getPracticeQuestions(procedure, details);

  return (
    <section className="mt-10 w-full">
      <p className={eyebrowClass}>Discrimination practice</p>

      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
        Discriminate {procedure.abbreviation} from DRA, DRI, DRO, DRL, and DRH
      </h2>

      <div className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className={`${cardBaseClass} ${procedure.border} ${procedure.bg}`}>
          <p className={`text-sm font-semibold uppercase tracking-wide ${procedure.color}`}>
            Decision rule
          </p>
          <p className="mt-4 text-xl font-extrabold tracking-tight text-slate-950">
            {procedure.discrimination}
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-950">
            Before answering, identify the contingency: what response, absence,
            low-rate criterion, or high-rate criterion contacts reinforcement?
          </p>
        </article>

        <article className={`${cardBaseClass} border-slate-200 bg-white`}>
          <p className={eyebrowClass}>Contrast map</p>
          <div className="mt-5 grid gap-3">
            {differentialReinforcementProcedures.map((item) => (
              <div
                key={item.slug}
                className={`rounded-2xl border p-4 ${item.border} ${item.bg}`}
              >
                <p className={`text-lg font-extrabold ${item.color}`}>
                  {item.abbreviation}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-950">
                  {item.rule}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <DiscriminationPractice
        questions={practiceQuestions}
        title="Discrimination practice check"
        description="Answer every discrimination item correctly. If one is incorrect, review the rationale and retry before advancing."
        backHref={backHref}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    </section>
  );
}

function ExamplesLesson({
  procedure,
  details,
  backHref,
  nextHref,
  nextLabel,
}: {
  procedure: DifferentialReinforcementProcedure;
  details: ReturnType<typeof getProcedureLessonDetails>;
  backHref: string;
  nextHref?: string;
  nextLabel: string;
}) {
  return (
    <section className="mt-10 w-full">
      <p className={eyebrowClass}>Examples and nonexamples</p>

      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
        Build fluency with {procedure.abbreviation}
      </h2>

      <div className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-2">
        <section className={`${cardBaseClass} border-green-200 bg-green-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Correct examples
          </p>
          <div className="mt-6 grid gap-4">
            {details.examples.map((item) => (
              <ScenarioCard key={item.title} item={item} tone="green" />
            ))}
          </div>
        </section>

        <section className={`${cardBaseClass} border-pink-200 bg-pink-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-pink-700">
            Nonexamples
          </p>
          <div className="mt-6 grid gap-4">
            {details.nonexamples.map((item) => (
              <ScenarioCard key={item.title} item={item} tone="pink" />
            ))}
          </div>
        </section>
      </div>

      <section className={`${cardBaseClass} mt-8 ${procedure.border} ${procedure.bg}`}>
        <p className={`text-sm font-semibold uppercase tracking-wide ${procedure.color}`}>
          Why this matters
        </p>
        <p className="mx-auto mt-4 max-w-4xl text-lg leading-relaxed text-slate-950">
          Differential reinforcement labels are controlled by the contingency,
          not by how the scenario sounds. Look for what contacts reinforcement:
          an alternative response, an incompatible response, absence, lower
          rate, or higher rate.
        </p>
      </section>

      <DiscriminationPractice
        questions={getExampleCheckQuestions(procedure, details)}
        title="Examples and nonexamples check"
        description="Classify examples and nonexamples correctly before moving to the confusion checks."
        backHref={backHref}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    </section>
  );
}

function CommonConfusionsLesson({
  procedure,
  backHref,
  nextHref,
  nextLabel,
}: {
  procedure: DifferentialReinforcementProcedure;
  backHref: string;
  nextHref?: string;
  nextLabel: string;
}) {
  const confusionPairs = getConfusionPairs(procedure);
  const miniChecks = confusionPairs.map((pair): QuizQuestion => ({
    prompt: pair.checkPrompt,
    options: [
      pair.checkAnswer,
      "Only identify the behavior topography",
      "Assume any reinforcement procedure is DRA",
      "Use DRO whenever behavior decreases",
    ],
    answer: pair.checkAnswer,
    rationale: pair.rationale,
  }));

  return (
    <section className="mt-10 w-full">
      <p className={eyebrowClass}>Common confusions</p>

      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
        Protect the technical distinction
      </h2>

      <div className="mx-auto mt-6 grid max-w-6xl gap-6">
        {confusionPairs.map((pair) => (
          <article
            key={pair.title}
            className={`${cardBaseClass} border-purple-200 bg-white`}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
              {pair.title}
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <h3 className="text-2xl font-extrabold tracking-tight text-blue-700">
                  {pair.leftLabel}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-950">
                  {pair.leftText}
                </p>
              </div>
              <div className="rounded-2xl border border-pink-200 bg-pink-50 p-5">
                <h3 className="text-2xl font-extrabold tracking-tight text-pink-700">
                  {pair.rightLabel}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-950">
                  {pair.rightText}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-10">
        <p className={eyebrowClass}>Mini checks</p>
        <DiscriminationPractice
          questions={miniChecks}
          title="Common confusions check"
          description="Pass the common-confusion checks before moving forward."
          backHref={backHref}
          nextHref={nextHref}
          nextLabel={nextLabel}
        />
      </section>
    </section>
  );
}

function MasteryQuizLesson({
  procedure,
  backHref,
}: {
  procedure: DifferentialReinforcementProcedure;
  backHref: string;
}) {
  const details = getProcedureLessonDetails(procedure);
  const masteryQuestions = getPracticeQuestions(procedure, details);
  const nextProcedureSlug = getNextProcedureSlug(procedure.slug);
  const nextHref = nextProcedureSlug
    ? getStepHref(nextProcedureSlug, "visual-comparison")
    : "/dashboard";

  return (
    <section className="mt-10 w-full">
      <p className={eyebrowClass}>Mastery quiz</p>

      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
        Score {masteryThreshold}% or higher to master {procedure.abbreviation}
      </h2>

      <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-slate-950">
        The quiz appears at the end of the lesson sequence so users review the
        visual comparison, discrimination practice, examples, and common
        confusions before attempting mastery.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {tcoAlignment.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-slate-950"
          >
            {item}
          </div>
        ))}
      </div>

      <DifferentialReinforcementQuiz
        procedure={procedure}
        questions={masteryQuestions}
        nextHref={nextHref}
        reviewHref={getStepHref(procedure.slug, "visual-comparison")}
        backHref={backHref}
      />
    </section>
  );
}

function ScenarioCard({
  item,
  tone,
}: {
  item: LessonScenario;
  tone: "blue" | "green" | "pink";
}) {
  const toneClass = {
    blue: "border-blue-200 bg-white",
    green: "border-green-200 bg-white",
    pink: "border-pink-200 bg-white",
  };
  const textClass = {
    blue: "text-blue-700",
    green: "text-green-700",
    pink: "text-pink-700",
  };

  return (
    <article className={`rounded-2xl border p-5 shadow-sm ${toneClass[tone]}`}>
      <h3 className={`text-xl font-extrabold tracking-tight ${textClass[tone]}`}>
        {item.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-slate-950">
        {item.scenario}
      </p>
      <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-relaxed text-slate-950">
        {item.why}
      </p>
    </article>
  );
}

function getVisualCheckQuestions(
  procedure: DifferentialReinforcementProcedure,
  details: ReturnType<typeof getProcedureLessonDetails>,
): QuizQuestion[] {
  return [
    {
      prompt: `In ${procedure.abbreviation}, what gets reinforced?`,
      options: [
        details.whatGetsReinforced,
        details.targetBehavior,
        "Any behavior that happens after reinforcement",
        "Only behavior topography, regardless of contingency",
      ],
      answer: details.whatGetsReinforced,
      rationale: details.whatGetsReinforced,
    },
    {
      prompt: details.visualExamples[0].scenario,
      options: ["DRA", "DRI", "DRO", "DRL", "DRH"],
      answer: procedure.abbreviation,
      rationale: details.visualExamples[0].why,
    },
  ];
}

function getExampleCheckQuestions(
  procedure: DifferentialReinforcementProcedure,
  details: ReturnType<typeof getProcedureLessonDetails>,
): QuizQuestion[] {
  return [
    {
      prompt: `${details.examples[1].scenario} Is this a correct example of ${procedure.abbreviation}?`,
      options: [
        `Yes, this is ${procedure.abbreviation}`,
        "No, this is a nonexample",
        "Only if no reinforcement is delivered",
        "Only if the target behavior increases",
      ],
      answer: `Yes, this is ${procedure.abbreviation}`,
      rationale: details.examples[1].why,
    },
    {
      prompt: `${details.nonexamples[0].scenario} Is this a correct example of ${procedure.abbreviation}?`,
      options: [
        `Yes, this is ${procedure.abbreviation}`,
        "No, this is a nonexample",
        "Only if the learner chooses it",
        "Only if the interval is short",
      ],
      answer: "No, this is a nonexample",
      rationale: details.nonexamples[0].why,
    },
    {
      prompt: `${details.nonexamples[1].scenario} Is this a correct example of ${procedure.abbreviation}?`,
      options: [
        `Yes, this is ${procedure.abbreviation}`,
        "No, this is a nonexample",
        "Only if it happens during baseline",
        "Only if the reinforcer is edible",
      ],
      answer: "No, this is a nonexample",
      rationale: details.nonexamples[1].why,
    },
  ];
}

function getPracticeQuestions(
  procedure: DifferentialReinforcementProcedure,
  details: ReturnType<typeof getProcedureLessonDetails>,
): QuizQuestion[] {
  return [
    {
      prompt: details.examples[0].scenario,
      options: ["DRA", "DRI", "DRO", "DRL", "DRH"],
      answer: procedure.abbreviation,
      rationale: details.examples[0].why,
    },
    ...procedure.quiz,
    {
      prompt:
        "A learner earns reinforcement when the target behavior does not occur for the full interval. Which procedure is most precise?",
      options: ["DRA", "DRI", "DRO", "DRL", "DRH"],
      answer: "DRO",
      rationale:
        "DRO reinforces the absence of the target behavior during a specified interval.",
    },
    {
      prompt:
        "A learner earns reinforcement for a behavior that cannot happen at the same time as the target behavior. Which procedure is most precise?",
      options: ["DRA", "DRI", "DRO", "DRL", "DRH"],
      answer: "DRI",
      rationale:
        "DRI reinforces an incompatible behavior that cannot occur simultaneously with the target behavior.",
    },
    {
      prompt:
        "A learner earns reinforcement for responding above a specified rate criterion. Which procedure is most precise?",
      options: ["DRA", "DRI", "DRO", "DRL", "DRH"],
      answer: "DRH",
      rationale:
        "DRH reinforces higher rates of behavior when increasing response frequency is the goal.",
    },
  ];
}
