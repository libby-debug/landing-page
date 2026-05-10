import Link from "next/link";

const cards = [
  {
    term: "Learn",
    definition: "Build real comprehension with visual ABA concept breakdowns.",
    href: "/signup",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    action: "Start Learning",
  },
  {
    term: "Compare",
    definition:
      "Discriminate confusing terms like DRO vs. DRA without rote memorization.",
    href: "/login",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    action: "Log In",
  },
  {
    term: "Master",
    definition:
      "Track practice, quizzes, and weak areas as you prepare for the BCBA exam.",
    href: "/dashboard",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    action: "Open Dashboard",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          ABA Mastered
        </p>

        <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-slate-950">
          Stop memorizing. Start mastering.
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
          ABA Mastered helps BCBA candidates learn, comprehend, and understand
          Applied Behavior Analysis concepts through visual learning, concept
          comparisons, quizzes, mastery tracking, and focused practice.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.term}
              className={`rounded-3xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${card.bg} ${card.border}`}
            >
              <div
                className={`text-6xl font-extrabold tracking-tight ${card.color}`}
              >
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
                  {card.action}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
