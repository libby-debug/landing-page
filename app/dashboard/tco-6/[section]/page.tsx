import Link from "next/link";
import { notFound } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-route";
import {
  PageShell,
  cardBaseClass,
  eyebrowClass,
  leadClass,
  pageTitleClass,
  sectionTitleClass,
} from "@/components/learning-ui";
import {
  getMasteryStatus,
  getTcoSection,
  masteryThreshold,
  miniLessonMasteryThreshold,
  tcoSections,
} from "../data";
import { getMiniLessons } from "../mini-lesson-data";
import {
  ActivityProgressNav,
  SaveProgressButton,
  SavedModuleProgressCard,
} from "../progression";
import { ChecklistButtons } from "../checklist-buttons";

type TcoSectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export function generateStaticParams() {
  return tcoSections.map((section) => ({
    section: section.slug,
  }));
}

export default async function TcoSectionPage({ params }: TcoSectionPageProps) {
  const { section: sectionSlug } = await params;
  const section = getTcoSection(sectionSlug);

  if (!section) {
    notFound();
  }

  const status = getMasteryStatus(section.progress);

  return (
    <ProtectedRoute>
      <PageShell maxWidth="6xl" className="pt-4">
        <div className="flex w-full flex-col items-center text-center">
          <p className={eyebrowClass}>BACB Test Content Outline 6</p>

          <h1 className={pageTitleClass}>
            {section.code}. {section.title}
          </h1>

          <p className={leadClass}>{section.description}</p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <StatusBadge status={status} />
            <span className="rounded-xl bg-white/80 px-4 py-2 text-sm font-black text-slate-950 shadow-sm">
              Mastery threshold: {masteryThreshold}%
            </span>
          </div>

          <Link
            href="/dashboard"
            className="mt-6 text-sm font-black text-blue-600 transition hover:text-blue-700"
          >
            Back to dashboard
          </Link>

          <SaveProgressButton
            activity="module-overview"
            currentLocation={`/dashboard/tco-6/${section.slug}`}
            sectionSlug={section.slug}
          />
        </div>

        <section className={`${cardBaseClass} mt-8 w-full border-blue-200 bg-white text-center shadow-xl shadow-slate-900/10`}>
          <SavedModuleProgressCard
            fallbackProgress={section.progress}
            label={`${section.code}. ${section.title} module completion status`}
            sectionSlug={section.slug}
            totalLessons={getMiniLessons(section).length}
          />
        </section>

        <section className="mt-8 grid w-full gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          <div className={`${cardBaseClass} border-white/70 bg-white/95 text-left shadow-xl shadow-slate-900/10`}>
            <div className="text-center">
              <p className={eyebrowClass}>TCO 6 checklist</p>

              <h2 className={sectionTitleClass}>
                Module {section.code}: Checklist Items
              </h2>
            </div>

            <ChecklistButtons section={section} />
          </div>

          <aside className="grid gap-6">
            <div className={`${cardBaseClass} border-purple-200 bg-purple-50 text-center`}>
              <p className="text-sm font-black uppercase tracking-wide text-purple-600">
                Learning modes
              </p>

              <ActivityProgressNav
                activeActivity="learn"
                sectionSlug={section.slug}
              />

              <p className="mt-4 text-sm font-semibold leading-6 text-slate-950">
                Progression runs Learn, then Practice, then Mastery Check.
                Learn requires {miniLessonMasteryThreshold}% correct. Practice
                and Mastery Check pass at {masteryThreshold}% or higher.
              </p>
            </div>
          </aside>
        </section>
      </PageShell>
    </ProtectedRoute>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusClass =
    status === "Mastered"
      ? "bg-purple-100 text-purple-700"
      : status === "In Progress"
        ? "bg-blue-100 text-blue-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`rounded-xl px-4 py-2 text-sm font-black uppercase tracking-wide ${statusClass}`}
    >
      {status}
    </span>
  );
}
