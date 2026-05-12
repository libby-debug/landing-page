import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  maxWidth?: "5xl" | "6xl";
  align?: "start" | "center";
  className?: string;
};

const maxWidthClass = {
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

const alignClass = {
  start: "",
  center: "flex flex-col items-center text-center",
};

export const gradientTextClass =
  "inline-block overflow-visible bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text px-1 pb-1 leading-[1.15] text-transparent [-webkit-box-decoration-break:clone] [box-decoration-break:clone]";

export const eyebrowClass =
  "text-sm font-semibold uppercase tracking-wide text-blue-600";

export const pageTitleClass =
  `mt-2 max-w-full overflow-visible px-2 pb-2 text-5xl font-extrabold leading-[1.15] tracking-tight ${gradientTextClass}`;

export const sectionTitleClass =
  "mt-2 max-w-full overflow-visible px-2 pb-1 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950";

export const leadClass =
  "mt-4 max-w-3xl text-lg leading-relaxed text-slate-950";

export const cardBaseClass =
  "rounded-3xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl";

export function PageShell({
  children,
  maxWidth = "5xl",
  align = "center",
  className = "",
}: PageShellProps) {
  return (
    <main
      className={`relative z-20 min-h-[calc(100vh-18rem)] bg-transparent px-8 pb-24 pt-10 ${className}`}
    >
      <div className={`mx-auto ${maxWidthClass[maxWidth]} ${alignClass[align]}`}>
        {children}
      </div>
    </main>
  );
}

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <section className={`${cardBaseClass} bg-white ${className}`}>
      {children}
    </section>
  );
}

type NoticeProps = {
  children: ReactNode;
  tone: "error" | "success" | "info";
};

const noticeClass = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-green-200 bg-green-50 text-green-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
};

export function Notice({ children, tone }: NoticeProps) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 text-center text-sm font-bold transition-all ${noticeClass[tone]}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}

export function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);

  return (
    <>
      {parts.map((part, index) => {
        const isHighlighted = part.startsWith("[") && part.endsWith("]");
        const content = isHighlighted ? part.slice(1, -1) : part;

        return isHighlighted ? (
          <em
            key={`${content}-${index}`}
            className="font-inherit text-slate-950"
          >
            {content}
          </em>
        ) : (
          <span key={`${content}-${index}`}>{content}</span>
        );
      })}
    </>
  );
}

export function ComparisonDefinitionBlocks({ text }: { text: string }) {
  const blocks = splitComparisonText(text);

  return (
    <div className="mx-auto grid max-w-3xl gap-4 text-center">
      {blocks.map((block) => (
        <p
          key={block}
          className="rounded-2xl bg-white/80 px-5 py-4 text-base font-semibold leading-7 text-slate-950"
        >
          <HighlightedText text={block} />
        </p>
      ))}
    </div>
  );
}

export function FormattedConceptText({
  className = "",
  text,
}: {
  className?: string;
  text: string;
}) {
  const blocks = splitInlineComparisonText(text);

  if (blocks.length <= 1) {
    return <HighlightedText text={text} />;
  }

  return (
    <span className={`flex flex-col gap-2 leading-6 ${className}`}>
      {blocks.map((block) => (
        <span key={block} className="block">
          <HighlightedText text={block} />
        </span>
      ))}
    </span>
  );
}

function splitComparisonText(text: string) {
  return text
    .replaceAll("; ", ". ")
    .split(/(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function splitInlineComparisonText(text: string) {
  return text
    .split(/\s*;\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "compact" | "large";
  variant?: "primary" | "secondary" | "accent";
};

const buttonClass = {
  primary:
    "bg-slate-950 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
  secondary:
    "border border-slate-200 bg-white text-slate-950 shadow-sm transition hover:border-slate-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60",
  accent:
    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
};

export function Button({
  children,
  className = "",
  size = "compact",
  variant = "primary",
  ...props
}: ButtonProps) {
  const sizeClass =
    size === "large" ? "px-5 py-3" : "px-4 py-2 text-sm";

  return (
    <button
      className={`inline-block rounded-xl font-semibold ${sizeClass} ${buttonClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  size?: "compact" | "large";
  variant?: "primary" | "secondary" | "accent";
};

export function LinkButton({
  href,
  children,
  className = "",
  size = "compact",
  variant = "primary",
}: LinkButtonProps) {
  const sizeClass =
    size === "large" ? "px-5 py-3" : "px-4 py-2 text-sm";

  return (
    <Link
      href={href}
      className={`inline-block rounded-xl font-semibold ${sizeClass} ${buttonClass[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

type ModuleCardProps = {
  term: string;
  definition: string;
  href: string;
  tone?: "blue" | "green" | "purple" | "orange" | "pink";
};

const moduleCardClass = {
  blue: {
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  green: {
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  purple: {
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  orange: {
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  pink: {
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
};

export function ModuleCard({
  term,
  definition,
  href,
  tone = "blue",
}: ModuleCardProps) {
  const card = moduleCardClass[tone];

  return (
    <div
      className={`${cardBaseClass} ${card.bg} ${card.border}`}
    >
      <div className={`text-6xl font-extrabold tracking-tight ${card.color}`}>
        {term}
      </div>

      <p className="mt-4 text-base leading-relaxed text-slate-950">
        {definition}
      </p>

      <div className="mt-6 flex justify-center">
        <Link
          href={href}
          className="inline-block rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Start Lesson
        </Link>
      </div>
    </div>
  );
}

type ModuleLandingTemplateProps = {
  eyebrow: string;
  title: string;
  description: string;
  cards: ModuleCardProps[];
};

export function ModuleLandingTemplate({
  eyebrow,
  title,
  description,
  cards,
}: ModuleLandingTemplateProps) {
  return (
    <PageShell maxWidth="6xl" align="center">
      <p className={eyebrowClass}>
        {eyebrow}
      </p>

      <h1 className={pageTitleClass}>
        {title}
      </h1>

      <p className={leadClass}>
        {description}
      </p>

      <div className="mt-10 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <ModuleCard key={card.term} {...card} />
        ))}
      </div>
    </PageShell>
  );
}

export function LoadingCard({ children }: { children: ReactNode }) {
  return (
    <PageShell maxWidth="6xl" align="center">
      <h1 className={pageTitleClass}>
        Loading
      </h1>

      <div className="mt-10 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className={`${cardBaseClass} border-blue-200 bg-blue-50`}>
          <p className="text-base leading-relaxed text-slate-950">
            {children}
          </p>
        </div>
      </div>
    </PageShell>
  );
}
