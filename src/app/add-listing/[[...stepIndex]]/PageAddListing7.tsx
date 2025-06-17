
import CoverUpload from "@/components/inputs/CoverUpload";
import ImageUpload from "@/components/inputs/ImageUpload";
import { StayDataType } from "@/data/types";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { updateListingData } from "@/lib/redux-slice/property-slice";
import React, { FC } from "react";
import { useDispatch } from "react-redux";

export interface PageAddListing7Props {
}

const PageAddListing7: FC<PageAddListing7Props> = () => {
  const listingData = useAppSelector((state) => state.property.data);
  const dispatch = useDispatch();

  const featuredImg = listingData.featuredImage;
  const galleryImgs = listingData.galleryImgs;

  // Handler to dispatch data updates
  const handleDispatch = <T extends keyof StayDataType>(key: T, value: StayDataType[T]) => {
      dispatch(updateListingData({ key, value }));
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Pictures of the place</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          A few beautiful photos will help customers have more sympathy for your
          property.
        </span>
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        <div>
          <span className="text-lg font-semibold">Cover image</span>
          <div className="mt-5 "> 
            <CoverUpload
              onChange={(value) => handleDispatch('featuredImage', value)}
              value={featuredImg as string}
              maxFiles={1}
            />
          </div>
        </div>
        {/* ----------------- */}
        <div>
          <span className="text-lg font-semibold">Pictures of the place</span>
          <div className="mt-5 ">  
                <ImageUpload
                  onChange={(value) => handleDispatch('galleryImgs', value as string[])}
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
