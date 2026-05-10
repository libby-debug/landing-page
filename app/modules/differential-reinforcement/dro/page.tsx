"use client";

import { useState } from "react";

export default function DROPage() {
  const [selected, setSelected] = useState("");
  const correctAnswer = "DRO";

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
          Differential Reinforcement
        </p>

        <h1 className="mt-2 text-5xl font-extrabold text-slate-950">DRO</h1>

        <p className="mt-3 text-2xl font-bold text-green-700">
          Differential Reinforcement of Other Behavior
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
          In DRO, reinforcement is given when the target behavior does NOT occur during a specific time interval.
        </p>

        <section className="mt-10 rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            What gets reinforced?
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-red-500">
                Target Behavior
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Property destruction
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-green-600">
                Reinforcement Requirement
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Zero instances during the interval
              </p>
            </div>
          </div>

          <p className="mt-6 rounded-2xl bg-white p-5 text-lg font-semibold text-slate-800">
            Reinforce the absence of the target behavior.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            Important Warning
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            DRO can reduce the target behavior, but it does not automatically teach a replacement behavior.
          </p>

          <p className="mt-4 rounded-2xl bg-yellow-50 p-5 font-semibold text-yellow-800">
            Strong DRO programs often pair DRO with teaching an appropriate alternative behavior.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Quick Check</h2>

          <p className="mt-4 text-lg text-slate-700">
            A student receives a preferred snack if no property destruction occurs during a 30-minute interval. What procedure is this?
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {["DRA", "DRI", "DRO", "DRL"].map((choice) => {
              const isCorrect = choice === correctAnswer;
              const isSelected = selected === choice;

              let buttonStyle =
                "rounded-xl border px-4 py-3 font-bold transition-all ";

              if (!selected) {
                buttonStyle +=
                  "bg-slate-50 text-slate-800 hover:bg-green-50 hover:text-green-700";
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
                    This is DRO because reinforcement is based on the absence of the target behavior.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold text-red-700">Not quite.</p>
                  <p className="mt-2 text-slate-700">
                    The correct answer is DRO because the learner earns reinforcement only if the target behavior does not occur.
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
