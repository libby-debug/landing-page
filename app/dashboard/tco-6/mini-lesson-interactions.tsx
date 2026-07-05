"use client";

import { useEffect, useRef, useState } from "react";
import {
  ComparisonDefinitionBlocks,
  FormattedConceptText,
} from "@/components/learning-ui";
import { GraphCard } from "./module-d-graphs";
import { persistProgressValueSoon } from "./progression";
import type { VisualKind } from "./section-b-content";

type LearnInteractionState = {
  answer?: string;
  attempts?: number;
  completed?: boolean;
  matches?: Record<string, string>;
  placements?: Record<string, string>;
  remediation?: boolean;
  selected?: string;
  selectedBoolean?: boolean | null;
  selectedItems?: string[];
  selectedSteps?: string[];
  submitted?: boolean;
};

const learnCorrectFeedbackMessages = [
  "Great job! You are correct.",
  "Nice work! That's right.",
  "Correct - keep going!",
  "You got it!",
  "Excellent discrimination.",
];

function getLearnCorrectFeedback(message: string) {
  const total = [...message].reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );

  return learnCorrectFeedbackMessages[
    total % learnCorrectFeedbackMessages.length
  ];
}

function learnInteractionKey(sectionSlug: string, lessonSlug: string) {
  return `aba-mastered:tco6:${sectionSlug}:learn:${lessonSlug}:interaction`;
}

export function readSavedLearnInteractionState(
  sectionSlug: string,
  lessonSlug: string,
): LearnInteractionState {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(
      learnInteractionKey(sectionSlug, lessonSlug),
    );
    return stored ? JSON.parse(stored) as LearnInteractionState : {};
  } catch {
    return {};
  }
}

function writeSavedLearnInteractionState(
  sectionSlug: string,
  lessonSlug: string,
  state: LearnInteractionState,
) {
  if (typeof window === "undefined") {
    return;
  }

  const key = learnInteractionKey(sectionSlug, lessonSlug);
  window.localStorage.setItem(key, JSON.stringify(state));
  persistProgressValueSoon(key, state);
}

function useLearnInteractionState(sectionSlug: string, lessonSlug: string) {
  const [state, setState] = useState<LearnInteractionState>(() =>
    readSavedLearnInteractionState(sectionSlug, lessonSlug),
  );

  function updateState(patch: LearnInteractionState) {
    setState((current) => {
      const next = { ...current, ...patch };
      writeSavedLearnInteractionState(sectionSlug, lessonSlug, next);
      return next;
    });
  }

  function resetState(patch: LearnInteractionState = {}) {
    const next = {
      attempts: 0,
      completed: false,
      remediation: false,
      submitted: false,
      ...patch,
    };
    writeSavedLearnInteractionState(sectionSlug, lessonSlug, next);
    setState(next);
  }

  return { resetState, state, updateState };
}

function useRestoreLearnCompletion(
  completed: boolean | undefined,
  onPassedChange?: (passed: boolean) => void,
) {
  const onPassedChangeRef = useRef(onPassedChange);

  useEffect(() => {
    onPassedChangeRef.current = onPassedChange;
  }, [onPassedChange]);

  useEffect(() => {
    if (completed) {
      onPassedChangeRef.current?.(true);
    }
  }, [completed]);
}

function nextIncorrectState(attempts = 0) {
  const nextAttempts = attempts + 1;
  return {
    attempts: nextAttempts,
    completed: nextAttempts >= 3,
    remediation: nextAttempts >= 3,
    submitted: true,
  };
}

function defaultLearnHint() {
  return "Compare the critical features in the question before trying again.";
}

function formatArrowPair(left: string, right: string) {
  return `${left} → ${right}`;
}

function LearningQuestionFormatLabel() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <p className="mx-auto mb-4 inline-flex rounded-full border border-blue-200 bg-white/90 px-3 py-1 text-xs font-black text-blue-700 shadow-sm">
      Learning question format: multiple choice/fill-in-the-blank
    </p>
  );
}

