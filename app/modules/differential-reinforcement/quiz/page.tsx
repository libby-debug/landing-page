"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  pageTitleClass,
  sectionTitleClass,
} from "@/components/learning-ui";
import { supabase } from "@/lib/supabase";
import { SaveProgressButton } from "../../../dashboard/tco-6/progression";

const questions = [
  {
    prompt:
      "A learner screams for attention. The team reinforces raising a hand to request attention. What procedure is this?",
    choices: ["DRA", "DRI", "DRO", "DRL"],
    answer: "DRA",
    rationale:
      "This is DRA because reinforcement is given contingent upon the use of an alternative behavior.",
  },
  {
    prompt:
      "A student touches walls in the hallway. The team reinforces keeping hands in pockets. What procedure is this?",
    choices: ["DRA", "DRI", "DRO", "DRH"],
    answer: "DRI",
    rationale:
      "This is DRI because reinforcement is given contingent upon the use of an incompatible behavior.",
  },
  {
    prompt:
      "A student earns reinforcement if no property destruction occurs during a 30-minute interval. What procedure is this?",
    choices: ["DRA", "DRO", "DRL", "DRH"],
    answer: "DRO",
    rationale:
      "This is DRO because reinforcement is given contingent upon the absence of the target behavior.",
  },
  {
    prompt:
      "A learner calls out 20 times per class. Reinforcement is delivered if they call out fewer than 8 times. What procedure is this?",
    choices: ["DRO", "DRL", "DRH", "DRI"],
    answer: "DRL",
    rationale:
      "This is DRL because reinforcement is given when responses are lower than a predetermined criterion.",
  },
  {
    prompt:
      "A student earns a sticker if they raise their hand more than 5 times during class. What procedure is this?",
    choices: ["DRA", "DRO", "DRL", "DRH"],
    answer: "DRH",
    rationale:
      "This is DRH because reinforcement is given when responses are higher than a predetermined criterion.",
  },
];

