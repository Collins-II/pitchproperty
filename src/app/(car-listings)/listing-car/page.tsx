import React, { FC, useState } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";
import { FeaturesSection } from "@/components/features-section";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import carImage from "@/images/hero-right-car.png";
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
import { getCarPremium } from "@/app/actions/getCarPremiums";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionHeroArchivePage from "@/app/(server-components)/SectionHeroArchivePage";
import AuthorSlider from "@/components/AuthorSlider";
import { getCarLocations, getPropertiesGroupedByDistrict } from "@/app/actions/getLocations";

export interface ListingCarPageProps {}

const ListingCarPage: FC<ListingCarPageProps> = async () => {
  const data = await getCarPremium();
  const propertyData = await getPropertiesGroupedByDistrict();
  const carData = await getCarLocations();

  return (
    <div className="container space-y-8 mb-8 lg:space-y-12 lg:mb-12">
        <SectionHeroArchivePage
          //rightImage={heroRightImage}
          currentPage="Sale"
          currentTab="Sale"
          /*listingType={
            <>
              <i className="text-2xl las la-car"></i>
              <span className="ml-2.5">1512 cars</span>
            </>
          }*/
        />
     
      {/*<SectionGridFilterCard className="pb-24 lg:pb-28" /> */}
       <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
          propertyData={propertyData}
          carData={carData}
        />
      
      <div className="relative py-16">
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
      <SectionGridFeatureCars cardType="card2" carListings={data} />
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
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox boxCard="box2" />
          <AuthorSlider boxCard="box2" />
        </div>
       
    </div>
  );
};

export default ListingCarPage;
