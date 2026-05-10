const domains = [
  "A. Behaviorism and Philosophical Foundations",
  "B. Concepts and Principles",
  "C. Measurement, Data Display, and Interpretation",
  "D. Experimental Design",
  "E. Ethical and Professional Issues",
  "F. Behavior Assessment",
  "G. Behavior-Change Procedures",
  "H. Selecting and Implementing Interventions",
  "I. Personnel Supervision and Management",
];

export default function ModulesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          BACB Test Content Outline 6
        </p>

        <h1 className="mt-2 text-5xl font-extrabold text-slate-950">
          Modules
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Study in order of the TCO 6 task list. Mastery is earned at 90% or higher.
        </p>

        <div className="mt-10 grid gap-5">
          {domains.map((domain) => (
            <div
              key={domain}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-2xl font-extrabold text-slate-800">
                {domain}
              </h2>

              <p className="mt-2 text-slate-500">
                Progress: 0% · Needs Review
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}