"use client";

import React, { FC } from "react";
import CoverUpload from "@/components/inputs/CoverUpload";
import ImageUpload from "@/components/inputs/ImageUpload";
import { ICar } from "@/lib/database/models/car.model"; // ✅ Correct import
import { updateCarField } from "@/lib/redux-slice/car-slice"; // ✅ Only using car slice
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { useDispatch } from "react-redux";

interface PageAddListing7Props {}

const PageAddListing7: FC<PageAddListing7Props> = () => {
  const listingData = useAppSelector((state) => state.car.data); // ✅ Use correct slice
  const dispatch = useDispatch();

  const featuredImg = listingData.featuredImage;
  const galleryImgs = listingData.galleryImgs;

  const handleDispatch = <K extends keyof ICar>(key: K, value: ICar[K]) => {
    dispatch(updateCarField({ key, value }));
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Pictures of the car</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Upload a stunning cover image and gallery to attract more buyers.
        </span>
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-4" />

      {/* FORM */}
      <div className="space-y-8">
        {/* Cover Image */}
        <div>
          <span className="text-lg font-semibold">Cover Image</span>
          <div className="mt-4">
            <CoverUpload
              onChange={(value) => handleDispatch("featuredImage", value)}
              value={featuredImg as string}
              maxFiles={1}
            />
          </div>
        </div>

        {/* Gallery Images */}
        <div>
          <span className="text-lg font-semibold">Gallery Images</span>
          <div className="mt-4">
            <ImageUpload
              onChange={(value) =>
                handleDispatch("galleryImgs", value as string[])
              }
              value={galleryImgs as string[]}
              maxFiles={20}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAddListing7;
