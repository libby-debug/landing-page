import Link from "next/link";
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
  getStepHref,
  lessonSteps,
  masteryThreshold,
  moduleConfusions,
  tcoAlignment,
} from "@/lib/modules/differential-reinforcement";

export default function DifferentialReinforcementModulePage() {
  return (
    <PageShell maxWidth="6xl">
      <p className={eyebrowClass}>TCO 6 G.1-G.4 Behavior-Change Procedures</p>

      <h1 className={pageTitleClass}>
        Differential <span className={gradientTextClass}>Reinforcement</span>
      </h1>

      <p className={leadClass}>
        Compare DRA, DRO, DRI, DRL, and DRH using examples, nonexamples,
        common confusions, and mastery checks aligned to behavior-change
        procedures.
      </p>

      <section className="mt-10 grid w-full gap-6 md:grid-cols-3">
        <div className={`${cardBaseClass} border-blue-200 bg-blue-50`}>
          <p className={eyebrowClass}>Mastery threshold</p>

          <div
            className={`mt-4 text-6xl font-extrabold tracking-tight ${gradientTextClass}`}
          >
            {masteryThreshold}%
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-950">
            Mastery is reached when quiz and scenario performance is 90% or
            higher.
          </p>
        </div>

        <div className={`${cardBaseClass} border-purple-200 bg-purple-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Lesson screens
          </p>

          <div className="mt-4 text-6xl font-extrabold tracking-tight text-purple-600">
            {lessonSteps.length}
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-950">
            Users move screen-by-screen before the mastery quiz appears.
          </p>
        </div>

        <div className={`${cardBaseClass} border-pink-200 bg-pink-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
            Procedures
          </p>

          <div className="mt-4 text-6xl font-extrabold tracking-tight text-pink-600">
            {differentialReinforcementProcedures.length}
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-950">
            DRA, DRO, DRI, DRL, and DRH are prepared for Supabase mastery
            tracking.
          </p>
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Choose a lesson</p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          Start with a visual comparison
        </h2>

        <div className="mt-10 grid gap-6 justify-items-center md:grid-cols-3">
          {getOverviewProcedures(["dra", "dro", "dri", "drl", "drh"]).map(
            (procedure) => (
              <ProcedureCard
                key={procedure.slug}
                procedure={procedure}
                className={getOverviewPlacementClass(procedure.slug)}
              />
            ),
          )}
        </div>
      </section>

      <section className={`${cardBaseClass} mt-10 w-full border-blue-200 bg-white`}>
        <p className={eyebrowClass}>Lesson flow</p>

        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {lessonSteps.map((step, index) => (
            <div
              key={step.slug}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-950">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-extrabold tracking-tight text-slate-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-950">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid w-full gap-6 lg:grid-cols-[1fr_1fr]">
        <div className={`${cardBaseClass} border-purple-200 bg-purple-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Common confusions
          </p>

          <div className="mt-6 grid gap-4">
            {moduleConfusions.map((confusion) => (
              <div
                key={confusion.title}
                className="rounded-2xl border border-white/80 bg-white p-4"
              >
                <h3 className="text-lg font-extrabold tracking-tight text-slate-950">
                  {confusion.title}
                </h3>

                <p className="mt-2 text-base leading-relaxed text-slate-950">
                  {confusion.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${cardBaseClass} border-blue-200 bg-blue-50`}>
          <p className={eyebrowClass}>TCO 6 alignment</p>

          <div className="mt-6 grid gap-3">
            {tcoAlignment.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/80 bg-white p-4 text-base font-semibold text-slate-950"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ProcedureCard({
  procedure,
  className = "",
}: {
  procedure: (typeof differentialReinforcementProcedures)[number];
  className?: string;
}) {
  return (
    <article
      className={`${cardBaseClass} ${procedure.border} ${procedure.bg} ${className} mx-auto flex h-full w-full max-w-sm flex-col items-center text-center`}
    >
      <div
        className={`text-5xl font-extrabold tracking-tight ${procedure.color}`}
      >
        {procedure.abbreviation}
      </div>

      <h3 className="mt-4 text-xl font-extrabold tracking-tight text-slate-950">
        {procedure.name}
      </h3>

      <p className="mt-4 text-base leading-relaxed text-slate-950">
        {procedure.rule}
      </p>

      <div className="mt-auto flex justify-center pt-6">
        <Link
          href={getStepHref(procedure.slug, "visual-comparison")}
          className="inline-block rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Start Lesson
        </Link>
      </div>
    </article>
  );
}

function getOverviewPlacementClass(slug: string) {
  const placement = {
    dra: "md:col-start-1 md:row-start-1",
    dro: "md:col-start-3 md:row-start-1",
    dri: "md:col-start-1 md:row-start-2",
    drl: "md:col-start-3 md:row-start-2",
    drh: "md:col-start-2 md:row-start-3",
  };

  return placement[slug as keyof typeof placement] ?? "";
}

function getOverviewProcedures(slugs: string[]) {
  return slugs
    .map((slug) =>
      differentialReinforcementProcedures.find(
        (procedure) => procedure.slug === slug,
      ),
    )
    .filter(
      (procedure): procedure is (typeof differentialReinforcementProcedures)[number] =>
        Boolean(procedure),
    );
}
