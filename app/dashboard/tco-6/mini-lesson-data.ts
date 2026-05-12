import type { TcoSection } from "./data";
import { getModuleContent } from "./module-content";

export function getMiniLessons(section: TcoSection) {
  return getModuleContent(section.slug).miniLessons;
}
