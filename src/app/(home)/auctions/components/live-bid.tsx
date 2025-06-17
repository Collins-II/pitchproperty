"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import clsx from "clsx";
import { socket } from "@/lib/socketClient";
import { IBid } from "@/lib/database/models/auction.model";

interface Bid {
  user: string;
  amount: number;
  timestamp: string; // ISO string
}

interface LiveBidTickerProps {
  auctionId: string;
  bids?: IBid[]; // Optional seed bids
}

const parseBidAmount = (amount: number | string) =>
  parseFloat(amount.toString().replace(/[^0-9.]/g, "").replace(",", ""));

const LiveBidTicker: React.FC<LiveBidTickerProps> = ({ bids = [] }) => {
  const listRef = useRef<HTMLDivElement>(null);
   const [bidders, setBidders] = useState<IBid[]>([]);
  
    useEffect(() => {
      const sorted = [...bids].sort(
        (a, b) => parseBidAmount(b.bidAmount) - parseBidAmount(a.bidAmount)
      );
      setBidders(sorted);
  
      socket.connect();
      socket.emit("joinRoom", "auctionRoom");
  
      return () => {
        socket.disconnect();
      };
    }, [bids]);
  
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
    <div className="relative w-full bg-white dark:bg-slate-800 border rounded-xl p-4 overflow-hidden">
      <h4 className="text-sm font-semibold text-slate-700 dark:text-white mb-2">
        Live Bids
      </h4>
      {bidders.length === 0 ? (
        <p className="text-sm text-neutral-500">No active bidders yet.</p>
      ) : (
      <div
        ref={listRef}
        className="relative space-y-2 max-h-64 overflow-y-auto custom-scrollbar transition-all"
      >
        {bidders.map((bid, i) => {
          const prev = bids[i + 1];
          const priceDiff = prev ? bid.bidAmount - prev.bidAmount : 0;
          const isUp = priceDiff > 0;
          const isDown = priceDiff < 0;

          return (
            <div
              key={i}
              className="flex justify-between items-center text-sm p-2 rounded-md bg-slate-100 dark:bg-slate-700"
            >
              <div className="relative flex flex-col pl-4">
                <span className="font-medium text-slate-800 dark:text-white">
                  {bid.bidder?.name}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-300">
                  {new Date(bid?.createdAt).toLocaleTimeString()}
                </span>
                 <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-green-400 animate-ping"></span>
                 <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-green-400"></span>
              </div>

              <div className="flex items-center gap-1">
                <span
                  className={clsx(
                    "font-semibold",
                    isUp && "text-green-500",
                    isDown && "text-red-500",
                    !isUp && !isDown && "text-slate-600 dark:text-slate-300"
                  )}
                >
                  ${bid?.bidAmount.toLocaleString()}
                </span>
                {isUp && <ArrowUpRight className="w-4 h-4 text-green-500" />}
                {isDown && <ArrowDownRight className="w-4 h-4 text-red-500" />}
              </div>
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent z-10 pointer-events-none" />
      </div>
        )}
        
    </div>
  );
};

export default LiveBidTicker;
