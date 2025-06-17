"use client";
import React, { FC, Fragment, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux-slice/hooks";
import { updateListingData } from "@/lib/redux-slice/property-slice";
import { Dialog, Tab, Transition } from "@headlessui/react";
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
import { DialogOverlay } from "@radix-ui/react-dialog";

export interface PayGatewayProps {}

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

const PayGateway = ({}: PayGatewayProps) => {
  const dispatch = useAppDispatch();
  const listingData = useAppSelector((state) => state.property.data);
  const router = useRouter();
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

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
    
       const handleDispatch = (key: any, value: any) => {
          dispatch(updateListingData({ key, value }));
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
            handleDispatch("premiumSubscription", true);
            handleDispatch("premiumDates",dates );
            router.push("/add-listing/10");
          } else {
            alert("Payment failed. Please try again.");
          }
        } catch (error) {
          console.error("Error processing payment:", error);
          alert("An error occurred. Please try again.");
        }
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
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <DialogOverlay className="fixed inset-0 bg-black bg-opacity-40" />
                </Transition.Child>
    
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
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
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        );
      };
      

    return (
    renderMotalAmenities()
    )
};

export default PayGateway