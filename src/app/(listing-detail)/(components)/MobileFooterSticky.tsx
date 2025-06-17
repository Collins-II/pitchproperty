"use client";

import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import StripeButton from "@/components/StripeButton";

const MobileFooterSticky = () => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  return (
    <>
      {/* Sticky Footer Button */}
      <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-transparent dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
        <div className="flex flex-col w-full px-6 pb-4">
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-gold text-white py-3 rounded-full text-md font-light"
          >
             Reservation
            <span className="ml-4">($10,000)</span>
          </button>
        </div>
      </div>

     {/* Bottom Sheet Payment Modal */}
     <Transition appear show={isPaymentModalOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={() => setPaymentModalOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
          <div className="fixed bottom-0 left-0 right-0">
            <TransitionChild
              as={React.Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="bg-white dark:bg-neutral-800 rounded-t-2xl shadow-xl p-6 w-full max-w-md mx-auto">
                <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white text-center">Payment Breakdown</DialogTitle>
                
                {/* Payment Details */}
                <div className="flex flex-col gap-3 mt-6 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Base Price</span>
                    <span>$50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>$5,000</span>
                  </div>
                  <div className="border-b border-neutral-200 dark:border-neutral-700 my-2"></div>
                  <div className="w-full">
                    <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                      <span>Reservation Fee</span>
                      <span>$10,000</span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="mt-6">
                  <StripeButton price={10000} />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setPaymentModalOpen(false)}
                  className="mt-4 text-gray-500 hover:text-gray-800 w-full text-center"
                >
                  Close
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileFooterSticky;
