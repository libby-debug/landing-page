import Link from "next/link";
import { notFound } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-route";
import {
  PageShell,
  eyebrowClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";
import { getTcoSection, tcoSections } from "../../../data";
import { getMiniLessons } from "../../../mini-lesson-data";
import { MiniLessonView } from "../../../mini-lesson-ui";

type MiniLessonPageProps = {
  params: Promise<{
    section: string;
    lesson: string;
  }>;
};

export function generateStaticParams() {
  return tcoSections.flatMap((section) =>
    getMiniLessons(section).slice(1).map((_lesson, index) => ({
      section: section.slug,
      lesson: String(index + 2),
    })),
  );
}

export default async function MiniLessonPage({ params }: MiniLessonPageProps) {
  const { section: sectionSlug, lesson } = await params;
  const section = getTcoSection(sectionSlug);
  const lessonNumber = Number(lesson);

  if (!section || !Number.isInteger(lessonNumber) || lessonNumber < 1) {
    notFound();
  }

  const miniLessons = getMiniLessons(section);
  const lessonContent = miniLessons[lessonNumber - 1];

  if (!lessonContent) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <PageShell maxWidth="6xl" className="pt-4">
        <div className="flex w-full flex-col items-center text-center">
          <p className={eyebrowClass}>TCO 6 Module {section.code} / Learn</p>

          <h1 className={pageTitleClass}>
            {section.code}. {section.title}
          </h1>

          <p className={leadClass}>{section.description}</p>

          <Link
            href={`/dashboard/tco-6/${section.slug}`}
            className="mt-6 text-sm font-black text-blue-600 transition hover:text-blue-700"
          >
            Back to Module {section.code}
          </Link>
        </div>

        <MiniLessonView
          lesson={lessonContent}
          lessonIndex={lessonNumber - 1}
          section={section}
        />
      </PageShell>
    </ProtectedRoute>
  );
}
