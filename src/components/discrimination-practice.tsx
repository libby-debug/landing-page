"use client";

import { useState } from "react";
import { cardBaseClass } from "@/components/learning-ui";
import type { QuizQuestion } from "@/lib/modules/differential-reinforcement";

type DiscriminationPracticeProps = {
  questions: QuizQuestion[];
};

export function DiscriminationPractice({ questions }: DiscriminationPracticeProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <div className="mt-8 grid w-full gap-6">
      {questions.map((question, questionIndex) => {
        const selected = answers[questionIndex];

        return (
          <article
            key={question.prompt}
            className={`${cardBaseClass} border-slate-200 bg-white text-left`}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <h3 className="text-xl font-extrabold tracking-tight text-slate-950">
                {questionIndex + 1}. {question.prompt}
              </h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-blue-700">
                Immediate feedback
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {question.options.map((option) => {
                const isSelected = selected === option;
                const isCorrect = option === question.answer;
                const hasAnswer = Boolean(selected);

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [questionIndex]: option,
                      }))
                    }
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      hasAnswer && isCorrect
                        ? "border-green-300 bg-green-50 text-green-700"
                        : hasAnswer && isSelected
                          ? "border-pink-300 bg-pink-50 text-pink-700"
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
                  selected === question.answer
                    ? "border-green-200 bg-green-50"
                    : "border-pink-200 bg-pink-50"
                }`}
              >
                <p
                  className={`text-sm font-semibold uppercase tracking-wide ${
                    selected === question.answer
                      ? "text-green-700"
                      : "text-pink-700"
                  }`}
                >
                  {selected === question.answer ? "Correct" : "Review this distinction"}
                </p>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  {question.rationale}
                </p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
