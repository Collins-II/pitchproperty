import React, { FC, useState } from "react";
import SectionAds from "@/app/blog/SectionAds";
import HowItWorks from "@/components/how-it-works";
import SectionGridFeatureCars from "@/components/SectionGridFeatureCars";
import SectionHowItWork from "@/components/SectionHowItWork";
import HIW1img from "@/images/HIW2-1.png";
import HIW2img from "@/images/HIW2-2.png";
import HIW3img from "@/images/HIW2-3.png";
import HIW1imgDark from "@/images/HIW2-1-dark.png";
import HIW2imgDark from "@/images/HIW2-2-dark.png";
import HIW3imgDark from "@/images/HIW2-3-dark.png";
import HeroFilter from "@/app/(web)/_components/_common/hero-filter";
import FeaturesTab from "@/components/FeaturesTab";
import { premiumCarData } from "@/components/FeaturesTab/featuresTabData";
import { OurBrandsSection } from "@/components/our-brands-section";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import AuctionsHero from "../components/auctions-hero";
import getPremiumListings from "@/app/actions/getListings";
import { getAuctionByListing, getLiveBids } from "@/app/actions/getAuctions";
import LiveAuctionsPage from "../components/live-auctions";

export interface AuctionsPageProps {}

const AuctionsPage: FC<AuctionsPageProps> = async () => {
  const data = await getAuctionByListing("Car");
  const properties = await getAuctionByListing("Property");
  const liveBids = await getLiveBids();

  return (
    <div className="container ">
      <AuctionsHero cars={data} properties={properties} />
      {/*<SectionGridFilterCard className="pb-24 lg:pb-28" /> */}

      <LiveAuctionsPage auction={liveBids} />
      
      <div className="relative py-16 mb-24 lg:mb-28">
       <SectionHowItWork
                data={[
                  {
                    id: 1,
                    img: HIW1img,
                    imgDark: HIW1imgDark,
                    title: "Smart search",
                    desc: "Name the area or type of home you are looking for the search bar. Our app will find you the perfect match.",
                  },
                  {
                    id: 2,
                    img: HIW2img,
                    imgDark: HIW2imgDark,
                    title: "Choose property",
                    desc: "From the number of options our app will provide, you can select any property that you like to explore.",
                  },
                  {
                    id: 3,
                    img: HIW3img,
                    imgDark: HIW3imgDark,
                    title: "Book you property",
                    desc: "Find a home or space from our search bar. Enter your specific location, property type and price range.",
                  },
                ]}
              />
              </div>
      <SectionAds />

      <FeaturesTab data={premiumCarData}/> 
        <div className="relative ">
          
         <OurBrandsSection />
        </div>
        {/* SECTION 1 
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
          />
          */}

        {/* SECTION 
        <SectionSubscribe2 className="py-24 lg:py-28" /> */}

        {/* SECTION  */}
        <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>
       
    </div>
  );
};

export default AuctionsPage;
