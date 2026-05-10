"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    prompt:
      "A student earns a sticker if they raise their hand more than 5 times during the school day. What procedure is this?",
    choices: ["DRA", "DRO", "DRL", "DRH"],
    answer: "DRH",
    rationale:
      "This is DRH because reinforcement is delivered when the behavior occurs above the criterion.",
  },
  {
    prompt:
      "A learner initiates peer interaction once per recess. The team reinforces the learner if they initiate interaction at least 4 times. What procedure is this?",
    choices: ["DRH", "DRL", "DRO", "DRI"],
    answer: "DRH",
    rationale:
      "This is DRH because the goal is to increase the rate of an appropriate behavior.",
  },
  {
    prompt: "Which statement best describes DRH?",
    choices: [
      "Reinforce zero occurrences of behavior",
      "Reinforce behavior below a criterion",
      "Reinforce behavior above a criterion",
      "Reinforce an incompatible behavior",
    ],
    answer: "Reinforce behavior above a criterion",
    rationale:
      "DRH means reinforcement is delivered when responding is higher than a set criterion.",
  },
  {
    prompt: "Which is NOT an example of DRH?",
    choices: [
      "Reinforcing more than 10 correct math problems",
      "Reinforcing at least 5 hand raises",
      "Reinforcing zero aggression for 30 minutes",
      "Reinforcing more frequent peer greetings",
    ],
    answer: "Reinforcing zero aggression for 30 minutes",
    rationale: "Zero occurrences describes DRO, not DRH.",
  },
  {
    prompt:
      "A student completes only 2 independent tasks per session. The BCBA reinforces the student for completing 6 or more. What procedure is this?",
    choices: ["DRA", "DRI", "DRL", "DRH"],
    answer: "DRH",
    rationale:
      "This is DRH because reinforcement is used to increase the rate of task completion.",
  },
];

export default function DRHPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const isFinished = current >= questions.length;
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
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
          Differential Reinforcement
        </p>

        <h1 className="mt-2 text-5xl font-extrabold text-slate-950">DRH</h1>

        <p className="mt-3 text-2xl font-bold text-pink-700">
          Differential Reinforcement of High Rates
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
          In DRH, reinforcement is given when a behavior occurs at a higher rate
          than a set criterion.
        </p>

        <section className="mt-10 rounded-3xl border border-pink-200 bg-pink-50 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            What gets reinforced?
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                Desired Behavior
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Raising hand during class
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-pink-600">
                Reinforcement Criterion
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                More than 5 times per school day
              </p>
            </div>
          </div>

          <p className="mt-6 rounded-2xl bg-white p-5 text-lg font-semibold text-slate-800">
            Reinforce when the behavior happens more often than the criterion.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          {!isFinished ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">
                    Mini Mastery Check
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Question {current + 1} of {questions.length}
                  </p>
                </div>

                <div className="rounded-full bg-pink-50 px-4 py-2 text-sm font-bold text-pink-700">
                  Mastery goal: 90%
                </div>
              </div>

              <div className="mt-5 h-3 rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-pink-600 transition-all"
                  style={{
                    width: `${((current + (answered ? 1 : 0)) / questions.length) * 100}%`,
                  }}
                />
              </div>

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
                      "bg-slate-50 text-slate-800 hover:bg-pink-50 hover:text-pink-700";
                  } else if (isCorrect) {
                    buttonStyle +=
                      "bg-green-100 border-green-400 text-green-700";
                  } else if (isSelected) {
                    buttonStyle +=
                      "bg-red-100 border-red-400 text-red-700";
                  } else {
                    buttonStyle += "bg-slate-100 text-slate-400";
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

                  <p className="mt-2 text-slate-700">{question.rationale}</p>

                  <button
                    onClick={nextQuestion}
                    className="mt-5 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white"
                  >
                    {isLastQuestion ? "See Results" : "Next Question"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-3xl bg-slate-50 p-6">
              <h2 className="text-4xl font-extrabold text-slate-950">
                Your Score: {percent}%
              </h2>

              <p className="mt-3 text-lg text-slate-700">
                You got {score} out of {questions.length} correct.
              </p>

              {mastery ? (
                <div className="mt-5 rounded-3xl border border-green-300 bg-gradient-to-br from-green-100 to-emerald-50 p-6 shadow-sm">
                  <p className="text-3xl font-extrabold text-green-700">
                    Great job!
                  </p>

                  <p className="mt-3 text-lg font-semibold text-slate-800">
                    You mastered DRH with a score of {percent}%.
                  </p>

                  <p className="mt-2 text-slate-700">
                    Onto the Mastery Quiz!
                  </p>

                  <Link
                    href="/modules/differential-reinforcement/quiz"
                    className="mt-6 inline-block rounded-2xl bg-green-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-green-700"
                  >
                    Start Mastery Quiz →
                  </Link>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl bg-orange-100 p-5">
                  <p className="font-bold text-orange-700">
                    Needs Review. Mastery requires 90% or higher.
                  </p>
                </div>
              )}

              <button
                onClick={restartQuiz}
                className="mt-6 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white"
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