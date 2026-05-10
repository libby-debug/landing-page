export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-6 py-20 md:px-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-pink-100" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          {/* LEFT SIDE */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-purple-600">
              Visual BCBA Exam Prep
            </p>

            <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
              Stop memorizing.
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Start mastering.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              ABA Mastered helps BCBA candidates learn, comprehend, and
              understand Applied Behavior Analysis (ABA) concepts and principles
              to help you pass the BCBA exam. This study tool teaches through
              visual learning and contains concept comparisons, quizzes,
              mastery tracking, and much more!
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#waitlist"
                className="rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition hover:scale-105"
              >
                Join the Waitlist
              </a>

              <a
                href="#features"
                className="rounded-2xl border border-slate-300 px-8 py-4 text-center text-lg font-bold text-slate-800 transition hover:bg-slate-100"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* RIGHT SIDE LOGO */}
          <div className="flex justify-center">
            <img
              src="/logo-for-aba-mastered.png"
              alt="ABA Mastered Logo"
              className="w-full max-w-5xl object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-extrabold">
            BCBA prep made visual, simple, and easier to understand.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Visual Concept Breakdowns",
                text: "Compare confusing ABA concepts through visual learning and simplified explanations.",
              },
              {
                title: "TCO 6 Mastery Tracking",
                text: "Track progress by BACB Test Content Outline section and monitor weak areas.",
              },
              {
                title: "Weak-Area Remediation",
                text: "Receive personalized study recommendations based on weak performance areas.",
              },
              {
                title: "Term Comparison",
                text: "Learn the differences between similar ABA concepts like DRO vs DRA or tact vs intraverbal.",
              },
              {
                title: "Scenario-Based Quizzes",
                text: "Practice applied BCBA-style questions with detailed explanations and rationales.",
              },
              {
                title: "Confidence Building",
                text: "Use progress bars, mastery indicators, and reinforcement-based feedback to stay motivated.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section id="how-it-works" className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-extrabold text-slate-950 md:text-5xl">
            A better way to learn ABA.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            Learn visually, compare confusing terms, practice with quizzes, and
            track your mastery as you prepare for the BCBA exam.
          </p>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/aba-mastered-demo-poster.png"
            >
              <source
                src="/aba-mastered-demo.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      {/* DARK SECTION */}
      <section className="bg-slate-950 px-6 py-20 text-white md:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold">
            Designed for candidates who are tired of rote memorization.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            ABA Mastered teaches conceptual understanding, visual discrimination,
            generalization, and fluency because passing the BCBA exam requires
            more than memorizing definitions.
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-blue-50 via-white to-pink-50 p-8 text-center shadow-xl">
          <h2 className="text-4xl font-extrabold">
            Join the early access list
          </h2>

          <p className="mt-4 text-slate-700">
            Be the first to access ABA Mastered when beta launches.
          </p>

          <form className="mt-8 flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-2xl border border-slate-300 px-5 py-4 text-slate-950 outline-none focus:border-purple-500"
            />

            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-4 font-bold text-white shadow-lg"
            >
              Join Waitlist
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-500">
            No spam. Just visual BCBA prep updates.
          </p>
        </div>
      </section>
    </main>
  );
}