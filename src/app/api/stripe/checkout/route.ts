import { NextResponse } from "next/server";
import Stripe from "stripe";

const BASE_URL = process.env.NEXT_BASE_URL || "http://localhost:3000";
const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
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
        unit_amount: item.price * 100, // cents
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
