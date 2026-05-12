import type { TcoSection } from "./data";
import { sectionBMiniLessons } from "./section-b-content";

export function getMiniLessons(section: TcoSection) {
  return section.slug === "b" ? sectionBMiniLessons : [];
}
