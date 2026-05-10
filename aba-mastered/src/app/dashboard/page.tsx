"use client";

import { LogoutButton } from "@/components/logout-button";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-provider";
import { PageShell } from "@/components/learning-ui";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();

  return (
    <PageShell maxWidth="6xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Protected dashboard
          </p>

          <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-slate-950">
            Welcome back
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            {user?.email}
          </p>
        </div>

        <LogoutButton />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl md:col-span-2 lg:col-span-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Session planning
          </p>

          <h2 className="mt-4 text-base leading-relaxed text-slate-700">
            Today&apos;s clinical focus
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
            Review learner goals, prepare teaching materials, and keep session
            notes organized before the first appointment starts.
          </p>
        </div>

        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-6xl font-extrabold tracking-tight text-blue-600">
            12
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Active learners
          </p>
        </div>

        <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-6xl font-extrabold tracking-tight text-green-600">
            8
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Goals nearing mastery
          </p>
        </div>

        <div className="rounded-3xl border border-purple-200 bg-purple-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-6xl font-extrabold tracking-tight text-purple-600">
            3
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Data checks
          </p>
        </div>
      </div>
    </PageShell>
  );
}
