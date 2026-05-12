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

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function parseArrayResponse(response: string) {
  try {
    return JSON.parse(response) as string[];
  } catch {
    return [];
  }
}

function parseRecordResponse(response: string) {
  try {
    return JSON.parse(response) as Record<string, string>;
  } catch {
    return {};
  }
}

function sameStringSet(left: string[], right: string[]) {
  return (
    left.length === right.length &&
    left.every((item) => right.includes(item)) &&
    right.every((item) => left.includes(item))
  );
}

function isAnswered(question: QuestionContent, response: string) {
  if (question.type === "fill-blank") {
    return response.trim().length > 0;
  }

  if (question.type === "matching") {
    const record = parseRecordResponse(response);
    return Boolean(
      question.pairs?.every((pair) => record[pair.term]),
    );
  }

  if (question.type === "sorting") {
    const record = parseRecordResponse(response);
    return Boolean(
      question.items?.every((item) => record[item.label]),
    );
  }

  if (question.type === "select-all") {
    return parseArrayResponse(response).length > 0;
  }

  return response.length > 0;
}

function isCorrect(question: QuestionContent, response: string) {
  if (question.type === "fill-blank") {
    return normalize(response) === normalize(question.answer);
  }

  if (question.type === "matching") {
    const record = parseRecordResponse(response);
    return Boolean(
      question.pairs?.every((pair) => record[pair.term] === pair.definition),
    );
  }

  if (question.type === "sorting") {
    const record = parseRecordResponse(response);
    return Boolean(
      question.items?.every((item) => record[item.label] === item.category),
    );
  }

  if (question.type === "select-all") {
    const selected = parseArrayResponse(response);
    const answers = question.answers ?? [question.answer];
    return sameStringSet(selected, answers);
  }

  return response === question.answer;
}

function updateRecordResponse(
  response: string,
  key: string,
  value: string,
  onChange: (value: string) => void,
) {
  const record = parseRecordResponse(response);
  onChange(JSON.stringify({ ...record, [key]: value }));
}

function updateArrayResponse(
  response: string,
  choice: string,
  checked: boolean,
  onChange: (value: string) => void,
) {
  const selected = parseArrayResponse(response);
  const next = checked
    ? [...selected, choice]
    : selected.filter((item) => item !== choice);
  onChange(JSON.stringify(next));
}

function getQuestionLabel(question: QuestionContent) {
  const labels = {
    "fill-blank": "Fill in the blank",
    matching: "Matching",
    "multiple-choice": "Multiple choice",
    scenario: "Scenario",
    "select-all": "Select all that apply",
    sorting: "Sorting",
    "true-false": "True / false",
  };

  return labels[question.type ?? "multiple-choice"];
}

