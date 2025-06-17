"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";

interface BidButtonProps {
  auctionId: string;
  currentPrice: number;
}

export default function BidButton({ auctionId, currentPrice }: BidButtonProps) {
  const { data: session } = useSession();
  const [amount, setAmount] = useState(currentPrice + 10);
  const [loading, setLoading] = useState(false);

  const handleBid = async () => {
    if (!session?.user) {
      alert("You must be signed in to place a bid.");
      return;
    }

    if (amount <= currentPrice) {
      alert("Your bid must be higher than the current price.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auction/bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auctionId, amount }),
      });

      if (res.ok) {
        alert("Bid placed successfully!");
        setAmount(amount + 10); // auto-increase for convenience
      } else {
        const error = await res.json();
        alert(`Bid failed: ${error.message || "Something went wrong."}`);
      }
    } catch (err) {
      console.log(err);
      alert("Network error while placing bid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 w-full">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          placeholder="Enter your bid"
          type="number"
          min={currentPrice + 1}
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={loading}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBid}
          disabled={loading}
          className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Placing..." : "Place Bid"}
        </motion.button>
      </div>
    </div>
  );
}
