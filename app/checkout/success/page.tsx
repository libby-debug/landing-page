import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-transparent px-6 pb-24 text-center sm:px-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <p className="text-sm font-black uppercase tracking-wide text-blue-600">
          Payment complete
        </p>

        <div className="mt-6 w-full rounded-3xl border border-slate-950 bg-white p-8 shadow-2xl shadow-slate-900/15">
          <h1 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            Welcome to ABA Mastered
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-950">
            Your checkout was successful. You can now continue building
            comprehension through visual ABA concept comparisons, quizzes, and
            mastery tracking.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 px-8 py-4 text-center text-lg font-bold text-white shadow-lg shadow-teal-300/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-300/40"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
