"use client";

import React from "react";
import { FC } from "react";
import { useAppSelector } from "../../../lib/redux-slice/hooks";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { Route } from "@/routers/types";
import { useDispatch } from "react-redux";
import { resetListingData } from "@/lib/redux-slice/property-slice";
import axios from "axios";
import { useSession } from "next-auth/react";

const CommonLayout = ({
  params: paramsPromise, // ✅ params is a Promise now
  children,
}: {
  params: Promise<{ stepIndex?: string }>; // ✅ Corrected type
  children: React.ReactNode;
}) => {
  const [params, setParams] = React.useState<{ stepIndex?: string }>({});

  React.useEffect(() => {
    paramsPromise.then(setParams); // ✅ Unwrap params using useEffect
  }, [paramsPromise]);

  const index = Number(params?.stepIndex ?? "1"); // ✅ Ensure stepIndex is a valid number
  const listingData = useAppSelector((state) => state.property.data);
  const dispatch = useDispatch();
  const session = useSession();
  const { data: user } = session;
  const email = user?.user?.email;

  const onSubmit = async () => {
    try {
      // Send a POST request to the API endpoint
      const response = await axios.post("/api/listings/property", {...listingData, email});
  
      if (response.data) {
        alert("Listing published successfully!");
        dispatch(resetListingData()); // Reset form state after submission
      } else {
        alert("Failed to publish listing. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  const nextHref = (
    index < 10 ? `/add-listing/${index + 1}` : undefined // No href for step 10
  ) as Route;

  const backtHref = (
    index > 1 ? `/add-listing/${index - 1}` : `/add-listing/1`
  ) as Route;

  const nextBtnText = index === 10 ? "Publish listing" : "Continue";

  const handleNextClick = () => {

      onSubmit(); // Trigger submission logic
  };

  return (
    <div className="nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32 showed-scroll-bar">
      <div className="space-y-11">
        <div>
          <span className="text-4xl font-semibold">{index}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 10
          </span>
        </div>

        <div className="listingSection__wrap">{children}</div>

        <div className="flex justify-end space-x-5">
          {index > 1 && ( <ButtonSecondary href={backtHref}>Go back</ButtonSecondary> )}
          {index === 10 ? (
            <ButtonPrimary onClick={handleNextClick}>
              {nextBtnText || "Continue"}
            </ButtonPrimary>
          ) : (
            <ButtonPrimary href={nextHref}>{nextBtnText || "Continue"}</ButtonPrimary>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
