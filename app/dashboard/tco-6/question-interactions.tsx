"use client";

import { useEffect, useMemo, useState } from "react";
import { FormattedConceptText } from "@/components/learning-ui";
import { masteryThreshold } from "./data";
import { GraphCard } from "./module-d-graphs";
import {
  SaveProgressButton,
  persistProgressValueSoon,
  persistModuleScore,
  practiceAnswersKey,
  practiceResultsKey,
  readSavedModuleProgress,
  saveModuleProgressSnapshot,
  useModuleProgress,
} from "./progression";
import type { QuestionContent } from "./section-b-content";

const positiveFeedbackMessages = [
  "Great job!",
  "Good job! You are correct!",
  "Excellent work!",
  "Excellent discrimination!",
  "Correct!",
  "Nice work!",
  "You got it!",
];

function getPositiveFeedback(index: number) {
  return positiveFeedbackMessages[index % positiveFeedbackMessages.length];
}

function getPracticeRemediationAttemptLimit(sectionSlug: string) {
  return sectionSlug === "a" ? 3 : 4;
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

function shouldHideGraphMetadata(sectionSlug: string) {
  return ["c", "d", "e"].includes(sectionSlug);
}

function getMultipleChoiceMasteryQuestions(questions: QuestionContent[]) {
  return questions
    .filter((question) => {
      const authoredMultipleChoice =
        question.type === "multiple-choice" ||
        question.type === "scenario" ||
        !question.type;
      return Boolean(
        authoredMultipleChoice &&
          question.choices?.includes(question.answer) &&
          question.choices.filter((choice) => choice === question.answer).length === 1,
      );
    })
    .map((question) => ({
      ...question,
      type: "multiple-choice" as const,
    }));
}

function hashString(value: string) {
  return value.split("").reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) >>> 0;
  }, 7);
}

function seededRandom(seed: number) {
  const next = Math.sin(seed) * 10000;
  return next - Math.floor(next);
}

function shuffleQuestions(questions: QuestionContent[], seed: number) {
  return [...questions]
    .map((question, index) => ({
      question,
      sort: seededRandom(seed + index + hashString(question.prompt)),
    }))
    .sort((left, right) => left.sort - right.sort)
    .map((item) => item.question);
}

function orderQuestionsBySavedPromptOrder(
  questions: QuestionContent[],
  savedQuestionOrder?: string[],
) {
  if (!savedQuestionOrder?.length) {
    return questions;
  }

  const questionsByPrompt = new Map(
    questions.map((question) => [question.prompt, question]),
  );
  const orderedQuestions = savedQuestionOrder
    .map((prompt) => questionsByPrompt.get(prompt))
    .filter((question): question is QuestionContent => Boolean(question));
  const orderedPrompts = new Set(savedQuestionOrder);
  const remainingQuestions = questions.filter(
    (question) => !orderedPrompts.has(question.prompt),
  );

  return [...orderedQuestions, ...remainingQuestions];
}

function uniqueStringValues(values: string[]) {
  return Array.from(new Set(values));
}

function shuffleStringValues(values: string[], seedSource: string) {
  const uniqueValues = uniqueStringValues(values);
  const shuffled = uniqueValues
    .map((value, index) => ({
      value,
      sort: seededRandom(hashString(seedSource) + index + hashString(value)),
    }))
    .sort((left, right) => left.sort - right.sort)
    .map((item) => item.value);
  const unchanged =
    shuffled.length > 1 &&
    shuffled.every((value, index) => value === uniqueValues[index]);

  return unchanged ? [...shuffled.slice(1), shuffled[0]] : shuffled;
}

const centeredResponseGroupClass =
  "mx-auto mt-5 flex w-full max-w-3xl flex-wrap justify-center gap-3";
const responseChoiceCardClass = "w-full md:w-[calc(50%_-_0.375rem)]";
const centeredWideResponseGroupClass =
  "mx-auto mt-5 flex w-full max-w-4xl flex-wrap justify-center gap-3";
const wideResponseCardClass = "w-full md:w-[calc(50%_-_0.375rem)]";

function readStoredAnswer(sectionSlug: string, index: number) {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const stored = window.localStorage.getItem(practiceAnswersKey(sectionSlug));
    const answers = stored ? JSON.parse(stored) as Record<string, string> : {};
    return answers[index] ?? "";
  } catch {
    return "";
  }
}

