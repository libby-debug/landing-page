"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/components/auth-provider";
import { DailyDurationTracker } from "@/components/daily-duration-tracker";
import { SiteHeader } from "@/components/site-header";

const taskListSections = [
  { title: "Main Dashboard", href: "/dashboard", prominence: "primary" },
  { title: "Modules", href: "/modules", prominence: "primary" },
  {
    title: "A. Behaviorism and Philosophical Foundations",
    href: "/dashboard/tco-6/a",
    prominence: "section",
  },
  {
    title: "B. Concepts and Principles",
    href: "/dashboard/tco-6/b",
    prominence: "section",
  },
  {
    title: "C. Measurement, Data Display, and Interpretation",
    href: "/dashboard/tco-6/c",
    prominence: "section",
  },
  {
    title: "D. Experimental Design",
    href: "/dashboard/tco-6/d",
    prominence: "section",
  },
  {
    title: "E. Ethical and Professional Issues",
    href: "/dashboard/tco-6/e",
    prominence: "section",
  },
  {
    title: "F. Behavior Assessment",
    href: "/dashboard/tco-6/f",
    prominence: "section",
  },
  {
    title: "G. Behavior-Change Procedures",
    href: "/dashboard/tco-6/g",
    prominence: "section",
  },
  {
    title: "H. Selecting and Implementing Interventions",
    href: "/dashboard/tco-6/h",
    prominence: "section",
  },
  {
    title: "I. Personnel Supervision and Management",
    href: "/dashboard/tco-6/i",
    prominence: "section",
  },
];

const authenticatedRoutePrefixes = ["/dashboard", "/modules", "/account", "/study"];

function isAuthenticatedAppRoute(pathname: string) {
  return authenticatedRoutePrefixes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isActiveNavItem(pathname: string, href: string) {
  if (href === "#") {
    return false;
  }

  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  if (href === "/modules") {
    return pathname === "/modules" || pathname.startsWith("/modules/");
  }

  if (
    href === "/dashboard/tco-6/g" &&
    pathname.startsWith("/modules/differential-reinforcement")
  ) {
    return true;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PlatformShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PlatformShellContent>{children}</PlatformShellContent>
    </AuthProvider>
  );
}

function PlatformShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const showSidebar = Boolean(user) && isAuthenticatedAppRoute(pathname);

  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.95),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(255,227,239,0.85),transparent_30%),linear-gradient(135deg,#dff1ff_0%,#ffffff_50%,#ffe3ef_100%)]">
      <DailyDurationTracker />
      <SiteHeader />

      {showSidebar && (
        <aside className="relative z-20 w-72 flex-col border-r bg-white p-6 pt-28 shadow-sm lg:flex">
            <div className="pb-4">
              <Link href="/" aria-label="ABA Mastered home" className="inline-flex">
                <img
                  src="/images/aba-mastered-hero-logo.png"
                  alt="ABA Mastered"
                  className="h-auto w-full max-w-[220px] object-contain"
                />
              </Link>
            </div>

            <nav className="mt-6 flex flex-col gap-2">
              {taskListSections.map((item) => {
                const isActive = isActiveNavItem(pathname, item.href);
                const isPrimary = item.prominence === "primary";
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
                    {item.href === "/dashboard" ? (
                      <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
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
              <p className="mt-2 text-sm text-slate-950">
                Practice and mastery checks pass at 90%; mini-lessons still
                require 100%.
              </p>
            </div>
        </aside>
      )}

      <main className="relative z-10 flex-1 pt-32 md:pt-36">
        {children}
      </main>
    </div>
  );
}
