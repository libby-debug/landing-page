"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";

const features = [
  {
    title: "BACB TCO 6 Content",
    body: "Study content organized around the BACB Test Content Outline 6 so you know exactly what to master.",
    gradient: "from-purple-500 via-blue-500 to-teal-400",
    border: "linear-gradient(135deg, #a855f7, #3b82f6, #2dd4bf)",
    glow: "rgba(124, 58, 237, 0.24)",
  },
  {
    title: "Visual Concept Breakdowns",
    body: "Learn ABA concepts through clear visuals, examples, diagrams, and simplified explanations.",
    gradient: "from-blue-500 via-sky-500 to-teal-400",
    border: "linear-gradient(135deg, #3b82f6, #0ea5e9, #2dd4bf)",
    glow: "rgba(59, 130, 246, 0.24)",
  },
  {
    title: "Term Comparison",
    body: "Compare similar ABA terms side by side so you can discriminate concepts instead of memorizing definitions.",
    gradient: "from-blue-500 via-sky-500 to-cyan-400",
    border: "linear-gradient(135deg, #3b82f6, #0ea5e9, #22d3ee)",
    glow: "rgba(14, 165, 233, 0.22)",
  },
  {
    title: "Interactive Practice Tests",
    body: "Practice applied exam-style questions with feedback, hints, rationales, and review support.",
    gradient: "from-cyan-500 via-blue-500 to-teal-400",
    border: "linear-gradient(135deg, #06b6d4, #3b82f6, #2dd4bf)",
    glow: "rgba(6, 182, 212, 0.22)",
  },
  {
    title: "Mastery Checks",
    body: "Complete module mastery checks to confirm readiness before moving forward.",
    gradient: "from-teal-400 via-cyan-500 to-emerald-400",
    border: "linear-gradient(135deg, #2dd4bf, #06b6d4, #34d399)",
    glow: "rgba(45, 212, 191, 0.24)",
  },
  {
    title: "Practice Final Exam",
    body: "Take a cumulative practice final exam after all module question banks are complete.",
    gradient: "from-purple-500 via-blue-500 to-teal-400",
    border: "linear-gradient(135deg, #a855f7, #3b82f6, #2dd4bf)",
    glow: "rgba(59, 130, 246, 0.24)",
  },
];

const calmEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.12,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: calmEase },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: calmEase },
  },
};

export function HowItWorksFeatureGraphic() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-label="ABA Mastered visual study features"
      className="relative mt-10 w-full overflow-hidden rounded-[2rem] bg-[#020617] px-5 py-8 shadow-2xl shadow-slate-900/20 sm:px-8 md:py-10 lg:px-10"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-purple-300/25 blur-3xl"
            animate={{ x: [0, 24, 0], y: [0, 12, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-blue-300/25 blur-3xl"
            animate={{ x: [0, -26, 0], y: [0, 18, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-teal-300/25 blur-3xl"
            animate={{ x: [0, 20, 0], y: [0, -16, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <motion.h2
        className="relative z-10 mx-auto max-w-5xl text-balance text-center text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
        variants={headingVariants}
      >
        BCBA exam prep made visual, simple, and easier to remember.
      </motion.h2>

      <motion.div
        className="relative z-10 mt-10 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
      >
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-white/80 bg-white p-6 text-center shadow-xl transition-shadow duration-300 sm:p-7"
            style={{
              boxShadow: `0 16px 42px rgba(15, 23, 42, 0.16)`,
            }}
            variants={cardVariants}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -4,
                    scale: 1.01,
                    boxShadow: `0 24px 60px ${feature.glow}`,
                  }
            }
          >
            {!shouldReduceMotion && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: [
                    `0 18px 45px ${feature.glow}`,
                    `0 24px 58px ${feature.glow}`,
                    `0 18px 45px ${feature.glow}`,
                  ],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${feature.gradient}`}
              />
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${feature.gradient} text-2xl font-black text-white shadow-lg`}>
                  {index + 1}
                </div>
              <h3 className="mt-6 text-center text-2xl font-black leading-tight tracking-tight text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-5 max-w-sm text-center text-base font-semibold leading-7 text-slate-700">
                {feature.body}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
