"use client";

import React from "react";
import { Dialog, Transition } from "@headlessui/react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold text-gray-900">Payment Processing</Dialog.Title>
            <p className="mt-2 text-gray-600">Complete your payment to proceed.</p>

            {/* PAYMENT UI - Replace this with Stripe or another payment method */}
            <div className="mt-4">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Pay Now</button>
            </div>

            <button onClick={onClose} className="mt-4 text-gray-500 hover:text-gray-800">
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PaymentModal;