function joinAnswerParts(parts: string[]) {
  return parts.filter(Boolean).join("; ");
}

function makeUniqueChoices(answer: string, candidates: string[]) {
  const choices = [answer, ...candidates]
    .map((choice) => choice.trim())
    .filter(Boolean)
    .filter((choice, index, list) => list.indexOf(choice) === index);

  if (choices.length < 2) {
    choices.push("A different option from the lesson");
  }

  return choices.slice(0, 4);
}

function normalizeFillBlankAnswer(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

const centeredTwoColumnGroupClass =
  "mx-auto flex w-full flex-wrap justify-center gap-4";
const noMidWordWrapClass =
  "min-w-0 whitespace-normal break-normal hyphens-none [overflow-wrap:normal] [word-break:normal]";
const mobileInteractionTextClass = "text-[0.8125rem] leading-5 sm:text-sm sm:leading-6";
const twoColumnCardClass =
  `w-full sm:w-[calc(50%_-_0.5rem)] ${noMidWordWrapClass}`;
const centeredChoiceGroupClass =
  "mx-auto mt-5 flex w-full max-w-3xl flex-wrap justify-center gap-3";
const choiceCardClass =
  `w-full sm:w-[calc(50%_-_0.375rem)] ${noMidWordWrapClass}`;
const centeredFourColumnGroupClass =
  "mx-auto mt-5 flex w-full max-w-4xl flex-wrap justify-center gap-3";
const fourColumnCardClass =
  `w-full sm:w-[calc(50%_-_0.375rem)] lg:w-[calc(25%_-_0.5625rem)] ${noMidWordWrapClass}`;

export function InteractiveVisualBlock({
  lessonSlug,
  onPassedChange,
  sectionSlug,
  visual,
}: {
  lessonSlug: string;
  onPassedChange?: (passed: boolean) => void;
  sectionSlug: string;
  visual: VisualKind;
}) {
  if (visual.type === "comparison") {
    return (
      <div className="mx-auto mt-8 w-full max-w-4xl">
        <div className={centeredTwoColumnGroupClass}>
          <div className={twoColumnCardClass}>
            <RevealCard title={visual.leftTitle} text={visual.leftText} tone="blue" />
          </div>
          <div className={twoColumnCardClass}>
            <RevealCard title={visual.rightTitle} text={visual.rightText} tone="teal" />
          </div>
        </div>
        {visual.cue ? (
          <div className="mx-auto mt-5 max-w-3xl rounded-3xl border border-purple-100 bg-purple-50 p-5">
            <ComparisonDefinitionBlocks text={visual.cue} />
          </div>
        ) : null}
        <ChoiceInteraction
          lessonSlug={lessonSlug}
          onPassedChange={onPassedChange}
          sectionSlug={sectionSlug}
          visual={{
            type: "choice",
            prompt: "Which option best captures this comparison?",
            choices: makeUniqueChoices(
              visual.cue ?? `${visual.leftTitle}: ${visual.leftText}; ${visual.rightTitle}: ${visual.rightText}`,
              [
                `${visual.leftTitle}: ${visual.rightText}; ${visual.rightTitle}: ${visual.leftText}`,
                visual.leftText,
                visual.rightText,
              ],
            ),
            answer: visual.cue ?? `${visual.leftTitle}: ${visual.leftText}; ${visual.rightTitle}: ${visual.rightText}`,
            feedback: visual.cue ?? `Correct. ${visual.leftTitle} and ${visual.rightTitle} differ by their critical features.`,
            hint: "Compare the two definitions by their discriminating feature before choosing.",
          }}
        />
      </div>
    );
  }

  if (visual.type === "flow") {
    return (
      <FlowInteraction
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
        visual={visual}
      />
    );
  }

  if (visual.type === "graph") {
    return (
      <GraphInterpretationInteraction
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
        visual={visual}
      />
    );
  }

  if (visual.type === "choice") {
    return (
      <ChoiceInteraction
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
        visual={visual}
      />
    );
  }

  if (visual.type === "matching") {
    return (
      <MatchingInteraction
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
        visual={visual}
      />
    );
  }

  if (visual.type === "true-false") {
    return (
      <TrueFalseInteraction
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
        visual={visual}
      />
    );
  }

  if (visual.type === "sorting") {
    return (
      <SortingInteraction
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
        visual={visual}
      />
    );
  }

  if (visual.type === "fill-blank") {
    return (
      <FillBlankInteraction
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
        visual={visual}
      />
    );
  }

  if (visual.type === "select-all") {
    return (
      <SelectAllInteraction
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
        visual={visual}
      />
    );
  }

  if (visual.type === "quadrant") {
    return (
      <ConsequenceChart
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
      />
    );
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-4xl">
      <div className={`mt-5 ${centeredTwoColumnGroupClass}`}>
        <div className={twoColumnCardClass}>
          <RevealCard title="Example" text={visual.example} tone="blue" />
        </div>
        <div className={twoColumnCardClass}>
          <RevealCard title="Nonexample" text={visual.nonexample} tone="teal" />
        </div>
      </div>
      <ChoiceInteraction
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
        visual={{
          type: "choice",
          prompt: "Which option correctly distinguishes the example from the nonexample?",
          choices: makeUniqueChoices(
            `Example: ${visual.example}; Nonexample: ${visual.nonexample}`,
            [
              `Example: ${visual.nonexample}; Nonexample: ${visual.example}`,
              visual.example,
              visual.nonexample,
            ],
          ),
          answer: `Example: ${visual.example}; Nonexample: ${visual.nonexample}`,
          feedback: "Correct. The example matches the lesson concept; the nonexample is missing the critical feature.",
          hint: "Look for the option that keeps the example and nonexample in their original roles.",
        }}
      />
    </div>
  );
}

function ConsequenceChart({
  lessonSlug,
  onPassedChange,
  sectionSlug,
}: {
  lessonSlug: string;
  onPassedChange?: (passed: boolean) => void;
  sectionSlug: string;
}) {
  const cards = [
    {
      title: "Positive Reinforcement",
      action: "ADDS something",
      outcome: "INCREASES behavior",
      actionTone: "positive",
      outcomeTone: "increase",
    },
    {
      title: "Negative Reinforcement",
      action: "REMOVES something",
      outcome: "INCREASES behavior",
      actionTone: "negative",
      outcomeTone: "increase",
    },
    {
      title: "Positive\nPunishment",
      action: "ADDS something",
      outcome: "DECREASES behavior",
      actionTone: "positive",
      outcomeTone: "decrease",
    },
    {
      title: "Negative Punishment",
      action: "REMOVES something",
      outcome: "DECREASES behavior",
      actionTone: "negative",
      outcomeTone: "decrease",
    },
  ] as const;

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
      <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center">
        <p className="text-sm font-black uppercase tracking-wide text-blue-600">
          How to read this
        </p>
        <p className="mx-auto mt-2 max-w-3xl text-base font-black leading-7 text-slate-950">
          Positive/negative tells what happens to the stimulus.
          Reinforcement/punishment tells what happens to the behavior.
        </p>
      </div>

      <div className={`mt-5 ${centeredTwoColumnGroupClass}`}>
        {cards.map((card) => (
          <div key={card.title} className={twoColumnCardClass}>
            <ConsequenceCard {...card} />
          </div>
        ))}
      </div>
      <ChoiceInteraction
        lessonSlug={lessonSlug}
        onPassedChange={onPassedChange}
        sectionSlug={sectionSlug}
        visual={{
          type: "choice",
          prompt: "Which statement correctly reads the consequence chart?",
          choices: [
            "Positive and negative describe whether a stimulus is added or removed; reinforcement and punishment describe whether behavior increases or decreases.",
            "Positive and negative describe whether behavior increases or decreases; reinforcement and punishment describe whether a stimulus is added or removed.",
            "Positive reinforcement and positive punishment both decrease behavior because something is added.",
            "Negative reinforcement and negative punishment both increase behavior because something is removed.",
          ],
          answer: "Positive and negative describe whether a stimulus is added or removed; reinforcement and punishment describe whether behavior increases or decreases.",
          feedback: "Correct. Positive/negative describes the stimulus change, while reinforcement/punishment describes the future effect on behavior.",
          hint: "Separate the stimulus change from the behavior-change effect.",
        }}
      />
    </div>
  );
}

