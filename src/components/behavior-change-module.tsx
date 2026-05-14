"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import {
  Button,
  ComparisonDefinitionBlocks,
  HighlightedText,
  PageShell,
  cardBaseClass,
  eyebrowClass,
  leadClass,
  pageTitleClass,
  sectionTitleClass,
} from "@/components/learning-ui";
import {
  masteryThreshold,
  type StudyModule,
} from "@/lib/modules/behavior-change-modules";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigurationMessage,
} from "@/lib/supabase/client";

type BehaviorChangeModuleProps = {
  module: StudyModule;
};

type SavedScore = {
  score: number | null;
  mastered: boolean | null;
};

type SaveState = "idle" | "saving" | "saved" | "error";

const toneClasses = [
  {
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    border: "border-purple-200",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    border: "border-teal-200",
    bg: "bg-teal-50",
    text: "text-teal-600",
  },
  {
    border: "border-green-200",
    bg: "bg-green-50",
    text: "text-green-600",
  },
  {
    border: "border-orange-200",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
];

function getTone(index: number) {
  return toneClasses[index % toneClasses.length];
}

function getScoreText(score: number | null) {
  return typeof score === "number" ? `${score}%` : "0%";
}

function getBehaviorChangeQuizHint() {
  return "Focus on the behavior-change relation: what response pattern contacts reinforcement, what step is being taught, and whether responding increases, decreases, or contacts extinction.";
}

export function BehaviorChangeModule({ module }: BehaviorChangeModuleProps) {
  const { user, loading: authLoading } = useAuth();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [incorrectAttempts, setIncorrectAttempts] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [savedScore, setSavedScore] = useState<SavedScore | null>(null);
  const [previousScore, setPreviousScore] = useState<SavedScore | null>(null);
  const [progressLoading, setProgressLoading] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const correctCount = useMemo(
    () =>
      module.quiz.reduce((count, question, index) => {
        return answers[index] === question.answer ? count + 1 : count;
      }, 0),
    [answers, module.quiz],
  );

  const calculatedScore = useMemo(
    () => Math.round((correctCount / module.quiz.length) * 100),
    [correctCount, module.quiz.length],
  );

  const allAnswered = module.quiz.every((_, index) => answers[index]);
  const previousMastered =
    !module.previousSlug ||
    Boolean(previousScore?.mastered) ||
    (previousScore?.score ?? 0) >= masteryThreshold;
  const locked = Boolean(module.previousSlug) && !previousMastered;

  useEffect(() => {
    let mounted = true;

    async function loadScores() {
      if (authLoading) {
        return;
      }

      if (!isSupabaseConfigured || !user) {
        setSavedScore(null);
        setPreviousScore(null);
        setProgressLoading(false);
        return;
      }

      const userId = user.id;

      setProgressLoading(true);
      setMessage("");

      const currentRequest = supabase
        .from("module_mastery_scores")
        .select("score, mastered")
        .eq("user_id", userId)
        .eq("module_slug", module.slug)
        .maybeSingle();

      const previousRequest = module.previousSlug
        ? supabase
            .from("module_mastery_scores")
            .select("score, mastered")
            .eq("user_id", userId)
            .eq("module_slug", module.previousSlug)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null });

      const [currentResult, previousResult] = await Promise.all([
        currentRequest,
        previousRequest,
      ]);

      if (!mounted) {
        return;
      }

      if (currentResult.error || previousResult.error) {
        setMessage(
          "Progress tracking is ready, but the mastery score table could not be read yet.",
        );
      }

      setSavedScore((currentResult.data as SavedScore | null) ?? null);
      setPreviousScore((previousResult.data as SavedScore | null) ?? null);
      setProgressLoading(false);
    }

    loadScores();

    return () => {
      mounted = false;
    };
  }, [authLoading, module.previousSlug, module.slug, user]);

  function updateAnswer(questionIndex: number, answer: string) {
    if (submitted && answers[questionIndex] === module.quiz[questionIndex].answer) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [questionIndex]: answer,
    }));
    setSubmitted(false);
    setCurrentScore(null);
    setSaveState("idle");
    setMessage("");
  }

  async function submitQuiz() {
    if (!allAnswered || locked) {
      return;
    }

    setSubmitted(true);
    setIncorrectAttempts((current) => {
      const next = { ...current };
      module.quiz.forEach((question, index) => {
        if (answers[index] !== question.answer) {
          next[index] = (next[index] ?? 0) + 1;
        }
      });
      return next;
    });
    setCurrentScore(calculatedScore);

    if (!isSupabaseConfigured) {
      setSaveState("error");
      setMessage(`${supabaseConfigurationMessage} This score was not saved.`);
      return;
    }

    if (!user) {
      setSaveState("error");
      setMessage("Log in to save mastery scores to your ABA Mastered progress.");
      return;
    }

    setSaveState("saving");
    setMessage("");

    const mastered = calculatedScore >= masteryThreshold;
    const { error } = await supabase.from("module_mastery_scores").upsert(
      {
        user_id: user.id,
        module_slug: module.slug,
        score: calculatedScore,
        mastered,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_slug" },
    );

    if (error) {
      setSaveState("error");
      setMessage("Your score could not be saved yet. Please try again.");
      return;
    }

    setSavedScore({ score: calculatedScore, mastered });
    setSaveState("saved");
    setMessage(
      mastered
        ? "Mastery saved. You reached the 90% threshold."
        : "Score saved. Review the rationales and try again to reach 90% mastery.",
    );
  }

  function resetQuiz() {
    setAnswers({});
    setIncorrectAttempts({});
    setSubmitted(false);
    setCurrentScore(null);
    setSaveState("idle");
    setMessage("");
  }

  return (
    <PageShell maxWidth="6xl">
      <p className={eyebrowClass}>{module.eyebrow}</p>

      <h1 className={pageTitleClass}>{module.title}</h1>

      <p className={leadClass}>{module.description}</p>

      <section className="mt-10 flex w-full flex-wrap justify-center gap-6">
        <div className={`${cardBaseClass} w-full border-blue-200 bg-blue-50 md:w-[calc(33.333%_-_1rem)]`}>
          <p className={eyebrowClass}>Mastery threshold</p>
          <div className="mt-4 text-6xl font-extrabold tracking-tight text-slate-950">
            {masteryThreshold}%
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-950">
            Mastery is reached when quiz performance is 90% or higher.
          </p>
        </div>

        <div className={`${cardBaseClass} w-full border-purple-200 bg-purple-50 md:w-[calc(33.333%_-_1rem)]`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            TCO alignment
          </p>
          <div className="mt-4 text-4xl font-extrabold tracking-tight text-purple-600">
            G
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-950">
            {module.tcoAlignment}
          </p>
        </div>

        <div className={`${cardBaseClass} w-full border-teal-200 bg-teal-50 md:w-[calc(33.333%_-_1rem)]`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
            Saved mastery
          </p>
          <div className="mt-4 text-6xl font-extrabold tracking-tight text-teal-600">
            {progressLoading ? "..." : getScoreText(savedScore?.score ?? null)}
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-950">
            {savedScore?.mastered
              ? "Mastery threshold met."
              : "Complete the quiz at 90% or higher to save mastery."}
          </p>
        </div>
      </section>

      {locked ? (
        <section
          className={`${cardBaseClass} mt-10 w-full border-slate-200 bg-slate-50`}
        >
          <p className={eyebrowClass}>Progression gating</p>
          <h2 className={sectionTitleClass}>
            Master {module.previousTitle} to unlock {module.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-950">
            Reach 90% mastery in {module.previousTitle} before starting this
            module. Your saved {module.previousTitle} score is{" "}
            {progressLoading ? "loading" : getScoreText(previousScore?.score ?? null)}.
          </p>
          {module.previousSlug ? (
            <div className="mt-6 flex justify-center">
              <Link
                href={`/modules/${module.previousSlug}`}
                className="inline-block rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Review {module.previousTitle}
              </Link>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Visual comparison</p>
        <h2 className={sectionTitleClass}>
          Core distinctions
        </h2>

        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {module.concepts.map((concept, index) => {
            const tone = getTone(index);

            return (
              <article
                key={concept.label}
                className={`${cardBaseClass} w-full ${tone.border} ${tone.bg} md:w-[calc(33.333%_-_1rem)]`}
              >
                <h3 className="text-3xl font-extrabold tracking-tight text-slate-950">
                  {concept.label}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-950">
                  <HighlightedText text={concept.text} />
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Discrimination practice</p>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {module.comparisons.map((comparison, index) => {
            const tone = getTone(index + 1);

            return (
              <article
                key={comparison.title}
                className={`${cardBaseClass} w-full ${tone.border} bg-white lg:w-[calc(50%_-_0.75rem)]`}
              >
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                  {comparison.title}
                </h3>
                <div className="mt-4">
                  <ComparisonDefinitionBlocks text={comparison.description} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Examples and nonexamples</p>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {module.examples.map((item, index) => (
            <article
              key={item.example}
              className={`${cardBaseClass} w-full border-blue-200 bg-white lg:w-[calc(50%_-_0.75rem)]`}
            >
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                Scenario {index + 1}
              </h3>
              <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-left">
                <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
                  Example
                </p>
                <p className="mt-2 text-base leading-relaxed text-slate-950">
                  {item.example}
                </p>
              </div>
              <div className="mt-4 rounded-2xl border border-teal-200 bg-teal-50 p-4 text-left">
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
                  Nonexample
                </p>
                <p className="mt-2 text-base leading-relaxed text-slate-950">
                  {item.nonexample}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Common confusions</p>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {module.commonConfusions.map((confusion) => (
            <article
              key={confusion.title}
              className={`${cardBaseClass} w-full border-purple-200 bg-purple-50 md:w-[calc(50%_-_0.75rem)]`}
            >
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                {confusion.title}
              </h3>
              <div className="mt-4">
                <ComparisonDefinitionBlocks text={confusion.text} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Mastery quiz</p>
        <h2 className={sectionTitleClass}>
          Score 90% or higher to master {module.title}
        </h2>

        <div className="mt-6 grid gap-6">
          {module.quiz.map((question, questionIndex) => (
            <article
              key={question.prompt}
              className={`${cardBaseClass} border-slate-200 bg-white text-left`}
            >
              <h3 className="text-xl font-extrabold tracking-tight text-slate-950">
                {questionIndex + 1}. {question.prompt}
              </h3>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
              {question.options.map((option, optionIndex) => {
                const selected = answers[questionIndex] === option;
                const selectedCorrect =
                  submitted && selected && option === question.answer;
                const incorrectSelected =
                  submitted && selected && option !== question.answer;

                  return (
                    <button
                      key={`${questionIndex}-${optionIndex}-${option}`}
                      type="button"
                      disabled={locked || (submitted && selectedCorrect)}
                      onClick={() => updateAnswer(questionIndex, option)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed md:w-[calc(50%_-_0.375rem)] ${
                        selectedCorrect
                          ? "border-green-300 bg-green-50 text-green-700"
                          : incorrectSelected
                            ? "border-teal-300 bg-teal-50 text-teal-700"
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
                <div
                  className={`mt-5 rounded-2xl border p-4 ${
                    answers[questionIndex] === question.answer
                      ? "border-green-200 bg-green-50"
                      : (incorrectAttempts[questionIndex] ?? 0) >= 4
                        ? "border-amber-200 bg-amber-50"
                        : "border-teal-200 bg-teal-50"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold uppercase tracking-wide ${
                      answers[questionIndex] === question.answer
                        ? "text-green-700"
                        : (incorrectAttempts[questionIndex] ?? 0) >= 4
                          ? "text-amber-700"
                          : "text-teal-700"
                    }`}
                  >
                    {answers[questionIndex] === question.answer
                      ? "Rationale feedback"
                      : (incorrectAttempts[questionIndex] ?? 0) >= 4
                        ? "Review Topic in Learning Modules"
                        : "Not quite. Hint"}
                  </p>
                  {answers[questionIndex] !== question.answer &&
                  (incorrectAttempts[questionIndex] ?? 0) >= 4 ? (
                    <p className="mt-2 text-sm font-black text-slate-950">
                      Correct answer: {question.answer}
                    </p>
                  ) : null}
                  <p className="mt-2 text-base leading-relaxed text-slate-950">
                    {answers[questionIndex] === question.answer ||
                    (incorrectAttempts[questionIndex] ?? 0) >= 4
                      ? question.rationale
                      : `Hint: ${getBehaviorChangeQuizHint()}`}
                  </p>
                  {answers[questionIndex] !== question.answer &&
                  (incorrectAttempts[questionIndex] ?? 0) > 0 &&
                  (incorrectAttempts[questionIndex] ?? 0) < 4 ? (
                    <p className="mt-2 text-xs font-bold uppercase tracking-wide text-teal-700">
                      Incorrect attempt {incorrectAttempts[questionIndex]} of 4
                    </p>
                  ) : null}
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
            disabled={!allAnswered || submitted || locked}
            onClick={submitQuiz}
          >
            {saveState === "saving" ? "Saving..." : "Submit quiz"}
          </Button>
          <Button
            type="button"
            size="large"
            variant="secondary"
            onClick={resetQuiz}
          >
            Try again
          </Button>
        </div>

        {submitted ? (
          <div
            className={`${cardBaseClass} mx-auto mt-8 max-w-2xl border-blue-200 bg-blue-50`}
          >
            <p className={eyebrowClass}>Quiz score</p>
            <div
              className="mt-4 text-6xl font-extrabold tracking-tight text-slate-950"
            >
              {getScoreText(currentScore)}
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-950">
              {correctCount} of {module.quiz.length} correct.{" "}
              {(currentScore ?? 0) >= masteryThreshold
                ? "Mastery threshold met."
                : "Review the rationales and retry for 90% mastery."}
            </p>
          </div>
        ) : null}

        {message ? (
          <p
            className={`mx-auto mt-6 max-w-2xl rounded-2xl border px-4 py-3 text-sm font-semibold ${
              saveState === "saved"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-teal-200 bg-teal-50 text-teal-700"
            }`}
          >
            {message}
          </p>
        ) : null}

        {saveState === "saving" ? (
          <p className="mx-auto mt-6 max-w-2xl rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
            Saving your mastery score...
          </p>
        ) : null}
      </section>
    </PageShell>
  );
}
