import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  getPublicEnv,
  getServerEnv,
  getStripeCheckoutConfigStatus,
  getSupabaseAdminConfigStatus,
} from "@/lib/env/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const planConfig = {
  monthly: {
    envKey: "STRIPE_MONTHLY_PRICE_ID",
    name: "Monthly Plan",
    price: "79",
    priceId: "price_1TVyH6L25jpeiL0EUfnP9tVy",
  },
  "3month": {
    envKey: "STRIPE_3_MONTH_PRICE_ID",
    name: "3-Month Plan",
    price: "199",
    priceId: "price_1TX35EL25jpeiL0EH97Egx4k",
  },
  "6month": {
    envKey: "STRIPE_6_MONTH_PRICE_ID",
    name: "6-Month Plan",
    price: "379",
    priceId: "price_1TVzVAL25jpeiL0E7KbZk37c",
  },
} as const;

type PlanKey = keyof typeof planConfig;

function isPlanKey(plan: unknown): plan is PlanKey {
  return typeof plan === "string" && plan in planConfig;
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length).trim();
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

    const stripeConfig = getStripeCheckoutConfigStatus();

    if (!stripeConfig.configured) {
      return NextResponse.json(
        { error: stripeConfig.message },
        { status: 500 },
      );
    }

    const supabaseAdminConfig = getSupabaseAdminConfigStatus();

    if (!supabaseAdminConfig.configured) {
      return NextResponse.json(
        { error: supabaseAdminConfig.message },
        { status: 500 },
      );
    }

    const accessToken = getBearerToken(request);

    if (!accessToken) {
      return NextResponse.json(
        { error: "Please log in before starting checkout." },
        { status: 401 },
      );
    }

    const stripeSecretKey = getServerEnv("STRIPE_SECRET_KEY");
    const siteUrl = getPublicEnv("NEXT_PUBLIC_SITE_URL");

    if (!stripeSecretKey || !siteUrl) {
      return NextResponse.json(
        { error: stripeConfig.message },
        { status: 500 },
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !user?.id || !user.email) {
      return NextResponse.json(
        { error: "Please log in before starting checkout." },
        { status: 401 },
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

    const { data: billingProfile, error: billingProfileError } =
      await supabaseAdmin
        .from("user_billing_profiles")
        .select("stripe_customer_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (billingProfileError) {
      return NextResponse.json(
        { error: "Unable to load billing profile before checkout." },
        { status: 500 },
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const stripeCustomerId = billingProfile?.stripe_customer_id;
    const metadata = {
      supabase_user_id: user.id,
      plan_name: selectedPlan.name,
      price_id: priceId,
    };

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      ...(stripeCustomerId
        ? { customer: stripeCustomerId }
        : { customer_email: user.email }),
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      client_reference_id: user.id,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
      metadata,
      subscription_data: {
        metadata,
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
