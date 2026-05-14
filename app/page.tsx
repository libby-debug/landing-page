import Image from "next/image";
import { HomepageCtaButtons } from "@/components/homepage-cta-buttons";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#dff1ff] to-[#ccfbf1]">
      <section className="relative flex min-h-0 items-start justify-center px-6 pb-16 pt-2 text-center sm:px-8 sm:pt-4">
        <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center">
          <div className="flex w-full justify-center overflow-visible px-2 sm:px-4">
            <Image
              src="/images/aba-mastered-hero-logo.png"
              alt="ABA Mastered"
              width={1536}
              height={1024}
              priority
              className="h-auto w-full max-w-[487px] object-contain p-2 sm:max-w-[562px] lg:max-w-[636px]"
            />
          </div>

          <h1 className="pb-2 text-6xl font-black leading-[1.12] tracking-tight text-slate-950 md:text-8xl md:leading-[1.08]">
            <span className="block">Stop</span>
            <span className="block pb-1">memorizing</span>
            <span className="mt-2 block bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 bg-clip-text pb-2 text-transparent [-webkit-text-fill-color:transparent]">
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
              <Image
                src="/images/black-border2.png"
                alt="ABA Mastered hero section"
                width={2054}
                height={766}
                className="block h-auto w-full object-cover"
              />
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