function writeStoredAnswer(sectionSlug: string, index: number, value: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const key = practiceAnswersKey(sectionSlug);
    const stored = window.localStorage.getItem(key);
    const answers = stored ? JSON.parse(stored) as Record<string, string> : {};
    answers[index] = value;
    window.localStorage.setItem(key, JSON.stringify(answers));
    persistProgressValueSoon(key, answers);
  } catch {
    const key = practiceAnswersKey(sectionSlug);
    const answers = { [index]: value };
    window.localStorage.setItem(
      key,
      JSON.stringify(answers),
    );
    persistProgressValueSoon(key, answers);
  }
}

function readStoredAnswers(sectionSlug: string) {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(practiceAnswersKey(sectionSlug));
    return stored ? JSON.parse(stored) as Record<string, string> : {};
  } catch {
    return {};
  }
}

type PracticeFeedbackState = {
  answerRevealVisible: boolean;
  feedbackState: "idle" | "correct" | "hint" | "remediation";
  incorrectAttempts: number;
  isCorrect: boolean;
  submitted: boolean;
};

const emptyPracticeFeedbackState: PracticeFeedbackState = {
  answerRevealVisible: false,
  feedbackState: "idle",
  incorrectAttempts: 0,
  isCorrect: false,
  submitted: false,
};

