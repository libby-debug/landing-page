import Link from "next/link";

const cards = [
  {
    term: "DRA",
    definition: "Reinforce an alternative behavior.",
    href: "/modules/differential-reinforcement/dra",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    term: "DRI",
    definition: "Reinforce an incompatible behavior.",
    href: "/modules/differential-reinforcement/dri",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    term: "DRO",
    definition: "Reinforce the absence of the target behavior.",
    href: "/modules/differential-reinforcement/dro",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    term: "DRL",
    definition: "Reinforce lower rates of behavior.",
    href: "/modules/differential-reinforcement/drl",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    term: "DRH",
    definition: "Reinforce higher rates of behavior.",
    href: "/modules/differential-reinforcement/drh",
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
];

export default function DifferentialReinforcementPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          G. Behavior-Change Procedures
        </p>

        <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-slate-950">
          Differential Reinforcement
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
          Learn to distinguish DRA, DRI, DRO, DRL, and DRH by identifying
          exactly what behavior is reinforced.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.term}
              className={`rounded-3xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${card.bg} ${card.border}`}
            >
              <div className={`text-6xl font-extrabold tracking-tight ${card.color}`}>
                {card.term}
              </div>

              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {card.definition}
              </p>

              <div className="mt-6">
                <Link
                  href={card.href}
                  className="inline-block rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Start Lesson
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
