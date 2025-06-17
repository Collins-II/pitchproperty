import React from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import BackgroundSection from "@/components/BackgroundSection";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { TaxonomyType } from "@/data/types";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox";
import SectionHero3 from "@/app/(server-components)/SectionHero3";
import CardCategory6 from "@/components/CardCategory6";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import { FaCar, FaHandshake, FaSearch, FaUsers } from "react-icons/fa";
import Button from "@/shared/Button";
import Input from "@/shared/Input";
import getPremiumListings from "@/app/actions/getListings";

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
    id: "222",
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
];

async function PageHome3() {
  const data = await getPremiumListings();

  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container px-1 sm:px-4 mb-24 ">
        <SectionHero3 className="" />
      </div>

      {/* Hero Section */}
      <header className="relative h-[500px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="text-center text-white p-6 bg-black/50 rounded-xl">
          <h1 className="text-4xl font-bold">Find Your Dream Car</h1>
          <p className="mt-2 text-lg">Buy or rent top-quality cars from trusted users</p>
          <div className="mt-4 flex items-center gap-2">
            <Input placeholder="Search for cars..." className="w-80" />
            <Button><FaSearch /></Button>
          </div>
        </div>
      </header>

      <div className="container relative space-y-24 mb-24 ">
        {/* SECTION 1 */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <CardCategory6 taxonomy={DEMO_CATS_2[0]} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
            <CardCategory6 taxonomy={DEMO_CATS_2[3]} />
            <CardCategory6 taxonomy={DEMO_CATS_2[1]} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <CardCategory6 taxonomy={DEMO_CATS_2[4]} />
          </div>
        </div>

        {/* SECTION */}
        <SectionGridCategoryBox />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridAuthorBox boxCard="box2" />
        </div>

        <SectionGridFeaturePlaces stayListings={data}/>

      {/* Call to Action */}
      <section className="py-12 text-center bg-blue-600 text-white">
        <h2 className="text-3xl font-semibold">Ready to Buy or Rent?</h2>
        <p className="mt-2">Sign up today and start exploring the best car deals.</p>
        <Button className="mt-4 bg-white text-blue-600">Get Started</Button>
      </section>

        {/* SECTION */}
        <SectionSubscribe2 />
      </div>
    </main>
  );
}

export default PageHome3;