function practiceFeedbackKey(sectionSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:practice-feedback`;
}

function readStoredPracticeFeedback(sectionSlug: string, index: number) {
  if (typeof window === "undefined") {
    return emptyPracticeFeedbackState;
  }

  try {
    const stored = window.localStorage.getItem(practiceFeedbackKey(sectionSlug));
    const feedback = stored
      ? JSON.parse(stored) as Record<string, PracticeFeedbackState>
      : {};
    return { ...emptyPracticeFeedbackState, ...feedback[index] };
  } catch {
    return emptyPracticeFeedbackState;
  }
}

function readStoredPracticeResults(sectionSlug: string) {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(practiceResultsKey(sectionSlug));
    return stored ? JSON.parse(stored) as Record<string, boolean> : {};
  } catch {
    return {};
  }
}

function writeStoredPracticeFeedback(
  sectionSlug: string,
  index: number,
  state: PracticeFeedbackState,
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const key = practiceFeedbackKey(sectionSlug);
    const stored = window.localStorage.getItem(key);
    const feedback = stored
      ? JSON.parse(stored) as Record<string, PracticeFeedbackState>
      : {};
    feedback[index] = state;
    window.localStorage.setItem(key, JSON.stringify(feedback));
    persistProgressValueSoon(key, feedback);
  } catch {
    const key = practiceFeedbackKey(sectionSlug);
    const feedback = { [index]: state };
    window.localStorage.setItem(
      key,
      JSON.stringify(feedback),
    );
    persistProgressValueSoon(key, feedback);
  }
}

function getPracticeRemediationDetails(question: QuestionContent) {
  if (question.type === "matching" && question.pairs) {
    return {
      heading: "Correct matches:",
      items: question.pairs.map((pair) => `${pair.term} \u2192 ${pair.definition}`),
    };
  }

  if (question.type === "sorting" && question.items) {
    return {
      heading: "Correct sorting:",
      items: question.items.map((item) => `${item.label} \u2192 ${item.category}`),
    };
  }

  if (question.type === "select-all") {
    return {
      heading: "Correct selections:",
      items: question.answers ?? [question.answer],
    };
  }

  return undefined;
}

function getQuestionText(question: QuestionContent) {
  return [
    question.prompt,
    ...(question.choices ?? []),
    ...(question.categories ?? []),
    ...(question.answers ?? []),
    ...(question.pairs ?? []).flatMap((pair) => [pair.term, pair.definition]),
    ...(question.items ?? []).flatMap((item) => [item.label, item.category]),
  ]
    .join(" ")
    .toLowerCase();
}

function getConceptHint(question: QuestionContent) {
  if (question.hint) {
    return question.hint;
  }

  const text = getQuestionText(question);

  if (
    text.includes("independent variable") ||
    text.includes("dependent variable") ||
    text.includes("extraneous variable") ||
    text.includes("confounding variable") ||
    text.includes("variable term")
  ) {
    return "Separate what the analyst changes, what behavior is measured, and what other events could explain the data pattern.";
  }

  if (
    text.includes("component analysis") ||
    text.includes("parametric analysis") ||
    text.includes("comparative analysis")
  ) {
    return "Ask whether the question is comparing interventions, identifying active package parts, or testing different values of one independent variable.";
  }

  if (
    text.includes("sequence effect") ||
    text.includes("response generalization") ||
    text.includes("administrative") ||
    text.includes("staff support") ||
    text.includes("consent")
  ) {
    return "Look for the applied-design issue: order effects, independence across tiers, participant safety, consent, or implementation support.";
  }

  if (
    text.includes("reversal") ||
    text.includes("withdrawal") ||
    text.includes("multiple baseline") ||
    text.includes("alternating treatments") ||
    text.includes("multielement") ||
    text.includes("changing criterion")
  ) {
    return "Identify the design by its graph pattern: repeated condition changes, staggered tiers, rapid alternation, or stepwise criterion shifts.";
  }

  if (
    text.includes("experimental control") ||
    text.includes("internal validity") ||
    text.includes("external validity") ||
    text.includes("threat") ||
    text.includes("history") ||
    text.includes("maturation") ||
    text.includes("instrumentation")
  ) {
    return "Ask whether the design rules out alternative explanations, shows the independent variable caused change, or supports generality beyond the original case.";
  }

  if (
    text.includes("visual analysis") ||
    text.includes("level") ||
    text.includes("trend") ||
    text.includes("variability") ||
    text.includes("overlap") ||
    text.includes("immediacy") ||
    text.includes("graph")
  ) {
    return "Use the graph features: level, trend, variability, immediacy of effect, overlap, and consistency across similar phases.";
  }

  if (
    text.includes("reinforcement") ||
    text.includes("punishment") ||
    text.includes("escape") ||
    text.includes("avoidance")
  ) {
    return "Start with the behavioral effect: did future responding increase or decrease? Then check whether the consequence added something or removed, reduced, delayed, or avoided something.";
  }

  if (
    text.includes("motivating operation") ||
    text.includes("establishing operation") ||
    text.includes("abolishing operation") ||
    text.includes("discriminative stimulus") ||
    text.includes("s-delta")
  ) {
    return "Separate value from availability: one antecedent changes how effective a consequence is, while another signals whether reinforcement is available for a response.";
  }

  if (
    text.includes("respondent") ||
    text.includes("operant") ||
    text.includes("conditioned stimulus") ||
    text.includes("unconditioned stimulus") ||
    text.includes("conditioned response")
  ) {
    return "Ask whether the relation is stimulus-stimulus pairing that elicits responding, or behavior selected by what happens after the response.";
  }

  if (
    text.includes("extinction") ||
    text.includes("spontaneous recovery") ||
    text.includes("extinction burst")
  ) {
    return "Identify what previously maintained the response or reflex, then check whether that maintaining relation is discontinued.";
  }

  if (
    text.includes("schedule") ||
    text.includes("fixed") ||
    text.includes("variable") ||
    text.includes("ratio") ||
    text.includes("interval") ||
    text.includes("concurrent") ||
    text.includes("multiple") ||
    text.includes("mixed") ||
    text.includes("chained")
  ) {
    return "Use the schedule cues: response count versus time, fixed versus variable, simultaneous versus alternating, signaled versus unsignaled, and ordered sequences.";
  }

  if (
    text.includes("generalization") ||
    text.includes("maintenance") ||
    text.includes("setting event")
  ) {
    return "Check whether the behavior is occurring under new conditions, persisting over time, or being affected by broader contextual variables.";
  }

  if (
    text.includes("matching law") ||
    text.includes("behavioral momentum") ||
    text.includes("imitation") ||
    text.includes("observational learning")
  ) {
    return "Look at the relation being tested: response allocation across alternatives, high-probability request sequences, formal similarity, or learning after observing a model and consequences.";
  }

  if (
    text.includes("mand") ||
    text.includes("tact") ||
    text.includes("echoic") ||
    text.includes("intraverbal") ||
    text.includes("textual") ||
    text.includes("transcription") ||
    text.includes("listener responding") ||
    text.includes("autoclitic") ||
    text.includes("multiple control")
  ) {
    return "For verbal behavior, compare the controlling variable: motivation and specific reinforcement, nonverbal stimuli, verbal stimuli, point-to-point correspondence, formal similarity, or listener action.";
  }

  if (
    text.includes("behavior") ||
    text.includes("response") ||
    text.includes("response class") ||
    text.includes("stimulus") ||
    text.includes("stimulus class")
  ) {
    return "Decide whether the question is asking about organism activity, one instance of that activity, a group of responses, one environmental event, or a group of stimuli.";
  }

  if (question.type === "matching") {
    return "Compare the critical feature in each prompt with the critical feature in each definition before matching them.";
  }

  if (question.type === "sorting") {
    return "Compare the categories first, then sort each example by the feature that makes the categories different.";
  }

  if (question.type === "select-all") {
    return "Check each option independently and ask whether it meets every part of the question.";
  }

  if (question.type === "fill-blank") {
    return "Focus on the missing discriminating cue instead of the surrounding sentence.";
  }

  if (question.type === "true-false") {
    return "Check whether every part of the statement is accurate, not just the first familiar term.";
  }

  if (question.type === "scenario") {
    return "Focus on the controlling variable, what happens before the behavior, and what happens after the behavior.";
  }

  return "Compare the answer choices by their critical differences before choosing the most accurate option.";
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
  const matchingDefinitions = useMemo(
    () =>
      question.pairs
        ? shuffleStringValues(
            question.pairs.map((pair) => pair.definition),
            question.prompt,
          )
        : [],
    [question.pairs, question.prompt],
  );

  if (question.type === "fill-blank") {
    return (
      <input
        className="mx-auto mt-5 block w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 text-base font-bold text-slate-950 outline-none transition focus:border-blue-400"
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type your answer"
        value={response}
      />
    );
  }

  if (question.type === "matching" && question.pairs) {
    const record = parseRecordResponse(response);

    return (
      <div className="mx-auto mt-5 flex w-full max-w-4xl flex-col items-stretch gap-3">
        {question.pairs.map((pair) => (
          <label
            className="grid min-h-20 w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-950 shadow-sm sm:grid-cols-[minmax(10rem,0.9fr)_minmax(16rem,1.35fr)] sm:gap-5"
            key={pair.term}
          >
            <span className="flex min-h-10 items-center leading-6">
              <FormattedConceptText text={pair.term} />
            </span>
            <select
              className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold leading-6 text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              disabled={disabled}
              onChange={(event) =>
                updateRecordResponse(response, pair.term, event.target.value, onChange)
              }
              value={record[pair.term] ?? ""}
            >
              <option value="">Choose match</option>
              {matchingDefinitions.map((definition) => (
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
      <div className={centeredWideResponseGroupClass}>
        {question.items.map((item) => (
          <div
            className={`${wideResponseCardClass} rounded-2xl border border-slate-200 bg-white p-4`}
            key={item.label}
          >
            <p className="text-sm font-black text-slate-950">
              <FormattedConceptText text={item.label} />
            </p>
            <div className="mx-auto mt-3 flex w-full max-w-3xl flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <label
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-950 sm:w-[calc(50%_-_0.25rem)]"
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
                  <FormattedConceptText text={category} />
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
      <div className={centeredResponseGroupClass}>
        {question.choices.map((choice) => (
          <label
            className={`${responseChoiceCardClass} flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-950`}
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
            <FormattedConceptText text={choice} />
          </label>
        ))}
      </div>
    );
  }

  const choices = question.choices ?? ["True", "False"];

  return (
    <div className={centeredResponseGroupClass}>
      {choices.map((choice) => (
        <label
          key={choice}
          className={`${responseChoiceCardClass} flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-950`}
        >
          <input
            checked={response === choice}
            className="h-4 w-4"
            disabled={disabled}
            name={name}
            onChange={() => onChange(choice)}
            type="radio"
          />
          <FormattedConceptText text={choice} />
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
  const [response, setResponse] = useState(() =>
    mode === "practice" ? readStoredAnswer(sectionSlug, index) : "",
  );
  const [submitted, setSubmitted] = useState(() => {
    if (mode !== "practice") {
      return false;
    }

    const savedAnswer = readStoredAnswer(sectionSlug, index);
    const savedFeedback = readStoredPracticeFeedback(sectionSlug, index);
    return Boolean(
      savedAnswer &&
      savedFeedback.submitted &&
      savedFeedback.feedbackState !== "idle",
    );
  });
  const [incorrectAttempts, setIncorrectAttempts] = useState(() =>
    mode === "practice"
      ? readStoredPracticeFeedback(sectionSlug, index).incorrectAttempts
      : 0,
  );
  const [answerRevealVisible, setAnswerRevealVisible] = useState(() =>
    mode === "practice"
      ? readStoredPracticeFeedback(sectionSlug, index).answerRevealVisible
      : false,
  );
  const { updateProgress } = useModuleProgress(sectionSlug);
  const answered = isAnswered(question, response);
  const correct = isCorrect(question, response);
  const remediationAttemptLimit = getPracticeRemediationAttemptLimit(sectionSlug);

  useEffect(() => {
    if (mode !== "practice") {
      return;
    }

    function syncSavedPracticeState() {
      const savedAnswer = readStoredAnswer(sectionSlug, index);
      const savedFeedback = readStoredPracticeFeedback(sectionSlug, index);

      setResponse(savedAnswer);
      setSubmitted(
        Boolean(
          savedAnswer &&
            savedFeedback.submitted &&
            savedFeedback.feedbackState !== "idle",
        ),
      );
      setIncorrectAttempts(savedFeedback.incorrectAttempts);
      setAnswerRevealVisible(savedFeedback.answerRevealVisible);
    }

    window.addEventListener(
      "aba-mastered-remote-progress-hydrated",
      syncSavedPracticeState,
    );

    return () =>
      window.removeEventListener(
        "aba-mastered-remote-progress-hydrated",
        syncSavedPracticeState,
      );
  }, [index, mode, sectionSlug]);

  function updatePracticeResult(result: boolean) {
    if (mode !== "practice" || !totalQuestions || typeof window === "undefined") {
      return;
    }

    const key = practiceResultsKey(sectionSlug);
    const stored = window.localStorage.getItem(key);
    const results = stored ? JSON.parse(stored) as Record<string, boolean> : {};
    results[index] = result;
    window.localStorage.setItem(key, JSON.stringify(results));
    persistProgressValueSoon(key, results);

    const answeredCount = Object.keys(results).length;
    const correctCount = Object.values(results).filter(Boolean).length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const complete = answeredCount === totalQuestions && correctCount === totalQuestions;

    void persistModuleScore(sectionSlug, score, complete);
    if (!complete) {
      updateProgress({ practiceCompleted: false });
    }
    window.dispatchEvent(
      new CustomEvent("aba-mastered-practice-result", {
        detail: { complete, correctCount, sectionSlug, totalQuestions },
      }),
    );
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
      <p className="text-sm font-black uppercase tracking-wide text-purple-600">
        Question {index + 1} / {getQuestionLabel(question)}
      </p>

      <h3 className="mt-2 text-xl font-black text-slate-950">
        <FormattedConceptText text={question.prompt} />
      </h3>

      {question.graphId ? (
        <GraphCard
          className="mt-5"
          genericPanelLabels={
            mode === "practice" || shouldHideGraphMetadata(sectionSlug)
          }
          graphId={question.graphId}
          hideCallouts={mode === "practice" || shouldHideGraphMetadata(sectionSlug)}
          hideDescription={
            mode === "practice" || shouldHideGraphMetadata(sectionSlug)
          }
          monochrome={mode === "practice"}
          titleOverride={
            mode === "practice" || shouldHideGraphMetadata(sectionSlug)
              ? `Graph for Question ${index + 1}`
              : undefined
          }
        />
      ) : null}

      <QuestionResponseInput
        name={`${mode}-${sectionSlug}-${index}`}
        onChange={(value) => {
          setResponse(value);
          if (mode === "practice") {
            writeStoredAnswer(sectionSlug, index, value);
            writeStoredPracticeFeedback(sectionSlug, index, {
              ...emptyPracticeFeedbackState,
              incorrectAttempts,
            });
          }
          setSubmitted(false);
          setAnswerRevealVisible(false);
          updatePracticeResult(false);
        }}
        question={question}
        response={response}
      />

      <button
        type="button"
          className="mx-auto mt-5 block rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!answered}
        onClick={() => {
          const nextIncorrectAttempts =
            mode === "practice" && !correct
              ? incorrectAttempts + 1
              : incorrectAttempts;
          const answerRevealVisible =
            mode === "practice" &&
            !correct &&
            nextIncorrectAttempts >= remediationAttemptLimit;

          setSubmitted(true);
          setAnswerRevealVisible(answerRevealVisible);
          if (mode === "practice" && !correct) {
            setIncorrectAttempts(nextIncorrectAttempts);
          }
          if (mode === "practice") {
            writeStoredPracticeFeedback(sectionSlug, index, {
              answerRevealVisible,
              feedbackState: correct
                ? "correct"
                : answerRevealVisible
                  ? "remediation"
                  : "hint",
              incorrectAttempts: nextIncorrectAttempts,
              isCorrect: correct,
              submitted: true,
            });
          }
          updatePracticeResult(correct);
        }}
      >
        Submit Answer
      </button>

      {submitted ? (
        <AnswerFeedback
          correctAnswer={question.answer}
          explanation={question.explanation}
          hint={mode === "practice" ? getConceptHint(question) : undefined}
          incorrectAttempts={mode === "practice" ? incorrectAttempts : 0}
          isCorrect={correct}
          message={getPositiveFeedback(index)}
          remediationDetails={
            mode === "practice" ? getPracticeRemediationDetails(question) : undefined
          }
          revealIncorrectAnswer={
            mode === "practice" &&
            (answerRevealVisible || incorrectAttempts >= remediationAttemptLimit)
          }
          remediationAttemptLimit={remediationAttemptLimit}
        />
      ) : null}
    </article>
  );
}

export function PracticeCompletionButton({
  sectionSlug,
  totalQuestions,
}: {
  sectionSlug: string;
  totalQuestions: number;
}) {
  const { updateProgress } = useModuleProgress(sectionSlug);
  const [summary, setSummary] = useState(() =>
    getPracticeCompletionSummary(sectionSlug, totalQuestions),
  );
  const [message, setMessage] = useState("");
  const complete =
    totalQuestions > 0 &&
    summary.answeredCount === totalQuestions &&
    summary.correctCount === totalQuestions;

  useEffect(() => {
    function sync() {
      setSummary(getPracticeCompletionSummary(sectionSlug, totalQuestions));
    }

    sync();
    window.addEventListener("aba-mastered-practice-result", sync);
    window.addEventListener("aba-mastered-remote-progress-hydrated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("aba-mastered-practice-result", sync);
      window.removeEventListener("aba-mastered-remote-progress-hydrated", sync);
      window.removeEventListener("storage", sync);
    };
  }, [sectionSlug, totalQuestions]);

  function completePracticeTest() {
    const latestSummary = getPracticeCompletionSummary(sectionSlug, totalQuestions);
    const latestComplete =
      totalQuestions > 0 &&
      latestSummary.answeredCount === totalQuestions &&
      latestSummary.correctCount === totalQuestions;
    const score =
      totalQuestions > 0
        ? Math.round((latestSummary.correctCount / totalQuestions) * 100)
        : 0;

    setSummary(latestSummary);

    if (!latestComplete) {
      updateProgress({ practiceCompleted: false });
      saveModuleProgressSnapshot(sectionSlug, {
        activity: "practice",
        completedQuestions: Object.entries(latestSummary.results)
          .filter(([, result]) => result)
          .map(([index]) => index),
        currentLocation: `/dashboard/tco-6/${sectionSlug}/practice`,
        passed: false,
        questionResults: latestSummary.results,
        score,
        selectedAnswers: readStoredAnswers(sectionSlug),
        submitted: latestSummary.answeredCount > 0,
        totalQuestions,
      });
      setMessage(
        `Correct the remaining missed questions before completing Practice. ${latestSummary.correctCount} of ${totalQuestions} are correct.`,
      );
      return;
    }

    updateProgress({ practiceCompleted: true });
    void persistModuleScore(sectionSlug, 100, true);
    saveModuleProgressSnapshot(sectionSlug, {
      activity: "practice",
      completedQuestions: Object.keys(latestSummary.results),
      currentLocation: `/dashboard/tco-6/${sectionSlug}/practice`,
      passed: true,
      questionResults: latestSummary.results,
      score: 100,
      selectedAnswers: readStoredAnswers(sectionSlug),
      submitted: true,
      totalQuestions,
    });
    setMessage("Practice Test complete. Mastery Check is now unlocked.");
  }

  return (
    <section className="mx-auto mt-8 w-full max-w-4xl rounded-3xl border border-green-200 bg-green-50 p-6 text-center">
      <p className="text-sm font-black uppercase tracking-wide text-green-700">
        Practice Test Completion
      </p>
      <p className="mt-2 text-base font-semibold leading-7 text-slate-950">
        {summary.correctCount} of {totalQuestions} questions are currently
        correct. Complete Practice requires 100% correct.
      </p>
      <button
        type="button"
        className="mt-5 rounded-xl bg-green-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200"
        onClick={completePracticeTest}
      >
        Complete Practice Test
      </button>
      {message ? (
        <p
          className={`mx-auto mt-4 max-w-2xl rounded-2xl border p-4 text-sm font-black ${
            complete
              ? "border-green-200 bg-white text-green-800"
              : "border-amber-200 bg-amber-50 text-amber-800"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}

function getPracticeCompletionSummary(sectionSlug: string, totalQuestions: number) {
  const results = readStoredPracticeResults(sectionSlug);
  const resultEntries = Object.entries(results).filter(([index]) => {
    const numericIndex = Number(index);
    return Number.isInteger(numericIndex) && numericIndex >= 0 && numericIndex < totalQuestions;
  });

  return {
    answeredCount: resultEntries.length,
    correctCount: resultEntries.filter(([, result]) => result).length,
    results: Object.fromEntries(resultEntries),
  };
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
  const savedMasterySnapshot =
    readSavedModuleProgress(sectionSlug).snapshots["mastery-check"];
  const [responses, setResponses] = useState<Record<number, string>>(() =>
    savedMasterySnapshot?.selectedAnswers ?? {},
  );
  const [incorrectAttempts, setIncorrectAttempts] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(() =>
    Boolean(savedMasterySnapshot?.submitted),
  );
  const [attemptKey, setAttemptKey] = useState(0);
  const [restoredQuestionOrder, setRestoredQuestionOrder] = useState<
    string[] | undefined
  >(() =>
    savedMasterySnapshot?.submitted
      ? savedMasterySnapshot.questionOrder
      : undefined,
  );
  const multipleChoiceQuestions = useMemo(
    () => getMultipleChoiceMasteryQuestions(questions),
    [questions],
  );
  const displayQuestions = useMemo(() => {
    if (restoredQuestionOrder?.length) {
      return orderQuestionsBySavedPromptOrder(
        multipleChoiceQuestions,
        restoredQuestionOrder,
      );
    }

    return shuffleQuestions(
      multipleChoiceQuestions,
      attemptKey + hashString(sectionSlug),
    );
  }, [attemptKey, multipleChoiceQuestions, restoredQuestionOrder, sectionSlug]);

  const correctCount = useMemo(
    () =>
      displayQuestions.reduce(
        (total, question, index) =>
          isCorrect(question, responses[index] ?? "") ? total + 1 : total,
        0,
      ),
    [displayQuestions, responses],
  );
  const score =
    displayQuestions.length > 0
      ? Math.round((correctCount / displayQuestions.length) * 100)
      : 0;
  const passed = score >= masteryThreshold;
  const allAnswered = displayQuestions.every((question, index) =>
    isAnswered(question, responses[index] ?? ""),
  );
  const { updateProgress } = useModuleProgress(sectionSlug);

  useEffect(() => {
    function syncSavedMasteryState() {
      const snapshot =
        readSavedModuleProgress(sectionSlug).snapshots["mastery-check"];

      if (!snapshot?.submitted) {
        return;
      }

      setResponses(snapshot.selectedAnswers ?? {});
      setCompleted(Boolean(snapshot.submitted));
      setRestoredQuestionOrder(snapshot.questionOrder);
    }

    window.addEventListener(
      "aba-mastered-remote-progress-hydrated",
      syncSavedMasteryState,
    );

    return () =>
      window.removeEventListener(
        "aba-mastered-remote-progress-hydrated",
        syncSavedMasteryState,
      );
  }, [sectionSlug]);

  function updateAnswer(index: number, value: string) {
    setResponses((current) => ({
      ...current,
      [index]: value,
    }));
    setCompleted(false);
  }

  function retry() {
    setAttemptKey((current) => current + 1);
    setRestoredQuestionOrder(undefined);
    setResponses({});
    setIncorrectAttempts({});
    setCompleted(false);
  }

  function submitMasteryCheck() {
    const questionResults = Object.fromEntries(
      displayQuestions.map((question, index) => [
        index,
        isCorrect(question, responses[index] ?? ""),
      ]),
    );
    const selectedAnswers = Object.fromEntries(
      Object.entries(responses).map(([index, response]) => [index, response]),
    );

    setIncorrectAttempts((current) => {
      const next = { ...current };
      displayQuestions.forEach((question, index) => {
        if (!isCorrect(question, responses[index] ?? "")) {
          next[index] = (next[index] ?? 0) + 1;
        }
      });
      return next;
    });
    setCompleted(true);
    setRestoredQuestionOrder(displayQuestions.map((question) => question.prompt));

    if (passed) {
      updateProgress({ masteryCompleted: true });
    }

    void persistModuleScore(sectionSlug, score, passed);
    saveModuleProgressSnapshot(sectionSlug, {
      activity: "mastery-check",
      completedQuestions: Object.keys(selectedAnswers),
      currentLocation: `/dashboard/tco-6/${sectionSlug}/mastery-check`,
      passed,
      questionOrder: displayQuestions.map((question) => question.prompt),
      questionResults,
      score,
      selectedAnswers,
      submitted: true,
      totalQuestions: displayQuestions.length,
    });
  }

  return (
    <div className="mx-auto mt-8 grid w-full gap-6 text-left">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-purple-100 bg-purple-50 p-5 text-center">
        <p className="text-sm font-black uppercase tracking-wide text-purple-600">
          Mastery requirement
        </p>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-950">
          Complete the mastery questions, then submit your mastery check.
          <br />
          <br />
          Passing score: {masteryThreshold}% for Module {sectionCode}.
        </p>
      </div>

      <SaveProgressButton
        activity="mastery-check"
        completedQuestions={Object.entries(responses)
          .filter(([, response]) => response.length > 0)
          .map(([index]) => index)}
        currentLocation={`/dashboard/tco-6/${sectionSlug}/mastery-check`}
        passed={completed ? passed : undefined}
        questionOrder={displayQuestions.map((question) => question.prompt)}
        score={score}
        sectionSlug={sectionSlug}
        selectedAnswers={Object.fromEntries(
          Object.entries(responses).map(([index, response]) => [index, response]),
        )}
        submitted={completed}
        totalQuestions={displayQuestions.length}
      />

      {displayQuestions.map((question, index) => (
        <article
          key={question.prompt}
          className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left"
        >
          <p className="text-sm font-black uppercase tracking-wide text-purple-600">
            Question {index + 1} / {getQuestionLabel(question)}
          </p>

          <h3 className="mt-2 text-xl font-black text-slate-950">
            <FormattedConceptText text={question.prompt} />
          </h3>

          {question.graphId ? (
            <GraphCard
              className="mt-5"
              genericPanelLabels
              graphId={question.graphId}
              hideCallouts
              hideDescription
              monochrome
              titleOverride={`Graph for Question ${index + 1}`}
            />
          ) : null}

          <QuestionResponseInput
            disabled={completed && isCorrect(question, responses[index] ?? "")}
            name={`mastery-${sectionCode}-${index}`}
            onChange={(value) => updateAnswer(index, value)}
            question={question}
            response={responses[index] ?? ""}
          />

          {completed ? (
            <AnswerFeedback
              correctAnswer={question.answer}
              explanation={question.explanation}
              hint={getConceptHint(question)}
              incorrectAttempts={incorrectAttempts[index] ?? 0}
              isCorrect={isCorrect(question, responses[index] ?? "")}
              message={getPositiveFeedback(index)}
              revealIncorrectAnswer={(incorrectAttempts[index] ?? 0) >= 4}
            />
          ) : null}
        </article>
      ))}

      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-blue-100 bg-blue-50 p-6 text-center">
        {completed ? (
          <>
            <p className="text-sm font-black uppercase tracking-wide text-blue-600">
              Final score
            </p>
            <div className="mt-3 text-7xl font-black tracking-tight text-slate-950">
              {score}%
            </div>
            <p className="mt-3 text-lg font-black text-slate-950">
              {passed ? "Module completed" : "Retry/remediation required"}
            </p>
            <div className="mt-6 h-4 rounded-full bg-white">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400"
                style={{ width: `${score}%` }}
              />
            </div>
          </>
        ) : (
          <p className="text-base font-black text-slate-950">
            Score will appear after final submission. Passing score:{" "}
            {masteryThreshold}%.
          </p>
        )}

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!allAnswered || displayQuestions.length === 0}
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
  hint,
  incorrectAttempts = 0,
  isCorrect,
  message,
  remediationDetails,
  remediationAttemptLimit = 4,
  revealIncorrectAnswer = false,
}: {
  correctAnswer: string;
  explanation: string;
  hint?: string;
  incorrectAttempts?: number;
  isCorrect: boolean;
  message: string;
  remediationDetails?: {
    heading: string;
    items: string[];
  };
  remediationAttemptLimit?: number;
  revealIncorrectAnswer?: boolean;
}) {
  const showRemediation = !isCorrect && revealIncorrectAnswer;

  return (
    <div
      className={`mx-auto mt-5 w-full max-w-3xl rounded-2xl border p-4 text-center ${
        isCorrect
          ? "border-green-200 bg-green-50"
          : showRemediation
            ? "border-amber-200 bg-amber-50"
          : "border-red-200 bg-red-50"
      }`}
    >
      <p
        className={`text-sm font-black uppercase tracking-wide ${
          isCorrect
            ? "text-green-700"
            : showRemediation
              ? "text-amber-700"
              : "text-red-700"
        }`}
      >
        {isCorrect
          ? message
          : showRemediation
            ? "Review Topic in Learning Modules"
            : "Not quite"}
      </p>
      {showRemediation && remediationDetails ? (
        <div className="mx-auto mt-3 max-w-2xl rounded-2xl border border-amber-200 bg-white/70 p-4 text-left">
          <p className="text-sm font-black text-slate-950">
            {remediationDetails.heading}
          </p>
          <ul className="mt-2 space-y-2 text-sm font-semibold leading-6 text-slate-950">
            {remediationDetails.items.map((item) => (
              <li key={item}>
                <FormattedConceptText text={item} />
              </li>
            ))}
          </ul>
        </div>
      ) : isCorrect || showRemediation ? (
        <p className="mt-2 text-sm font-black text-slate-950">
          <span>Correct answer: </span>
          <FormattedConceptText text={correctAnswer} />
        </p>
      ) : null}
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        <FormattedConceptText
          text={
            isCorrect || showRemediation
              ? explanation
              : `Hint: ${hint ?? explanation}`
          }
        />
      </p>
      {!isCorrect && !showRemediation && incorrectAttempts > 0 ? (
        <p className="mt-2 text-xs font-bold uppercase tracking-wide text-red-700">
          Incorrect attempt {incorrectAttempts} of {remediationAttemptLimit}
        </p>
      ) : null}
    </div>
  );
}
