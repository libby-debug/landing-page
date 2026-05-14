import { NextResponse } from "next/server";
import Stripe from "stripe";

const planConfig = {
  monthly: {
    envKey: "STRIPE_MONTHLY_PRICE_ID",
    price: "79",
    priceId: "price_1TVyH6L25jpeiL0EUfnP9tVy",
  },
  "3month": {
    envKey: "STRIPE_3_MONTH_PRICE_ID",
    price: "199",
    priceId: "price_1TX35EL25jpeiL0EH97Egx4k",
  },
  "6month": {
    envKey: "STRIPE_6_MONTH_PRICE_ID",
    price: "379",
    priceId: "price_1TVzVAL25jpeiL0E7KbZk37c",
  },
} as const;

type PlanKey = keyof typeof planConfig;

function isPlanKey(plan: unknown): plan is PlanKey {
  return typeof plan === "string" && plan in planConfig;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { plan?: unknown };
    const plan = body.plan;

    if (!isPlanKey(plan)) {
      return NextResponse.json(
        { error: "Please choose a valid ABA Mastered plan." },
        { status: 400 },
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY." },
        { status: 500 },
      );
    }

    const selectedPlan = planConfig[plan];
    const priceId = process.env[selectedPlan.envKey] ?? selectedPlan.priceId;

    if (!priceId) {
      return NextResponse.json(
        { error: `Stripe price ID is missing for ${plan}.` },
        { status: 500 },
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
      metadata: {
        plan,
      },
      subscription_data: {
        metadata: {
          plan,
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create Stripe Checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
