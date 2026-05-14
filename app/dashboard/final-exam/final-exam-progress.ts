import { persistProgressValueSoon } from "../tco-6/progression";

export type FinalExamProgress = {
  autoSubmitted: boolean;
  correctCount: number;
  passed: boolean;
  score: number;
  submittedAt: string;
  totalQuestions: number;
};

const finalExamProgressKey = "aba-mastered:tco6:final-exam:progress";

export function saveFinalExamProgress(progress: FinalExamProgress) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(finalExamProgressKey, JSON.stringify(progress));
  persistProgressValueSoon(finalExamProgressKey, progress);
  window.dispatchEvent(
    new CustomEvent("aba-mastered-final-exam-progress", {
      detail: progress,
    }),
  );
}

export function readFinalExamProgress() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(finalExamProgressKey);
    return stored ? JSON.parse(stored) as FinalExamProgress : null;
  } catch {
    return null;
  }
}
