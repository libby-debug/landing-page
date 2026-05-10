"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    prompt:
      "A student destroys materials to escape work. The BCBA teaches the student to request a break instead. What procedure is this?",
    choices: ["DRA", "DRI", "DRO", "DRL"],
    answer: "DRA",
    rationale:
      "This is DRA because an appropriate alternative behavior, requesting a break, is reinforced.",
  },
  {
    prompt:
      "A learner screams for attention. The team reinforces raising a hand to request attention. What procedure is this?",
    choices: ["DRA", "DRO", "DRI", "DRH"],
    answer: "DRA",
    rationale:
      "This is DRA because hand raising is an alternative behavior that replaces screaming.",
  },
  {
    prompt:
      "Which example is MOST clearly DRI rather than DRA?",
    choices: [
      "Reinforcing asking for help instead of yelling",
      "Reinforcing hands in pockets instead of touching walls",
      "Reinforcing no aggression for 10 minutes",
      "Reinforcing fewer than 5 call-outs",
    ],
    answer: "Reinforcing hands in pockets instead of touching walls",
    rationale:
      "Hands in pockets is incompatible with touching walls because the two behaviors cannot happen at the same time.",
  },
  {
    prompt:
      "Which statement is NOT true about DRA?",
    choices: [
      "It reinforces an alternative behavior",
      "It often teaches a replacement skill",
      "The replacement behavior must be physically impossible with the target behavior",
      "Functional communication can be used in DRA",
    ],
    answer:
      "The replacement behavior must be physically impossible with the target behavior",
    rationale:
      "That describes DRI. In DRA, the alternative behavior does not have to be physically incompatible with the target behavior.",
  },
  {
    prompt:
      "A learner hits the teacher when hungry. The BCBA teaches the learner to request food using a picture card. What procedure is this?",
    choices: ["DRA", "DRI", "DRO", "DRL"],
    answer: "DRA",
    rationale:
      "This is DRA because requesting food is an appropriate alternative behavior to hitting.",
  },
];

export default function DRAPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const question = questions[current];
  const isLastQuestion = current === questions.length - 1;
  const percent = Math.round((score / questions.length) * 100);
  const mastery = percent >= 90;

  function chooseAnswer(choice: string) {
    if (answered) return;

    setSelected(choice);
    setAnswered(true);

    if (choice === question.answer) {
      setScore(score + 1);
    }
  }

  function nextQuestion() {
    setSelected("");
    setAnswered(false);
    setCurrent(current + 1);
  }

  function restartQuiz() {
    setCurrent(0);
    setSelected("");
    setAnswered(false);
    setScore(0);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Differential Reinforcement
        </p>

        <h1 className="mt-2 text-5xl font-extrabold text-slate-950">
          DRA
        </h1>

        <p className="mt-3 text-2xl font-bold text-blue-700">
          Differential Reinforcement of an Alternative Behavior
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
          In DRA, reinforcement is given when the learner uses an appropriate
          alternative behavior instead of the target behavior.
        </p>

        <section className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            What gets reinforced?
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-red-500">
                Target Behavior
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Screaming for attention
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-blue-600">
                Alternative Behavior
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Raising hand or asking for help
              </p>
            </div>
          </div>

          <p className="mt-6 rounded-2xl bg-white p-5 text-lg font-semibold text-slate-800">
            Reinforce the alternative behavior, not the target behavior.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Mini Mastery Check
              </h2>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                Question {current + 1} of {questions.length}
              </p>
            </div>

            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              Mastery goal: 90%
            </div>
          </div>

          <div className="mt-5 h-3 rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-blue-600 transition-all"
              style={{
                width: `${((current + (answered ? 1 : 0)) / questions.length) * 100}%`,
              }}
            />
          </div>

          {current < questions.length ? (
            <>
              <p className="mt-6 text-lg leading-relaxed text-slate-700">
                {question.prompt}
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {question.choices.map((choice) => {
                  const isCorrect = choice === question.answer;
                  const isSelected = selected === choice;

                  let buttonStyle =
                    "rounded-xl border px-4 py-3 text-left font-bold transition-all ";

                  if (!answered) {
                    buttonStyle +=
                      "bg-slate-50 text-slate-800 hover:bg-blue-50 hover:text-blue-700";
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
                      onClick={() => chooseAnswer(choice)}
                      className={buttonStyle}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  {selected === question.answer ? (
                    <p className="text-xl font-bold text-green-700">
                      Correct!
                    </p>
                  ) : (
                    <p className="text-xl font-bold text-red-700">
                      Not quite.
                    </p>
                  )}

                  <p className="mt-2 text-slate-700">
                    {question.rationale}
                  </p>

                  {isLastQuestion ? (
                    <button
                      onClick={() => setCurrent(current + 1)}
                      className="mt-5 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white"
                    >
                      See Results
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="mt-5 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white"
                    >
                      Next Question
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="mt-8 rounded-3xl bg-slate-50 p-6">
              <h3 className="text-3xl font-extrabold text-slate-950">
                Your Score: {percent}%
              </h3>

              <p className="mt-3 text-lg text-slate-700">
                You got {score} out of {questions.length} correct.
              </p>

              {mastery ? (
                <div className="mt-5 rounded-2xl bg-green-100 p-5">
                  <p className="font-bold text-green-700">
                    Mastered! You met the 90% mastery goal.
                  </p>

                  <Link
                    href="/modules/differential-reinforcement/dri"
                    className="mt-4 inline-block rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
                  >
                    Continue to DRI →
                  </Link>
                </div>
              ) : (
                <p className="mt-5 rounded-2xl bg-orange-100 p-5 font-bold text-orange-700">
                  Needs Review. Mastery requires 90% or higher.
                </p>
              )}

              <button
                onClick={restartQuiz}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                Try Again
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}