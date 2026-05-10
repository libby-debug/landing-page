"use client";

import { useState } from "react";

export default function DRLPage() {
  const [selected, setSelected] = useState("");
  const correctAnswer = "DRL";

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Differential Reinforcement
        </p>

        <h1 className="mt-2 text-5xl font-extrabold text-slate-950">DRL</h1>

        <p className="mt-3 text-2xl font-bold text-orange-700">
          Differential Reinforcement of Low Rates
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
          In DRL, reinforcement is given when the behavior occurs at a lower rate than a set criterion.
        </p>

        <section className="mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            What gets reinforced?
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-red-500">
                Target Behavior
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Headbanging 50 times per day
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-orange-600">
                Reinforcement Criterion
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Fewer than 25 times per day
              </p>
            </div>
          </div>

          <p className="mt-6 rounded-2xl bg-white p-5 text-lg font-semibold text-slate-800">
            Reinforce when the behavior happens less often than the criterion.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            Remember This
          </h2>

          <p className="mt-4 rounded-2xl bg-orange-50 p-5 text-lg font-semibold text-orange-800">
            DRL does not require zero behavior. It reinforces a lower rate.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Quick Check</h2>

          <p className="mt-4 text-lg text-slate-700">
            Baseline shows a learner calls out 20 times per class. The learner earns reinforcement if they call out fewer than 8 times. What procedure is this?
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {["DRA", "DRO", "DRL", "DRH"].map((choice) => {
              const isCorrect = choice === correctAnswer;
              const isSelected = selected === choice;

              let buttonStyle =
                "rounded-xl border px-4 py-3 font-bold transition-all ";

              if (!selected) {
                buttonStyle +=
                  "bg-slate-50 text-slate-800 hover:bg-orange-50 hover:text-orange-700";
              } else if (isCorrect) {
                buttonStyle +=
                  "bg-green-100 border-green-400 text-green-700";
              } else if (isSelected) {
                buttonStyle +=
                  "bg-red-100 border-red-400 text-red-700";
              } else {
                buttonStyle +=
                  "bg-slate-100 text-slate-400";
              }

              return (
                <button
                  key={choice}
                  onClick={() => setSelected(choice)}
                  className={buttonStyle}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              {selected === correctAnswer ? (
                <>
                  <p className="text-xl font-bold text-green-700">Correct!</p>
                  <p className="mt-2 text-slate-700">
                    This is DRL because reinforcement is delivered for a lower rate of the behavior.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold text-red-700">Not quite.</p>
                  <p className="mt-2 text-slate-700">
                    The correct answer is DRL because the behavior can still occur, but only below the criterion.
                  </p>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