function ConsequenceCard({
  action,
  actionTone,
  outcome,
  outcomeTone,
  title,
}: {
  action: string;
  actionTone: "positive" | "negative";
  outcome: string;
  outcomeTone: "increase" | "decrease";
  title: string;
}) {
  const actionClass =
    actionTone === "positive"
      ? "border-blue-200 bg-blue-50 text-blue-700"
      : "border-purple-200 bg-purple-50 text-purple-700";
  const outcomeClass =
    outcomeTone === "increase"
      ? "border-green-200 bg-green-50 text-green-700"
      : "border-teal-200 bg-teal-50 text-teal-700";

  return (
    <article className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
      <h3 className="flex min-h-16 items-center justify-center whitespace-pre-line text-2xl font-black leading-tight text-slate-950">
        {title}
      </h3>
      <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Badge className={actionClass}>{action}</Badge>
        <span className="text-xl font-black text-slate-950">+</span>
        <Badge className={outcomeClass}>{outcome}</Badge>
      </div>
    </article>
  );
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`rounded-2xl border px-4 py-3 text-sm font-black uppercase tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}

function FlowInteraction({
  lessonSlug,
  onPassedChange,
  sectionSlug,
  visual,
}: {
  lessonSlug: string;
  onPassedChange?: (passed: boolean) => void;
  sectionSlug: string;
  visual: Extract<VisualKind, { type: "flow" }>;
}) {
  const answer = visual.steps.join(" → ");
  const reversed = [...visual.steps].reverse().join(" → ");
  const swapped = [...visual.steps];

  if (swapped.length > 2) {
    [swapped[1], swapped[2]] = [swapped[2], swapped[1]];
  } else {
    swapped.reverse();
  }

  const rotated = [...visual.steps.slice(1), visual.steps[0]].join(" → ");

  return (
    <ChoiceInteraction
      lessonSlug={lessonSlug}
      onPassedChange={onPassedChange}
      sectionSlug={sectionSlug}
      visual={{
        type: "choice",
        prompt: visual.prompt ?? "Which sequence is correct?",
        choices: makeUniqueChoices(answer, [swapped.join(" → "), reversed, rotated]),
        answer,
        feedback:
          visual.feedback ??
          `Correct. The sequence is ${answer}.`,
        hint: "Look for the option that keeps the steps in their behavior-analytic order.",
      }}
    />
  );
}

function ChoiceInteraction({
  lessonSlug,
  onPassedChange,
  sectionSlug,
  visual,
}: {
  lessonSlug: string;
  onPassedChange?: (passed: boolean) => void;
  sectionSlug: string;
  visual: Extract<VisualKind, { type: "choice" }>;
}) {
  const { resetState, state, updateState } = useLearnInteractionState(
    sectionSlug,
    lessonSlug,
  );
  const [selected, setSelected] = useState(() => state.selected ?? "");
  const [submitted, setSubmitted] = useState(() => Boolean(state.submitted));
  const isCorrect = selected === visual.answer;
  const completed = Boolean(state.completed);
  const remediation = Boolean(state.remediation);
  useRestoreLearnCompletion(completed, onPassedChange);

  function reset() {
    setSelected("");
    setSubmitted(false);
    resetState({ selected: "" });
    onPassedChange?.(false);
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-4xl rounded-3xl border border-purple-100 bg-purple-50 p-5 text-center">
      <LearningQuestionFormatLabel />
      <h3 className="text-2xl font-black text-slate-950">
        <FormattedConceptText text={visual.prompt} />
      </h3>
      <div className={centeredChoiceGroupClass}>
        {visual.choices.map((choice, choiceIndex) => (
          <button
            key={`choice-${choiceIndex}-${choice}`}
            type="button"
            onClick={() => {
              if (completed) {
                return;
              }
              setSelected(choice);
              setSubmitted(false);
              updateState({ selected: choice, submitted: false });
              onPassedChange?.(false);
            }}
            className={`${choiceCardClass} rounded-2xl border p-3 font-black transition sm:p-4 ${mobileInteractionTextClass} ${
              selected === choice
                ? "border-blue-300 bg-blue-50 text-blue-700"
                : "border-white bg-white text-slate-950 hover:border-blue-200"
            }`}
          >
            <FormattedConceptText text={choice} />
          </button>
        ))}
      </div>
      <CheckButton
        disabled={!selected}
        onClick={() => {
          setSubmitted(true);
          if (isCorrect) {
            updateState({
              attempts: state.attempts ?? 0,
              completed: true,
              remediation: false,
              selected,
              submitted: true,
            });
            onPassedChange?.(true);
          } else {
            const nextState = nextIncorrectState(state.attempts);
            updateState({ ...nextState, selected });
            onPassedChange?.(nextState.completed);
          }
        }}
      />
      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          correctAnswer={visual.answer}
          message={
            isCorrect || remediation
              ? visual.feedback
              : visual.hint ?? "Compare the choices by their critical discriminating features."
          }
          remediation={remediation}
          onReset={reset}
        />
      ) : null}
    </div>
  );
}

function GraphInterpretationInteraction({
  lessonSlug,
  onPassedChange,
  sectionSlug,
  visual,
}: {
  lessonSlug: string;
  onPassedChange?: (passed: boolean) => void;
  sectionSlug: string;
  visual: Extract<VisualKind, { type: "graph" }>;
}) {
  const { resetState, state, updateState } = useLearnInteractionState(
    sectionSlug,
    lessonSlug,
  );
  const [selected, setSelected] = useState(() => state.selected ?? "");
  const [submitted, setSubmitted] = useState(() => Boolean(state.submitted));
  const isCorrect = selected === visual.answer;
  const completed = Boolean(state.completed);
  const remediation = Boolean(state.remediation);
  useRestoreLearnCompletion(completed, onPassedChange);

  function reset() {
    setSelected("");
    setSubmitted(false);
    resetState({ selected: "" });
    onPassedChange?.(false);
  }

  const toneClass = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-green-200 bg-green-50 text-green-700",
    teal: "border-teal-200 bg-teal-50 text-teal-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl rounded-3xl border border-blue-100 bg-white p-5 text-center shadow-sm">
      <LearningQuestionFormatLabel />
      <p className="text-sm font-black uppercase tracking-wide text-blue-600">
        Graph interpretation
      </p>
      <h3 className="mt-2 text-2xl font-black text-slate-950">
        <FormattedConceptText text={visual.graphTitle} />
      </h3>

      <div className={centeredFourColumnGroupClass}>
        {visual.phases.map((phase, index) => (
          <article
            key={`${phase.label}-${index}`}
            className={`${fourColumnCardClass} rounded-3xl border p-3 sm:p-4 ${toneClass[phase.tone]}`}
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950">
              {index + 1}
            </div>
            <p className={`mt-3 font-black uppercase tracking-wide ${mobileInteractionTextClass} ${noMidWordWrapClass}`}>
              {phase.label}
            </p>
            <p className={`mt-2 font-semibold text-slate-950 ${mobileInteractionTextClass} ${noMidWordWrapClass}`}>
              <FormattedConceptText text={phase.detail} />
            </p>
          </article>
        ))}
      </div>

      {visual.cue ? (
        <div className="mx-auto mt-5 max-w-3xl rounded-3xl border border-purple-100 bg-purple-50 p-4">
          <ComparisonDefinitionBlocks text={visual.cue} />
        </div>
      ) : null}

      {visual.graphId ? (
        <GraphCard className="mt-5" graphId={visual.graphId} />
      ) : null}

      <h4 className="mt-6 text-xl font-black text-slate-950">
        <FormattedConceptText text={visual.prompt} />
      </h4>
      <div className={centeredChoiceGroupClass}>
        {visual.choices.map((choice, choiceIndex) => (
          <button
            key={`graph-choice-${choiceIndex}-${choice}`}
            type="button"
            onClick={() => {
              if (completed) {
                return;
              }
              setSelected(choice);
              setSubmitted(false);
              updateState({ selected: choice, submitted: false });
              onPassedChange?.(false);
            }}
            className={`${choiceCardClass} rounded-2xl border p-3 font-black transition sm:p-4 ${mobileInteractionTextClass} ${
              selected === choice
                ? "border-blue-300 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-slate-50 text-slate-950 hover:border-blue-200 hover:bg-blue-50"
            }`}
          >
            <FormattedConceptText text={choice} />
          </button>
        ))}
      </div>

      <CheckButton
        disabled={!selected}
        onClick={() => {
          setSubmitted(true);
          if (isCorrect) {
            updateState({
              attempts: state.attempts ?? 0,
              completed: true,
              remediation: false,
              selected,
              submitted: true,
            });
            onPassedChange?.(true);
          } else {
            const nextState = nextIncorrectState(state.attempts);
            updateState({ ...nextState, selected });
            onPassedChange?.(nextState.completed);
          }
        }}
      />

      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          correctAnswer={visual.answer}
          message={
            isCorrect || remediation
              ? visual.feedback
              : visual.hint ??
                "Use the phase labels, phase-change lines, and data pattern to compare the designs."
          }
          remediation={remediation}
          onReset={reset}
        />
      ) : null}
    </div>
  );
}

function MatchingInteraction({
  lessonSlug,
  onPassedChange,
  sectionSlug,
  visual,
}: {
  lessonSlug: string;
  onPassedChange?: (passed: boolean) => void;
  sectionSlug: string;
  visual: Extract<VisualKind, { type: "matching" }>;
}) {
  const answer = joinAnswerParts(
    visual.pairs.map((pair) => formatArrowPair(pair.term, pair.definition)),
  );
  const rotatedDefinitions = visual.pairs.map((pair, index) =>
    formatArrowPair(
      pair.term,
      visual.pairs[(index + 1) % visual.pairs.length]?.definition ?? pair.definition,
    ),
  );
  const rotatedTerms = visual.pairs.map((pair, index) =>
    formatArrowPair(
      visual.pairs[(index + 1) % visual.pairs.length]?.term ?? pair.term,
      pair.definition,
    ),
  );
  const lastDefinitionShift = visual.pairs.map((pair, index) => {
    const isLast = index === visual.pairs.length - 1;
    return formatArrowPair(
      pair.term,
      isLast ? visual.pairs[0]?.definition ?? pair.definition : pair.definition,
    );
  });

  return (
    <ChoiceInteraction
      lessonSlug={lessonSlug}
      onPassedChange={onPassedChange}
      sectionSlug={sectionSlug}
      visual={{
        type: "choice",
        prompt: `${visual.prompt} Which option shows the correct pairings?`,
        choices: makeUniqueChoices(answer, [
          joinAnswerParts(rotatedDefinitions),
          joinAnswerParts(rotatedTerms),
          joinAnswerParts(lastDefinitionShift),
        ]),
        answer,
        feedback: `Correct. ${answer}`,
        hint: "Look for the option where each term is paired with its defining feature.",
      }}
    />
  );
}

function TrueFalseInteraction({
  lessonSlug,
  onPassedChange,
  sectionSlug,
  visual,
}: {
  lessonSlug: string;
  onPassedChange?: (passed: boolean) => void;
  sectionSlug: string;
  visual: Extract<VisualKind, { type: "true-false" }>;
}) {
  const answer = visual.answer ? "True" : "False";

  return (
    <ChoiceInteraction
      lessonSlug={lessonSlug}
      onPassedChange={onPassedChange}
      sectionSlug={sectionSlug}
      visual={{
        type: "choice",
        prompt: `${visual.prompt} ${visual.statement}`,
        choices: ["True", "False"],
        answer,
        feedback: visual.feedback,
        hint: "Decide whether the statement matches the critical features from the lesson.",
      }}
    />
  );
}

function SortingInteraction({
  lessonSlug,
  onPassedChange,
  sectionSlug,
  visual,
}: {
  lessonSlug: string;
  onPassedChange?: (passed: boolean) => void;
  sectionSlug: string;
  visual: Extract<VisualKind, { type: "sorting" }>;
}) {
  const answer = joinAnswerParts(
    visual.items.map((item) => formatArrowPair(item.label, item.category)),
  );
  const [firstCategory, secondCategory] = visual.categories;
  const flipped = visual.items.map((item) =>
    formatArrowPair(
      item.label,
      item.category === firstCategory ? secondCategory : firstCategory,
    ),
  );
  const firstOnly = visual.items.map((item) =>
    formatArrowPair(item.label, firstCategory),
  );
  const secondOnly = visual.items.map((item) =>
    formatArrowPair(item.label, secondCategory),
  );

  return (
    <ChoiceInteraction
      lessonSlug={lessonSlug}
      onPassedChange={onPassedChange}
      sectionSlug={sectionSlug}
      visual={{
        type: "choice",
        prompt: `${visual.prompt} Which option sorts every item correctly?`,
        choices: makeUniqueChoices(answer, [
          joinAnswerParts(flipped),
          joinAnswerParts(firstOnly),
          joinAnswerParts(secondOnly),
        ]),
        answer,
        feedback: `Correct. ${answer}`,
        hint: "Compare each item to the category definition before choosing the full sorted set.",
      }}
    />
  );
}

function FillBlankInteraction({
  lessonSlug,
  onPassedChange,
  sectionSlug,
  visual,
}: {
  lessonSlug: string;
  onPassedChange?: (passed: boolean) => void;
  sectionSlug: string;
  visual: Extract<VisualKind, { type: "fill-blank" }>;
}) {
  const { resetState, state, updateState } = useLearnInteractionState(
    sectionSlug,
    lessonSlug,
  );
  const [answer, setAnswer] = useState(() => state.answer ?? "");
  const [submitted, setSubmitted] = useState(() => Boolean(state.submitted));
  const isCorrect =
    normalizeFillBlankAnswer(answer) === normalizeFillBlankAnswer(visual.answer);
  const completed = Boolean(state.completed);
  const remediation = Boolean(state.remediation);
  useRestoreLearnCompletion(completed, onPassedChange);

  function reset() {
    setAnswer("");
    setSubmitted(false);
    resetState({ answer: "" });
    onPassedChange?.(false);
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-4xl rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center">
      <LearningQuestionFormatLabel />
      <h3 className="text-2xl font-black text-slate-950">
        <FormattedConceptText text={visual.prompt} />
      </h3>
      <p className="mx-auto mt-4 max-w-3xl rounded-2xl bg-white p-5 text-lg font-black leading-8 text-slate-950">
        {visual.sentence}
      </p>
      <label className="mx-auto mt-5 block max-w-sm text-left text-sm font-black uppercase tracking-wide text-blue-600">
        Answer
        <input
          value={answer}
          onChange={(event) => {
            if (completed) {
              return;
            }
            setAnswer(event.target.value);
            setSubmitted(false);
            updateState({ answer: event.target.value, submitted: false });
            onPassedChange?.(false);
          }}
          className="mt-2 w-full rounded-2xl border border-blue-100 bg-white px-4 py-3 text-base font-black normal-case tracking-normal text-slate-950 outline-none transition focus:border-blue-300"
          placeholder="Type the missing word"
        />
      </label>
      <CheckButton
        disabled={!answer.trim()}
        onClick={() => {
          setSubmitted(true);
          if (isCorrect) {
            updateState({
              answer,
              attempts: state.attempts ?? 0,
              completed: true,
              remediation: false,
              submitted: true,
            });
            onPassedChange?.(true);
          } else {
            const nextState = nextIncorrectState(state.attempts);
            updateState({ ...nextState, answer });
            onPassedChange?.(nextState.completed);
          }
        }}
      />
      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          correctAnswer={visual.answer}
          message={isCorrect || remediation ? visual.feedback : defaultLearnHint()}
          remediation={remediation}
          onReset={reset}
        />
      ) : null}
    </div>
  );
}

function SelectAllInteraction({
  lessonSlug,
  onPassedChange,
  sectionSlug,
  visual,
}: {
  lessonSlug: string;
  onPassedChange?: (passed: boolean) => void;
  sectionSlug: string;
  visual: Extract<VisualKind, { type: "select-all" }>;
}) {
  const correctLabels = visual.choices
    .filter((choice) => choice.correct)
    .map((choice) => choice.label);
  const incorrectLabels = visual.choices
    .filter((choice) => !choice.correct)
    .map((choice) => choice.label);
  const answer = joinAnswerParts(correctLabels);
  const omitOne = joinAnswerParts(correctLabels.slice(0, -1));
  const addOne = joinAnswerParts([
    ...correctLabels,
    incorrectLabels[0] ?? visual.choices[0]?.label ?? "",
  ]);
  const allChoices = joinAnswerParts(visual.choices.map((choice) => choice.label));

  return (
    <ChoiceInteraction
      lessonSlug={lessonSlug}
      onPassedChange={onPassedChange}
      sectionSlug={sectionSlug}
      visual={{
        type: "choice",
        prompt: `${visual.prompt} Which option includes all and only the correct answers?`,
        choices: makeUniqueChoices(answer, [omitOne, addOne, allChoices]),
        answer,
        feedback: visual.feedback,
        hint: "Choose the set that includes every correct item without adding an incorrect one.",
      }}
    />
  );
}

function CheckButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mt-6 rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Check Answer
    </button>
  );
}

function FeedbackBox({
  correct,
  correctAnswer,
  message,
  onReset,
  remediation = false,
}: {
  correct: boolean;
  correctAnswer?: string;
  message: string;
  onReset?: () => void;
  remediation?: boolean;
}) {
  return (
    <div
      className={`mx-auto mt-5 w-full max-w-3xl rounded-2xl border p-4 ${
        correct
          ? "border-green-100 bg-green-50"
          : remediation
            ? "border-amber-200 bg-amber-50"
            : "border-red-100 bg-red-50"
      }`}
    >
      <p
        className={`text-sm font-black uppercase tracking-wide ${
          correct
            ? "text-green-700"
            : remediation
              ? "text-amber-700"
              : "text-red-700"
        }`}
      >
        {correct
          ? getLearnCorrectFeedback(message)
          : remediation
            ? "Review topic again"
            : "Review and try again"}
      </p>
      {!correct && remediation && correctAnswer ? (
        <p className="mt-2 text-sm font-black text-slate-950">
          <span>Correct answer: </span>
          <FormattedConceptText text={correctAnswer} />
        </p>
      ) : null}
      <p className={`mt-2 font-semibold text-slate-950 ${mobileInteractionTextClass} ${noMidWordWrapClass}`}>
        <FormattedConceptText text={message} />
      </p>
      {!correct && onReset ? (
        <ResetAnswersButton onClick={onReset} />
      ) : null}
    </div>
  );
}

function ResetAnswersButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 rounded-xl border border-teal-200 bg-white px-5 py-3 text-sm font-black text-teal-700 shadow-sm transition hover:border-teal-300 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
    >
      Reset Answers
    </button>
  );
}

function RevealCard({
  text,
  title,
  tone,
}: {
  text: string;
  title: string;
  tone: "blue" | "teal";
}) {
  const toneClass =
    tone === "blue"
      ? "border-blue-100 bg-blue-50 text-blue-600"
      : "border-teal-100 bg-teal-50 text-teal-600";

  return (
    <div className={`w-full rounded-3xl border p-6 text-center ${toneClass}`}>
      <p className="text-sm font-black uppercase tracking-wide">{title}</p>
      <p className="mt-4 text-xl font-black leading-8 text-slate-950">
        <FormattedConceptText text={text} />
      </p>
    </div>
  );
}
