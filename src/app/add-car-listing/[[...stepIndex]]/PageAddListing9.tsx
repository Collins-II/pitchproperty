"use client";

import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import NcInputNumber from "@/components/NcInputNumber";
import React, { FC, Fragment, useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import ToggleSubscribe from "../components/ToggleSubscribe";
import { useAppDispatch, useAppSelector } from "@/lib/redux-slice/hooks";
import { updateCarField, updateIsSubField } from "@/lib/redux-slice/car-slice";
import { Dialog, Tab, Transition, TransitionChild } from "@headlessui/react";
import { motion } from "motion/react"
import ButtonClose from "@/shared/ButtonClose";
import { FaCreditCard, FaMobileAlt } from "react-icons/fa";
import Image from "next/image";
import NcModal from "@/shared/NcModal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import ModalSelectDate from "@/components/ModalSelectDate";
import ModalSelectGuests from "@/components/ModalSelectGuests";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import visaPng from "@/images/vis.png";
import mastercardPng from "@/images/mastercard.svg";
import axios from "axios";
import { useRouter } from "next-nprogress-bar";
import { ICar } from "@/lib/database/models/car.model";

export interface PageAddListing9Props {}

export const paymentOptionsData = {
  mobile:"mobile",
  visa: "visa" ,
  cash: "cash"
  };
  
  export const networkTypes = [
      {
          label: 'mtn',
          logo: "/images/mtn1.png",
          description: 'This property is listed for bookings!',
      },
      {
          label: 'airtel',
          logo: "/airtel_logo.jpg",
          description: 'This property is listed for renting!',
      },
  ]

type PaymentMethod = "mobile" | "visa";

const PageAddListing9: FC<PageAddListing9Props> = () => {
  const dispatch = useAppDispatch();
  const listingData = useAppSelector((state) => state.car.data);
  const router = useRouter();
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(
      new Date("2023/02/06")
    );
    const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }
  
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [network, setNetwork] = useState<"airtel" | "mtn" | "zamtel" | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [cardDetails, setCardDetails] = useState({ name: "", number: "", expiry: "", cvc: "" });

  // Handles selection of a payment method
  const onPaymentMethodSelect = (method: "mobile" | "visa") => {
    setPaymentMethod(method);
    console.log("Selected Payment Method:", method);
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    onPaymentMethodSelect(method);
  };


  const [isSubscribe, setIsSubscribe] = useState(false);
  const [dates, setDates] = useState<number[]>([]);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [manualDays, setManualDays] = useState<number | "">("");
  const [totalCharge, setTotalCharge] = useState<number>(0);

   const handleDispatch = <T extends keyof ICar>(key: T, value: ICar[T]) => {
      dispatch(updateCarField({ key, value }));
    };

    // Handler to dispatch data updates
      const handleIsSubDispatch = <K extends keyof ICar["isSubscription"]>(
          key: K,
          value: ICar["isSubscription"][K]
      ) => {
        dispatch(updateIsSubField({ key, value }));
      };

  // Handle subscription payment
  const handleSubscriptionPayment = async () => {
    if (!isSubscribe) {
      alert("You must enable premium to proceed with payment.");
      return;
    }

    try {
      // Simulate API call or database submission
      /*const response = (paymentMethod === "mobile" ? await axios.post('/api/payment', {
          totalCharge,
          payMethod: paymentMethod,
          network: network?.toLowerCase(),
          mobileNumber,
      }) : await axios.post('/api/payment', {
          totalCharge,
          payMethod: paymentMethod,
          cardDetails,
      }));*/

      if (isSubscribe) {
        alert("Payment successful! Premium subscription enabled.");
        handleIsSubDispatch("isState", true);
        handleIsSubDispatch("date",dates as []);
        router.push("/add-car-listing/10");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Handle manual input for days
  const handleManualDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value, 10);
    if (isNaN(days) || days < 1) {
      setManualDays("");
      setTotalCharge(0);
      setSelectedRange({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      });
    } else {
      setManualDays(days);
      const charge = days * 2.5; // $2.5 per day
      setTotalCharge(charge);

      // Update selected range to match manual days
      setSelectedRange({
        ...selectedRange,
        endDate: new Date(
          selectedRange.startDate.getTime() + (days - 1) * 24 * 60 * 60 * 1000
        ),
      });
    }
  };

  // Handle individual date selection
  const handleDateSelection = (date: Date | null) => {
    if (!date) return;
  
    const newTime = date.getTime();
  
    // Toggle the date in the selected dates array
    const updatedDates = dates.includes(newTime)
      ? dates.filter((item) => item !== newTime)
      : [...dates, newTime];
  
    // Update the selected dates
    setDates(updatedDates);
  
    // Calculate the number of selected dates and total charge
    const totalDays = updatedDates.length;
    const charge = totalDays * 2.5; // $2.5 per day
  
    // Update manualDays and totalCharge
    setManualDays(totalDays);
    setTotalCharge(charge);
  };

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    if (!dates) return;
  
    const [start, end] = dates;
  
    if (!start) {
      setStartDate(null);
      setEndDate(null);
      setDates([]);
      setManualDays(0);
      setTotalCharge(0);
      return;
    }
  
    let updatedDates: number[] = [];
    if (end) {
      let currentDate = new Date(start);
      while (currentDate <= end) {
        updatedDates.push(currentDate.getTime());
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      updatedDates = [start.getTime()];
    }
  
    setStartDate(start);
    setEndDate(end);
    setDates(updatedDates);
  
    const selectedDaysCount = updatedDates.length;
    setManualDays(selectedDaysCount);
    setTotalCharge(selectedDaysCount * 2.5);
  };
  

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Your subscription</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={()=><div>Booking details</div>}
              modalTitle="Booking details"
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
            <ModalSelectDate
              onChangeDate={onChangeDate}
              startDate={startDate}
              endDate={endDate}
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {converSelectedDateToString([startDate, endDate])}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5 gap-1">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      onClick={() => handleMethodSelect("mobile")}
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full flex items-center justify-center focus:outline-none ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : "text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <span className="mr-2.5">Mobile Money</span>
                      <FaMobileAlt size={24} />
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      onClick={() => handleMethodSelect("visa")}
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <span className="mr-2.5">Credit card</span>
                      <Image className="w-8" src={visaPng} alt="visa" />
                      <Image
                        className="w-8"
                        src={mastercardPng}
                        alt="mastercard"
                      />
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                <Label>Select network</Label>
                <h3 className="text-md font-semibold mb-2"></h3>
                <div className="flex gap-2 mb-8">
                  {networkTypes.map((networkOption,i) => (
                    <button
                    key={i}
                    onClick={() => setNetwork(networkOption.label as "airtel" | "mtn" | "zamtel")}
                    className={`flex flex-col items-center justify-center gap-3 py-4 px-6 rounded-2xl border-2 transition-all duration-300 ${
                      network === networkOption.label
                        ? "bg-blue-50 border-blue-500 text-blue-600 shadow-md"
                        : "bg-white border-gray-300 text-gray-700 hover:shadow-lg hover:border-blue-500"
                    }`}
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                      <Image
                        src={networkOption.logo}
                        width={80}
                        height={80}
                        alt={networkOption.label}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-lg font-medium">
                      {networkOption.label.charAt(0).toUpperCase() + networkOption.label.slice(1)}
                    </span>
                  </button>
                  
                  ))}
                </div>
                <div>
                <Label className=" mb-4">{network ? network.charAt(0).toUpperCase() + network.slice(1) :"mobile"} number </Label>
                <Input  defaultValue="111 112 222 999"
                  type="number"
                  disabled={!network} // Explicitly set disabled prop
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="enter number"
                />
                </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input
                      defaultValue="111 112 222 999" 
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input 
                      defaultValue="JOHN DOE" 
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}/>
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input 
                        type="date"
                        defaultValue="MM/YY" 
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input 
                       value={cardDetails.cvc}
                       onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            {/* Total Charge Display */}

            <div className="pt-8">
              <ButtonPrimary onClick={handleSubscriptionPayment}>Confirm and pay (K {totalCharge.toFixed(2)})</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderMotalAmenities = () => {
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <motion.div className="fixed inset-0 bg-black bg-opacity-40" />
            </TransitionChild>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Payment Summary
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                  <div className="w-full rounded-lg mb-5 mt-3 py-4 px-6 bg-neutral-50 dark:bg-neutral-800">
                  <div className="w-full lg:pr-10 ">{renderMain()}</div>
                  </div>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    );
  };
  
  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl font-semibold">
          Want your listing on the front page?
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Enabling premium advertising will feature your property more
          prominently. Allow your listing to get first reactions from your
          clients.
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-4"></div>

      <div className="flex items-center justify-between p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
        <div className="flex items-center">
          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0001 7.88989L10.9301 9.74989C10.6901 10.1599 10.8901 10.4999 11.3601 10.4999H12.6301C13.1101 10.4999 13.3001 10.8399 13.0601 11.2499L12.0001 13.1099"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.30011 18.0399V16.8799C6.00011 15.4899 4.11011 12.7799 4.11011 9.89993C4.11011 4.94993 8.66011 1.06993 13.8001 2.18993C16.0601 2.68993 18.0401 4.18993 19.0701 6.25993C21.1601 10.4599 18.9601 14.9199 15.7301 16.8699V18.0299C15.7301 18.3199 15.8401 18.9899 14.7701 18.9899H9.26011C8.16011 18.9999 8.30011 18.5699 8.30011 18.0399Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium">
              {isSubscribe ? "Enabled" : "Enable Premium"}
            </p>
          </div>
        </div>
        <ToggleSubscribe
          isSubscribe={isSubscribe}
          setIsSubscribe={setIsSubscribe}
        />
      </div>

      {isSubscribe && (
        <>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Set your availability</h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Editing your calendar is easy—just select a date to block or
              unblock it. You can always make changes after you publish.
            </span>
          </div>

          <div className="addListingDatePickerExclude mt-4">
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            monthsShown={2}
            showPopperArrow={false}
            inline
            renderCustomHeader={(p) => (
             <DatePickerCustomHeaderTwoMonth {...p} />
            )}
            renderDayContents={(day, date) => (
            <DatePickerCustomDay
              dayOfMonth={day}
              date={date}
            />
           )}
          />
          </div>
          <div className="mt-4">
            <label
              htmlFor="manualDays"
              className="block text-gray-700 font-medium text-sm"
            >
              Manually Enter Days
            </label>
            <input
              id="manualDays"
              type="number"
              value={manualDays}
              onChange={handleManualDaysChange}
              placeholder="Enter days"
              className="mt-2 p-2 border rounded-xl w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-8">
              <ButtonPrimary onClick={openModalAmenities}>Process payment (K {totalCharge.toFixed(2)})</ButtonPrimary>
          </div>
        </>
      )}
      {renderMotalAmenities()}
    </div>
  );
};

export default PageAddListing9;
