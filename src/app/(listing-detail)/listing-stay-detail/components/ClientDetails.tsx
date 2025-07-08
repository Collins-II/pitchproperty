"use client";

import React, { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "motion/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "@/components/CommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ButtonClose from "@/shared/ButtonClose";
import Input from "@/shared/Input";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Amenities_demos, PHOTOS } from "../constant";
import StayDatesRangeInput from "../StayDatesRangeInput";
import GuestsInput from "../GuestsInput";
import SectionDateRange from "../../SectionDateRange";
import { Route } from "next";
import StripeButton from "@/components/StripeButton";
import dynamic from "next/dynamic";
import { IProperty } from "@/lib/database/models/property.model";
import { IUser } from "@/lib/database/models/user.model";
import { IoBedOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { getCurrencySymbol } from "@/lib/utils";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/CurrencyStore/store";


export interface DetailPageProps {
    data: IProperty;
    currentUser: IUser;
}


const DynamicMap = dynamic(() => import("../../../../components/MapContainer"), { ssr: false });
const ClientDetailPage: FC<DetailPageProps> = ({data, currentUser}) => {
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const convertPrice = useConvertPrice();
  const reserveFee = 0.05 * Number(data?.price);
  
  const position: [number, number] = [data.map.lat, data.map.lng];
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  const thisPathname = usePathname() ?? "/listing-stay-detail"; // ✅ Ensure fallback value
  const router = useRouter();

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as unknown as Route);
  };

  const renderSection1 = () => {
    return (
      <div className=" space-y-6 bg-white dark:bg-neutral-900 py-6 rounded-xl">
  {/* Top Row - Badge & Like Buttons */}
  <div className="flex justify-between items-center">
    <Badge name="House" className="text-lg font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-full" />
    <LikeSaveBtns />
  </div>

  {/* Title */}
  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
     {data?.title}
  </h2>

  {/* Rating & Location */}
  <div className="flex items-center space-x-3 text-sm md:text-md text-gray-700 dark:text-gray-300">
    <StartRating />
    <span>·</span>
    <span className="flex items-center space-x-1">
      <i className="las la-map-marker-alt text-sm text-gray-500"></i>
      <span className="ml-1 font-medium">{`${data?.address.suburb}, ${data.address.state_district}`}</span>
    </span>
  </div>

  {/* Divider */}
  <div className="w-full border-b border-slate-900 border-[2px] dark:border-gray-700 my-4" />

  {/* Property Details */}
  <div className="flex flex-wrap gap-6 text-md text-gray-700 dark:text-gray-300">
    <div className="flex items-center space-x-3">
      <IoBedOutline size={24} />
      <span>
        <strong>{data?.bedrooms}</strong> <span className="hidden sm:inline-block">Bedrooms</span>
      </span>
    </div>
    <div className="flex items-center space-x-3">
      <LuDoorOpen size={24} />
      <span>
        <strong>{data.bathrooms}</strong> <span className="hidden sm:inline-block">Baths</span>
      </span>
    </div>
    <div className="flex items-center space-x-3">
      <i className="las la-ruler-combined text-2xl text-silverGray"></i>
      <span>
      <strong>{data.propertySize}</strong> 
      <span className=" sm:inline-block">sqm</span>
     </span>
    </div>
  </div>
</div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap bg-white dark:bg-neutral-900 p-6 rounded-xl">
  {/* Title */}
  <h2 className="text-2xl font-semibold text-silverGray">
    Information
  </h2>

  {/* Divider */}
  <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

  {/* Description */}
  <div className="text-gray-700 dark:text-gray-300 space-y-4">
    <p>
      {data.description}
    </p>
  </div>
</div>

    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold text-silverGray">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {Amenities_demos.filter((_, i) => i < 12).map((item) => (
            <div key={item.name} className="flex items-center space-x-3">
              <i className={`text-3xl las ${item.icon}`}></i>
              <span className=" ">{item.name}</span>
            </div>
          ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        <div>
          <ButtonSecondary onClick={openModalAmenities}>
            View more 20 amenities
          </ButtonSecondary>
        </div>
        {renderMotalAmenities()}
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
              <motion.div className="fixed inset-0 bg-black bg-opacity-40" />
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
                      Amenities
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {Amenities_demos.filter((_, i) => i < 1212).map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                      >
                        <i
                          className={`text-4xl text-neutral-6000 las ${item.icon}`}
                        ></i>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Room Rates </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$55,000</span>
            </div>
            <div className="p-4  flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$55,000</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Friday - Sunday</span>
              <span>$219</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Rent by month</span>
              <span>-8.34 %</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Minimum number of nights</span>
              <span>1 night</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Max number of nights</span>
              <span>90 nights</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Host Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              Kevin Francis
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating />
              <span className="mx-2">·</span>
              <span> 12 places</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined in March 2016</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="/author">See host profile</ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold text-silverGray">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold text-silverGray">Map Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {`${data?.address.suburb}, ${data.address.state}`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0">
            <DynamicMap position={position} />
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap bg-white dark:bg-neutral-900 p-6 rounded-xl space-y-6">
  {/* Heading */}
  <h2 className="text-2xl font-semibold text-silverGray">Things to Know</h2>
  <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

  {/* Cancellation Policy */}
  <div>
    <h4 className="text-xl font-semibold text-silverGray">Cancellation Policy</h4>
    <p className="mt-3 text-gray-600 dark:text-gray-300">
      Refund <strong>50%</strong> of the booking value when customers cancel within <strong>48 hours</strong> after a successful booking and at least <strong>14 days</strong> before check-in. <br />
      Cancellations made <strong>less than 14 days</strong> before check-in will receive a <strong>50% refund</strong> (excluding service fees).
    </p>
  </div>
  <div className="w-16 border-b border-gray-300 dark:border-gray-700" />

  {/* Check-in & Check-out Times */}
  <div>
    <h4 className="text-xl font-semibold text-silverGray">Check-in & Check-out</h4>
    <div className="mt-3 text-gray-600 dark:text-gray-300 max-w-md text-base">
      <div className="flex justify-between p-3 bg-blue-100 dark:bg-blue-800 rounded-lg">
        <span className="font-medium">Weekdays Schedule</span>
        <span>08:00 AM - 04:00 PM</span>
      </div>
      <div className="flex justify-between p-3">
        <span className="font-medium">Saturday Schedule</span>
        <span>08:00 AM - 12:00 PM</span>
      </div>
    </div>
  </div>
  <div className="w-16 border-b border-gray-300 dark:border-gray-700" />

  {/* Special Notes */}
  <div>
    <h4 className="text-xl font-semibold text-silverGray">📢 Special Notes</h4>
    <ul className="mt-3 text-gray-600 dark:text-gray-300 space-y-2 list-disc pl-5">
      <li>Guests are encouraged to keep Kingsland City clean by avoiding littering and respecting the environment.</li>
      <li>Strictly no use of stimulants or illegal substances within the premises.</li>
      <li>No karaoke or loud music after <strong>11:30 PM</strong> to ensure a peaceful atmosphere.</li>
    </ul>
  </div>
</div>

    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl p-6 rounded-2xl bg-white dark:bg-gray-900">
        {/* Booking Form */}
   {data?.listingType === "Property" && data.listingCategory === "RENT" && (    
  <form className="flex flex-col gap-4 border border-neutral-200 dark:border-neutral-700 rounded-xl mt-4 p-4">
    <StayDatesRangeInput className="flex-1 z-[11]" />
    <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
    <GuestsInput className="flex-1" />
  </form>
  )} 
  
  {/* Price & Rating */}
  <div className="flex justify-between items-center border-b pb-4 border-neutral-200 dark:border-neutral-700">
    <div>
      <span className="text-3xl font-bold text-slate-900">
        {getCurrencySymbol(selectedCurrency)} {formatNumberWithCommas(convertPrice(Number(data.price)))}
      </span>
      <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
    </div>
    <StartRating />
  </div>


  {/* Payment Breakdown */}
  <div className="flex flex-col gap-3 mt-6 text-sm text-gray-700 dark:text-gray-300">
    <div className="flex justify-between">
      <span>Base Price</span>
      <span>{getCurrencySymbol(selectedCurrency)} {formatNumberWithCommas(convertPrice(Number(data.price)))}</span>
    </div>
    <div className="flex justify-between">
      <span>Taxes & Fees</span>
      <span>$5,000</span>
    </div>
    <div className="border-b border-neutral-200 dark:border-neutral-700 my-2"></div>
    <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
      <span>Reservation Fee</span>
      <span>{getCurrencySymbol(selectedCurrency)} {formatNumberWithCommas(convertPrice(Number(reserveFee)))}</span>
    </div>
  </div>

  {/* Payment Button */}
  <div className="mt-6">
    <StripeButton price={Number(convertPrice(reserveFee))} />
  </div>
</div>

    );
  };

  return (
    <div className="nc-ListingStayDetailPage">
      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
             <Image
               fill
               src={data?.galleryImgs[0]}
               unoptimized
               alt="Featured image"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
               className="object-cover rounded-md sm:rounded-xl"
             />

            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {data?.galleryImgs
  ?.filter((_, i) => i >= 1 && i < 5)
  .map((item, index) => (
    <div
      key={index}
      className={`relative rounded-md sm:rounded-xl overflow-hidden ${
        index >= 3 ? "hidden sm:block" : ""
      }`}
    >
      <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5 relative">
        {item && (
          <Image
            fill
            src={item}
            unoptimized
            alt={`Gallery image ${index + 1}`}
            sizes="400px"
            className="object-cover rounded-md sm:rounded-xl"
          />
        )}
      </div>
      <div
        className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={handleOpenModalImageGallery}
      />
    </div>
    ))}

          <button
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSection6()}
          {renderSection7()}
          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default ClientDetailPage;
