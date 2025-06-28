"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import clsx from "clsx";
import BidderCard from "./bidder-card";
import { IBid } from "@/lib/database/models/auction.model";

// Initialize socket once
const socket = io(undefined, {
  path: "/api/socket", // Adjust if using a custom path
  autoConnect: false,
});

interface BiddersProps {
  data: IBid[];
}

const parseBidAmount = (amount: number | string) =>
  parseFloat(amount.toString().replace(/[^0-9.]/g, "").replace(",", ""));

const ActiveBidders: React.FC<BiddersProps> = ({ data }) => {
  const [bidders, setBidders] = useState<IBid[]>([]);

  useEffect(() => {
    const sorted = [...data].sort(
      (a, b) => parseBidAmount(b.bidAmount) - parseBidAmount(a.bidAmount)
    );
    setBidders(sorted);

    socket.connect();
    socket.emit("joinRoom", "auctionRoom");

    return () => {
      socket.disconnect();
    };
  }, [data]);

  useEffect(() => {
    socket.on("updateBidders", (updated: IBid[]) => {
      const sorted = [...updated].sort(
        (a, b) => parseBidAmount(b.bidAmount) - parseBidAmount(a.bidAmount)
      );
      setBidders(sorted);
    });

    return () => {
      socket.off("updateBidders");
    };
  }, []);

  return (
    <div className="rounded-xl bg-white dark:bg-gray-900">
      <h4 className="font-light text-md text-slate-700 dark:text-slate-100">Active Bidders <strong>(Top 3)</strong></h4>
      <div className="border-b border-slate-900 border-[2px] dark:border-neutral-700 mb-3 w-14"></div>

      {bidders.length === 0 ? (
        <p className="text-sm text-neutral-500">No active bidders yet.</p>
      ) : (
        <div className="space-y-4">
          {bidders.slice(0,3).map((bid, idx) => (
            <BidderCard
              key={bid?._id}
              name={bid?.bidder?.name || "Anonymous"}
              bidAmount={`$${bid?.bidAmount}`}
              avatarUrl={bid?.bidder?.image || "/images/users/default.jpg"}
              status={idx === 0 ? "leading" : "outbid"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveBidders;
