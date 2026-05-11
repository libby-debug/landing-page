"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/components/auth-provider";

const taskListSections = [
  { title: "Dashboard", href: "/dashboard", prominence: "primary" },
  { title: "Modules", href: "/modules", prominence: "primary" },
  { title: "A. Behaviorism and Philosophical Foundations", href: "#", prominence: "section" },
  { title: "B. Concepts and Principles", href: "#", prominence: "section" },
  { title: "C. Measurement, Data Display, and Interpretation", href: "#", prominence: "section" },
  { title: "D. Experimental Design", href: "#", prominence: "section" },
  { title: "E. Ethical and Professional Issues", href: "#", prominence: "section" },
  { title: "F. Behavior Assessment", href: "#", prominence: "section" },
  {
    title: "G. Behavior-Change Procedures",
    href: "/modules/differential-reinforcement",
    prominence: "section",
  },
  { title: "H. Selecting and Implementing Interventions", href: "#", prominence: "section" },
  { title: "I. Personnel Supervision and Management", href: "#", prominence: "section" },
];

function isActiveNavItem(pathname: string, href: string) {
  if (href === "#") {
    return false;
  }

  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  if (href === "/modules") {
    return pathname === "/modules";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/";

  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        {!hideSidebar && (
          <aside className="hidden w-72 flex-col border-r bg-white p-6 shadow-sm lg:flex">
            <div>
              <h1 className="text-3xl font-extrabold text-blue-700">ABA Mastered</h1>
              <p className="mt-2 text-sm text-slate-500">Stop Memorizing. Start Mastering.</p>
            </div>

            <nav className="mt-10 flex flex-col gap-2">
              {taskListSections.map((item) => {
                const isActive = isActiveNavItem(pathname, item.href);
                const isPrimary = item.prominence === "primary";
                const isDashboard = item.title === "Dashboard";
                const prominenceClass = isPrimary
                  ? "text-lg font-extrabold text-slate-950"
                  : "text-sm font-semibold text-slate-600";
                const activeClass = isActive
                  ? "border border-blue-200 bg-blue-100 text-blue-800 shadow-sm"
                  : "border border-transparent hover:bg-blue-50 hover:text-blue-700";

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`rounded-xl px-4 py-3 transition ${prominenceClass} ${activeClass}`}
                  >
                    {isDashboard ? (
                      <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        {item.title}
                      </span>
                    ) : (
                      item.title
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-3xl bg-blue-50 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Mastery Goal</p>
              <p className="mt-2 text-4xl font-extrabold text-blue-700">90%</p>
              <p className="mt-2 text-sm text-slate-600">
                Lessons unlock through demonstrated mastery.
              </p>
            </div>
          </aside>
        )}

        <main className="flex-1">{children}</main>
      </div>
    </AuthProvider>
  );
}
