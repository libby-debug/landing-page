import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-[#dff1ff] to-[#ffe3ef]">
      <div className="h-6 w-full border-b border-white/80 bg-white" />

      <section className="flex min-h-[calc(100vh-1.5rem)] items-center justify-center px-6 py-16 text-center sm:px-8">
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center">
          <div className="mb-10 flex w-full justify-center px-2 sm:mb-12">
            <div className="relative aspect-[16/5] w-full max-w-[860px]">
              <Image
                src="/images/aba-mastered-hero-logo.png"
                alt="ABA Mastered"
                fill
                priority
                sizes="(min-width: 1024px) 860px, calc(100vw - 48px)"
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="pb-2 text-6xl font-black leading-[1.12] tracking-tight text-slate-950 md:text-8xl md:leading-[1.08]">
            <span className="block">Stop</span>
            <span className="block pb-1">memorizing</span>
            <span className="mt-2 block bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text pb-2 text-transparent">
              Start mastering
            </span>
          </h1>

          <div className="mt-10 max-w-[850px] space-y-5 text-lg font-medium leading-8 text-slate-600 md:text-xl md:leading-9">
            <p>
              ABA Mastered helps BCBA candidates learn, comprehend, and
              understand Applied Behavior Analysis (ABA) concepts and principles
              to help you pass the BCBA exam.
            </p>

            <p>
              This study tool teaches through visual learning and contains
              concept comparisons, quizzes, mastery tracking, and much more!
            </p>
          </div>

          <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <Link
              href="/signup"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 px-8 py-4 text-center text-lg font-bold leading-normal text-white shadow-lg shadow-pink-300/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-300/40 sm:w-auto"
            >
              Start Mastering
            </Link>

            <Link
              href="/how-it-works"
              className="w-full rounded-2xl border border-slate-300 bg-white/80 px-8 py-4 text-center text-lg font-bold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-white sm:w-auto"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
