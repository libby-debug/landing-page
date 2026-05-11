import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-transparent px-6 pb-24 text-center sm:px-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <p className="text-sm font-black uppercase tracking-wide text-blue-600">
          Checkout canceled
        </p>

        <div className="mt-6 w-full rounded-3xl border border-slate-950 bg-white p-8 shadow-2xl shadow-slate-900/15">
          <h1 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            No purchase was completed
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-950">
            You can return to pricing and choose the ABA Mastered plan that
            fits your BCBA exam prep needs.
          </p>

          <Link
            href="/pricing"
            className="mt-8 inline-block rounded-2xl border border-slate-300 bg-white/80 px-8 py-4 text-center text-lg font-bold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-white"
          >
            Back to Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