export default function DifferentialReinforcementQuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [incorrectAttempts, setIncorrectAttempts] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const savedAlready = useRef(false);

  const isFinished = current >= questions.length;
  const question = questions[current];
  const isLastQuestion = current === questions.length - 1;
  const percent = Math.round((score / questions.length) * 100);
  const mastery = percent >= 90;

  useEffect(() => {
    async function saveScore() {
      if (!isFinished) return;
      if (savedAlready.current) return;

      savedAlready.current = true;
      setSaveMessage("Saving your mastery score...");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setSaveMessage("Score not saved because you are not logged in.");
        return;
      }

      const { error } = await supabase.from("module_mastery_scores").upsert(
        {
          mastered: mastery,
          module_slug: "differential-reinforcement",
          score: percent,
          updated_at: new Date().toISOString(),
          user_id: user.id,
        },
        { onConflict: "user_id,module_slug" },
      );

      if (error) {
        setSaveMessage(`Could not save score: ${error.message}`);
      } else {
        setSaveMessage("Score saved to your dashboard.");
      }
    }

    saveScore();
  }, [isFinished, mastery, percent]);

  function chooseAnswer(choice: string) {
    if (answered) return;

    setSelected(choice);
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [current]: choice,
    }));
    setAnswered(true);

    if (choice === question.answer) {
      setScore(score + 1);
    } else {
      setIncorrectAttempts((currentAttempts) => ({
        ...currentAttempts,
        [current]: (currentAttempts[current] ?? 0) + 1,
      }));
    }
  }

  function nextQuestion() {
    setSelected("");
    setAnswers({});
    setAnswered(false);
    setIncorrectAttempts((currentAttempts) => {
      const next = { ...currentAttempts };
      delete next[current];
      return next;
    });
    setCurrent(current + 1);
  }

  function tryAgain() {
    setSelected("");
    setAnswers({});
    setAnswered(false);
  }

  function restartQuiz() {
    savedAlready.current = false;
    setCurrent(0);
    setSelected("");
    setAnswered(false);
    setIncorrectAttempts({});
    setScore(0);
    setSaveMessage("");
  }

  return (
    <main className="min-h-screen bg-transparent p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Cumulative Mastery Quiz
        </p>

        <h1 className={pageTitleClass}>
          Differential Reinforcement
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-950">
          Mixed practice across DRA, DRI, DRO, DRL, and DRH. Score 90% or higher
          to master this module.
        </p>

        <SaveProgressButton
          activity="mastery-quiz"
          completedQuestions={Array.from({ length: current }, (_, index) =>
            String(index),
          )}
          currentLocation="/modules/differential-reinforcement/quiz"
          passed={isFinished ? mastery : undefined}
          score={percent}
          sectionSlug="differential-reinforcement"
          selectedAnswers={Object.fromEntries(
            Object.entries(answers).map(([index, answer]) => [index, answer]),
          )}
          submitted={isFinished}
          totalQuestions={questions.length}
        />

        <section className="mt-10 rounded-3xl border bg-white p-6 shadow-sm">
          {!isFinished ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">
                    Mastery Check
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-slate-950">
                    Question {current + 1} of {questions.length}
                  </p>
                </div>

                <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  Goal: 90%
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

              <p className="mt-6 text-lg leading-relaxed text-slate-950">
                {question.prompt}
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {question.choices.map((choice, choiceIndex) => {
                  const isSelected = selected === choice;
                  const isSelectedCorrect =
                    answered && isSelected && choice === question.answer;
                  const isSelectedIncorrect =
                    answered && isSelected && choice !== question.answer;

                  let buttonStyle =
                    "rounded-xl border px-4 py-3 text-left font-bold transition-all ";

                  if (!answered) {
                    buttonStyle +=
                      "bg-slate-50 text-slate-800 hover:bg-blue-50 hover:text-blue-700";
                  } else if (isSelectedCorrect) {
                    buttonStyle +=
                      "bg-green-100 border-green-400 text-green-700";
                  } else if (isSelectedIncorrect) {
                    buttonStyle +=
                      "bg-red-100 border-red-400 text-red-700";
                  } else {
                    buttonStyle += "bg-slate-100 text-slate-400";
                  }

                  return (
                    <button
                      key={`${current}-${choiceIndex}-${choice}`}
                      onClick={() => chooseAnswer(choice)}
                      className={buttonStyle}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className={`mt-6 rounded-2xl p-5 ${
                    selected === question.answer
                      ? "border border-green-200 bg-green-50"
                      : (incorrectAttempts[current] ?? 0) >= 4
                        ? "border border-amber-200 bg-amber-50"
                        : "border border-teal-200 bg-teal-50"
                  }`}
                >
                  {selected === question.answer ? (
                    <p className="text-xl font-bold text-green-700">
                      Correct!
                    </p>
                  ) : (incorrectAttempts[current] ?? 0) >= 4 ? (
                    <p className="text-xl font-bold text-amber-700">
                      Review Topic in Learning Modules
                    </p>
                  ) : (
                    <p className="text-xl font-bold text-red-700">
                      Not quite.
                    </p>
                  )}

                  {selected !== question.answer &&
                  (incorrectAttempts[current] ?? 0) >= 4 ? (
                    <p className="mt-2 font-bold text-slate-950">
                      Correct answer: {question.answer}
                    </p>
                  ) : null}

                  <p className="mt-2 text-slate-950">
                    {selected === question.answer ||
                    (incorrectAttempts[current] ?? 0) >= 4
                      ? question.rationale
                      : "Hint: Identify the reinforcement criterion: alternative behavior, incompatible behavior, absence of the target behavior, lower rate, or higher rate."}
                  </p>

                  <button
                    onClick={
                      selected === question.answer ||
                      (incorrectAttempts[current] ?? 0) >= 4
                        ? nextQuestion
                        : tryAgain
                    }
                    className="mt-5 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white"
                  >
                    {selected !== question.answer &&
                    (incorrectAttempts[current] ?? 0) < 4
                      ? "Try again"
                      : isLastQuestion
                        ? "See Results"
                        : "Next Question"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-3xl bg-slate-50 p-6">
              <h2 className={sectionTitleClass}>
                Your Score: {percent}%
              </h2>

              <p className="mt-3 text-lg text-slate-950">
                You got {score} out of {questions.length} correct.
              </p>

              {saveMessage && (
                <p className="mt-4 rounded-2xl bg-white p-4 font-semibold text-slate-950">
                  {saveMessage}
                </p>
              )}

              {mastery ? (
                <div className="mt-5 rounded-2xl bg-green-100 p-5">
                  <p className="font-bold text-green-700">
                    Mastered! You met the 90% mastery goal.
                  </p>

                  <Link
                    href="/modules"
                    className="mt-4 inline-block rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700 active:bg-emerald-800"
                  >
                    Continue to Modules →
                  </Link>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl bg-orange-100 p-5">
                  <p className="font-bold text-orange-700">
                    Needs Review. Mastery requires 90% or higher.
                  </p>

                  <p className="mt-2 text-orange-700">
                    Review DRA, DRI, DRO, DRL, and DRH, then try again.
                  </p>
                </div>
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
