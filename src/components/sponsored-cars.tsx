"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type SponsoredCar = {
  id: number;
  name: string;
  price: string;
  image: string;
  location: string;
  isForRent: boolean;
};

const sponsoredCars: SponsoredCar[] = [
  {
    id: 1,
    name: "2022 Lamborghini Huracán EVO",
    price: "$280,000",
    image: "https://cdn.motor1.com/images/mgl/BE33m/s3/lamborghini-huracan-evo-rwd.jpg",
    location: "Los Angeles, CA",
    isForRent: false,
  },
  {
    id: 2,
    name: "2021 Audi R8 Spyder",
    price: "$150/day",
    image: "https://cdn.motor1.com/images/mgl/W3gBv/s3/2021-audi-r8-spyder.jpg",
    location: "Miami, FL",
    isForRent: true,
  },
  {
    id: 3,
    name: "2023 Porsche 911 Carrera S",
    price: "$120,000",
    image: "https://cdn.motor1.com/images/mgl/xNkkY/s3/porsche-911-carrera-s.jpg",
    location: "New York, NY",
    isForRent: false,
  },
];

export default function SponsoredCarsSection() {
  return (
    <section className="py-12 px-4 md:px-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">🔥 Sponsored Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsoredCars.map((car) => (
          <div
            key={car.id}
            className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <Image
              src={car.image}
              alt={car.name}
              width={500}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="text-gray-500">{car.location}</p>
              <p className="text-lg font-bold text-blue-600">{car.price}</p>
              <Button className="w-full mt-2">{car.isForRent ? "Rent Now" : "Buy Now"}</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
