import Image from "next/image";
import { HomepageCtaButtons } from "@/components/homepage-cta-buttons";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#dff1ff] to-[#ccfbf1]">
      <section className="relative flex min-h-0 items-start justify-center px-4 pb-10 pt-7 text-center sm:px-8 sm:pb-14 sm:pt-9 lg:pb-16">
        <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center">
          <div className="flex w-full justify-center overflow-visible px-2 sm:px-4">
            <Image
              src="/images/aba-mastered-hero-logo.png"
              alt="ABA Mastered"
              width={1536}
              height={1024}
              priority
              className="h-auto w-full max-w-[340px] object-contain p-1.5 sm:max-w-[562px] sm:p-2 lg:max-w-[636px]"
            />
          </div>

          <h1 className="pb-1 text-[clamp(2.75rem,13vw,4.25rem)] font-black leading-[1.03] tracking-tight text-slate-950 sm:text-6xl sm:leading-[1.08] md:text-8xl">
            <span className="block">Stop</span>
            <span className="block pb-1">memorizing</span>
            <span className="mt-1 block bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 bg-clip-text pb-2 text-transparent [-webkit-text-fill-color:transparent] sm:mt-2">
              Start mastering
            </span>
          </h1>

          <div className="mt-6 max-w-[850px] space-y-5 text-base font-medium leading-7 text-slate-950 sm:mt-8 sm:text-lg sm:leading-8 md:mt-10 md:text-xl md:leading-9">
            <p>
              <span className="font-bold">ABA Mastered</span> helps BCBA
              candidates{" "}
              <span className="italic text-slate-950">learn</span>,{" "}
              <span className="italic text-slate-950">understand</span>, and{" "}
              <span className="italic text-slate-950">comprehend</span>{" "}
              Applied Behavior Analysis (ABA) concepts and principles to help
              you pass the BCBA exam.
            </p>

            <section className="relative left-1/2 my-8 w-[min(calc(100vw-2rem),72rem)] -translate-x-1/2 overflow-hidden rounded-[2rem] bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 p-[1px] text-center shadow-2xl shadow-slate-900/20 sm:my-12 md:my-16">
              <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#020617] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
                <div className="pointer-events-none absolute -left-20 top-8 h-56 w-56 rounded-full bg-purple-300/25 blur-3xl" />
                <div className="pointer-events-none absolute right-0 top-14 h-64 w-64 rounded-full bg-blue-300/25 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-teal-300/25 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(2,6,23,0.15))]" />

                <div className="relative mx-auto max-w-5xl">
                  <h2 className="text-balance text-[clamp(2rem,8vw,4.5rem)] font-black leading-[1.08] tracking-tight text-white">
                    Designed for candidates who are tired of rote memorization.
                  </h2>
                  <p className="mx-auto mt-6 max-w-4xl text-pretty text-lg font-semibold leading-8 text-slate-200 sm:mt-8 sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.45]">
                    Interactive BCBA exam prep designed to help you truly learn,
                    apply, and retain ABA concepts through visual learning,
                    adaptive practice, and clinical reasoning.
                  </p>
                </div>
              </div>
            </section>

            <p>
              This study tool teaches ABA terminology and concepts through
              visual comparisons, examples, quizzes, mastery tracking, and much
              more!
            </p>
          </div>

          <HomepageCtaButtons />
        </div>
      </section>
    </main>
  );
}
