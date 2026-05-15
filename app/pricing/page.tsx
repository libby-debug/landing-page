import Link from "next/link";

const plans = [
  {
    name: "Monthly",
    price: "$79",
    cadence: "/month",
    effective: "$79",
    accent: "blue",
    buttonLineTwo: "Monthly Plan",
    href: "/checkout?plan=monthly&price=79",
  },
  {
    name: "3-Month Plan",
    price: "$199",
    cadence: "today*",
    effective: "$66",
    discount: "16% off",
    accent: "purple",
    buttonLineTwo: "3-Month Plan",
    popular: true,
    href: "/checkout?plan=3month&price=199",
  },
  {
    name: "6-Month Plan",
    price: "$379",
    cadence: "today*",
    effective: "$63",
    discount: "20% off",
    accent: "teal",
    buttonLineTwo: "6-Month Plan",
    href: "/checkout?plan=6month&price=379",
  },
];

const accentClass = {
  blue: {
    border: "border-blue-300",
    text: "text-blue-600",
    bg: "bg-blue-50",
    button: "border-blue-500 text-blue-600",
  },
  purple: {
    border: "border-purple-300",
    text: "text-purple-600",
    bg: "bg-purple-50",
    button:
      "border-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-white",
  },
  teal: {
    border: "border-teal-300",
    text: "text-teal-500",
    bg: "bg-teal-50",
    button: "border-teal-500 text-teal-500",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-transparent px-4 pb-20 text-center sm:px-8 sm:pb-24">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <h1 className="mx-auto max-w-[20rem] text-center text-[clamp(2.5rem,12vw,3.5rem)] font-black leading-[1.05] tracking-tight text-slate-950 sm:max-w-none md:text-7xl">
          Choose Your Mastery Plan
        </h1>

        <p className="mx-auto mt-4 max-w-3xl px-1 text-center text-base font-medium leading-7 text-slate-950 sm:mt-5 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
          Affordable and Flexible BCBA exam prep plans designed to fit your
          budget.
        </p>

        <div className="mx-auto mt-8 w-full max-w-[28rem] rounded-[2rem] bg-[#020617] px-3 py-6 shadow-2xl shadow-slate-900/20 sm:mt-10 sm:max-w-6xl sm:px-8 sm:py-8 lg:px-10">
          <div className="grid place-items-center gap-6 lg:grid-cols-3">
            {plans.map((plan) => {
              const tone = accentClass[plan.accent as keyof typeof accentClass];

              return (
                <article
                  key={plan.name}
                  className={`relative mx-auto flex w-full max-w-sm flex-col rounded-3xl border ${tone.border} bg-white p-5 text-center shadow-xl sm:p-6`}
                >
                  {plan.popular ? (
                    <div className="absolute left-1/2 top-0 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 px-6 py-2 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg sm:px-8 sm:text-sm">
                      Most Popular
                    </div>
                  ) : null}

                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${tone.bg}`}
                  >
                    <span className={`text-2xl font-black ${tone.text}`}>
                      {plan.name === "Monthly"
                        ? "1"
                        : plan.name.startsWith("3")
                          ? "3"
                          : "6"}
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-black uppercase tracking-tight text-slate-950">
                    {plan.name}
                  </h2>

                  <div className={`mx-auto mt-5 h-px w-4/5 ${tone.bg}`} />

                  <div className="mt-5 flex items-end justify-center gap-1.5 text-slate-950 sm:gap-2">
                    <span className="text-3xl font-black sm:text-4xl">$</span>
                    <span className="text-6xl font-black leading-none sm:text-7xl">
                      {plan.price.replace("$", "")}
                    </span>
                    <span className="pb-1.5 text-base font-black sm:pb-2 sm:text-xl">
                      {plan.cadence}
                    </span>
                  </div>

                  {plan.name === "Monthly" ? (
                    <p className={`mt-3 text-lg font-black ${tone.text}`}>
                      full price
                    </p>
                  ) : null}

                  {plan.discount ? (
                    <p className={`mt-3 text-lg font-black ${tone.text}`}>
                      {plan.discount}
                    </p>
                  ) : null}

                  <Link
                    href={plan.href}
                    className={`mx-auto mt-8 flex min-h-14 w-full max-w-[17rem] flex-col items-center justify-center rounded-2xl border px-5 py-3 text-center text-sm font-black uppercase leading-tight tracking-wide transition hover:opacity-90 ${tone.button}`}
                  >
                    <span>Choose the</span>
                    <span>{plan.buttonLineTwo}</span>
                  </Link>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-4xl rounded-2xl bg-white/95 px-4 py-4 text-center text-sm font-bold italic leading-6 text-slate-950 shadow-sm sm:px-5 sm:text-base">
            *3-month and 6-month plans, after term expires, will renew at
            $79/month until canceled.
          </p>
        </div>
      </section>
    </main>
  );
}
