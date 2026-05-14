import { tcoSections } from "./data";
import { getMiniLessons } from "./mini-lesson-data";
import { calculateSavedModuleProgressPercent } from "./progression";

export function calculateOverallProgramProgressPercent() {
  if (typeof window === "undefined") {
    return 0;
  }

  const totalProgress = tcoSections.reduce(
    (total, section) =>
      total +
      calculateSavedModuleProgressPercent(
        section.slug,
        getMiniLessons(section).length,
        section.progress,
      ),
    0,
  );

  return Math.round(totalProgress / tcoSections.length);
}

export function isFinalExamUnlocked() {
  return calculateOverallProgramProgressPercent() >= 100;
}
