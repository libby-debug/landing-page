import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 p-10">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[40px] bg-white p-10 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">
            BCBA Exam Prep
          </p>

          <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-slate-950">
            Stop Memorizing.
            <br />
            Start Mastering.
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-600">
            ABA Mastered helps future BCBAs truly discriminate concepts using
            visual learning, adaptive remediation, mastery tracking, and
            interactive practice.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/modules"
              className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
            >
              Start Studying
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-lg font-bold text-slate-800 transition hover:bg-slate-50"
            >
              View Dashboard
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-blue-50 p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-blue-700">
              Visual Learning
            </h2>

            <p className="mt-3 text-slate-700">
              Learn through discrimination training, comparisons, graphics, and
              interactive examples.
            </p>
          </div>

          <div className="rounded-3xl bg-green-50 p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-green-700">
              90% Mastery
            </h2>

            <p className="mt-3 text-slate-700">
              Lessons unlock through demonstrated mastery, not passive review.
            </p>
          </div>

          <div className="rounded-3xl bg-purple-50 p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-purple-700">
              Adaptive Remediation
            </h2>

            <p className="mt-3 text-slate-700">
              Missed concepts trigger targeted review and additional practice.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}