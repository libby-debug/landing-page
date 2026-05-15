"use client";

import { useAuthenticatedLogout } from "@/components/use-authenticated-logout";

type LogoutButtonProps = {
  className?: string;
  showError?: boolean;
};

const defaultClassName =
  "touch-manipulation w-full rounded-xl bg-[linear-gradient(135deg,#7c3aed_0%,#3b82f6_36%,#14b8a6_68%,#6ee7b7_100%)] px-4 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(59,130,246,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(20,184,166,0.28)] focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60";

export function LogoutButton({ className = defaultClassName, showError = true }: LogoutButtonProps) {
  const { error, handleLogout, loading } = useAuthenticatedLogout();

  return (
    <div className="flex w-full flex-col items-stretch gap-2">
      <button
        className={className}
        type="button"
        onClick={handleLogout}
        onTouchEnd={handleLogout}
        disabled={loading}
      >
        {loading ? "Logging out..." : "Log Out"}
      </button>
      {showError && error ? (
        <p className="text-sm font-semibold text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
