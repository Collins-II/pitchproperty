"use client";

import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

interface AuctionTimerProps {
endTime: Date; // auction ending time
}

const Timer: React.FC<AuctionTimerProps> = ({ endTime }) => {
const calculateTimeLeft = () => {
const now = new Date().getTime();
const end = new Date(endTime).getTime();
const difference = end - now;

let timeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

if (difference > 0) {
  timeLeft = {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

return timeLeft;

};

const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

useEffect(() => {
const timer = setInterval(() => {
setTimeLeft(calculateTimeLeft());
}, 1000);

return () => clearInterval(timer);

}, []);

const isEnded = new Date() > new Date(endTime);

return ( <div className="flex items-center justify-start font-semibold">
<Clock className="w-4 h-4 mr-3 text-neutral-500" />
{isEnded ? ( <span className="text-destructive">Auction Ended</span>
) : ( <span className="text-slate-700 dark:text-slate-100 ">
{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left </span>
)} </div>
);
};

export default Timer;
