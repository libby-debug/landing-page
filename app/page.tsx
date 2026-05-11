import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#dff1ff] to-[#ffe3ef]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-white via-white/80 to-transparent"
      />

      <section className="relative flex min-h-screen items-center justify-center px-6 py-16 text-center sm:px-8">
        <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center">
          <h1 className="pb-2 text-6xl font-black leading-[1.12] tracking-tight text-slate-950 md:text-8xl md:leading-[1.08]">
            <span className="block">Stop</span>
            <span className="block pb-1">memorizing</span>
            <span className="mt-2 block bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text pb-2 text-transparent">
              Start mastering
            </span>
          </h1>

          <div className="mt-10 max-w-[850px] space-y-5 text-lg font-medium leading-8 text-slate-950 md:text-xl md:leading-9">
            <p>
              <span className="font-bold">ABA Mastered</span> helps BCBA
              candidates{" "}
              <span className="italic text-slate-950">learn</span>,{" "}
              <span className="italic text-slate-950">understand</span>, and{" "}
              <span className="italic text-slate-950">comprehend</span>{" "}
              Applied Behavior Analysis (ABA) concepts and principles to help
              you pass the BCBA exam.
            </p>

            <section className="relative left-1/2 right-1/2 my-16 w-screen -translate-x-1/2 overflow-hidden bg-[#020617]">
              <img
                src="/images/black-border2.png"
                alt="ABA Mastered hero section"
                className="block h-auto w-full object-cover"
              />
            </section>

            <p>
              This study tool teaches ABA terminology and concepts through
              visual comparisons, examples, quizzes, mastery tracking, and much
              more!
            </p>
          </div>

          <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <Link
              href="/signup"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 px-8 py-4 text-center text-lg font-bold leading-normal text-white shadow-lg shadow-pink-300/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-300/40 sm:w-auto"
            >
              Sign Up
            </Link>

            <Link
              href="/how-it-works"
              className="w-full rounded-2xl border border-slate-300 bg-white/80 px-8 py-4 text-center text-lg font-bold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-white sm:w-auto"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
