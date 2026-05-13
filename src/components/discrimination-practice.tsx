"use client";

import Link from "next/link";
import { useState } from "react";
import { cardBaseClass } from "@/components/learning-ui";
import type { QuizQuestion } from "@/lib/modules/differential-reinforcement";

type DiscriminationPracticeProps = {
  questions: QuizQuestion[];
  title?: string;
  description?: string;
  backHref?: string;
  nextHref?: string;
  nextLabel?: string;
};

export function DiscriminationPractice({
  questions,
  title = "Screen check",
  description = "Answer every item correctly to unlock the next lesson screen.",
  backHref,
  nextHref,
  nextLabel = "Next Lesson",
}: DiscriminationPracticeProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const allCorrect = questions.every(
    (question, index) => answers[index] === question.answer,
  );

  function selectAnswer(questionIndex: number, option: string) {
    setAnswers((current) => ({
      ...current,
      [questionIndex]: option,
    }));
  }

  function retryQuestion(questionIndex: number) {
    setAnswers((current) => {
      const nextAnswers = { ...current };
      delete nextAnswers[questionIndex];
      return nextAnswers;
    });
  }

  return (
    <section className="mt-10 w-full">
      <div className={`${cardBaseClass} border-blue-200 bg-blue-50 text-center`}>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Required check
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-slate-950">
          {description}
        </p>
      </div>

      <div className="mt-8 grid w-full gap-6">
        {questions.map((question, questionIndex) => {
          const selected = answers[questionIndex];
          const isCorrectSelection = selected === question.answer;

          return (
            <article
              key={question.prompt}
              className={`${cardBaseClass} border-slate-200 bg-white text-center`}
            >
              <div className="flex flex-col items-center gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-blue-700">
                  Immediate feedback
                </span>
                <h3 className="max-w-4xl text-xl font-extrabold tracking-tight text-slate-950">
                  {questionIndex + 1}. {question.prompt}
                </h3>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {question.options.map((option) => {
                  const isSelected = selected === option;
                  const isCorrect = option === question.answer;
                  const hasAnswer = Boolean(selected);

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={hasAnswer}
                      onClick={() => selectAnswer(questionIndex, option)}
                      className={`w-full rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition disabled:cursor-not-allowed md:w-[calc(50%_-_0.375rem)] ${
                        hasAnswer && isCorrect
                          ? "border-green-300 bg-green-50 text-green-700"
                          : hasAnswer && isSelected
                            ? "border-teal-300 bg-teal-50 text-teal-700"
                            : isSelected
                              ? "border-blue-300 bg-blue-50 text-blue-700"
                              : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {selected ? (
                <div
                  className={`mt-5 rounded-2xl border p-4 text-center ${
                    isCorrectSelection
                      ? "border-green-200 bg-green-50"
                      : "border-teal-200 bg-teal-50"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold uppercase tracking-wide ${
                      isCorrectSelection
                        ? "text-green-700"
                        : "text-teal-700"
                    }`}
                  >
                    {isCorrectSelection ? "Correct" : "Review before advancing"}
                  </p>
                  <p className="mx-auto mt-2 max-w-3xl text-base leading-relaxed text-slate-950">
                    {question.rationale}
                  </p>
                  {!isCorrectSelection ? (
                    <button
                      type="button"
                      onClick={() => retryQuestion(questionIndex)}
                      className="mt-4 rounded-xl border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm transition hover:border-teal-300"
                    >
                      Retry this item
                    </button>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {backHref || nextHref ? (
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          {backHref ? (
            <Link
              href={backHref}
              className="inline-block rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              Back
            </Link>
          ) : null}

          {nextHref && allCorrect ? (
            <Link
              href={nextHref}
              className="inline-block rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              {nextLabel}
            </Link>
          ) : nextHref ? (
            <button
              type="button"
              disabled
              className="inline-block cursor-not-allowed rounded-xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-500"
            >
              Pass check to continue
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
