'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';   // <- use framer‑motion in Next.js
import { formatDistanceToNow } from 'date-fns';
import { UserIcon } from '@heroicons/react/24/solid';
import { getLiveBids, LiveBidDto } from '@/app/actions/getAuctions';
import { socket } from '@/lib/socketClient';
import { TrophyIcon } from 'lucide-react';

export type BidEvent = {
  bidderName: string;
  bidderAvatar?: string;
  amount: number;
  listingTitle: string;
  listingImage: string;
  timestamp: string;
};

/* -------------------------------------------------------------------------- */
/*                               DEMO – REMOVE                                */
/* -------------------------------------------------------------------------- */
const data: BidEvent[] = [
  {
    bidderName: 'Alice Johnson',
    bidderAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    amount: 12_350,
    listingTitle: '2022 BMW X5',
    listingImage: 'https://picsum.photos/seed/bmw/600/400',
    timestamp: new Date(Date.now() - 1 * 60_000).toISOString(),
  },
  {
    bidderName: 'Michael Smith',
    bidderAvatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    amount: 8_750,
    listingTitle: '2018 Tesla Model 3',
    listingImage: 'https://picsum.photos/seed/tesla/600/400',
    timestamp: new Date(Date.now() - 5 * 60_000).toISOString(),
  },
  {
    bidderName: 'Jasmine Lee',
    bidderAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    amount: 15_300,
    listingTitle: '2020 Audi A4',
    listingImage: 'https://picsum.photos/seed/audi/600/400',
    timestamp: new Date(Date.now() - 10 * 60_000).toISOString(),
  },
];

interface LiveAuctionsTickerProps {
  // Add any props if needed
  data: any;
}

/* -------------------------------------------------------------------------- */
export default function LiveAuctionsTicker() {
  const [bids, setBids] = useState<BidEvent[]>();

  /*useEffect(() => {
  // Only listen once per mount
  const handleNewBid = (bid: BidEvent) => {
    setBids(prev => [bid, ...(prev ?? []).slice(0, 19)]);
  };

  socket.on("connect", () => {
    console.log("✅ Socket connected");
  });

  socket.on("new-bid", handleNewBid); // 🟢 Use correct event name

  return () => {
    socket.off("new-bid", handleNewBid);
    socket.disconnect();
  };
}, []); */
   // Fetch live bids repeatedly (polling every 4 seconds)
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchAndUpdateBids = async () => {
      try {

        const response = await fetch('/api/auction/live', {
            method: 'GET',
            cache: 'no-store',
        });

        const data = await response.json(); // ✅ actually extract JSON data
        
        if (!Array.isArray(data)) return;

        setBids(prev => {
          const prevKeys = new Set(prev?.map(b => b.timestamp));
          const newBids = data.filter(b => !prevKeys.has(b.timestamp));
          return [...newBids, ...prev ?? []].slice(0, 20); // Merge new + old, max 20
        });
      } catch (err) {
        console.error('Failed to fetch live bids:', err);
      }
    };

    fetchAndUpdateBids(); // fetch immediately
    intervalId = setInterval(fetchAndUpdateBids, 4000); // fetch every 4s

    return () => clearInterval(intervalId); // cleanup
  }, []);

  return (
    <section className="w-full  overflow-hidden
                        bg-white/60 backdrop-blur dark:bg-gray-900/60 dark:border-gray-700">
     {/* <header className="px-5 py-5">
        <h2 className="text-md font-semibold flex items-center gap-1
                       text-gray-900 dark:text-gray-100">
           Live Auction Activity
        </h2>
      </header> */}

      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-3 pb-5 custom-scrollbar w-full">
        <AnimatePresence initial={false}>
          {bids?.map((item, idx) => (
            <motion.article
              key={`${item.timestamp}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="w-full group flex flex-col sm:flex-row items-start sm:items-center gap-4
                         rounded-2xl border px-3 py-2 shadow-sm
                         bg-gray-0 hover:bg-gray-100 backdrop-blur dark:bg-gray-800/60
                         hover:shadow-md dark:hover:bg-gray-700
                         transition-colors"
            >
              {/* Thumbnail */}
              <img
                src={item.listingImage}
                alt={item.listingTitle}
                className="h-24 w-full sm:h-20 sm:w-20 rounded-xl object-cover flex-shrink-0
                           ring-1 ring-gray-200 dark:ring-gray-700"
              />
            
              {/* Content */}
              <div className="flex flex-col w-full gap-1">
                {/* Headline */}
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                  <span className="text-blue-600 dark:text-blue-400">
                    {item.bidderName}
                  </span>{' '}
                  placed a bid on <span className="italic">{item.listingTitle}</span>
                </p>
            
                {/* Right‑side meta */}
                <div className="flex items-center gap-4 sm:ml-auto text-xs sm:text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                  </span>
            
                  <span className="inline-flex items-center gap-1 rounded-full
                                   bg-green-100 dark:bg-green-900/50
                                   px-2 py-1 font-semibold text-green-800 dark:text-green-300">
                    <TrophyIcon className="h-4 w-4" />
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.article>
            
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
