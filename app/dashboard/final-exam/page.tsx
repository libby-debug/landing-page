"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import {
  FormattedConceptText,
  PageShell,
  cardBaseClass,
  eyebrowClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";
import { GraphCard } from "../tco-6/module-d-graphs";
import { hydrateUserProgressFromSupabase } from "../tco-6/progression";
import { isFinalExamUnlocked } from "../tco-6/program-progress";
import {
  finalExamPassingScore,
  finalExamQuestionCount,
  finalExamQuestions,
} from "./final-exam-content";
import {
  clearFinalExamDraft,
  readFinalExamDraft,
  saveFinalExamDraft,
  saveFinalExamProgress,
} from "./final-exam-progress";

const finalExamDurationSeconds = 4 * 60 * 60;
const timeWarningThresholdSeconds = 10 * 60;

function formatRemainingTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function FinalExamPage() {
  return (
    <ProtectedRoute>
      <FinalExamGate />
    </ProtectedRoute>
  );
}

function FinalExamGate() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      await hydrateUserProgressFromSupabase();

      if (!active) {
        return;
      }

      // Temporary developer preview bypass. Production learners still need 100%
      // overall program progress before the Final Exam route is available.
      const developerPreview =
        process.env.NODE_ENV === "development" &&
        new URLSearchParams(window.location.search).get("preview") === "dev";
      const unlocked = developerPreview || isFinalExamUnlocked();
      setAllowed(unlocked);
      setChecked(true);

      if (!unlocked) {
        router.replace("/dashboard");
      }
    }

    void checkAccess();

    return () => {
      active = false;
    };
  }, [router]);

  if (!checked || !allowed) {
    return (
      <PageShell maxWidth="5xl" className="pt-8">
        <section className={`${cardBaseClass} w-full border-blue-200 bg-white/90 text-center`}>
          <p className={eyebrowClass}>Checking progress</p>
          <h1 className={pageTitleClass}>Checking access</h1>
          <p className={leadClass}>
            Access unlocks after the full course reaches 100%.
          </p>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell maxWidth="5xl" className="pt-8">
      <FinalExam />
    </PageShell>
  );
}

