import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6">
      <div className="pointer-events-auto mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <Link href="/" aria-label="ABA Mastered home" className="inline-flex">
          <img
            src="/images/aba-mastered-header-icon.png"
            alt="ABA Mastered"
            className="h-14 w-14 object-contain"
          />
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-800 sm:justify-end">
          <Link
            href="/"
            className="rounded-xl px-3 py-2 transition hover:bg-white/80 hover:text-blue-700"
          >
            Main Page
          </Link>
          <Link
            href="/how-it-works"
            className="rounded-xl px-3 py-2 transition hover:bg-white/80 hover:text-blue-700"
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl px-3 py-2 transition hover:bg-white/80 hover:text-blue-700"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="rounded-xl px-3 py-2 transition hover:bg-white/80 hover:text-blue-700"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-xl px-3 py-2 transition hover:bg-white/80 hover:text-blue-700"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
