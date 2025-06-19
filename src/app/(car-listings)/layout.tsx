import BgGlassmorphism from "@/components/BgGlassmorphism";
import React, { ReactNode } from "react";
import SectionHeroArchivePage from "../(server-components)/SectionHeroArchivePage";
import heroRightImage from "@/images/hero-right-car.png";
import BackgroundSection from "@/components/BackgroundSection";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import { OurBrandsSection } from "@/components/our-brands-section";
import SponsoredCarsSection from "@/components/sponsored-cars";
import FeaturesTab from "@/components/FeaturesTab";
import { premiumCarData } from "@/components/FeaturesTab/featuresTabData";
import { FeaturesSection } from "@/components/features-section";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingCarMapPage relative `}>
      <BgGlassmorphism />

      {/* SECTION */}
      {children}

    </div>
  );
};

export default Layout;
