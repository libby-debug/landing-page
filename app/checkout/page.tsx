"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const planNames = {
  monthly: "Monthly Plan",
  "3month": "3-Month Plan",
  "6month": "6-Month Plan",
};

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const inputClass =
  "rounded-xl border border-slate-950 bg-white p-4 font-semibold text-slate-950 placeholder:text-slate-500";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "monthly";
  const price = searchParams.get("price") ?? "79";
  const selectedPlan =
    planNames[plan as keyof typeof planNames] ?? "Monthly Plan";

  return (
    <main className="min-h-screen bg-transparent px-6 pb-24 text-center sm:px-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <p className="text-sm font-black uppercase tracking-wide text-blue-600">
          Secure checkout
        </p>

        <h1 className="mt-2 text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
          Complete Your Purchase
        </h1>

        <div className="mt-10 w-full rounded-3xl border border-slate-950 bg-white p-6 text-left shadow-2xl shadow-slate-900/15 sm:p-8">
          <div className="rounded-2xl bg-blue-50 p-5 text-center">
            <p className="text-xl font-black text-slate-950">
              You selected the {selectedPlan}
            </p>
            <p className="mt-2 text-3xl font-black text-blue-600">
              Total Due Today: ${price}
            </p>
          </div>

          <form className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-black text-slate-950">
              Email Address
              <input
                className={inputClass}
                placeholder="Email address"
                type="email"
              />
            </label>

            <label className="grid gap-2 text-sm font-black text-slate-950">
              Phone Number
              <input
                className={inputClass}
                inputMode="tel"
                placeholder="Phone number"
                type="tel"
              />
            </label>

            <label className="grid gap-2 text-sm font-black text-slate-950">
              Cardholder Name
              <input
                className={inputClass}
                placeholder="Full name"
                type="text"
              />
            </label>

            <label className="grid gap-2 text-sm font-black text-slate-950">
              Address
              <input
                className={inputClass}
                placeholder="Street address"
                type="text"
              />
            </label>

            <label className="grid gap-2 text-sm font-black text-slate-950">
              Address Line 2
              <input
                className={inputClass}
                placeholder="Apartment, suite, unit, or building"
                type="text"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-[minmax(0,0.85fr)_minmax(7rem,8rem)_minmax(7rem,8.5rem)] md:gap-6">
              <label className="grid gap-2 text-sm font-black text-slate-950">
                City
                <input
                  className={inputClass}
                  placeholder="City"
                  type="text"
                />
              </label>

              <label className="grid gap-2 text-sm font-black text-slate-950">
                State
                <select className={inputClass} defaultValue="">
                  <option value="" disabled>
                    State
                  </option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-black text-slate-950">
                ZIP Code
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="ZIP Code"
                  type="text"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-black text-slate-950">
              Credit Card Number
              <input
                className={inputClass}
                inputMode="numeric"
                placeholder="1234 1234 1234 1234"
                type="text"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-black text-slate-950">
                Expiration Date
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="MM/YY"
                  type="text"
                />
              </label>

              <label className="grid gap-2 text-sm font-black text-slate-950">
                CVC Number
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="CVC"
                  type="text"
                />
              </label>
            </div>

            <button
              className="mt-3 rounded-xl bg-blue-600 p-4 font-black text-white transition hover:bg-blue-700"
              type="button"
            >
              Complete Purchase
            </button>
          </form>

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
