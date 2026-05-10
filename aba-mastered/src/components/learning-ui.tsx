import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  maxWidth?: "5xl" | "6xl";
};

const maxWidthClass = {
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

export function PageShell({ children, maxWidth = "5xl" }: PageShellProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className={`mx-auto ${maxWidthClass[maxWidth]}`}>
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
    <section
      className={`rounded-3xl border bg-white p-6 shadow-sm ${className}`}
    >
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
      className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition-all ${noticeClass[tone]}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "compact" | "large";
  variant?: "primary" | "secondary";
};

const buttonClass = {
  primary:
    "bg-slate-950 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
  secondary: "bg-blue-600 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
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
  variant?: "primary" | "secondary";
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
      className={`rounded-3xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${card.bg} ${card.border}`}
    >
      <div className={`text-6xl font-extrabold tracking-tight ${card.color}`}>
        {term}
      </div>

      <p className="mt-4 text-base leading-relaxed text-slate-700">
        {definition}
      </p>

      <div className="mt-6">
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
    <PageShell maxWidth="6xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        {eyebrow}
      </p>

      <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-slate-950">
        {title}
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        {description}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <ModuleCard key={card.term} {...card} />
        ))}
      </div>
    </PageShell>
  );
}

export function LoadingCard({ children }: { children: ReactNode }) {
  return (
    <PageShell maxWidth="6xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        ABA Mastered
      </p>

      <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-slate-950">
        Loading
      </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <p className="text-base leading-relaxed text-slate-700">
            {children}
          </p>
        </div>
      </div>
    </PageShell>
  );
}
