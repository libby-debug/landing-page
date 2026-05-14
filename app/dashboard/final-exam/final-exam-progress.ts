import { persistProgressValueSoon } from "../tco-6/progression";

export type FinalExamProgress = {
  autoSubmitted: boolean;
  correctCount: number;
  passed: boolean;
  score: number;
  submittedAt: string;
  totalQuestions: number;
};

export type FinalExamDraft = {
  durationSeconds: number;
  responses: Record<number, string>;
  showTimer: boolean;
  started: boolean;
  startedAt: string | null;
  submitted: boolean;
  updatedAt: string;
};

const finalExamProgressKey = "aba-mastered:tco6:final-exam:progress";
const finalExamDraftKey = "aba-mastered:tco6:final-exam:draft";

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

export function saveFinalExamDraft(draft: FinalExamDraft) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(finalExamDraftKey, JSON.stringify(draft));
  persistProgressValueSoon(finalExamDraftKey, draft);
  window.dispatchEvent(
    new CustomEvent("aba-mastered-final-exam-draft-saved", {
      detail: draft,
    }),
  );
}

export function readFinalExamDraft() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(finalExamDraftKey);
    return stored ? JSON.parse(stored) as FinalExamDraft : null;
  } catch {
    return null;
  }
}

export function clearFinalExamDraft() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(finalExamDraftKey);
  persistProgressValueSoon(finalExamDraftKey, null);
  window.dispatchEvent(new Event("aba-mastered-final-exam-draft-cleared"));
}
