"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Button, cardBaseClass } from "@/components/learning-ui";
import {
  masteryThreshold,
  type DifferentialReinforcementProcedure,
  type QuizQuestion,
} from "@/lib/modules/differential-reinforcement";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

type SaveState = "idle" | "saving" | "saved" | "error";

type DifferentialReinforcementQuizProps = {
  procedure: DifferentialReinforcementProcedure;
  questions?: QuizQuestion[];
  nextHref?: string;
  reviewHref: string;
  backHref: string;
};

export function DifferentialReinforcementQuiz({
  procedure,
  questions,
  nextHref,
  reviewHref,
  backHref,
}: DifferentialReinforcementQuizProps) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [incorrectAttempts, setIncorrectAttempts] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const quizQuestions = questions ?? procedure.quiz;
  const correctCount = useMemo(
    () =>
      quizQuestions.reduce((total, question, index) => {
        return answers[index] === question.answer ? total + 1 : total;
      }, 0),
    [answers, quizQuestions],
  );

  const score = Math.round((correctCount / quizQuestions.length) * 100);
  const mastered = score >= masteryThreshold;
  const allAnswered = quizQuestions.every((_, index) => answers[index]);

  function selectAnswer(questionIndex: number, answer: string) {
    if (submitted && answers[questionIndex] === quizQuestions[questionIndex].answer) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [questionIndex]: answer,
    }));
    setSubmitted(false);
    setSaveState("idle");
    setMessage("");
  }

  async function submitQuiz() {
    if (!allAnswered) {
      return;
    }

    setIncorrectAttempts((current) => {
      const next = { ...current };
      quizQuestions.forEach((question, index) => {
        if (answers[index] !== question.answer) {
          next[index] = (next[index] ?? 0) + 1;
        }
      });
      return next;
    });
    setSubmitted(true);

    if (!isSupabaseConfigured) {
      setSaveState("error");
      setMessage("Supabase is not configured, so this mastery score was not saved.");
      return;
    }

    if (!user) {
      setSaveState("error");
      setMessage("Log in to save mastery scores to your ABA Mastered progress.");
      return;
    }

    setSaveState("saving");
    setMessage("");

    const { error } = await supabase.from("module_mastery_scores").upsert(
      {
        user_id: user.id,
        module_slug: `differential-reinforcement-${procedure.slug}`,
        score,
        mastered,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_slug" },
    );

    if (error) {
      setSaveState("error");
      setMessage("Your mastery score could not be saved yet. Please try again.");
      return;
    }

    setSaveState("saved");
    setMessage(
      mastered
        ? "Mastery saved. You reached the 90% threshold."
        : "Score saved. Review the rationales and try again to reach 90% mastery.",
    );
  }

  function resetQuiz() {
    setAnswers({});
    setIncorrectAttempts({});
    setSubmitted(false);
    setSaveState("idle");
    setMessage("");
  }

  return (
    <div className="mt-8 w-full">
      <div className="grid gap-6">
        {quizQuestions.map((question, questionIndex) => (
          <article
            key={question.prompt}
            className={`${cardBaseClass} border-slate-200 bg-white text-left`}
          >
            <h3 className="text-xl font-extrabold tracking-tight text-slate-950">
              {questionIndex + 1}. {question.prompt}
            </h3>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {question.options.map((option) => {
                const selected = answers[questionIndex] === option;
                const selectedCorrect =
                  submitted && selected && option === question.answer;
                const incorrectSelected =
                  submitted && selected && option !== question.answer;

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={submitted && selectedCorrect}
                    onClick={() => selectAnswer(questionIndex, option)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed ${
                      selectedCorrect
                        ? "border-green-300 bg-green-50 text-green-700"
                        : incorrectSelected
                          ? "border-pink-300 bg-pink-50 text-pink-700"
                          : selected
                            ? "border-blue-300 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {submitted ? (
              <div
                className={`mt-5 rounded-2xl border p-4 text-center ${
                  answers[questionIndex] === question.answer
                    ? "border-green-200 bg-green-50"
                    : (incorrectAttempts[questionIndex] ?? 0) >= 4
                      ? "border-amber-200 bg-amber-50"
                      : "border-pink-200 bg-pink-50"
                }`}
              >
                <p
                  className={`text-sm font-semibold uppercase tracking-wide ${
                    answers[questionIndex] === question.answer
                      ? "text-green-700"
                      : (incorrectAttempts[questionIndex] ?? 0) >= 4
                        ? "text-amber-700"
                        : "text-pink-700"
                  }`}
                >
                  {answers[questionIndex] === question.answer
                    ? "Rationale feedback"
                    : (incorrectAttempts[questionIndex] ?? 0) >= 4
                      ? "Review Topic in Learning Modules"
                      : "Not quite. Hint"}
                </p>
                {answers[questionIndex] !== question.answer &&
                (incorrectAttempts[questionIndex] ?? 0) >= 4 ? (
                  <p className="mt-2 text-sm font-black text-slate-950">
                    Correct answer: {question.answer}
                  </p>
                ) : null}
                <p className="mt-2 text-base leading-relaxed text-slate-950">
                  {answers[questionIndex] === question.answer ||
                  (incorrectAttempts[questionIndex] ?? 0) >= 4
                    ? question.rationale
                    : "Hint: Identify the reinforcement criterion: alternative behavior, incompatible behavior, absence of the target behavior, lower rate, or higher rate."}
                </p>
                {answers[questionIndex] !== question.answer &&
                (incorrectAttempts[questionIndex] ?? 0) > 0 &&
                (incorrectAttempts[questionIndex] ?? 0) < 4 ? (
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-pink-700">
                    Incorrect attempt {incorrectAttempts[questionIndex]} of 4
                  </p>
                ) : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href={backHref}
          className="inline-block rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-300 hover:shadow-md"
        >
          Back
        </Link>

        <Button
          type="button"
          size="large"
          variant="accent"
          disabled={!allAnswered || submitted || saveState === "saving"}
          onClick={submitQuiz}
        >
          {saveState === "saving" ? "Saving..." : "Submit quiz"}
        </Button>

        <Button type="button" size="large" variant="secondary" onClick={resetQuiz}>
          Try again
        </Button>
      </div>

      {submitted ? (
        <section
          className={`${cardBaseClass} mx-auto mt-8 max-w-2xl border-blue-200 bg-blue-50 text-center`}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Mastery score
          </p>
          <div className="mt-4 text-6xl font-extrabold tracking-tight text-slate-950">
            {score}%
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-950">
            {correctCount} of {quizQuestions.length} correct.{" "}
            {mastered
              ? "Mastery threshold met."
              : "Review the rationales and retry for 90% mastery."}
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {mastered && nextHref ? (
              <Link
                href={nextHref}
                className="inline-block rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Continue to next procedure
              </Link>
            ) : null}

            <Link
              href={reviewHref}
              className="inline-block rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              {mastered ? "Review lesson" : "Go back to review"}
            </Link>
          </div>
        </section>
      ) : null}

      {message ? (
        <p
          className={`mx-auto mt-6 max-w-2xl rounded-2xl border px-4 py-3 text-center text-sm font-semibold ${
            saveState === "saved"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-pink-200 bg-pink-50 text-pink-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