function FinalExam() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const responsesRef = useRef(responses);
  const restoredDraftRef = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    finalExamDurationSeconds,
  );
  const [startedAtMs, setStartedAtMs] = useState<number | null>(null);
  const [showTimer, setShowTimer] = useState(true);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [reviewedQuestionIndexes, setReviewedQuestionIndexes] = useState<
    Set<number>
  >(() => new Set());
  const correctCount = useMemo(
    () =>
      finalExamQuestions.reduce(
        (total, question, index) =>
          responses[index] === question.answer ? total + 1 : total,
        0,
      ),
    [responses],
  );
  const score =
    finalExamQuestions.length > 0
      ? Math.round((correctCount / finalExamQuestions.length) * 100)
      : 0;
  const passed = score >= finalExamPassingScore;
  const allAnswered =
    finalExamQuestions.length === finalExamQuestionCount &&
    finalExamQuestions.every((_, index) => Boolean(responses[index]));
  const incorrectQuestions = finalExamQuestions
    .map((question, index) => ({ index, question }))
    .filter(({ index, question }) => responses[index] !== question.answer);

  useEffect(() => {
    responsesRef.current = responses;
  }, [responses]);

  const submitFinalExam = useCallback((
    autoSubmit: boolean,
    responseOverride?: Record<number, string>,
  ) => {
    const currentResponses = responseOverride ?? responsesRef.current;
    const finalCorrectCount = finalExamQuestions.reduce(
      (total, question, index) =>
        currentResponses[index] === question.answer ? total + 1 : total,
      0,
    );
    const finalScore =
      finalExamQuestions.length > 0
        ? Math.round((finalCorrectCount / finalExamQuestions.length) * 100)
        : 0;
    const finalPassed = finalScore >= finalExamPassingScore;

    saveFinalExamProgress({
      autoSubmitted: autoSubmit,
      correctCount: finalCorrectCount,
      passed: finalPassed,
      score: finalScore,
      submittedAt: new Date().toISOString(),
      totalQuestions: finalExamQuestions.length,
    });
    clearFinalExamDraft();

    setResponses(currentResponses);
    responsesRef.current = currentResponses;
    setAutoSubmitted(autoSubmit);
    setReviewedQuestionIndexes(new Set());

    if (finalPassed) {
      router.push("/dashboard/final-exam/completion");
      return;
    }

    setSubmitted(true);
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [router]);

  useEffect(() => {
    if (!started || submitted || !startedAtMs) {
      return;
    }

    const activeStartedAtMs = startedAtMs;

    function updateRemainingTime() {
      const elapsedSeconds = Math.floor((Date.now() - activeStartedAtMs) / 1000);
      const next = Math.max(finalExamDurationSeconds - elapsedSeconds, 0);

      setRemainingSeconds(next);

      if (next <= timeWarningThresholdSeconds && next > 0) {
        setShowTimeWarning(true);
      }

      if (next === 0) {
        submitFinalExam(true);
      }
    }

    updateRemainingTime();
    const timerId = window.setInterval(updateRemainingTime, 1000);

    return () => window.clearInterval(timerId);
  }, [started, startedAtMs, submitted, submitFinalExam]);

  useEffect(() => {
    if (restoredDraftRef.current) {
      return;
    }

    restoredDraftRef.current = true;
    const draft = readFinalExamDraft();

    if (!draft?.started || draft.submitted) {
      return;
    }

    const restoreTimeoutId = window.setTimeout(() => {
      const restoredStartedAt = draft.startedAt
        ? Date.parse(draft.startedAt)
        : Date.now();
      const safeStartedAt = Number.isFinite(restoredStartedAt)
        ? restoredStartedAt
        : Date.now();
      const restoredResponses = draft.responses ?? {};
      const elapsedSeconds = Math.floor((Date.now() - safeStartedAt) / 1000);
      const restoredRemaining = Math.max(
        draft.durationSeconds - elapsedSeconds,
        0,
      );

      responsesRef.current = restoredResponses;
      setResponses(restoredResponses);
      setStarted(true);
      setStartedAtMs(safeStartedAt);
      setShowTimer(draft.showTimer);
      setRemainingSeconds(restoredRemaining);

      if (restoredRemaining <= timeWarningThresholdSeconds && restoredRemaining > 0) {
        setShowTimeWarning(true);
      }

      if (restoredRemaining === 0) {
        submitFinalExam(true, restoredResponses);
      }
    }, 0);

    return () => window.clearTimeout(restoreTimeoutId);
  }, [submitFinalExam]);

  useEffect(() => {
    if (!started || submitted || !startedAtMs) {
      return;
    }

    saveFinalExamDraft({
      durationSeconds: finalExamDurationSeconds,
      responses,
      showTimer,
      started,
      startedAt: new Date(startedAtMs).toISOString(),
      submitted,
      updatedAt: new Date().toISOString(),
    });
  }, [responses, showTimer, started, startedAtMs, submitted]);

  function updateAnswer(index: number, answer: string) {
    if (submitted) {
      return;
    }

    setResponses((current) => ({ ...current, [index]: answer }));
  }

  function retry() {
    setStarted(false);
    setResponses({});
    setSubmitted(false);
    setAutoSubmitted(false);
    setRemainingSeconds(finalExamDurationSeconds);
    setStartedAtMs(null);
    setShowTimeWarning(false);
    clearFinalExamDraft();
    setReviewedQuestionIndexes(new Set());
    window.scrollTo({ behavior: "smooth", top: 0 });
  }

  function markTopicReviewed(index: number) {
    setReviewedQuestionIndexes((current) => {
      const next = new Set(current);
      next.add(index);
      return next;
    });
  }

  function startFinalExam() {
    setStarted(true);
    setResponses({});
    setSubmitted(false);
    setAutoSubmitted(false);
    const startTime = Date.now();
    setStartedAtMs(startTime);
    setRemainingSeconds(finalExamDurationSeconds);
    setShowTimer(true);
    setShowTimeWarning(false);
    saveFinalExamDraft({
      durationSeconds: finalExamDurationSeconds,
      responses: {},
      showTimer: true,
      started: true,
      startedAt: new Date(startTime).toISOString(),
      submitted: false,
      updatedAt: new Date().toISOString(),
    });
    setReviewedQuestionIndexes(new Set());
    window.scrollTo({ behavior: "smooth", top: 0 });
  }

  if (!started) {
    return <FinalExamStartScreen onStart={startFinalExam} />;
  }

  return (
    <div className="mx-auto grid w-full gap-8 text-black">
      {!submitted ? (
        <FinalExamTimer
          onDismissWarning={() => setShowTimeWarning(false)}
          onToggle={() => setShowTimer((current) => !current)}
          remainingSeconds={remainingSeconds}
          showTimer={showTimer}
          showWarning={showTimeWarning}
        />
      ) : null}

      <section className={`${cardBaseClass} w-full border-black bg-white text-center shadow-xl shadow-black/10`}>
        <p className="text-sm font-black uppercase tracking-wide text-black">
          Cumulative Final Exam
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-black">
          Final Exam
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-7 text-black">
          Answer all {finalExamQuestionCount} multiple-choice questions. Passing
          score: {finalExamPassingScore}%.
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-sm font-bold leading-6 text-black">
          Answers are not shown during the exam. Results and review topics
          appear after submission.
        </p>
      </section>

      {finalExamQuestions.length !== finalExamQuestionCount ? (
        <section className={`${cardBaseClass} border-black bg-white text-center text-black`}>
          <p className="text-lg font-black">
            Final Exam question bank is incomplete.
          </p>
          <p className="mt-2 text-sm font-semibold">
            Expected {finalExamQuestionCount} questions, but found{" "}
            {finalExamQuestions.length}. Return to the dashboard while the bank
            is refreshed.
          </p>
        </section>
      ) : null}

      <section className="grid gap-5">
        {finalExamQuestions.map((question, index) => (
          <article
            className="rounded-3xl border border-black bg-white p-5 text-left shadow-sm shadow-black/10"
            key={`${question.moduleSlug}-${question.prompt}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-black uppercase tracking-wide text-black">
                Question {index + 1}
              </p>
              <p className="rounded-full border border-black px-3 py-1 text-xs font-black uppercase tracking-wide text-black">
                Module {question.moduleCode}
              </p>
            </div>

            <h2 className="mt-3 text-xl font-black leading-8 text-black">
              <FormattedConceptText text={question.prompt} />
            </h2>

            {question.graphId ? (
              <GraphCard
                className="mt-5 border-black bg-white"
                genericPanelLabels
                graphId={question.graphId}
                hideCallouts
                hideDescription
                monochrome
                titleOverride={`Graph for Question ${index + 1}`}
              />
            ) : null}

            <div className="mt-5 grid gap-3" role="radiogroup">
              {question.choices.map((choice, choiceIndex) => {
                const checked = responses[index] === choice;

                return (
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm font-bold leading-6 transition ${
                      checked
                        ? "border-black bg-black text-white"
                        : "border-black bg-white text-black hover:bg-neutral-100"
                    } ${submitted ? "cursor-default" : ""}`}
                    key={`${index}-${choiceIndex}-${choice}`}
                  >
                    <input
                      checked={checked}
                      className="mt-1 h-4 w-4 accent-black"
                      disabled={submitted}
                      name={`final-exam-question-${index}`}
                      onChange={() => updateAnswer(index, choice)}
                      type="radio"
                    />
                    <span>
                      <FormattedConceptText text={choice} />
                    </span>
                  </label>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      <section className={`${cardBaseClass} border-black bg-white text-center text-black shadow-xl shadow-black/10`}>
        {submitted ? (
          <FinalExamResults
            incorrectQuestions={incorrectQuestions}
            autoSubmitted={autoSubmitted}
            onRetry={retry}
            onReviewTopic={markTopicReviewed}
            passed={passed}
            reviewedQuestionIndexes={reviewedQuestionIndexes}
            score={score}
            selectedAnswers={responses}
          />
        ) : (
          <>
            <p className="text-base font-black">
              Complete every question before submitting.
            </p>
            <button
              className="mt-5 rounded-xl border border-black bg-black px-8 py-4 text-base font-black text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!allAnswered}
              onClick={() => submitFinalExam(false)}
              type="button"
            >
              Submit Final Exam
            </button>
          </>
        )}

      </section>
    </div>
  );
}

function FinalExamStartScreen({ onStart }: { onStart: () => void }) {
  const directions = [
    "This exam is timed",
    "You have exactly 4 hours to complete it",
    "You may hide the timer if you choose",
    "There will be a 10 minute warning before the exam closes",
    "When the exam closes it will grade your exam and give you a score",
    "Passing score is 90%",
    "If you fail the Final Exam you may take it again after reviewing the modules to the questions you missed",
  ];
  const bulletClasses = [
    "bg-purple-500 shadow-purple-200",
    "bg-blue-500 shadow-blue-200",
    "bg-teal-500 shadow-teal-200",
    "bg-emerald-500 shadow-emerald-200",
  ];

  return (
    <section className="relative w-full overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 p-2 text-center shadow-2xl shadow-teal-100/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(147,51,234,0.16),transparent_28%),radial-gradient(circle_at_85%_16%,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.16),transparent_32%)]" />
      <div className="relative rounded-[1.75rem] border border-white/70 bg-white/80 px-6 py-10 backdrop-blur-xl sm:px-10">
      <p className="text-sm font-black uppercase tracking-wide text-blue-700">
        Final Exam directions
      </p>
      <h1 className="mt-3 bg-gradient-to-r from-purple-700 via-blue-600 to-teal-500 bg-clip-text text-5xl font-black tracking-tight text-transparent">
        Before You Begin
      </h1>

      <ul className="mx-auto mt-8 grid max-w-3xl gap-5 text-left">
        {directions.map((direction, index) => (
          <li
            className="flex items-start gap-4 text-base font-bold leading-7 text-slate-950"
            key={direction}
          >
            <span
              aria-hidden="true"
              className={`mt-2 h-3 w-3 shrink-0 rounded-full shadow-md ${
                bulletClasses[index % bulletClasses.length]
              }`}
            />
            <span>{direction}</span>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-10 max-w-2xl text-xl font-black leading-8 text-slate-950">
        When you&apos;re ready, push &quot;Start the Final Exam&quot;
      </p>

      <button
        className="mt-6 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 px-10 py-5 text-lg font-black text-white shadow-lg shadow-teal-300/40 transition hover:scale-[1.01] hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
        onClick={onStart}
        type="button"
      >
        Start the Final Exam
      </button>
      </div>
    </section>
  );
}

function FinalExamResults({
  autoSubmitted,
  incorrectQuestions,
  onRetry,
  onReviewTopic,
  passed,
  reviewedQuestionIndexes,
  score,
  selectedAnswers,
}: {
  autoSubmitted: boolean;
  incorrectQuestions: Array<{
    index: number;
    question: (typeof finalExamQuestions)[number];
  }>;
  onRetry: () => void;
  onReviewTopic: (index: number) => void;
  passed: boolean;
  reviewedQuestionIndexes: Set<number>;
  score: number;
  selectedAnswers: Record<number, string>;
}) {
  const allMissedTopicsReviewed =
    passed ||
    incorrectQuestions.every(({ index }) => reviewedQuestionIndexes.has(index));

  return (
    <div className="text-black">
      <p className="text-sm font-black uppercase tracking-wide text-black">
        Final score
      </p>
      <div className="mt-3 text-7xl font-black tracking-tight text-black">
        {score}%
      </div>
      <p className="mt-4 text-2xl font-black text-black">
        {passed
          ? "You passed the Final Exam!"
          : "Keep going — review the recommended topics and try again."}
      </p>
      <p className="mt-3 text-base font-semibold text-black">
        {incorrectQuestions.length === 0
          ? "No incorrect questions."
          : `${incorrectQuestions.length} question${
              incorrectQuestions.length === 1 ? "" : "s"
            } marked for review.`}
      </p>
      {autoSubmitted ? (
        <p className="mx-auto mt-4 max-w-2xl rounded-2xl border border-black bg-white p-4 text-sm font-black leading-6 text-black">
          Time expired. Your exam was submitted automatically and graded as-is.
        </p>
      ) : null}

      {incorrectQuestions.length > 0 ? (
        <div className="mt-8 grid gap-4 text-left">
          {incorrectQuestions.map(({ index, question }) => (
            <article
              className="rounded-3xl border border-black bg-white p-5"
              key={`${question.moduleSlug}-${question.prompt}-review`}
            >
              <p className="text-sm font-black uppercase tracking-wide text-black">
                Question {index + 1} incorrect
              </p>
              <h3 className="mt-2 text-lg font-black leading-7 text-black">
                <FormattedConceptText text={question.prompt} />
              </h3>
              <p className="mt-4 text-sm font-bold leading-6 text-black">
                Your answer:{" "}
                <FormattedConceptText
                  text={selectedAnswers[index] || "No answer selected"}
                />
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-black">
                Correct answer: <FormattedConceptText text={question.answer} />
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-black">
                <FormattedConceptText text={question.explanation} />
              </p>
              <div className="mt-4 rounded-2xl border border-black bg-white p-4 text-sm text-black">
                <p className="font-black">
                  Module: Module {question.moduleCode} - {question.moduleTitle}
                </p>
                <p className="mt-2 font-black">
                  Checklist item/topic: {question.checklistTopic}
                </p>
                <p className="mt-2 font-semibold leading-6">
                  Explanation:{" "}
                  <FormattedConceptText text={question.explanation} />
                </p>
                <Link
                  className="mt-4 inline-block rounded-xl border border-black bg-black px-5 py-3 text-sm font-black text-white transition hover:bg-neutral-800"
                  href={question.reviewHref}
                  onClick={() => onReviewTopic(index)}
                  rel="noreferrer"
                  target="_blank"
                >
                  Review this topic
                </Link>
                {reviewedQuestionIndexes.has(index) ? (
                  <p className="mt-3 text-xs font-black uppercase tracking-wide text-black">
                    Review link opened
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {!passed && incorrectQuestions.length > 0 ? (
        <p className="mx-auto mt-8 max-w-2xl rounded-2xl border border-black bg-white p-4 text-sm font-bold leading-6 text-black">
          Open each recommended review topic before retaking the Final Exam.
        </p>
      ) : null}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          className="inline-block rounded-xl border border-black bg-white px-6 py-3 text-sm font-black text-black transition hover:bg-neutral-100"
          href="/dashboard"
        >
          Back to Dashboard
        </Link>
        <button
          className="rounded-xl border border-black bg-black px-6 py-3 text-sm font-black text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!allMissedTopicsReviewed}
          onClick={onRetry}
          type="button"
        >
          Take Final Exam Again
        </button>
      </div>
    </div>
  );
}

function FinalExamTimer({
  onDismissWarning,
  onToggle,
  remainingSeconds,
  showTimer,
  showWarning,
}: {
  onDismissWarning: () => void;
  onToggle: () => void;
  remainingSeconds: number;
  showTimer: boolean;
  showWarning: boolean;
}) {
  return (
    <>
      <div className="fixed right-4 top-4 z-50 rounded-2xl border border-black bg-white p-4 text-center text-black shadow-xl shadow-black/20">
        {showTimer ? (
          <>
            <p className="text-xs font-black uppercase tracking-wide">
              Time remaining
            </p>
            <p className="mt-1 font-mono text-2xl font-black">
              {formatRemainingTime(remainingSeconds)}
            </p>
          </>
        ) : (
          <p className="text-sm font-black">Timer hidden</p>
        )}
        <button
          className="mt-3 rounded-xl border border-black bg-white px-4 py-2 text-xs font-black text-black transition hover:bg-neutral-100"
          onClick={onToggle}
          type="button"
        >
          {showTimer ? "Hide timer" : "Show timer"}
        </button>
      </div>

      {showWarning ? (
        <div
          className="fixed right-4 top-36 z-50 max-w-sm rounded-3xl border-2 border-black bg-white p-5 text-left text-black shadow-2xl shadow-black/20"
          role="alert"
        >
          <p className="text-sm font-black uppercase tracking-wide">
            Time warning
          </p>
          <p className="mt-2 text-lg font-black">
            10 minutes remaining.
          </p>
          <p className="mt-2 text-sm font-semibold leading-6">
            Submit when you are ready. If time runs out, the exam will be graded
            as-is.
          </p>
          <button
            className="mt-4 rounded-xl border border-black bg-black px-4 py-2 text-xs font-black text-white transition hover:bg-neutral-800"
            onClick={onDismissWarning}
            type="button"
          >
            Dismiss
          </button>
        </div>
      ) : null}
    </>
  );
}
