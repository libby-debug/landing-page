"use client";

import { useMemo, useState } from "react";
import { useModuleProgress } from "./progression";
import type { QuestionContent } from "./section-b-content";

const positiveFeedbackMessages = [
  "Great job!",
  "Good job! You are correct!",
  "Excellent work!",
  "Correct!",
  "Nice work!",
  "You got it!",
];

function getPositiveFeedback(index: number) {
  return positiveFeedbackMessages[index % positiveFeedbackMessages.length];
}

export function PracticeQuestionCard({
  index,
  mode,
  question,
  sectionSlug,
  totalQuestions,
}: {
  index: number;
  mode: "practice" | "mastery";
  question: QuestionContent;
  sectionSlug: string;
  totalQuestions?: number;
}) {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { updateProgress } = useModuleProgress(sectionSlug);
  const isCorrect = selected === question.answer;

  function updatePracticeResult(correct: boolean) {
    if (mode !== "practice" || !totalQuestions || typeof window === "undefined") {
      return;
    }

    const key = `aba-mastered:tco6:${sectionSlug}:practice-results`;
    const stored = window.localStorage.getItem(key);
    const results = stored ? JSON.parse(stored) as Record<string, boolean> : {};
    results[index] = correct;
    window.localStorage.setItem(key, JSON.stringify(results));

    const complete =
      Object.keys(results).length === totalQuestions &&
      Object.values(results).every(Boolean);

    if (complete) {
      updateProgress({ practiceCompleted: true });
    }
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
      <p className="text-sm font-black uppercase tracking-wide text-purple-600">
        Question {index + 1}
      </p>

      <h3 className="mt-2 text-xl font-black text-slate-950">
        {question.prompt}
      </h3>

      <div className="mt-5 grid gap-3">
        {question.choices.map((choice) => (
          <label
            key={choice}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-950"
          >
            <input
              checked={selected === choice}
              className="h-4 w-4"
              name={`${mode}-${sectionSlug}-${index}`}
              onChange={() => {
                setSelected(choice);
                setSubmitted(false);
                updatePracticeResult(false);
              }}
              type="radio"
            />
            {choice}
          </label>
        ))}
      </div>

      <button
        type="button"
        className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!selected}
        onClick={() => {
          setSubmitted(true);
          updatePracticeResult(isCorrect);
        }}
      >
        Submit Answer
      </button>

      {submitted ? (
        <AnswerFeedback
          correctAnswer={question.answer}
          explanation={question.explanation}
          isCorrect={isCorrect}
          message={getPositiveFeedback(index)}
        />
      ) : null}
    </article>
  );
}

export function PlaceholderPracticeQuestionCard({
  index,
  item,
  sectionSlug,
}: {
  index: number;
  item: string;
  sectionSlug: string;
}) {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const choices = [
    "Correct module concept placeholder",
    "Related but less precise ABA term",
    "Common exam distractor",
    "Clinically incomplete answer",
  ];

  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
      <p className="text-sm font-black uppercase tracking-wide text-purple-600">
        Question {index + 1}
      </p>

      <h3 className="mt-2 text-xl font-black text-slate-950">
        Which answer best matches this TCO 6 item?
      </h3>

      <p className="mt-3 text-base font-semibold leading-7 text-slate-950">
        {item}
      </p>

      <div className="mt-5 grid gap-3">
        {choices.map((choice) => (
          <label
            key={choice}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-950"
          >
            <input
              checked={selected === choice}
              className="h-4 w-4"
              name={`practice-${sectionSlug}-${index}`}
              onChange={() => {
                setSelected(choice);
                setSubmitted(false);
              }}
              type="radio"
            />
            {choice}
          </label>
        ))}
      </div>

      <button
        type="button"
        className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!selected}
        onClick={() => setSubmitted(true)}
      >
        Submit Answer
      </button>

      {submitted ? (
        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-center">
          <p className="text-sm font-black uppercase tracking-wide text-blue-600">
            Explanation placeholder
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
            Rationale feedback will explain why the correct answer matches the
            TCO 6 checklist item and why each distractor is less precise.
          </p>
        </div>
      ) : null}
    </article>
  );
}

