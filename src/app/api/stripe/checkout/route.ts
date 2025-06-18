// /app/api/stripe/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const BASE_URL = process.env.NEXT_BASE_URL || "http://localhost:3000";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY is not defined in environment variables." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });

  try {
    const { items } = await req.json();

    const line_items = items.map((item: {
      name: string;
      price: number;
      quantity: number;
      currency: string;
    }) => ({
      price_data: {
        currency: item.currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${BASE_URL}/pay-done?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    );
  }
}
