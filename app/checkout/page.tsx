"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const planNames = {
  monthly: "Monthly Plan",
  "3month": "3-Month Plan",
  "6month": "6-Month Plan",
};

type CheckoutResponse = {
  url?: string;
  error?: string;
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const plan = searchParams.get("plan") ?? "monthly";
  const price = searchParams.get("price") ?? "79";
  const selectedPlan =
    planNames[plan as keyof typeof planNames] ?? "Monthly Plan";

  async function handleCheckout() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });
      const data = (await response.json()) as CheckoutResponse;

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start Stripe Checkout.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      const message =
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start Stripe Checkout.";

      setError(message);
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-transparent px-6 pb-24 text-center sm:px-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <p className="text-sm font-black uppercase tracking-wide text-blue-600">
          Secure checkout
        </p>

        <h1 className="mt-2 text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
          Complete Your Purchase
        </h1>

        <div className="mt-10 w-full rounded-3xl border border-slate-950 bg-white p-6 text-center shadow-2xl shadow-slate-900/15 sm:p-8">
          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-xl font-black text-slate-950">
              You selected the {selectedPlan}
            </p>
            <p className="mt-2 text-3xl font-black text-blue-600">
              Total Due Today: ${price}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-5 py-6">
            <h2 className="text-2xl font-black text-slate-950">
              Continue to Stripe Checkout
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base font-semibold leading-7 text-slate-950">
              Stripe will securely collect your payment details and complete
              your ABA Mastered plan purchase.
            </p>

            {error ? (
              <p
                className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <button
              className="mt-6 w-full rounded-xl bg-blue-600 p-4 font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
              onClick={handleCheckout}
              type="button"
            >
              {isLoading ? "Redirecting to Stripe..." : "Proceed to Checkout"}
            </button>
          </div>

          <Link
            href="/pricing"
            className="mt-6 block text-center font-bold text-blue-600 hover:text-blue-700"
          >
            Back to pricing
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}
