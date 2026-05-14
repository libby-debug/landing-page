import { tcoSections } from "../tco-6/data";
import { getModuleContent } from "../tco-6/module-content";
import type { QuestionContent, VisualKind } from "../tco-6/section-b-content";

export type FinalExamQuestion = {
  answer: string;
  choices: string[];
  explanation: string;
  graphId?: string;
  checklistTopic: string;
  moduleCode: string;
  moduleSlug: string;
  moduleTitle: string;
  prompt: string;
  reviewHref: string;
  reviewTopic: string;
};

export const finalExamPassingScore = 90;

const finalExamDistribution: Record<string, number> = {
  a: 8,
  b: 24,
  c: 21,
  d: 13,
  e: 22,
  f: 23,
  g: 25,
  h: 20,
  i: 19,
};

const additionalFinalExamDistribution: Record<string, number> = {
  a: 1,
  b: 1,
  c: 1,
  d: 1,
  e: 1,
  f: 1,
  g: 1,
  h: 1,
  i: 2,
};

const tokenStopWords = new Set([
  "about",
  "after",
  "answer",
  "because",
  "behavior",
  "best",
  "client",
  "correct",
  "data",
  "during",
  "from",
  "given",
  "graph",
  "learner",
  "least",
  "module",
  "most",
  "question",
  "response",
  "should",
  "shows",
  "team",
  "that",
  "their",
  "then",
  "this",
  "what",
  "when",
  "which",
  "with",
]);

function getTokens(text: string) {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/\s+/)
        .map((token) => token.trim())
        .filter((token) => token.length > 3 && !tokenStopWords.has(token)),
    ),
  );
}

function scoreText(searchTokens: string[], candidateText: string) {
  const candidate = candidateText.toLowerCase();

  return searchTokens.reduce(
    (score, token) => score + (candidate.includes(token) ? 1 : 0),
    0,
  );
}

function getBestIndex(
  searchText: string,
  candidates: string[],
  fallbackIndex = 0,
) {
  const searchTokens = getTokens(searchText);
  let bestIndex = fallbackIndex;
  let bestScore = -1;

  candidates.forEach((candidate, index) => {
    const score = scoreText(searchTokens, candidate);

    if (score > bestScore) {
      bestIndex = index;
      bestScore = score;
    }
  });

  return bestIndex;
}

function getLearnHref(moduleSlug: string, lessonIndex: number) {
  return lessonIndex <= 0
    ? `/dashboard/tco-6/${moduleSlug}/learn`
    : `/dashboard/tco-6/${moduleSlug}/learn/${lessonIndex + 1}`;
}

function hasSingleAnswerChoices(question: QuestionContent) {
  return Boolean(
    question.choices?.length &&
      question.answer &&
      question.choices.includes(question.answer),
  );
}

function toFinalExamQuestion(
  fallbackIndex: number,
  lessonSearchTexts: string[],
  question: QuestionContent,
  checklistItems: string[],
  moduleCode: string,
  moduleSlug: string,
  moduleTitle: string,
): FinalExamQuestion | null {
  if (!hasSingleAnswerChoices(question)) {
    return null;
  }

  const searchText = [
    question.prompt,
    question.choices?.join(" ") ?? "",
    question.explanation,
  ].join(" ");
  const fallbackTopicIndex =
    checklistItems.length > 0 ? fallbackIndex % checklistItems.length : 0;
  const checklistIndex = getBestIndex(
    searchText,
    checklistItems,
    fallbackTopicIndex,
  );
  const checklistTopic =
    checklistItems[checklistIndex] ?? `${moduleTitle} review`;
  const fallbackLessonIndex =
    lessonSearchTexts.length > 0 ? fallbackIndex % lessonSearchTexts.length : 0;
  const lessonIndex = getBestIndex(
    `${searchText} ${checklistTopic}`,
    lessonSearchTexts,
    fallbackLessonIndex,
  );

  return {
    answer: question.answer,
    checklistTopic,
    choices: question.choices ?? [],
    explanation: question.explanation,
    graphId: question.graphId,
    moduleCode,
    moduleSlug,
    moduleTitle,
    prompt: question.prompt,
    reviewHref: getLearnHref(moduleSlug, lessonIndex),
    reviewTopic: `Module ${moduleCode}: ${checklistTopic}`,
  };
}

function miniLessonVisualToQuestion(visual: VisualKind): QuestionContent | null {
  if (visual.type !== "choice" && visual.type !== "graph") {
    return null;
  }

  return {
    answer: visual.answer,
    choices: visual.choices,
    explanation: visual.feedback,
    graphId: visual.type === "graph" ? visual.graphId : undefined,
    hint: visual.hint,
    prompt: visual.prompt,
    type: "multiple-choice",
  };
}

function dedupeQuestions(questions: FinalExamQuestion[]) {
  const seen = new Set<string>();

  return questions.filter((question) => {
    const key = `${question.moduleSlug}:${question.prompt}:${question.answer}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function hashString(value: string) {
  return [...value].reduce(
    (hash, character) =>
      (hash * 31 + character.charCodeAt(0)) % Number.MAX_SAFE_INTEGER,
    7,
  );
}

function deterministicShuffle<T>(items: T[], seed: string) {
  const shuffled = [...items];
  let state = hashString(seed);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) % 4294967296;
    const swapIndex = state % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function getFinalExamPoolForSection(sectionSlug: string) {
  const section = tcoSections.find((item) => item.slug === sectionSlug);

  if (!section) {
    return [];
  }

  const content = getModuleContent(sectionSlug);
  const lessonSearchTexts = content.miniLessons.map((lesson) =>
    [
      lesson.title,
      lesson.label,
      lesson.body.join(" "),
      "prompt" in lesson.visual ? lesson.visual.prompt : "",
    ].join(" "),
  );
  const bank = [
    ...content.masteryQuestions,
    ...content.practiceQuestions,
    ...content.miniLessons
      .map((lesson) => miniLessonVisualToQuestion(lesson.visual))
      .filter((question): question is QuestionContent => Boolean(question)),
  ];

  return dedupeQuestions(
    bank
      .map((question, index) =>
        toFinalExamQuestion(
          index,
          lessonSearchTexts,
          question,
          section.checklistItems,
          section.code,
          section.slug,
          section.title,
        ),
      )
      .filter((question): question is FinalExamQuestion => Boolean(question)),
  );
}

const baseFinalExamQuestions = Object.entries(finalExamDistribution).flatMap(
  ([sectionSlug, count]) => getFinalExamPoolForSection(sectionSlug).slice(0, count),
);

const additionalFinalExamQuestions = Object.entries(
  additionalFinalExamDistribution,
).flatMap(([sectionSlug, count]) => {
  const start = finalExamDistribution[sectionSlug] ?? 0;

  return getFinalExamPoolForSection(sectionSlug).slice(start, start + count);
});

const baseFinalExamQuestionCount = Object.values(finalExamDistribution).reduce(
  (total, count) => total + count,
  0,
);

export const finalExamQuestionCount =
  baseFinalExamQuestionCount +
  Object.values(additionalFinalExamDistribution).reduce(
    (total, count) => total + count,
    0,
  );

export const finalExamQuestionsWithAdditions = deterministicShuffle(
  [...baseFinalExamQuestions, ...additionalFinalExamQuestions],
  "aba-mastered-final-exam-185",
);

export { finalExamQuestionsWithAdditions as finalExamQuestions };