export function MasteryCheckQuiz({
  questions,
  sectionCode,
  sectionSlug,
}: {
  questions: QuestionContent[];
  sectionCode: string;
  sectionSlug: string;
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(
    {},
  );
  const [completed, setCompleted] = useState(false);
  const correctCount = useMemo(
    () =>
      questions.reduce(
        (total, question, index) =>
          selectedAnswers[index] === question.answer ? total + 1 : total,
        0,
      ),
    [questions, selectedAnswers],
  );
  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score === 100;
  const allAnswered = questions.every((_, index) => selectedAnswers[index]);
  const { updateProgress } = useModuleProgress(sectionSlug);

  function updateAnswer(index: number, choice: string) {
    setSelectedAnswers((current) => ({
      ...current,
      [index]: choice,
    }));
    setCompleted(false);
  }

  function retry() {
    setSelectedAnswers({});
    setCompleted(false);
  }

  function submitMasteryCheck() {
    setCompleted(true);

    if (passed) {
      updateProgress({ masteryCompleted: true });
    }
  }

  return (
    <div className="mt-8 grid gap-6 text-left">
      <div className="rounded-3xl border border-purple-100 bg-purple-50 p-5 text-center">
        <p className="text-sm font-black uppercase tracking-wide text-purple-600">
          Mastery requirement
        </p>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-950">
          Complete all questions, then submit your mastery check. 100% is
          required to master Module {sectionCode}.
        </p>
      </div>

      {questions.map((question, index) => (
        <article
          key={question.prompt}
          className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left"
        >
          <p className="text-sm font-black uppercase tracking-wide text-purple-600">
            Question {index + 1}
          </p>

          <h3 className="mt-2 text-xl font-black text-slate-950">
            {question.prompt}
          </h3>

          <div className="mt-5 grid gap-3">
            {question.choices.map((choice) => (
              <label
                key={choice}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-950"
              >
                <input
                  checked={selectedAnswers[index] === choice}
                  className="h-4 w-4"
                  disabled={completed}
                  name={`mastery-${sectionCode}-${index}`}
                  onChange={() => updateAnswer(index, choice)}
                  type="radio"
                />
                {choice}
              </label>
            ))}
          </div>

          {completed ? (
            <AnswerFeedback
              correctAnswer={question.answer}
              explanation={question.explanation}
              isCorrect={selectedAnswers[index] === question.answer}
              message={getPositiveFeedback(index)}
            />
          ) : null}
        </article>
      ))}

      <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-center">
        {completed ? (
          <>
            <p className="text-sm font-black uppercase tracking-wide text-blue-600">
              Final score
            </p>
            <div className="mt-3 text-7xl font-black tracking-tight text-slate-950">
              {score}%
            </div>
            <p className="mt-3 text-lg font-black text-slate-950">
              {passed ? "Module completed" : "Retry required"}
            </p>
            <div className="mt-6 h-4 rounded-full bg-white">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                style={{ width: `${score}%` }}
              />
            </div>
          </>
        ) : (
          <p className="text-base font-black text-slate-950">
            Score will appear after final submission. 100% required to master.
          </p>
        )}

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!allAnswered}
            onClick={submitMasteryCheck}
          >
            Submit Mastery Check
          </button>

          {completed ? (
            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:border-slate-400"
              onClick={retry}
            >
              Retry
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function AnswerFeedback({
  correctAnswer,
  explanation,
  isCorrect,
  message,
}: {
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
  message: string;
}) {
  return (
    <div
      className={`mt-5 rounded-2xl border p-4 text-center ${
        isCorrect
          ? "border-green-200 bg-green-50"
          : "border-pink-200 bg-pink-50"
      }`}
    >
      <p
        className={`text-sm font-black uppercase tracking-wide ${
          isCorrect ? "text-green-700" : "text-pink-700"
        }`}
      >
        {isCorrect ? message : "Incorrect"}
      </p>
      <p className="mt-2 text-sm font-black text-slate-950">
        Correct answer: {correctAnswer}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        {explanation}
      </p>
    </div>
  );
}
