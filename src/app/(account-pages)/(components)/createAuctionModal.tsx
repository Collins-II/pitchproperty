"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import { ICar } from "@/lib/database/models/car.model";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { IProperty } from "@/lib/database/models/property.model";
import { String } from "aws-sdk/clients/cloudtrail";

interface CreateAuctionModalProps {
  data: ICar | IProperty;
  onClose: () => void;
}

export const CreateAuctionModal = ({ data, onClose }: CreateAuctionModalProps) => {
  const { toast } = useToast();
  console.log("CreateAuctionModal", data);
  
  const [listingId, setListingId] = useState<string>(data?._id);
  const [title, setTitle] = useState<string>(data?.title as String);
  const [description, setDescription] = useState<string>(data?.description || "Auction for " + data?.title );
  const [imageUrls, setImageUrls] = useState<string[]>(data?.galleryImgs || []);
  const [startingPrice, setStartingPrice] = useState<number>(data?.price as number / 100 || 25000);
  const [bidInterval, setBidInterval] = useState<number>(500);
  const [endTime, setEndTime] = useState<string>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuctionCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const auctionData = {
        listingId: data._id,
        listingModel: data?.listingType,
        title,
        description,
        imageUrls,
        startingPrice,
        currentPrice: startingPrice,
        bidInterval,
        endTime: new Date(endTime),
      };

      const res = await fetch("/api/auction/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auctionData),
      });

      if (!res.ok) throw new Error("Failed to create auction");

      toast({
        title: "Success",
        description: "Auction created successfully!",
        duration: 3000,
      });

      onClose();
    } catch (error) {
      console.log("Error creating auction:", error);
      toast({
        title: "Error",
        description: "Failed to create auction. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-neutral-800 p-6 rounded-md shadow-md w-full max-w-md relative"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-muted mb-4">Create Auction</h2>

        <form onSubmit={handleAuctionCreation} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm text-muted">Starting Price (USD)</label>
            <input
              aria-label="Starting Price"
              type="number"
              value={startingPrice}
              onChange={(e) => setStartingPrice(Number(e.target.value))}
              required
              min={0}
              className="w-full p-2 bg-neutral-300 text-muted rounded"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-muted">Bid Increment (USD)</label>
            <input
              aria-label="Bid Increment"
              type="number"
              value={bidInterval}
              onChange={(e) => setBidInterval(Number(e.target.value))}
              required
              min={1}
              className="w-full p-2 bg-neutral-300 text-muted rounded"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-muted">End Time</label>
            <input
              aria-label="End Time"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full p-2 bg-neutral-300 text-muted rounded"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            {isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
            {isSubmitting ? "Creating..." : "Create Auction"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
