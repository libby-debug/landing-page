import Image from "next/image";
import {
  PageShell,
  eyebrowClass,
  leadClass,
  pageTitleClass,
} from "@/components/learning-ui";

export default function HowItWorksPage() {
  return (
    <PageShell maxWidth="6xl" align="center">
      <p className={eyebrowClass}>ABA Mastered</p>

      <h1 className={pageTitleClass}>How It Works</h1>

      <p className={leadClass}>
        Visual BCBA exam prep built around comprehension, comparison, practice,
        and mastery tracking.
      </p>

      <Image
        src="/homepage-graphic.png"
        alt="ABA Mastered visual study features"
        width={941}
        height={650}
        priority
        className="mt-10 h-auto w-full max-w-4xl object-contain"
      />
    </PageShell>
  );
}
