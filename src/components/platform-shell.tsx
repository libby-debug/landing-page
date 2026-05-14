"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/components/auth-provider";
import { DailyDurationTracker } from "@/components/daily-duration-tracker";
import { SiteHeader } from "@/components/site-header";
import { ProgressStorageHydrator } from "../../app/dashboard/tco-6/progression";

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

function isFinalExamRoute(pathname: string) {
  return (
    pathname === "/dashboard/final-exam" ||
    pathname.startsWith("/dashboard/final-exam/")
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

function getNavAriaLabel(title: string, href: string) {
  const moduleMatch = title.match(/^([A-I])\./);

  if (moduleMatch && href.startsWith("/dashboard/tco-6/")) {
    return `Open Module ${moduleMatch[1]} dashboard`;
  }

  return `Open ${title}`;
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
  const showSidebar =
    Boolean(user) &&
    isAuthenticatedAppRoute(pathname) &&
    !isFinalExamRoute(pathname);

  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_88%_12%,rgba(153,246,228,0.68),transparent_28%),linear-gradient(180deg,#dff1ff_0%,#ccfbf1_34%,#ffffff_82%,#ffffff_100%)]">
      <DailyDurationTracker />
      {user ? <ProgressStorageHydrator /> : null}
      <SiteHeader />

      {showSidebar && (
        <aside className="relative z-20 w-72 flex-col border-r border-cyan-200/80 bg-[linear-gradient(180deg,rgba(56,189,248,0.22)_0%,rgba(34,211,238,0.18)_34%,rgba(186,230,253,0.60)_68%,rgba(255,255,255,0.92)_100%)] p-6 pt-28 shadow-[0_24px_70px_rgba(14,165,233,0.14)] backdrop-blur-2xl lg:flex">
            <div className="pb-4">
              <Link href="/" aria-label="ABA Mastered home" className="inline-flex">
                <Image
                  src="/images/aba-mastered-updated-header-logo.png"
                  alt="ABA Mastered"
                  width={1024}
                  height={1024}
                  sizes="112px"
                  className="h-28 w-28 object-contain p-1"
                />
              </Link>
            </div>

            <nav className="mt-6 flex flex-col gap-2">
              {taskListSections.map((item) => {
                const isActive = isActiveNavItem(pathname, item.href);
                const isPrimary = item.prominence === "primary";
                const prominenceClass = isPrimary
                  ? "text-lg font-extrabold text-slate-950"
                  : "text-sm font-semibold text-slate-950";
                const activeClass = isActive
                  ? "border border-blue-200 bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 text-slate-950 shadow-sm"
                  : "border border-transparent hover:bg-gradient-to-r hover:from-purple-50 hover:via-blue-50 hover:to-teal-50 hover:text-slate-950";

                return (
                  <Link
                    key={item.title}
                    aria-label={getNavAriaLabel(item.title, item.href)}
                    href={item.href}
                    className={`block w-full cursor-pointer rounded-xl px-4 py-3 transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${prominenceClass} ${activeClass}`}
                  >
                    {item.href === "/dashboard" ? (
                      <span className="inline-block bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
                        {item.title}
                      </span>
                    ) : (
                      item.title
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 flex flex-col items-center rounded-2xl border border-blue-100 bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 p-5 text-center shadow-sm">
              <h2 className="text-lg font-black text-slate-950">
                Need help?
              </h2>
              <p className="mt-3 text-sm font-semibold text-slate-950">
                Contact Support.
              </p>
              <a
                href="tel:1-860-316-8415"
                className="mt-5 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-blue-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <svg
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92Z" />
                </svg>
                <span>
                  <span className="block">Contact Support</span>
                  <span className="block">1-860-316-8415</span>
                </span>
              </a>
            </div>
        </aside>
      )}

      <main className="relative z-10 flex-1 pt-32 md:pt-36">
        {children}
      </main>
    </div>
  );
}
