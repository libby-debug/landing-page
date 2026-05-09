const features = [
  "Visual Concept Comparisons",
  "BCBA-Style Practice Questions",
  "Mastery Tracking",
  "Graph & Data Interpretation",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),radial-gradient(circle_at_top_right,#fce7f3,transparent_35%),linear-gradient(135deg,#ffffff,#f8fbff)]">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-[-120px] top-20 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-12">
          <div>
            <img
              src="/aba-mastered-logo.png"
              alt="ABA Mastered"
              className="mb-10 h-28 w-auto"
            />

            <div className="mb-6 inline-flex rounded-full border border-purple-200 bg-white/80 px-5 py-2 text-sm font-bold text-purple-700 shadow-sm backdrop-blur">
              Stop memorizing. Start understanding.
            </div>

            <h1 className="text-6xl font-black tracking-tight sm:text-7xl">
              Master ABA
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                visually.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-600">
              ABA Mastered helps BCBA candidates learn, comprehend, and
              understand Applied Behavior Analysis concepts and principles to
              help you pass the BCBA exam.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-purple-200 transition hover:-translate-y-1">
                Start Learning
              </button>

              <button className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                Explore Features
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white bg-white/80 p-5 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-blue-600 via-purple-700 to-pink-500 p-8 text-white">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
                Study Dashboard
              </p>

              <h2 className="mt-4 text-4xl font-black">
                Learn. Practice. Master.
              </h2>

              <div className="mt-8 space-y-4">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl bg-white/15 p-5 text-lg font-bold backdrop-blur transition hover:bg-white/25"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="rounded-[2rem] bg-white p-10 shadow-xl ring-1 ring-slate-100">
          <div className="text-center">
            <h2 className="text-4xl font-black tracking-tight">
              Built for real BCBA understanding
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Learn concepts visually, practice clinically, and track your
              mastery across BCBA exam domains.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-black">{feature}</h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Build deep ABA comprehension with examples, visuals, and
                  practice tools.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}