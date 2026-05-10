"use client";

import { useState } from "react";

export default function DRIPage() {
  const [selected, setSelected] = useState("");
  const correctAnswer = "DRI";

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
          Differential Reinforcement
        </p>

        <h1 className="mt-2 text-5xl font-extrabold text-slate-950">DRI</h1>

        <p className="mt-3 text-2xl font-bold text-purple-700">
          Differential Reinforcement of an Incompatible Behavior
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
          In DRI, reinforcement is given when the learner uses a behavior that
          physically cannot happen at the same time as the target behavior.
        </p>

        <section className="mt-10 rounded-3xl border border-purple-200 bg-purple-50 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            What gets reinforced?
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-red-500">
                Target Behavior
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Touching walls in the hallway
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-purple-600">
                Incompatible Behavior
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Keeping hands in pockets
              </p>
            </div>
          </div>

          <p className="mt-6 rounded-2xl bg-white p-5 text-lg font-semibold text-slate-800">
            Reinforce the incompatible behavior because it cannot occur at the same time as the target behavior.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            DRA vs DRI
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-blue-50 p-5">
              <h3 className="text-xl font-bold text-blue-700">DRA</h3>
              <p className="mt-2 text-slate-700">
                Reinforce an appropriate alternative behavior.
              </p>
              <p className="mt-3 font-semibold text-slate-800">
                The behaviors do not have to be physically impossible together.
              </p>
            </div>

            <div className="rounded-2xl bg-purple-50 p-5">
              <h3 className="text-xl font-bold text-purple-700">DRI</h3>
              <p className="mt-2 text-slate-700">
                Reinforce an incompatible behavior.
              </p>
              <p className="mt-3 font-semibold text-slate-800">
                The two behaviors physically cannot happen at the same time.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Quick Check</h2>

          <p className="mt-4 text-lg text-slate-700">
            A student touches the walls while walking down the hallway. The team
            teaches the student to keep both hands in their pockets while
            walking. What procedure is this?
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {["DRA", "DRI", "DRO", "DRL"].map((choice) => {
              const isCorrect = choice === correctAnswer;
              const isSelected = selected === choice;

              let buttonStyle =
                "rounded-xl border px-4 py-3 font-bold transition-all ";

              if (!selected) {
                buttonStyle +=
                  "bg-slate-50 text-slate-800 hover:bg-purple-50 hover:text-purple-700";
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
                    This is DRI because hands in pockets is incompatible with touching the walls.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold text-red-700">Not quite.</p>
                  <p className="mt-2 text-slate-700">
                    The correct answer is DRI because the replacement behavior cannot physically occur at the same time as the target behavior.
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