function QuestionResponseInput({
  disabled = false,
  name,
  onChange,
  question,
  response,
}: {
  disabled?: boolean;
  name: string;
  onChange: (value: string) => void;
  question: QuestionContent;
  response: string;
}) {
  if (question.type === "fill-blank") {
    return (
      <input
        className="mt-5 w-full rounded-2xl border border-slate-200 bg-white p-4 text-base font-bold text-slate-950 outline-none transition focus:border-blue-400"
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type your answer"
        value={response}
      />
    );
  }

  if (question.type === "matching" && question.pairs) {
    const record = parseRecordResponse(response);
    const definitions = question.pairs.map((pair) => pair.definition);

    return (
      <div className="mt-5 grid gap-3">
        {question.pairs.map((pair) => (
          <label
            className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-950 sm:grid-cols-[0.8fr_1.2fr] sm:items-center"
            key={pair.term}
          >
            <span>{pair.term}</span>
            <select
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-950"
              disabled={disabled}
              onChange={(event) =>
                updateRecordResponse(response, pair.term, event.target.value, onChange)
              }
              value={record[pair.term] ?? ""}
            >
              <option value="">Choose match</option>
              {definitions.map((definition) => (
                <option key={definition} value={definition}>
                  {definition}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "sorting" && question.items && question.categories) {
    const record = parseRecordResponse(response);
    const categories = question.categories;

    return (
      <div className="mt-5 grid gap-3">
        {question.items.map((item) => (
          <div
            className="rounded-2xl border border-slate-200 bg-white p-4"
            key={item.label}
          >
            <p className="text-sm font-black text-slate-950">{item.label}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {categories.map((category) => (
                <label
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-950"
                  key={category}
                >
                  <input
                    checked={record[item.label] === category}
                    disabled={disabled}
                    name={`${name}-${item.label}`}
                    onChange={() =>
                      updateRecordResponse(response, item.label, category, onChange)
                    }
                    type="radio"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (question.type === "select-all" && question.choices) {
    const selected = parseArrayResponse(response);

    return (
      <div className="mt-5 grid gap-3">
        {question.choices.map((choice) => (
          <label
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-950"
            key={choice}
          >
            <input
              checked={selected.includes(choice)}
              className="h-4 w-4"
              disabled={disabled}
              onChange={(event) =>
                updateArrayResponse(response, choice, event.target.checked, onChange)
              }
              type="checkbox"
            />
            {choice}
          </label>
        ))}
      </div>
    );
  }

  const choices = question.choices ?? ["True", "False"];

  return (
    <div className="mt-5 grid gap-3">
      {choices.map((choice) => (
        <label
          key={choice}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-950"
        >
          <input
            checked={response === choice}
            className="h-4 w-4"
            disabled={disabled}
            name={name}
            onChange={() => onChange(choice)}
            type="radio"
          />
          {choice}
        </label>
      ))}
    </div>
  );
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
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { updateProgress } = useModuleProgress(sectionSlug);
  const answered = isAnswered(question, response);
  const correct = isCorrect(question, response);

  function updatePracticeResult(result: boolean) {
    if (mode !== "practice" || !totalQuestions || typeof window === "undefined") {
      return;
    }

    const key = `aba-mastered:tco6:${sectionSlug}:practice-results`;
    const stored = window.localStorage.getItem(key);
    const results = stored ? JSON.parse(stored) as Record<string, boolean> : {};
    results[index] = result;
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
        Question {index + 1} / {getQuestionLabel(question)}
      </p>

      <h3 className="mt-2 text-xl font-black text-slate-950">
        {question.prompt}
      </h3>

      <QuestionResponseInput
        name={`${mode}-${sectionSlug}-${index}`}
        onChange={(value) => {
          setResponse(value);
          setSubmitted(false);
          updatePracticeResult(false);
        }}
        question={question}
        response={response}
      />

      <button
        type="button"
        className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!answered}
        onClick={() => {
          setSubmitted(true);
          updatePracticeResult(correct);
        }}
      >
        Submit Answer
      </button>

      {submitted ? (
        <AnswerFeedback
          correctAnswer={question.answer}
          explanation={question.explanation}
          isCorrect={correct}
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
  const question: QuestionContent = {
    prompt: `Which answer best matches this TCO 6 item? ${item}`,
    choices: [
      "Correct module concept placeholder",
      "Related but less precise ABA term",
      "Common exam distractor",
      "Clinically incomplete answer",
    ],
    answer: "Correct module concept placeholder",
    explanation:
      "Rationale feedback will explain why the correct answer matches the TCO 6 checklist item and why each distractor is less precise.",
  };

  return (
    <PracticeQuestionCard
      index={index}
      mode="practice"
      question={question}
      sectionSlug={sectionSlug}
      totalQuestions={1}
    />
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
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);
  const correctCount = useMemo(
    () =>
      questions.reduce(
        (total, question, index) =>
          isCorrect(question, responses[index] ?? "") ? total + 1 : total,
        0,
      ),
    [questions, responses],
  );
  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score === 100;
  const allAnswered = questions.every((question, index) =>
    isAnswered(question, responses[index] ?? ""),
  );
  const { updateProgress } = useModuleProgress(sectionSlug);

  function updateAnswer(index: number, value: string) {
    setResponses((current) => ({
      ...current,
      [index]: value,
    }));
    setCompleted(false);
  }

  function retry() {
    setResponses({});
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
            Question {index + 1} / {getQuestionLabel(question)}
          </p>

          <h3 className="mt-2 text-xl font-black text-slate-950">
            {question.prompt}
          </h3>

          <QuestionResponseInput
            disabled={completed}
            name={`mastery-${sectionCode}-${index}`}
            onChange={(value) => updateAnswer(index, value)}
            question={question}
            response={responses[index] ?? ""}
          />

          {completed ? (
            <AnswerFeedback
              correctAnswer={question.answer}
              explanation={question.explanation}
              isCorrect={isCorrect(question, responses[index] ?? "")}
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
