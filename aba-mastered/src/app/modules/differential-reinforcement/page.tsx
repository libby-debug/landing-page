import {
  PageShell,
  cardBaseClass,
  eyebrowClass,
  gradientTextClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";

const masteryThreshold = 90;

const procedures = [
  {
    abbreviation: "DRA",
    name: "Differential Reinforcement of Alternative Behavior",
    rule: "Reinforce an alternative behavior that serves the same function as the behavior targeted for decrease.",
    example:
      "Reinforce requesting a break instead of engaging in escape-maintained problem behavior.",
    nonexample:
      "Reinforcing any quiet behavior without confirming that it is an alternative response for the same function.",
    confusion:
      "DRA is commonly confused with DRI. DRA requires an alternative behavior; DRI requires an incompatible behavior.",
    color: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
  {
    abbreviation: "DRO",
    name: "Differential Reinforcement of Other Behavior",
    rule: "Reinforce the absence of the target behavior during a specified interval.",
    example:
      "Deliver reinforcement when aggression does not occur for a 5-minute interval.",
    nonexample:
      "Reinforcing a specific replacement response; that arrangement is DRA, not DRO.",
    confusion:
      "DRO does not teach a specific alternative response unless another teaching procedure is added.",
    color: "text-purple-600",
    border: "border-purple-200",
    bg: "bg-purple-50",
  },
  {
    abbreviation: "DRI",
    name: "Differential Reinforcement of Incompatible Behavior",
    rule: "Reinforce a behavior that cannot occur at the same time as the behavior targeted for decrease.",
    example:
      "Reinforce hands folded on the desk when hand-flapping is the behavior targeted for decrease.",
    nonexample:
      "Reinforcing a behavior that can occur at the same time as the target behavior.",
    confusion:
      "DRI is a subtype of DRA when the alternative response is physically incompatible with the target behavior.",
    color: "text-pink-600",
    border: "border-pink-200",
    bg: "bg-pink-50",
  },
  {
    abbreviation: "DRL",
    name: "Differential Reinforcement of Low Rates of Behavior",
    rule: "Reinforce lower rates of a behavior when the behavior is acceptable at reduced frequency.",
    example:
      "Reinforce raising a hand three or fewer times during a 20-minute lesson.",
    nonexample:
      "Reinforcing zero instances of the behavior; that is closer to DRO than DRL.",
    confusion:
      "DRL is not used when the behavior must be eliminated completely.",
    color: "text-green-600",
    border: "border-green-200",
    bg: "bg-green-50",
  },
  {
    abbreviation: "DRH",
    name: "Differential Reinforcement of High Rates of Behavior",
    rule: "Reinforce higher rates of a behavior when increasing response frequency is the goal.",
    example:
      "Reinforce completing at least 20 math facts during a 5-minute timing.",
    nonexample:
      "Reinforcing fewer responses than baseline; that is not DRH.",
    confusion:
      "DRH increases behavior. DRL decreases response rate without requiring zero responding.",
    color: "text-orange-600",
    border: "border-orange-200",
    bg: "bg-orange-50",
  },
];

const tcoAlignment = [
  "G.1 Reinforcement procedures",
  "G.2 Differential reinforcement procedures with and without extinction",
  "G.3 Time-based reinforcement schedules",
  "G.4 Conditioned reinforcers",
];

const commonConfusions = [
  {
    title: "DRA vs. DRI",
    text: "DRA reinforces an alternative behavior. DRI reinforces an incompatible behavior that cannot occur simultaneously with the target behavior.",
  },
  {
    title: "DRO vs. DRA",
    text: "DRO reinforces the absence of the target behavior. DRA reinforces a specific alternative response.",
  },
  {
    title: "DRL vs. DRO",
    text: "DRL reduces the rate of a behavior. DRO reinforces intervals with zero occurrences of the target behavior.",
  },
  {
    title: "DRH vs. DRL",
    text: "DRH increases response rate. DRL decreases response rate while allowing the behavior to continue at an acceptable level.",
  },
];

const quizPlaceholders = [
  "Identify DRA, DRO, DRI, DRL, or DRH from a scenario.",
  "Select the best differential reinforcement procedure for a target behavior.",
  "Discriminate examples from nonexamples.",
  "Explain whether extinction is included in the procedure.",
];

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

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Mastery is reached when quiz and scenario performance is 90% or
            higher.
          </p>
        </div>

        <div className={`${cardBaseClass} border-purple-200 bg-purple-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Procedures
          </p>

          <div className="mt-4 text-6xl font-extrabold tracking-tight text-purple-600">
            5
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            DRA, DRO, DRI, DRL, and DRH are compared side by side.
          </p>
        </div>

        <div className={`${cardBaseClass} border-pink-200 bg-pink-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
            Quiz status
          </p>

          <div className="mt-4 text-6xl font-extrabold tracking-tight text-pink-600">
            0%
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Placeholder progress is ready for Supabase mastery tracking.
          </p>
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Visual comparison</p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          What gets reinforced?
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {procedures.map((procedure) => (
            <article
              key={procedure.abbreviation}
              className={`${cardBaseClass} ${procedure.border} ${procedure.bg}`}
            >
              <div
                className={`text-5xl font-extrabold tracking-tight ${procedure.color}`}
              >
                {procedure.abbreviation}
              </div>

              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-slate-950">
                {procedure.name}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {procedure.rule}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Examples and nonexamples</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {procedures.map((procedure) => (
            <article
              key={`${procedure.abbreviation}-examples`}
              className={`${cardBaseClass} border-blue-200 bg-white`}
            >
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
          ))}
        </div>
      </section>

      <section className="mt-10 grid w-full gap-6 lg:grid-cols-[1fr_1fr]">
        <div className={`${cardBaseClass} border-purple-200 bg-purple-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Common confusions
          </p>

          <div className="mt-6 grid gap-4">
            {commonConfusions.map((confusion) => (
              <div
                key={confusion.title}
                className="rounded-2xl border border-white/80 bg-white p-4"
              >
                <h3 className="text-lg font-extrabold tracking-tight text-slate-950">
                  {confusion.title}
                </h3>

                <p className="mt-2 text-base leading-relaxed text-slate-700">
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
                className="rounded-2xl border border-white/80 bg-white p-4 text-base font-semibold text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${cardBaseClass} mt-10 w-full border-pink-200 bg-white`}>
        <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
          Quiz placeholders
        </p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          Mastery checks
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {quizPlaceholders.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Quiz placeholder {index + 1}
              </p>

              <p className="mt-2 text-base leading-relaxed text-slate-700">
                {item}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          disabled
          className="mt-6 inline-block rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-400"
        >
          Quiz coming soon
        </button>
      </section>
    </PageShell>
  );
}
