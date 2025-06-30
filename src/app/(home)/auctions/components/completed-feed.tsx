'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { TrophyIcon } from '@heroicons/react/24/solid';
import { CompletedAuction } from '@/app/api/auction/completed/route';

/* -------------------------------------------------------------------------- */
/*                               DEMO ‑ REMOVE                                */
/* -------------------------------------------------------------------------- 
const dummyCompletedAuctions: CompletedAuction[] = [
  {
    winnerName: 'Emily Carter',
    winnerAvatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    finalPrice: 21_500,
    listingTitle: '2021 Mercedes‑Benz C‑Class',
    listingImage: 'https://picsum.photos/seed/mercedes/600/400',
    endedAt: new Date(Date.now() - 3 * 60_000).toISOString(),
  },
  {
    winnerName: 'Jacob Lee',
    winnerAvatar: 'https://randomuser.me/api/portraits/men/61.jpg',
    finalPrice: 17_900,
    listingTitle: '2019 Ford Mustang',
    listingImage: 'https://picsum.photos/seed/mustang/600/400',
    endedAt: new Date(Date.now() - 10 * 60_000).toISOString(),
  },
  {
    winnerName: 'Sofia Nguyen',
    winnerAvatar: 'https://randomuser.me/api/portraits/women/36.jpg',
    finalPrice: 26_800,
    listingTitle: '2020 Lexus RX 350',
    listingImage: 'https://picsum.photos/seed/lexus/600/400',
    endedAt: new Date(Date.now() - 20 * 60_000).toISOString(),
  },
]; */

/* -------------------------------------------------------------------------- */
export default function CompletedAuctionsFeed() {
  const [completed, setCompleted] = useState<CompletedAuction[]>([]);

  // Simulate incoming items — swap with socket or swr in prod
  useEffect(() => {
      let intervalId: NodeJS.Timeout;
  
      const fetchAndUpdateBids = async () => {
        try {
  
          const response = await fetch('/api/auction/completed', {
              method: 'GET',
              cache: 'no-store',
          });
  
          const data = await response.json(); // ✅ actually extract JSON data
          
          if (!Array.isArray(data)) return;
  
          setCompleted(prev => {
            const prevKeys = new Set(prev?.map(b => b.endedAt));
            const newBids = data.filter(b => !prevKeys.has(b.endedAt));
            return [...newBids, ...prev ?? []].slice(0, 20); // Merge new + old, max 20
          });
        } catch (err) {
          console.error('Failed to fetch completed bids:', err);
        }
      };
  
      fetchAndUpdateBids(); // fetch immediately
      intervalId = setInterval(fetchAndUpdateBids, 4000); // fetch every 4s
  
      return () => clearInterval(intervalId); // cleanup
    }, []);

  return (
    <section className="w-full rounded-2xl overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="ml-5">
          <h2 className="relative text-1xl font-semibold text-slate-700">Completed Auctions</h2>
        </div>
        <div className="w-14 border-b border-slate-900 border-[2px] dark:border-neutral-700 mb-3 ml-5"></div>

      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 pb-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {completed.map((item, idx) => (
          <motion.article
  key={`${item.endedAt}-${idx}`}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.35 }}
  className="group flex flex-col sm:flex-row items-start sm:items-center gap-4
             rounded-2xl border px-3 py-2 shadow-sm
             bg-white/60 backdrop-blur dark:bg-gray-800/60
             hover:shadow-md hover:bg-white dark:hover:bg-gray-700
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
      <span className="text-green-600 dark:text-green-400">
        {item.winnerName}
      </span>{' '}
      won <span className="italic">{item.listingTitle}</span>
    </p>

    {/* Right‑side meta */}
    <div className="flex items-center gap-4 sm:ml-auto text-xs sm:text-sm">
      <span className="text-gray-500 dark:text-gray-400">
        Ended {formatDistanceToNow(new Date(item.endedAt), { addSuffix: true })}
      </span>

      <span className="inline-flex items-center gap-1 rounded-full
                       bg-yellow-100 dark:bg-yellow-900/50
                       px-2 py-1 font-semibold text-yellow-800 dark:text-yellow-300">
        <TrophyIcon className="h-4 w-4" />
        ${item.finalPrice.toLocaleString()}
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
