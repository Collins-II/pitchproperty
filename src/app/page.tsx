import React from "react";
import SectionHero from "@/app/(server-components)/SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { TaxonomyType } from "@/data/types";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionHowItWork from "@/components/SectionHowItWork";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor";
import SectionVideos from "@/components/SectionVideos";
import SectionClientSay from "@/components/SectionClientSay";
import rightImgPng from "@/images/our-features-2.png";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Video from "@/components/Video";
import Brands from "@/components/Brands";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import FunFact from "@/components/FunFact";
import CTA from "@/components/CTA";
import FeaturesTab from "@/components/FeaturesTab";
import SectionDowloadApp from "./(home)/SectionDowloadApp";
import PropertyVideo from "@/components/Video";
import SectionGridFeatureCar from "@/components/SectionGridFeatureCars";
import SectionGridFeatureCars from "@/components/SectionGridFeatureCars";
import { featuresTabData } from "@/components/FeaturesTab/featuresTabData";
import { FeaturesSection } from "@/components/features-section";
import SectionAds from "./blog/SectionAds";
import ctaEstImg from "@/images/HIW2.png";
import AuctionTab from "@/components/AuctionTab";
import { getAllAuctions } from "./actions/getAuctions";

async function PageHome() {
  const auctions = await getAllAuctions();

  return (
    <main className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-12 mb-24 lg:space-y-18 lg:mb-28">
        {/* SECTION HERO */}
        <ScrollUp />
        <Hero />
        {/*
        <SectionHero2 className="" />
        <SectionHero className="pt-10 lg:pt-16" />

         SECTION 1 
        <SectionSliderNewCategories categories={DEMO_CATS} />
        

        <SectionOurFeatures type="type2" rightImg={rightImgPng} />
        */}

        <CTA
          title="Find Your Ride, Your Way"
          subtitle="Rent or buy your next car with ease and confidence. Great prices. Trusted dealers."
          imageSrc="/images/hero-car.png"
        />

        {/* SECTION 1 
        <SectionHowItWork />
        
     <FeaturesSection /> */}

  {/*
        <SectionSubscribe2 />
       SECTION 1 
        <div className="relative ">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>

        <SectionGridCategoryBox />

        <div className="relative ">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>
        

        <SectionSliderNewCategories
          heading="Explore by types of properties"
          subHeading="Explore houses based on 10 types of properties"
          categoryCardType="card5"
          itemPerRow={5}
        />*/}
      
  
        {/*<AboutSectionOne />

        <FunFact />*/}
        {auctions.length > 0 && (
        <AuctionTab data={auctions} />
        )}

        <CTA
          title="Invest & Secure Your Future"
          subtitle="Your dream home or investment awaits—start building your legacy today."
          imageSrc={ctaEstImg}
        />

        <FeaturesTab data={featuresTabData}/>  

        <SectionAds />
        {/*<Blog /> */}
        <Contact />
      </div>
    </main>
  );
}

export default PageHome;
