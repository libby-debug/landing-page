import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  getServerEnv,
  getStripeCheckoutConfigStatus,
  getSupabaseAdminConfigStatus,
} from "@/lib/env/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type SubscriptionPeriod = {
  current_period_end?: unknown;
};

function getStripeId(
  value:
    | string
    | Stripe.Customer
    | Stripe.DeletedCustomer
    | Stripe.Subscription
    | null,
) {
  return typeof value === "string" ? value : value?.id ?? null;
}

function getCurrentPeriodEnd(subscription: Stripe.Subscription | null) {
  const currentPeriodEnd = (subscription as SubscriptionPeriod | null)
    ?.current_period_end;

  return typeof currentPeriodEnd === "number"
    ? new Date(currentPeriodEnd * 1000).toISOString()
    : null;
}

async function handleCheckoutSessionCompleted(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
) {
  const supabaseUserId =
    session.metadata?.supabase_user_id ?? session.client_reference_id;
  const stripeCustomerId = getStripeId(session.customer);
  const subscriptionId = getStripeId(session.subscription);

  if (!supabaseUserId || !stripeCustomerId) {
    throw new Error(
      "Stripe checkout.session.completed is missing Supabase user or customer metadata.",
    );
  }

  const subscription = subscriptionId
    ? await stripe.subscriptions.retrieve(subscriptionId)
    : null;
  const subscriptionStatus = subscription?.status ?? null;
  const priceId =
    subscription?.items.data[0]?.price.id ?? session.metadata?.price_id ?? null;
  const planName = session.metadata?.plan_name ?? null;
  const email =
    session.customer_details?.email ??
    (typeof session.customer_email === "string" ? session.customer_email : null);
  const paidActive =
    subscriptionStatus === "active" ||
    subscriptionStatus === "trialing" ||
    session.payment_status === "paid";

  const supabaseAdmin = createSupabaseAdminClient();
  const { error } = await supabaseAdmin.from("user_billing_profiles").upsert(
    {
      current_period_end: getCurrentPeriodEnd(subscription),
      email,
      paid_active: paidActive,
      plan_name: planName,
      price_id: priceId,
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: subscriptionId,
      subscription_status: subscriptionStatus,
      updated_at: new Date().toISOString(),
      user_id: supabaseUserId,
    },
    { onConflict: "user_id" },
  );

  if (error) {
    throw error;
  }
}

export async function POST(request: Request) {
  const stripeConfig = getStripeCheckoutConfigStatus();
  const supabaseAdminConfig = getSupabaseAdminConfigStatus();

  if (!stripeConfig.configured) {
    return NextResponse.json({ error: stripeConfig.message }, { status: 500 });
  }

  if (!supabaseAdminConfig.configured) {
    return NextResponse.json(
      { error: supabaseAdminConfig.message },
      { status: 500 },
    );
  }

  const stripeSecretKey = getServerEnv("STRIPE_SECRET_KEY");
  const webhookSecret = getServerEnv("STRIPE_WEBHOOK_SECRET");
  const signature = request.headers.get("stripe-signature");

  if (!stripeSecretKey || !webhookSecret || !signature) {
    return NextResponse.json(
      { error: "Stripe webhook configuration or signature is missing." },
      { status: 400 },
    );
  }

  const stripe = new Stripe(stripeSecretKey);
  const payload = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid Stripe webhook.";

    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutSessionCompleted(
        stripe,
        event.data.object as Stripe.Checkout.Session,
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process webhook.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
