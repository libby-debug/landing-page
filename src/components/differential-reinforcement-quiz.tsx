"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Button, cardBaseClass, gradientTextClass } from "@/components/learning-ui";
import {
  masteryThreshold,
  type DifferentialReinforcementProcedure,
} from "@/lib/modules/differential-reinforcement";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

type SaveState = "idle" | "saving" | "saved" | "error";

type DifferentialReinforcementQuizProps = {
  procedure: DifferentialReinforcementProcedure;
};

export function DifferentialReinforcementQuiz({
  procedure,
}: DifferentialReinforcementQuizProps) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const correctCount = useMemo(
    () =>
      procedure.quiz.reduce((total, question, index) => {
        return answers[index] === question.answer ? total + 1 : total;
      }, 0),
    [answers, procedure.quiz],
  );

  const score = Math.round((correctCount / procedure.quiz.length) * 100);
  const mastered = score >= masteryThreshold;
  const allAnswered = procedure.quiz.every((_, index) => answers[index]);

  function selectAnswer(questionIndex: number, answer: string) {
    if (submitted) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [questionIndex]: answer,
    }));
  }

  async function submitQuiz() {
    if (!allAnswered) {
      return;
    }

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
    setSubmitted(false);
    setSaveState("idle");
    setMessage("");
  }

  return (
    <div className="mt-8 w-full">
      <div className="grid gap-6">
        {procedure.quiz.map((question, questionIndex) => (
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
                const correct = submitted && option === question.answer;
                const incorrectSelected =
                  submitted && selected && option !== question.answer;

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={submitted}
                    onClick={() => selectAnswer(questionIndex, option)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed ${
                      correct
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
              <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Rationale feedback
                </p>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  {question.rationale}
                </p>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          <div
            className={`mt-4 text-6xl font-extrabold tracking-tight ${
              mastered ? gradientTextClass : "text-slate-950"
            }`}
          >
            {score}%
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            {correctCount} of {procedure.quiz.length} correct.{" "}
            {mastered
              ? "Mastery threshold met."
              : "Review the rationales and retry for 90% mastery."}
          </p>
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
