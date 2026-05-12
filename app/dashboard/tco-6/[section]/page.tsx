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
import { ActivityProgressNav, SaveProgressButton } from "../progression";

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
          <div className="mx-auto max-w-3xl">
            <p className={eyebrowClass}>Mastery progress</p>

            <div className="mt-3 flex items-end justify-center gap-3">
              <span className="text-6xl font-black tracking-tight text-slate-950">
                {section.progress}%
              </span>
              <span className="pb-2 text-sm font-black uppercase tracking-wide text-slate-950">
                {status}
              </span>
            </div>

            <div className="mt-5 h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                style={{ width: `${section.progress}%` }}
              />
            </div>
          </div>
        </section>

        <section className="mt-8 grid w-full gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          <div className={`${cardBaseClass} border-white/70 bg-white/95 text-left shadow-xl shadow-slate-900/10`}>
            <div className="text-center">
              <p className={eyebrowClass}>TCO 6 checklist</p>

              <h2 className={sectionTitleClass}>
                Module {section.code} checklist items
              </h2>
            </div>

            <div className="mt-6 grid gap-4">
              {section.checklistItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center"
                >
                  <p className="text-base font-bold leading-7 text-slate-950">
                    {item}
                  </p>
                </div>
              ))}
            </div>
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

            <div className={`${cardBaseClass} border-pink-200 bg-white text-center`}>
              <p className="text-sm font-black uppercase tracking-wide text-pink-600">
                Future modules
              </p>

              {section.contentMapModules.length > 0 ? (
                <div className="mt-4 grid gap-3">
                  {section.contentMapModules.map((module) => (
                    <div
                      key={module.name}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <h3 className="text-base font-black text-slate-950">
                        {module.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-blue-600">
                        {module.contentType}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-950">
                        {module.keyConcepts}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-950">
                  Module placeholders will be added here as ABA Mastered content
                  expands for this TCO 6 module.
                </p>
              )}
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
