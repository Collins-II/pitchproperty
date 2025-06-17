"use client";

import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "./timer";
import { Badge } from "@/components/uix/badge";

interface AuctionTimerProps {
  endTime: Date; // auction ending time
}

const AuctionTimer: React.FC<AuctionTimerProps> = ({ endTime }) => {
  const now = Date.now();
  const end = new Date(endTime).getTime();
  const totalSeconds = Math.max(Math.floor((end - now) / 1000), 0);

  const getRemainingTimeUntilEnd = () =>
    Math.max(Math.floor((new Date(endTime).getTime() - Date.now()) / 1000), 0);

  const [remainingTime, setRemainingTime] = useState(getRemainingTimeUntilEnd());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTimeUntilEnd());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [endTime]);

  const isEnded = remainingTime <= 0;

  // For visual reset every 60 seconds
  const currentCycleSeconds = remainingTime % 60 || 60;

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-2">
      <div className="">
        <CountdownCircleTimer
          key={currentCycleSeconds}
          isPlaying={!isEnded}
          duration={60}
          initialRemainingTime={currentCycleSeconds}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[60, 30, 15, 0]}
          strokeWidth={6}
          size={100}
        >
          {({ remainingTime }) =>
            remainingTime > 0 ? (
              <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-100">
                {remainingTime}s
              </span>
            ) : (
              <span className="text-[11px] text-red-500 font-medium">Ended</span>
            )
          }
        </CountdownCircleTimer>
      </div>

      {!isEnded && (
        <Badge variant="outline" className="gap-1 px-2 py-[3px] text-xs font-medium">
          <Timer endTime={endTime} />
        </Badge>
      )}
    </div>
  );
};

export default AuctionTimer;
