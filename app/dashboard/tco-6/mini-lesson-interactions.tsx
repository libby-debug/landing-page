"use client";

import { useMemo, useState } from "react";
import type { DragEvent } from "react";
import {
  ComparisonDefinitionBlocks,
  HighlightedText,
} from "@/components/learning-ui";
import type { VisualKind } from "./section-b-content";

export function InteractiveVisualBlock({
  onPassedChange,
  visual,
}: {
  onPassedChange?: (passed: boolean) => void;
  visual: VisualKind;
}) {
  if (visual.type === "comparison") {
    return (
      <div className="mx-auto mt-8 max-w-4xl">
        <div className="grid gap-4 md:grid-cols-2">
          <RevealCard title={visual.leftTitle} text={visual.leftText} tone="blue" />
          <RevealCard title={visual.rightTitle} text={visual.rightText} tone="pink" />
        </div>
        {visual.cue ? (
          <div className="mt-5 rounded-3xl border border-purple-100 bg-purple-50 p-5">
            <ComparisonDefinitionBlocks text={visual.cue} />
          </div>
        ) : null}
        <CompletionButton onPassedChange={onPassedChange} />
      </div>
    );
  }

  if (visual.type === "flow") {
    return <FlowInteraction onPassedChange={onPassedChange} visual={visual} />;
  }

  if (visual.type === "choice") {
    return <ChoiceInteraction onPassedChange={onPassedChange} visual={visual} />;
  }

  if (visual.type === "matching") {
    return <MatchingInteraction onPassedChange={onPassedChange} visual={visual} />;
  }

  if (visual.type === "true-false") {
    return <TrueFalseInteraction onPassedChange={onPassedChange} visual={visual} />;
  }

  if (visual.type === "sorting") {
    return <SortingInteraction onPassedChange={onPassedChange} visual={visual} />;
  }

  if (visual.type === "fill-blank") {
    return <FillBlankInteraction onPassedChange={onPassedChange} visual={visual} />;
  }

  if (visual.type === "select-all") {
    return <SelectAllInteraction onPassedChange={onPassedChange} visual={visual} />;
  }

  if (visual.type === "quadrant") {
    return <ConsequenceChart onPassedChange={onPassedChange} />;
  }

  return (
    <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
      <RevealCard title="Example" text={visual.example} tone="blue" />
      <RevealCard title="Nonexample" text={visual.nonexample} tone="pink" />
      <div className="md:col-span-2">
        <CompletionButton onPassedChange={onPassedChange} />
      </div>
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
    <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
      <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center">
        <p className="text-sm font-black uppercase tracking-wide text-blue-600">
          How to read this
        </p>
        <p className="mx-auto mt-2 max-w-3xl text-base font-black leading-7 text-slate-950">
          Positive/negative tells what happens to the stimulus.
          Reinforcement/punishment tells what happens to the behavior.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <ConsequenceCard key={card.title} {...card} />
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
      : "border-pink-200 bg-pink-50 text-pink-700";

  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
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
  onPassedChange,
  visual,
}: {
  onPassedChange?: (passed: boolean) => void;
  visual: Extract<VisualKind, { type: "flow" }>;
}) {
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [draggedStep, setDraggedStep] = useState("");
  const shuffledSteps = useMemo(() => [...visual.steps].reverse(), [visual.steps]);
  const isCorrect =
    selectedSteps.length === visual.steps.length &&
    selectedSteps.every((step, index) => step === visual.steps[index]);

  function chooseStep(step: string) {
    if (submitted || selectedSteps.includes(step)) {
      return;
    }

    setSelectedSteps((current) => [...current, step]);
  }

  function reset() {
    setSelectedSteps([]);
    setSubmitted(false);
    onPassedChange?.(false);
  }

  function dropStep(index: number) {
    if (submitted || !draggedStep || selectedSteps.includes(draggedStep)) {
      return;
    }

    setSelectedSteps((current) => {
      const next = [...current];
      next[index] = draggedStep;
      return next.filter(Boolean);
    });
    setDraggedStep("");
  }

  return (
    <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">
        {visual.prompt ?? "Choose the correct sequence."}
      </h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        Click each option in the order you think it belongs. The correct labels
        stay hidden until you check your answer.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {shuffledSteps.map((step) => (
          <button
            key={step}
            type="button"
            draggable={!submitted && !selectedSteps.includes(step)}
            disabled={submitted || selectedSteps.includes(step)}
            onDragStart={() => setDraggedStep(step)}
            onClick={() => chooseStep(step)}
            className="rounded-2xl border border-blue-100 bg-white p-4 text-sm font-black text-slate-950 transition hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {visual.steps.map((_step, index) => (
          <div
            key={index}
            className="min-h-28 rounded-3xl border border-white bg-white/80 p-4"
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
            onPassedChange?.(isCorrect);
          }}
          className="w-full rounded-xl bg-slate-950 px-6 py-3 text-center text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Check Answer
        </button>
        <button
          type="button"
          onClick={reset}
          className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:border-slate-400 sm:w-auto"
        >
          Reset
        </button>
      </div>

      {submitted ? (
        <div
          className={`mt-5 rounded-2xl border p-4 ${
            isCorrect
              ? "border-green-100 bg-green-50"
              : "border-pink-100 bg-pink-50"
          }`}
        >
          <p
            className={`text-sm font-black uppercase tracking-wide ${
              isCorrect ? "text-green-700" : "text-pink-700"
            }`}
          >
            {isCorrect ? "Correct sequence" : "Review the sequence"}
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
            {visual.feedback ??
              "Respondent conditioning moves from neutral stimulus, to pairing with an unconditioned stimulus, to conditioned stimulus, to conditioned response."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function ChoiceInteraction({
  onPassedChange,
  visual,
}: {
  onPassedChange?: (passed: boolean) => void;
  visual: Extract<VisualKind, { type: "choice" }>;
}) {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === visual.answer;

  return (
    <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-purple-100 bg-purple-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">{visual.prompt}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {visual.choices.map((choice) => (
          <button
            key={choice}
            type="button"
            onClick={() => {
              setSelected(choice);
              setSubmitted(false);
              onPassedChange?.(false);
            }}
            className={`rounded-2xl border p-4 text-sm font-black transition ${
              selected === choice
                ? "border-blue-300 bg-blue-50 text-blue-700"
                : "border-white bg-white text-slate-950 hover:border-blue-200"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
      <CheckButton
        disabled={!selected}
        onClick={() => {
          setSubmitted(true);
          onPassedChange?.(isCorrect);
        }}
      />
      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          message={
            isCorrect
              ? visual.feedback
              : `Review this distinction: ${visual.feedback}`
          }
        />
      ) : null}
    </div>
  );
}

function MatchingInteraction({
  onPassedChange,
  visual,
}: {
  onPassedChange?: (passed: boolean) => void;
  visual: Extract<VisualKind, { type: "matching" }>;
}) {
  const [activeTerm, setActiveTerm] = useState("");
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const definitions = useMemo(
    () => [...visual.pairs].reverse().map((pair) => pair.definition),
    [visual.pairs],
  );
  const allMatched = Object.keys(matches).length === visual.pairs.length;
  const isCorrect = visual.pairs.every(
    (pair) => matches[pair.definition] === pair.term,
  );

  function assignMatch(definition: string) {
    if (!activeTerm) {
      return;
    }

    setSubmitted(false);
    onPassedChange?.(false);
    setMatches((current) => ({ ...current, [definition]: activeTerm }));
    setActiveTerm("");
  }

  return (
    <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">{visual.prompt}</h3>
      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-3">
          {visual.pairs.map((pair) => (
            <button
              key={pair.term}
              type="button"
              onClick={() => {
                setActiveTerm(pair.term);
                setSubmitted(false);
                onPassedChange?.(false);
              }}
              className={`rounded-2xl border p-4 text-sm font-black transition ${
                activeTerm === pair.term
                  ? "border-purple-300 bg-purple-50 text-purple-700"
                  : "border-white bg-white text-slate-950 hover:border-purple-200"
              }`}
            >
              {pair.term}
            </button>
          ))}
        </div>
        <div className="grid gap-3">
          {definitions.map((definition) => (
            <button
              key={definition}
              type="button"
              onClick={() => assignMatch(definition)}
              className="rounded-2xl border border-white bg-white p-4 text-left text-sm font-semibold leading-6 text-slate-950 transition hover:border-blue-200"
            >
              <span className="mb-2 block text-xs font-black uppercase tracking-wide text-blue-600">
                {matches[definition] ?? "Choose a term"}
              </span>
              {definition}
            </button>
          ))}
        </div>
      </div>
      <CheckButton
        disabled={!allMatched}
        onClick={() => {
          setSubmitted(true);
          onPassedChange?.(isCorrect);
        }}
      />
      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          message={
            isCorrect
              ? "Matched. Operant conditioning is organized around behavior and its consequences."
              : "Review each term and match it to the role it plays in the contingency."
          }
        />
      ) : null}
    </div>
  );
}

function TrueFalseInteraction({
  onPassedChange,
  visual,
}: {
  onPassedChange?: (passed: boolean) => void;
  visual: Extract<VisualKind, { type: "true-false" }>;
}) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === visual.answer;

  return (
    <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-green-100 bg-green-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">{visual.prompt}</h3>
      <p className="mx-auto mt-4 max-w-3xl rounded-2xl bg-white p-5 text-lg font-black leading-8 text-slate-950">
        {visual.statement}
      </p>
      <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
        {[true, false].map((value) => (
          <button
            key={String(value)}
            type="button"
            onClick={() => {
              setSelected(value);
              setSubmitted(false);
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
          onPassedChange?.(isCorrect);
        }}
      />
      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          message={visual.feedback}
        />
      ) : null}
    </div>
  );
}

function SortingInteraction({
  onPassedChange,
  visual,
}: {
  onPassedChange?: (passed: boolean) => void;
  visual: Extract<VisualKind, { type: "sorting" }>;
}) {
  const [activeItem, setActiveItem] = useState("");
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const allSorted = Object.keys(placements).length === visual.items.length;
  const isCorrect = visual.items.every(
    (item) => placements[item.label] === item.category,
  );

  function placeItem(category: string) {
    if (!activeItem) {
      return;
    }

    setSubmitted(false);
    onPassedChange?.(false);
    setPlacements((current) => ({ ...current, [activeItem]: category }));
    setActiveItem("");
  }

  function dropItem(category: string, item: string) {
    setSubmitted(false);
    onPassedChange?.(false);
    setPlacements((current) => ({ ...current, [item]: category }));
    setActiveItem("");
  }

  return (
    <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-pink-100 bg-pink-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">{visual.prompt}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {visual.items.map((item) => (
          <button
            key={item.label}
            type="button"
            draggable={!submitted}
            onDragStart={() => setActiveItem(item.label)}
            onClick={() => {
              setActiveItem(item.label);
              setSubmitted(false);
              onPassedChange?.(false);
            }}
            className={`rounded-2xl border p-4 text-sm font-black transition ${
              activeItem === item.label
                ? "border-pink-300 bg-white text-pink-700"
                : "border-white bg-white text-slate-950 hover:border-pink-200"
            }`}
          >
            {item.label}
            {placements[item.label] ? (
              <span className="mt-2 block text-xs uppercase tracking-wide text-slate-600">
                Sorted to: {placements[item.label]}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {visual.categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => placeItem(category)}
            onDragOver={(event: DragEvent<HTMLButtonElement>) => event.preventDefault()}
            onDrop={() => dropItem(category, activeItem)}
            className="min-h-28 rounded-3xl border border-white bg-white/80 p-5 text-center text-sm font-black text-slate-950 transition hover:border-pink-200"
          >
            {category}
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
          onPassedChange?.(isCorrect);
        }}
      />
      {submitted ? (
        <FeedbackBox
          correct={isCorrect}
          message={
            isCorrect
              ? "Sorted correctly. The technical label depends on the contingency and future behavior change."
              : "Review each scenario and ask what happened to the stimulus and future behavior."
          }
        />
      ) : null}
    </div>
  );
}

function FillBlankInteraction({
  onPassedChange,
  visual,
}: {
  onPassedChange?: (passed: boolean) => void;
  visual: Extract<VisualKind, { type: "fill-blank" }>;
}) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isCorrect =
    answer.trim().toLowerCase() === visual.answer.trim().toLowerCase();

  return (
    <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">{visual.prompt}</h3>
      <p className="mx-auto mt-4 max-w-3xl rounded-2xl bg-white p-5 text-lg font-black leading-8 text-slate-950">
        {visual.sentence}
      </p>
      <label className="mx-auto mt-5 block max-w-sm text-left text-sm font-black uppercase tracking-wide text-blue-600">
        Answer
        <input
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
            setSubmitted(false);
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
          onPassedChange?.(isCorrect);
        }}
      />
      {submitted ? (
        <FeedbackBox correct={isCorrect} message={visual.feedback} />
      ) : null}
    </div>
  );
}

function SelectAllInteraction({
  onPassedChange,
  visual,
}: {
  onPassedChange?: (passed: boolean) => void;
  visual: Extract<VisualKind, { type: "select-all" }>;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const correctLabels = visual.choices
    .filter((choice) => choice.correct)
    .map((choice) => choice.label)
    .sort();
  const selectedLabels = [...selected].sort();
  const isCorrect =
    correctLabels.length === selectedLabels.length &&
    correctLabels.every((label, index) => label === selectedLabels[index]);

  function toggle(label: string) {
    if (submitted) {
      setSubmitted(false);
      onPassedChange?.(false);
    }

    setSelected((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-purple-100 bg-purple-50 p-5 text-center">
      <h3 className="text-2xl font-black text-slate-950">{visual.prompt}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {visual.choices.map((choice) => (
          <button
            key={choice.label}
            type="button"
            onClick={() => toggle(choice.label)}
            className={`rounded-2xl border p-4 text-sm font-black transition ${
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
          onPassedChange?.(isCorrect);
        }}
      />
      {submitted ? (
        <FeedbackBox correct={isCorrect} message={visual.feedback} />
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
  message,
}: {
  correct: boolean;
  message: string;
}) {
  return (
    <div
      className={`mt-5 rounded-2xl border p-4 ${
        correct
          ? "border-green-100 bg-green-50"
          : "border-pink-100 bg-pink-50"
      }`}
    >
      <p
        className={`text-sm font-black uppercase tracking-wide ${
          correct ? "text-green-700" : "text-pink-700"
        }`}
      >
        {correct ? "Correct" : "Review and try again"}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        {message}
      </p>
    </div>
  );
}

function RevealCard({
  text,
  title,
  tone,
}: {
  text: string;
  title: string;
  tone: "blue" | "pink";
}) {
  const [revealed, setRevealed] = useState(false);
  const toneClass =
    tone === "blue"
      ? "border-blue-100 bg-blue-50 text-blue-600"
      : "border-pink-100 bg-pink-50 text-pink-600";

  return (
    <div className={`rounded-3xl border p-6 text-center ${toneClass}`}>
      <p className="text-sm font-black uppercase tracking-wide">{title}</p>
      {revealed ? (
        <p className="mt-4 text-xl font-black leading-8 text-slate-950">
          <HighlightedText text={text} />
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
