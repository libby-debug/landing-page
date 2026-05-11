import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "ABA Mastered",
  description: "Master the BCBA Task List visually.",
};

const taskListSections = [
 const taskListSections = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Modules", href: "/modules" },

  {
    title: "A. Behaviorism and Philosophical Foundations",
    href: "#",
  },

  {
    title: "B. Concepts and Principles",
    href: "#",
  },

  {
    title: "C. Measurement, Data Display, and Interpretation",
    href: "#",
  },

  {
    title: "D. Experimental Design",
    href: "#",
  },

  {
    title: "E. Ethical and Professional Issues",
    href: "#",
  },

  {
    title: "F. Behavior Assessment",
    href: "#",
  },

  {
    title: "G. Behavior-Change Procedures",
    href: "/modules/differential-reinforcement",
  },

  {
    title: "H. Selecting and Implementing Interventions",
    href: "#",
  },

  {
    title: "I. Personnel Supervision and Management",
    href: "#",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-950">
        <div className="flex min-h-screen">
          <aside className="hidden w-72 flex-col border-r bg-white p-6 shadow-sm lg:flex">
            <div>
              <h1 className="text-3xl font-extrabold text-blue-700">
                ABA Mastered
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Stop Memorizing. Start Mastering.
              </p>
            </div>

            <nav className="mt-10 flex flex-col gap-2">
              {taskListSections.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="mt-auto rounded-3xl bg-blue-50 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                Mastery Goal
              </p>

              <p className="mt-2 text-4xl font-extrabold text-blue-700">
                90%
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Lessons unlock through demonstrated mastery.
              </p>
            </div>
          </aside>

          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
