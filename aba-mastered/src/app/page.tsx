import Link from "next/link";
import { cardBaseClass, gradientTextClass } from "@/components/learning-ui";

const cards = [
  {
    term: "Learn",
    definition:
      "Build your ABA vocabulary and understand the material with visual concept breakdowns.",
    href: "/signup",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    action: "Sign up",
  },
  {
    term: "Compare",
    definition:
      "Discriminate between confusing terms like DRO vs. DRA without rote memorization.",
    href: "/how-it-works",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    action: "How it works",
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
    <main className="relative -mt-44 flex min-h-[calc(100vh-18rem)] items-start justify-center bg-white px-8 pb-24 pt-0 sm:-mt-52 sm:pb-28">
      <div className="relative z-20 mx-auto flex max-w-6xl flex-col items-center text-center">
        <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-slate-950">
          <span>Stop memorizing. </span>
          <span className={gradientTextClass}>
            Start comprehending.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
          <strong>ABA Mastered</strong> helps BCBA candidates learn,
          comprehend, and understand Applied Behavior Analysis concepts through
          visual learning, concept comparisons, quizzes, mastery tracking, and
          focused practice.
        </p>

        <div className="mt-10 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.term}
              className={`${cardBaseClass} ${card.bg} ${card.border}`}
            >
              <div
                className={`text-6xl font-extrabold tracking-tight ${card.color}`}
              >
                {card.term}
              </div>

              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {card.definition}
              </p>

              <div className="mt-6 flex justify-center">
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
