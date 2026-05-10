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
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">TCO 6 Study Modules</h1>
        <p className="mt-3 text-slate-600">
          Study in order. Mastery is 90%.
        </p>

        <div className="mt-8 grid gap-4">
          {domains.map((domain) => (
            <div key={domain} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">{domain}</h2>
              <p className="mt-1 text-sm text-slate-500">Progress: 0% · Needs Review</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
