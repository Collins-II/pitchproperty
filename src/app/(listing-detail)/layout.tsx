"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { ReactNode, Suspense, useState } from "react";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import MobileFooterSticky from "./(components)/MobileFooterSticky";
import PaymentModal from "@/shared/paymentModal"; // Import the new modal
import { imageGallery as listingStayImageGallery } from "./listing-stay-detail/constant";
import { imageGallery as listingCarImageGallery } from "./listing-car-detail/constant";
import { Route } from "next";
import { TaxonomyType } from "@/data/types";

import imgPng1 from "@/images/ests/est_1.jpg";
import imgPng2 from "@/images/ests/est_2.jpg";
import imgPng3 from "@/images/ests/est_3.jpg";
import imgPng4 from "@/images/ests/est_4.jpg";
import imgPng5 from "@/images/ests/est_5.jpg";
import imgPng6 from "@/images/ests/est_6.jpg";
import imgPng7 from "@/images/ests/est-7.jpg";
import { imageGallery } from "./listing-car-detail/constant";

const DEMO_CATS: TaxonomyType[] = [
  { id: "1", href: "/listing-stay-map" as Route, name: "Lusaka", taxonomy: "category", count: 188288, thumbnail: imgPng1 as any },
  { id: "2", href: "/listing-stay-map" as Route, name: "Kafue", taxonomy: "category", count: 188288, thumbnail: imgPng2 as any },
  { id: "3", href: "/listing-stay-map" as Route, name: "Chingola", taxonomy: "category", count: 188288, thumbnail: imgPng3 as any },
  { id: "4", href: "/listing-stay-map" as Route, name: "Mansa", taxonomy: "category", count: 188288, thumbnail: imgPng4 as any },
  { id: "5", href: "/listing-stay-map" as Route, name: "Livingstone", taxonomy: "category", count: 188288, thumbnail: imgPng5 as any },
  { id: "6", href: "/listing-stay-map" as Route, name: "Kitwe", taxonomy: "category", count: 188288, thumbnail: imgPng6 as any },
  { id: "7", href: "/listing-stay-map" as Route, name: "Ndola", taxonomy: "category", count: 188288, thumbnail: imgPng7 as any },
];

const DetailtLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const thisPathname = usePathname() ?? "";
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  return (
    <div className="ListingDetailPage">
      {/* Suspense to handle useSearchParams */}
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsHandler thisPathname={thisPathname} router={router} />
      </Suspense>

      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
        <SectionSliderNewCategories
          categories={DEMO_CATS}
          categoryCardType="card5"
          itemPerRow={5}
          heading="Properties to explore"
          subHeading="Popular properties that Kingsland City recommends for you"
          sliderStyle="style2"
        />
      </div>

      {/* PAYMENT MODAL 
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} /> */}

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

// Extracted SearchParamsHandler
const SearchParamsHandler = ({ thisPathname, router }: { thisPathname: string; router: ReturnType<typeof useRouter> }) => {
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(window.location.search);
    params.delete("modal");
    router.push(`${thisPathname}?${params.toString()}` as unknown as Route);
  };

  return (
    <ListingImageGallery
      isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
      onClose={handleCloseModalImageGallery}
      images={thisPathname.includes("/listing-stay-detail") ? listingStayImageGallery : listingCarImageGallery}
    />
  );
};

export default DetailtLayout;
