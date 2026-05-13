"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { DragEvent } from "react";
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

function sequenceAnswer(steps: string[]) {
  return steps.join(" \u2192 ");
}

function matchingAnswer(pairs: { term: string; definition: string }[]) {
  return pairs.map((pair) => `${pair.term} \u2192 ${pair.definition}`).join("; ");
}

function sortingAnswer(items: { label: string; category: string }[]) {
  return items.map((item) => `${item.label} \u2192 ${item.category}`).join("; ");
}

function selectAllAnswer(
  choices: { label: string; correct: boolean }[],
) {
  return choices
    .filter((choice) => choice.correct)
    .map((choice) => choice.label)
    .join("; ");
}

function defaultLearnHint() {
  return "Compare the critical features in the question before trying again.";
}

const centeredTwoColumnGroupClass =
  "mx-auto flex w-full flex-wrap justify-center gap-4";
const twoColumnCardClass = "w-full md:w-[calc(50%_-_0.5rem)]";
const centeredChoiceGroupClass =
  "mx-auto mt-5 flex w-full max-w-3xl flex-wrap justify-center gap-3";
const centeredWideChoiceGroupClass =
  "mx-auto mt-5 flex w-full max-w-4xl flex-wrap justify-center gap-3";
const choiceCardClass = "w-full md:w-[calc(50%_-_0.375rem)]";
const centeredFourColumnGroupClass =
  "mx-auto mt-5 flex w-full max-w-4xl flex-wrap justify-center gap-3";
const fourColumnCardClass =
  "w-full sm:w-[calc(50%_-_0.375rem)] lg:w-[calc(25%_-_0.5625rem)]";

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
        <CompletionButton onPassedChange={onPassedChange} />
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
    return <ConsequenceChart onPassedChange={onPassedChange} />;
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
      <CompletionButton onPassedChange={onPassedChange} />
    </div>
  );
}

