"use client";

import StartRating from "@/components/StartRating";
import React, { FC, useEffect, Suspense } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonSecondary from "@/shared/ButtonSecondary";

export interface PayPageProps {}

const PayPageContent: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get success_id from Stripe query params
  const successId = searchParams.get("session_id") || "N/A";

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  useEffect(() => {
    // Auto-redirect to homepage after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full flex flex-col sm:rounded-2xl space-y-8 listingSection__wrap">
      <h2 className="text-3xl lg:text-4xl font-semibold">
        Congratulations 🎉
      </h2>

      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* ------------------------ */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Your Reservation</h3>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                fill
                alt=""
                className="object-cover"
                src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              />
            </div>
          </div>
          <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                Luxury apartment in Kingsland City
              </span>
              <span className="text-base sm:text-lg font-medium mt-1 block">
                The Grand Suite
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              3 beds · 2 baths
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
      </div>

      {/* ------------------------ */}
      <div className="space-y-6">
        <h3 className="text-1xl font-semibold">Details</h3>
        <div className="flex flex-col space-y-4 border border-neutral-200 dark:border-neutral-700 rounded-3xl p-4">
          <div className="flex text-neutral-6000 dark:text-neutral-300">
            <span className="flex-1">Payment code</span>
            <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
              {successId.slice(0, 12)}
            </span>
          </div>
          <div className="flex text-neutral-6000 dark:text-neutral-300">
            <span className="flex-1">Date</span>
            <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
              {currentDate}
            </span>
          </div>
          <div className="flex text-neutral-6000 dark:text-neutral-300">
            <span className="flex-1">Total</span>
            <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
              $10,000
            </span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span className="flex-1">Payment method</span>
            <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
              Credit card
            </span>
          </div>
        </div>
      </div>
      <div>
        <ButtonSecondary href="/">Back home</ButtonSecondary>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        You will be redirected in 5 seconds...
      </p>
    </div>
  );
};

const PayPage: FC<PayPageProps> = () => {
  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">
          {/* Wrap Client Component in Suspense */}
          <Suspense fallback={<p>Loading payment details...</p>}>
            <PayPageContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default PayPage;
