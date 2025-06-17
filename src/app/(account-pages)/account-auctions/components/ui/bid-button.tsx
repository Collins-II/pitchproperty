"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface BidButtonProps {
  auctionId: string;
  currentPrice: number;
  onPlaceBid: (amount: number) => Promise<void>;
}

const BidButton: React.FC<BidButtonProps> = ({ auctionId, currentPrice, onPlaceBid }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState<number>(currentPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitBid = async () => {
    if (bidAmount <= 0) {
      toast({
        title: "Invalid Bid",
        description: "Bid amount must be greater than zero.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onPlaceBid(bidAmount);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to place bid.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center">
              <input
                placeholder="Enter your bid"
                type="number"
                min={currentPrice + 1}
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 text-black"
                value={bidAmount}
                onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                disabled={isSubmitting}
              />
      
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitBid}
                disabled={isSubmitting || bidAmount <= 0}
                className="flex items-center gap-2 w-auto bg-red-500 text-white sm:px-2 md:px-6 py-2 rounded-md font-semibold hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Placing...
                </>
              ) : (
                "Place Bid"
              )}
              </motion.button>
            </div>
    </>
  );
};

export default BidButton;
