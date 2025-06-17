"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/utils/CurrencyStore/store";
import { fetchExchangeRates, setCurrency } from "@/utils/CurrencyStore/currency-slice";

export const headerCurrency = [
  { id: "USD", name: "USD", flag: "🇺🇸", code: "us" }, // US Dollar
  { id: "EUR", name: "EUR", flag: "🇪🇺", code: "eu" }, // Euro
  { id: "ZMW", name: "ZMW", flag: "🇿🇲", code: "zm" }, // Zambian Kwacha
  { id: "GBP", name: "GBP", flag: "🇬🇧", code: "gb" }, // British Pound
  { id: "CNY", name: "CNY", flag: "🇨🇳", code: "cn" }, // Chinese Yuan
  { id: "SAR", name: "SAR", flag: "🇸🇦", code: "sa" }, // Saudi Riyal
  { id: "QAR", name: "QAR", flag: "🇶🇦", code: "qa" }, // Qatari Riyal
];

export default function CurrencyDropdown() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);

  useEffect(() => {
    dispatch(fetchExchangeRates()); // ✅ Fetch exchange rates on mount
  }, [dispatch]);

  const handleCurrencyChange = (currency: string, close: () => void) => {
    dispatch(setCurrency(currency)); // ✅ Dispatch selected currency
    close(); // ✅ Close dropdown after selection
  };

  // ✅ Correctly fetches the flag emoji & country code for flagcdn
  const getCurrencyFlag = () => {
    const currency = headerCurrency.find((c) => c.id === selectedCurrency);
    return currency ? { flag: currency.flag, code: currency.code } : { flag: "🌍", code: "xx" };
  };

  const { flag, code } = getCurrencyFlag();

  return (
    <div className="CurrencyDropdown flex h-full items-center">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button className="group px-3 py-1.5 border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 h-full">
              {/* Show Colored Flag if available, else show Emoji */}
              <img
                src={`https://flagcdn.com/w40/${code}.png`}
                onError={(e) => (e.currentTarget.src = "")} // Fallback to emoji if image fails
                alt={selectedCurrency}
                className={`w-5 h-5 rounded-full ${code === "xx" ? "hidden" : ""}`}
              />
              <span className={`${code !== "xx" ? "hidden" : "block"} text-lg`}>{flag}</span>
              <span className="ml-2 select-none">{selectedCurrency}</span>
              <ChevronDownIcon className={`ml-1 h-4 w-4 transition ease-in-out duration-150 ${open ? "-rotate-180" : "text-opacity-70"}`} aria-hidden="true" />
            </Popover.Button>

            <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute z-10 w-screen max-w-[140px] px-4 mt-4 right-0 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-2 bg-white dark:bg-neutral-800 p-4">
                    {headerCurrency.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleCurrencyChange(item.id, close)}
                        className={`flex items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
                          selectedCurrency === item.id ? "bg-gray-100 dark:bg-neutral-700" : "opacity-80"
                        }`}
                      >
                        {/* Show Colored Flag if available, else show Emoji */}
                        <img
                          src={`https://flagcdn.com/w40/${item.code}.png`}
                          onError={(e) => (e.currentTarget.src = "")}
                          alt={item.name}
                          className={`w-5 h-5 rounded-full ${item.code === "xx" ? "hidden" : ""}`}
                        />
                        <span className={`${item.code !== "xx" ? "hidden" : "block"} text-lg`}>{item.flag}</span>
                        <p className="ml-2 text-sm font-medium">{item.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
