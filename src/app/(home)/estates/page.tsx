import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import React from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import SectionHowItWork from "@/components/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection";
import { TaxonomyType } from "@/data/types";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
//
import logo1 from "@/images/logos/nomal/1.png";
import logo1Dark from "@/images/logos/dark/1.png";
//
import logo2 from "@/images/logos/nomal/2.png";
import logo2Dark from "@/images/logos/dark/2.png";
//
import logo3 from "@/images/logos/nomal/3.png";
import logo3Dark from "@/images/logos/dark/3.png";
//
import logo4 from "@/images/logos/nomal/4.png";
import logo4Dark from "@/images/logos/dark/4.png";
//
import logo5 from "@/images/logos/nomal/5.png";
import logo5Dark from "@/images/logos/dark/5.png";
//


import SectionGridFeatureProperty from "../SectionGridFeatureProperty";
import SectionDowloadApp from "../SectionDowloadApp";
import SectionHero2 from "@/app/(server-components)/SectionHero2";
import Image from "next/image";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionAds from "@/app/blog/SectionAds";
import getPremiumListings from "@/app/actions/getListings";
import FeaturesTab from "@/components/FeaturesTab";
import { featuresTabData } from "@/components/FeaturesTab/featuresTabData";
import AuthorSlider from "@/components/AuthorSlider";

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/",
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "6",
    href: "/",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "7",
    href: "/",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

async function PageHome2() {  
  const dataList = await getPremiumListings();
  console.log("P__Prop",dataList)

  return (
    <main className="nc-PageHome2 relative overflow-hidden">
      <div className="container relative space-y-8 mb-8 lg:space-y-12 lg:mb-12">
        <SectionHero2 className="" />

        <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
        />

       {/* <div className="ncSectionLogos grid grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-16">
          <div className="flex items-end justify-center">
            <Image className="block dark:hidden" src={logo1} alt="logo1" />
            <Image className="hidden dark:block" src={logo1Dark} alt="logo1" />
          </div>
          <div className="flex items-end justify-center">
            <Image className="block dark:hidden" src={logo4} alt="logo4" />
            <Image className="hidden dark:block" src={logo4Dark} alt="logo4" />
          </div>
          <div className="flex items-end justify-center">
            <Image className="block dark:hidden" src={logo2} alt="logo2" />
            <Image className="hidden dark:block" src={logo2Dark} alt="logo2" />
          </div>
          <div className="flex items-end justify-center">
            <Image className="block dark:hidden" src={logo3} alt="logo3" />
            <Image className="hidden dark:block" src={logo3Dark} alt="logo3" />
          </div>

          <div className="flex items-end justify-center">
            <Image className="block dark:hidden" src={logo5} alt="logo5" />
            <Image className="hidden dark:block" src={logo5Dark} alt="logo5" />
          </div>
        </div>
         */}

        
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeatureProperty />
        </div>*/}

        <SectionGridFeaturePlaces cardType="card2" stayListings={dataList} />

         {/*<SectionOurFeatures type="type2" rightImg={rightImgPng} />

       <SectionDowloadApp /> 

        <SectionSliderNewCategories
          categories={DEMO_CATS_2}
          categoryCardType="card4"
          itemPerRow={4}
          heading="Suggestions for discovery"
          subHeading="Popular places to stay that Chisfis recommends for you"
        /> */}
        <FeaturesTab data={featuresTabData}/>
        
        <div className="relative py-16">
          <BackgroundSection className="bg-neutral-100 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox boxCard="box2" />
          <AuthorSlider boxCard="box2" />
        </div>

       {/* <SectionSubscribe2 /> */}
      </div>
    </main>
  );
}

export default PageHome2;
