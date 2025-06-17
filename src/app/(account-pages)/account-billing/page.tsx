"use client";

import React from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useRouter } from "next/navigation";

const AccountBilling = () => {
  const router = useRouter();

  const handleAddPayoutMethod = () => {
    // Redirect to payout method setup page
    router.push("/");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">Payments & Payouts</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <div className="max-w-2xl">
        {/* Payout Methods Section */}
        <span className="text-xl font-semibold block">Payout Methods</span>
        <p className="text-neutral-700 dark:text-neutral-300 mt-2">
          At <strong>Kingsland City Estate</strong>, we ensure secure and fast payouts for our properties. 
          When we receive a payment for a reservation, it is processed through our secure system. 
          Our platform supports multiple payout methods to make receiving funds effortless.
        </p>

        <p className="text-neutral-700 dark:text-neutral-300 mt-4">
          <strong>How it works:</strong> Payouts are released 24 hours after a guest’s scheduled check-in time. 
          The time it takes for the funds to reach your account depends on your selected payout method.
        </p>

        <ul className="list-disc list-inside mt-4 text-neutral-700 dark:text-neutral-300">
          <li>Bank Transfer</li>
          <li>Mobile Money (MTN & Airtel)</li>
        </ul>

        {/* Action Button */}
        <div className="pt-10">
          <ButtonPrimary onClick={handleAddPayoutMethod}>
            Add Payout Method
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountBilling;
