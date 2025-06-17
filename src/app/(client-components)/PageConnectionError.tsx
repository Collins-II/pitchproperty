"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import I404Png from "@/images/404.png";

const PageConnectionError = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => setOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    updateOnlineStatus(); // Initial check

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (online) return null; // Don't render this if we're online

  return (
    <div className="nc-Page404">
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        <header className="text-center max-w-2xl mx-auto space-y-2">
          <Image src={I404Png} alt="no-internet" />
          <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
            No Internet Connection. Please check your network and try again.
          </span>
          <div className="pt-8 flex justify-center">
            <ButtonPrimary onClick={() => window.location.reload()}>
              Retry Connection
            </ButtonPrimary>
          </div>
        </header>
      </div>
    </div>
  );
};

export default PageConnectionError;