function ConsequenceChart({
  onPassedChange,
}: {
  onPassedChange?: (passed: boolean) => void;
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
      <CompletionButton onPassedChange={onPassedChange} />
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
  const { resetState, state, updateState } = useLearnInteractionState(
    sectionSlug,
    lessonSlug,
  );
  const [selectedSteps, setSelectedSteps] = useState<string[]>(
    () => state.selectedSteps ?? [],
  );
  const [submitted, setSubmitted] = useState(() => Boolean(state.submitted));
  const [draggedStep, setDraggedStep] = useState("");
  const shuffledSteps = useMemo(() => [...visual.steps].reverse(), [visual.steps]);
  const isCorrect =
    selectedSteps.length === visual.steps.length &&
    selectedSteps.every((step, index) => step === visual.steps[index]);
  const completed = Boolean(state.completed);
  const remediation = Boolean(state.remediation);
  useRestoreLearnCompletion(completed, onPassedChange);

  function chooseStep(step: string) {
    if (completed || selectedSteps.includes(step)) {
      return;
    }

    setSelectedSteps((current) => {
      const next = [...current, step];
      updateState({ selectedSteps: next, submitted: false });
      return next;
    });
    setSubmitted(false);
  }

  function reset() {
    setSelectedSteps([]);
    setSubmitted(false);
    setDraggedStep("");
    resetState({ selectedSteps: [] });
    onPassedChange?.(false);
  }

  function dropStep(index: number) {
    if (completed || !draggedStep || selectedSteps.includes(draggedStep)) {
      return;
    }

    setSelectedSteps((current) => {
      const next = [...current];
      next[index] = draggedStep;
      const filtered = next.filter(Boolean);
      updateState({ selectedSteps: filtered, submitted: false });
      return filtered;
    });
    setDraggedStep("");
    setSubmitted(false);
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">
        <FormattedConceptText text={visual.prompt ?? "Choose the correct sequence."} />
      </h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        Click each option in the order you think it belongs. The correct labels
        stay hidden until you check your answer.
      </p>

      <div className="mx-auto mt-5 flex w-full max-w-4xl flex-wrap justify-center gap-3">
        {shuffledSteps.map((step) => (
          <button
            key={step}
            type="button"
            draggable={!completed && !selectedSteps.includes(step)}
            disabled={completed || selectedSteps.includes(step)}
            onDragStart={() => setDraggedStep(step)}
            onClick={() => chooseStep(step)}
            className="w-full rounded-2xl border border-blue-100 bg-white p-4 text-sm font-black text-slate-950 transition hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[calc(50%-0.375rem)] md:w-[calc(25%-0.5625rem)]"
          >
            {step}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-4xl flex-wrap justify-center gap-3">
        {visual.steps.map((_step, index) => (
          <div
            key={index}
            className="min-h-28 w-full rounded-3xl border border-white bg-white/80 p-4 sm:w-[calc(50%-0.375rem)] md:w-[calc(25%-0.5625rem)]"
            onDragOver={(event: DragEvent<HTMLDivElement>) => event.preventDefault()}
            onDrop={() => dropStep(index)}
          >
            <div
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950"
            >
              {index + 1}
            </div>
            <p className="mt-3 text-sm font-black leading-6 text-slate-950">
              {submitted
                ? visual.steps[index]
                : selectedSteps[index] ?? "Choose a step"}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          disabled={selectedSteps.length !== visual.steps.length}
          onClick={() => {
            setSubmitted(true);
            if (isCorrect) {
              updateState({
                attempts: state.attempts ?? 0,
                completed: true,
                remediation: false,
                selectedSteps,
                submitted: true,
              });
              onPassedChange?.(true);
            } else {
              const nextState = nextIncorrectState(state.attempts);
              updateState({ ...nextState, selectedSteps });
              onPassedChange?.(nextState.completed);
            }
          }}
          className="w-full rounded-xl bg-slate-950 px-6 py-3 text-center text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Check Answer
        </button>
      </div>

      {submitted ? (
        <div
          className={`mt-5 rounded-2xl border p-4 ${
            isCorrect
              ? "border-green-100 bg-green-50"
              : remediation
                ? "border-amber-200 bg-amber-50"
                : "border-red-100 bg-red-50"
          }`}
        >
          <p
            className={`text-sm font-black uppercase tracking-wide ${
              isCorrect
                ? "text-green-700"
                : remediation
                ? "text-amber-700"
                : "text-red-700"
            }`}
          >
            {isCorrect
              ? "Correct sequence"
              : remediation
                ? "Review topic again"
                : "Review and try again"}
          </p>
          {remediation ? (
            <p className="mt-2 text-sm font-black text-slate-950">
              Correct answer: <FormattedConceptText text={sequenceAnswer(visual.steps)} />
            </p>
          ) : null}
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
            {isCorrect || remediation
              ? visual.feedback ??
                "Respondent conditioning moves from Neutral Stimulus (NS), to pairing with an Unconditioned Stimulus (US), to Conditioned Stimulus (CS), to Conditioned Response (CR)."
              : defaultLearnHint()}
          </p>
          {!isCorrect ? <ResetAnswersButton onClick={reset} /> : null}
        </div>
      ) : null}
    </div>
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
      <h3 className="text-2xl font-black text-slate-950">
        <FormattedConceptText text={visual.prompt} />
      </h3>
      <div className={centeredChoiceGroupClass}>
        {visual.choices.map((choice) => (
          <button
            key={choice}
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
            className={`${choiceCardClass} rounded-2xl border p-4 text-sm font-black transition ${
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
            className={`${fourColumnCardClass} rounded-3xl border p-4 ${toneClass[phase.tone]}`}
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950">
              {index + 1}
            </div>
            <p className="mt-3 text-sm font-black uppercase tracking-wide">
              {phase.label}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
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
        {visual.choices.map((choice) => (
          <button
            key={choice}
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
            className={`${choiceCardClass} rounded-2xl border p-4 text-sm font-black transition ${
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
  const { resetState, state, updateState } = useLearnInteractionState(
    sectionSlug,
    lessonSlug,
  );
  const [activeTerm, setActiveTerm] = useState("");
  const [matches, setMatches] = useState<Record<string, string>>(
    () => state.matches ?? {},
  );
  const [submitted, setSubmitted] = useState(() => Boolean(state.submitted));
  const definitions = useMemo(
    () => [...visual.pairs].reverse().map((pair) => pair.definition),
    [visual.pairs],
  );
  const allMatched = definitions.every((definition) => matches[definition]);
  const isCorrect = visual.pairs.every(
    (pair) => matches[pair.definition] === pair.term,
  );
  const completed = Boolean(state.completed);
  const remediation = Boolean(state.remediation);
  useRestoreLearnCompletion(completed, onPassedChange);

  function assignMatch(definition: string, term = activeTerm) {
    if (completed || !term) {
      return;
    }

    setSubmitted(false);
    onPassedChange?.(false);
    setMatches((current) => {
      const next = { ...current };

      Object.entries(next).forEach(([matchedDefinition, matchedTerm]) => {
        if (matchedTerm === term && matchedDefinition !== definition) {
          delete next[matchedDefinition];
        }
      });

      next[definition] = term;
      updateState({ matches: next, submitted: false });
      return next;
    });
    setActiveTerm("");
  }

  function dragTerm(event: DragEvent<HTMLButtonElement>, term: string) {
    if (completed) {
      return;
    }

    event.dataTransfer.setData("text/plain", term);
    event.dataTransfer.effectAllowed = "move";
    setActiveTerm(term);
    setSubmitted(false);
    onPassedChange?.(false);
  }

  function dropTerm(event: DragEvent<HTMLButtonElement>, definition: string) {
    event.preventDefault();
    const term = event.dataTransfer.getData("text/plain") || activeTerm;
    assignMatch(definition, term);
  }

  function reset() {
    setActiveTerm("");
    setMatches({});
    setSubmitted(false);
    resetState({ matches: {} });
    onPassedChange?.(false);
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">
        <FormattedConceptText text={visual.prompt} />
      </h3>
      <p className="mx-auto mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-950">
        Drag a term to its definition, or click a term and then click the
        matching definition. Keyboard users can press Enter or Space on a term,
        then Enter or Space on a definition.
      </p>
      <div className="mx-auto mt-5 grid w-full max-w-4xl items-start gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-3">
          {visual.pairs.map((pair) => (
            <button
              key={pair.term}
              type="button"
              aria-pressed={activeTerm === pair.term}
              draggable
              onDragStart={(event) => dragTerm(event, pair.term)}
              onClick={() => {
                if (completed) {
                  return;
                }
                setActiveTerm(pair.term);
                setSubmitted(false);
                onPassedChange?.(false);
              }}
              className={`cursor-grab rounded-2xl border p-4 text-sm font-black transition active:cursor-grabbing ${
                pair.term === "Duration" ? "mt-3" : ""
              } ${
                activeTerm === pair.term
                  ? "border-purple-300 bg-purple-50 text-purple-700"
                  : "border-white bg-white text-slate-950 hover:border-purple-200"
              }`}
            >
              <FormattedConceptText text={pair.term} />
              {Object.values(matches).includes(pair.term) ? (
                <span className="mt-2 block text-xs font-black uppercase tracking-wide text-slate-600">
                  Placed
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <div className="grid gap-3">
          {definitions.map((definition) => (
            <button
              key={definition}
              type="button"
              aria-label={`Match a term to definition: ${definition}`}
              onDragOver={(event: DragEvent<HTMLButtonElement>) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
              onDrop={(event) => dropTerm(event, definition)}
              onClick={() => assignMatch(definition)}
              className={`rounded-2xl border bg-white p-4 text-left text-sm font-semibold leading-6 text-slate-950 transition ${
                matches[definition]
                  ? "border-blue-300"
                  : "border-white hover:border-blue-200"
              }`}
            >
              <span className="mb-2 block text-xs font-black uppercase tracking-wide text-blue-600">
                {matches[definition] ?? "Choose a term"}
              </span>
              <FormattedConceptText text={definition} />
            </button>
          ))}
        </div>
      </div>
      <CheckButton
        disabled={!allMatched}
        onClick={() => {
          setSubmitted(true);
          if (isCorrect) {
            updateState({
              attempts: state.attempts ?? 0,
              completed: true,
              matches,
              remediation: false,
              submitted: true,
            });
            onPassedChange?.(true);
          } else {
            const nextState = nextIncorrectState(state.attempts);
            updateState({ ...nextState, matches });
            onPassedChange?.(nextState.completed);
          }
        }}
      />
      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          correctAnswer={matchingAnswer(visual.pairs)}
          message={
            isCorrect
              ? "Matched. Operant conditioning is organized around behavior and its consequences."
              : "Review each term and match it to the role it plays in the contingency."
          }
          remediation={remediation}
          onReset={reset}
        />
      ) : null}
    </div>
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
  const { resetState, state, updateState } = useLearnInteractionState(
    sectionSlug,
    lessonSlug,
  );
  const [selected, setSelected] = useState<boolean | null>(
    () => state.selectedBoolean ?? null,
  );
  const [submitted, setSubmitted] = useState(() => Boolean(state.submitted));
  const isCorrect = selected === visual.answer;
  const completed = Boolean(state.completed);
  const remediation = Boolean(state.remediation);
  useRestoreLearnCompletion(completed, onPassedChange);

  function reset() {
    setSelected(null);
    setSubmitted(false);
    resetState({ selectedBoolean: null });
    onPassedChange?.(false);
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-4xl rounded-3xl border border-green-100 bg-green-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">
        <FormattedConceptText text={visual.prompt} />
      </h3>
      <p className="mx-auto mt-4 max-w-3xl rounded-2xl bg-white p-5 text-lg font-black leading-8 text-slate-950">
        {visual.statement}
      </p>
      <div className="mx-auto mt-5 flex max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
        {[true, false].map((value) => (
          <button
            key={String(value)}
            type="button"
          onClick={() => {
              if (completed) {
                return;
              }
              setSelected(value);
              setSubmitted(false);
              updateState({ selectedBoolean: value, submitted: false });
              onPassedChange?.(false);
            }}
            className={`rounded-xl border px-8 py-3 text-sm font-black transition ${
              selected === value
                ? "border-green-300 bg-white text-green-700"
                : "border-white bg-white/70 text-slate-950 hover:border-green-200"
            }`}
          >
            {value ? "True" : "False"}
          </button>
        ))}
      </div>
      <CheckButton
        disabled={selected === null}
        onClick={() => {
          setSubmitted(true);
          if (isCorrect) {
            updateState({
              attempts: state.attempts ?? 0,
              completed: true,
              remediation: false,
              selectedBoolean: selected,
              submitted: true,
            });
            onPassedChange?.(true);
          } else {
            const nextState = nextIncorrectState(state.attempts);
            updateState({ ...nextState, selectedBoolean: selected });
            onPassedChange?.(nextState.completed);
          }
        }}
      />
      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          correctAnswer={visual.answer ? "True" : "False"}
          message={isCorrect || remediation ? visual.feedback : defaultLearnHint()}
          remediation={remediation}
          onReset={reset}
        />
      ) : null}
    </div>
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
  const { resetState, state, updateState } = useLearnInteractionState(
    sectionSlug,
    lessonSlug,
  );
  const [activeItem, setActiveItem] = useState("");
  const [placements, setPlacements] = useState<Record<string, string>>(
    () => state.placements ?? {},
  );
  const [submitted, setSubmitted] = useState(() => Boolean(state.submitted));
  const allSorted = Object.keys(placements).length === visual.items.length;
  const isCorrect = visual.items.every(
    (item) => placements[item.label] === item.category,
  );
  const completed = Boolean(state.completed);
  const remediation = Boolean(state.remediation);
  useRestoreLearnCompletion(completed, onPassedChange);

  function placeItem(category: string) {
    if (completed || !activeItem) {
      return;
    }

    setSubmitted(false);
    onPassedChange?.(false);
    setPlacements((current) => {
      const next = { ...current, [activeItem]: category };
      updateState({ placements: next, submitted: false });
      return next;
    });
    setActiveItem("");
  }

  function dropItem(category: string, item: string) {
    if (completed) {
      return;
    }

    setSubmitted(false);
    onPassedChange?.(false);
    setPlacements((current) => {
      const next = { ...current, [item]: category };
      updateState({ placements: next, submitted: false });
      return next;
    });
    setActiveItem("");
  }

  function reset() {
    setActiveItem("");
    setPlacements({});
    setSubmitted(false);
    resetState({ placements: {} });
    onPassedChange?.(false);
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl rounded-3xl border border-teal-100 bg-teal-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">
        <FormattedConceptText text={visual.prompt} />
      </h3>
      <div className={centeredWideChoiceGroupClass}>
        {visual.items.map((item) => (
          <button
            key={item.label}
            type="button"
            draggable={!submitted}
            onDragStart={() => setActiveItem(item.label)}
            onClick={() => {
              if (completed) {
                return;
              }
              setActiveItem(item.label);
              setSubmitted(false);
              onPassedChange?.(false);
            }}
            className={`${choiceCardClass} rounded-2xl border p-4 text-sm font-black transition ${
              activeItem === item.label
                ? "border-teal-300 bg-white text-teal-700"
                : "border-white bg-white text-slate-950 hover:border-teal-200"
            }`}
          >
            <FormattedConceptText text={item.label} />
            {placements[item.label] ? (
              <span className="mt-2 block text-xs uppercase tracking-wide text-slate-600">
                Sorted to: {placements[item.label]}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <div className={centeredTwoColumnGroupClass}>
        {visual.categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => placeItem(category)}
            onDragOver={(event: DragEvent<HTMLButtonElement>) => event.preventDefault()}
            onDrop={() => dropItem(category, activeItem)}
            className={`${twoColumnCardClass} min-h-28 rounded-3xl border border-white bg-white/80 p-5 text-center text-sm font-black text-slate-950 transition hover:border-teal-200`}
          >
            <FormattedConceptText text={category} />
            <span className="mt-3 block text-xs font-semibold leading-5 text-slate-700">
              Click a scenario, then click here. Drag and drop also works.
            </span>
          </button>
        ))}
      </div>
      <CheckButton
        disabled={!allSorted}
        onClick={() => {
          setSubmitted(true);
          if (isCorrect) {
            updateState({
              attempts: state.attempts ?? 0,
              completed: true,
              placements,
              remediation: false,
              submitted: true,
            });
            onPassedChange?.(true);
          } else {
            const nextState = nextIncorrectState(state.attempts);
            updateState({ ...nextState, placements });
            onPassedChange?.(nextState.completed);
          }
        }}
      />
      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          correctAnswer={sortingAnswer(visual.items)}
          message={
            isCorrect
              ? "Sorted correctly. The technical label depends on the contingency and future behavior change."
              : "Review each scenario and ask what happened to the stimulus and future behavior."
          }
          remediation={remediation}
          onReset={reset}
        />
      ) : null}
    </div>
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
    answer.trim().toLowerCase() === visual.answer.trim().toLowerCase();
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
  const { resetState, state, updateState } = useLearnInteractionState(
    sectionSlug,
    lessonSlug,
  );
  const [selected, setSelected] = useState<string[]>(
    () => state.selectedItems ?? [],
  );
  const [submitted, setSubmitted] = useState(() => Boolean(state.submitted));
  const correctLabels = visual.choices
    .filter((choice) => choice.correct)
    .map((choice) => choice.label)
    .sort();
  const selectedLabels = [...selected].sort();
  const isCorrect =
    correctLabels.length === selectedLabels.length &&
    correctLabels.every((label, index) => label === selectedLabels[index]);
  const completed = Boolean(state.completed);
  const remediation = Boolean(state.remediation);
  useRestoreLearnCompletion(completed, onPassedChange);

  function toggle(label: string) {
    if (completed) {
      return;
    }

    if (submitted) {
      setSubmitted(false);
      onPassedChange?.(false);
    }

    setSelected((current) => {
      const next = current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label];
      updateState({ selectedItems: next, submitted: false });
      return next;
    });
  }

  function reset() {
    setSelected([]);
    setSubmitted(false);
    resetState({ selectedItems: [] });
    onPassedChange?.(false);
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-4xl rounded-3xl border border-purple-100 bg-purple-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">
        <FormattedConceptText text={visual.prompt} />
      </h3>
      <div className={centeredChoiceGroupClass}>
        {visual.choices.map((choice) => (
          <button
            key={choice.label}
            type="button"
            onClick={() => toggle(choice.label)}
            className={`${choiceCardClass} rounded-2xl border p-4 text-sm font-black transition ${
              selected.includes(choice.label)
                ? "border-purple-300 bg-white text-purple-700"
                : "border-white bg-white/80 text-slate-950 hover:border-purple-200"
            }`}
          >
            {choice.label}
          </button>
        ))}
      </div>
      <CheckButton
        disabled={selected.length === 0}
        onClick={() => {
          setSubmitted(true);
          if (isCorrect) {
            updateState({
              attempts: state.attempts ?? 0,
              completed: true,
              remediation: false,
              selectedItems: selected,
              submitted: true,
            });
            onPassedChange?.(true);
          } else {
            const nextState = nextIncorrectState(state.attempts);
            updateState({ ...nextState, selectedItems: selected });
            onPassedChange?.(nextState.completed);
          }
        }}
      />
      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          correctAnswer={selectAllAnswer(visual.choices)}
          message={isCorrect || remediation ? visual.feedback : defaultLearnHint()}
          remediation={remediation}
          onReset={reset}
        />
      ) : null}
    </div>
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

function CompletionButton({
  onPassedChange,
}: {
  onPassedChange?: (passed: boolean) => void;
}) {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="mt-6 text-center">
      <button
        type="button"
        onClick={() => {
          setCompleted(true);
          onPassedChange?.(true);
        }}
        className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:opacity-90"
      >
        {completed ? "Check Complete" : "Mark Check Complete"}
      </button>
      {completed ? (
        <p className="mx-auto mt-3 max-w-xl rounded-2xl border border-green-100 bg-green-50 p-3 text-sm font-black text-green-700">
          Completed. You can move to the next lesson.
        </p>
      ) : null}
    </div>
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
          ? "Correct"
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
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
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
  const [revealed, setRevealed] = useState(false);
  const toneClass =
    tone === "blue"
      ? "border-blue-100 bg-blue-50 text-blue-600"
      : "border-teal-100 bg-teal-50 text-teal-600";

  return (
    <div className={`w-full rounded-3xl border p-6 text-center ${toneClass}`}>
      <p className="text-sm font-black uppercase tracking-wide">{title}</p>
      {revealed ? (
        <p className="mt-4 text-xl font-black leading-8 text-slate-950">
          <FormattedConceptText text={text} />
        </p>
      ) : (
        <button
          type="button"
          className="mt-4 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:opacity-90"
          onClick={() => setRevealed(true)}
        >
          Reveal
        </button>
      )}
    </div>
  );
}
