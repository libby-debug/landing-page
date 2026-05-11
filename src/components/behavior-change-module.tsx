"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import {
  Button,
  PageShell,
  cardBaseClass,
  eyebrowClass,
  gradientTextClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";
import {
  masteryThreshold,
  type StudyModule,
} from "@/lib/modules/behavior-change-modules";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

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
    border: "border-pink-200",
    bg: "bg-pink-50",
    text: "text-pink-600",
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

export function BehaviorChangeModule({ module }: BehaviorChangeModuleProps) {
  const { user, loading: authLoading } = useAuth();
  const [answers, setAnswers] = useState<Record<number, string>>({});
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
    if (submitted) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [questionIndex]: answer,
    }));
  }

  async function submitQuiz() {
    if (!allAnswered || locked) {
      return;
    }

    setSubmitted(true);
    setCurrentScore(calculatedScore);

    if (!isSupabaseConfigured) {
      setSaveState("error");
      setMessage("Supabase is not configured, so this score was not saved.");
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
    setSubmitted(false);
    setCurrentScore(null);
    setSaveState("idle");
    setMessage("");
  }

  return (
    <PageShell maxWidth="6xl">
      <p className={eyebrowClass}>{module.eyebrow}</p>

      <h1 className={pageTitleClass}>
        {module.title.includes(" ") ? (
          <>
            {module.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className={gradientTextClass}>
              {module.title.split(" ").slice(-1).join(" ")}
            </span>
          </>
        ) : (
          <span className={gradientTextClass}>{module.title}</span>
        )}
      </h1>

      <p className={leadClass}>{module.description}</p>

      <section className="mt-10 grid w-full gap-6 md:grid-cols-3">
        <div className={`${cardBaseClass} border-blue-200 bg-blue-50`}>
          <p className={eyebrowClass}>Mastery threshold</p>
          <div
            className={`mt-4 text-6xl font-extrabold tracking-tight ${gradientTextClass}`}
          >
            {masteryThreshold}%
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Mastery is reached when quiz performance is 90% or higher.
          </p>
        </div>

        <div className={`${cardBaseClass} border-purple-200 bg-purple-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            TCO alignment
          </p>
          <div className="mt-4 text-4xl font-extrabold tracking-tight text-purple-600">
            G
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            {module.tcoAlignment}
          </p>
        </div>

        <div className={`${cardBaseClass} border-pink-200 bg-pink-50`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
            Saved mastery
          </p>
          <div className="mt-4 text-6xl font-extrabold tracking-tight text-pink-600">
            {progressLoading ? "..." : getScoreText(savedScore?.score ?? null)}
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            {savedScore?.mastered
              ? "Mastery threshold met."
              : "Progress tracking is prepared for Supabase mastery scores."}
          </p>
        </div>
      </section>

      {locked ? (
        <section
          className={`${cardBaseClass} mt-10 w-full border-slate-200 bg-slate-50`}
        >
          <p className={eyebrowClass}>Progression gating</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
            Master {module.previousTitle} to unlock {module.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
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
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          Core distinctions
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {module.concepts.map((concept, index) => {
            const tone = getTone(index);

            return (
              <article
                key={concept.label}
                className={`${cardBaseClass} ${tone.border} ${tone.bg}`}
              >
                <h3
                  className={`text-3xl font-extrabold tracking-tight ${tone.text}`}
                >
                  {concept.label}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  {concept.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Discrimination practice</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {module.comparisons.map((comparison, index) => {
            const tone = getTone(index + 1);

            return (
              <article
                key={comparison.title}
                className={`${cardBaseClass} ${tone.border} bg-white`}
              >
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                  {comparison.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  {comparison.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Examples and nonexamples</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {module.examples.map((item, index) => (
            <article
              key={item.example}
              className={`${cardBaseClass} border-blue-200 bg-white`}
            >
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                Scenario {index + 1}
              </h3>
              <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-left">
                <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
                  Example
                </p>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  {item.example}
                </p>
              </div>
              <div className="mt-4 rounded-2xl border border-pink-200 bg-pink-50 p-4 text-left">
                <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
                  Nonexample
                </p>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  {item.nonexample}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Common confusions</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {module.commonConfusions.map((confusion) => (
            <article
              key={confusion.title}
              className={`${cardBaseClass} border-purple-200 bg-purple-50`}
            >
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                {confusion.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {confusion.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 w-full">
        <p className={eyebrowClass}>Mastery quiz</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
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

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {question.options.map((option) => {
                  const selected = answers[questionIndex] === option;
                  const correct = submitted && option === question.answer;
                  const incorrectSelected =
                    submitted && selected && option !== question.answer;

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={submitted || locked}
                      onClick={() => updateAnswer(questionIndex, option)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed ${
                        correct
                          ? "border-green-300 bg-green-50 text-green-700"
                          : incorrectSelected
                            ? "border-pink-300 bg-pink-50 text-pink-700"
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
                <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Rationale feedback
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-slate-700">
                    {question.rationale}
                  </p>
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
              className={`mt-4 text-6xl font-extrabold tracking-tight ${
                (currentScore ?? 0) >= masteryThreshold
                  ? gradientTextClass
                  : "text-slate-950"
              }`}
            >
              {getScoreText(currentScore)}
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
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
                : "border-pink-200 bg-pink-50 text-pink-700"
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
