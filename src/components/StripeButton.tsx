"use client";

import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { RootState } from "@/utils/CurrencyStore/store";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface ButtonProps {
    price: number;
}

export default function StripeButton({price}:ButtonProps) {
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const convertPrice = useConvertPrice();
  const [loading, setLoading] = useState(false);

  const _renderLoading = () => {
    return (
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  };

  const handleCheckout = async () => {
    const payPrice = convertPrice(price)

    setLoading(true);
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          { name: "Sample Product", price: payPrice, quantity: 1 , currency: selectedCurrency},
        ],
      }),
    });

    const { sessionId } = await response.json();
    const stripe = await stripePromise;

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
    setLoading(false);
  };

  return (
     <button
     onClick={handleCheckout}
     disabled={loading}
     className="w-full flex justify-center rounded-full bg-red-500 px-6 py-3 text-lg font-bold text-white hover:text-primary-600 shadow-lg transition duration-300 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-400">
        {loading ? _renderLoading() : <ArrowRightIcon className="w-5 h-5" />} 
     </button>
  );
}
