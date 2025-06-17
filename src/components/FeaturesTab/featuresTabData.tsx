import imgPng1 from "@/images/ests/est_1.jpg";
import imgPng2 from "@/images/ests/est_2.jpg";
import imgPng3 from "@/images/ests/est_3.jpg";
import imgPng4 from "@/images/ests/est_4.jpg";
import imgPng5 from "@/images/ests/est_5.jpg";
import imgPng6 from "@/images/ests/est_6.jpg";
import imgPng7 from "@/images/ests/est-7.jpg";

import { imageGallery as listingCarImageGallery } from "../../app/(listing-detail)/listing-car-detail/constant";

const featuresTabData = [
  {
    id: "tabOne",
    name: "The Executive Villa",
    thumbnail: imgPng3,
    packageSubscription: "Executive",
    type: "5-Bedroom Ultra-Luxury Villa",
    features: [
      "Private swimming pool",
      "Garden",
      "Rooftop terrace",
      "Smart home system",
      "24/7 concierge",
    ],
    amenitiesIncluded: [
      "Access to Golf Course & Clubhouse",
      "Spa & Wellness Center (monthly massage & wellness package)",
      "Gym & Fitness Classes (unlimited access)",
      "Private Parking & Security Services",
      "Exclusive Dining & Lounge Privileges",
      "Free Transportation Shuttle within the estate",
      "Annual Property Maintenance Included",
    ],
    paymentPackages: {
      monthly: 6500,
      yearly: 75000,
      yearlyDiscount: 3000,
    },
  },
  {
    id: "tabTwo",
    name: "The Prestige Townhouse",
    thumbnail: imgPng1,
    packageSubscription: "Prestige",
    type: "3-Bedroom Modern Townhouse",
    features: [
      "Open-plan living",
      "Private balcony",
      "Smart security system",
    ],
    amenitiesIncluded: [
      "Access to Clubhouse & Restaurant Discounts",
      "Gym & Swimming Pool Access",
      "Children’s Play Area & Community Park",
      "Security & Maintenance Services",
      "Golf Course (Limited Access – 5 rounds per month)",
      "Tennis & Squash Court Membership",
    ],
    paymentPackages: {
      monthly: 4200,
      yearly: 48000,
      yearlyDiscount: 2400,
    },
  },
  {
    id: "tabThree",
    name: "The Deluxe Apartment",
    thumbnail: imgPng5,
    packageSubscription: "Apartment",
    type: "2-Bedroom Luxury Apartment",
    features: [
      "Fully furnished",
      "High-speed internet",
      "Balcony with city views",
    ],
    amenitiesIncluded: [
      "Gym & Pool Access",
      "24/7 Security & Concierge",
      "Discounted Spa & Wellness Packages",
      "Retail & Dining Privileges",
      "Community Events & Social Gatherings",
    ],
    paymentPackages: {
      monthly: 2800,
      yearly: 31000,
      yearlyDiscount: 1600,
    },
  },
];

const additionalAddOns = [
  { name: "Personal Chauffeur Service", price: 500, frequency: "monthly" },
  { name: "Golf Course Unlimited Access", price: 1000, frequency: "monthly" },
  { name: "Private Chef Services", price: 800, frequency: "monthly" },
];

const premiumCarData = [
  {
    id: "tabOne",
    name: "Lamborghini Huracán EVO",
    thumbnail: listingCarImageGallery[0].url,
    packageSubscription: "Supercar Elite",
    type: "2022 Lamborghini Huracán EVO V10",
    features: [
      "Naturally aspirated V10",
      "Carbon-ceramic brakes",
      "Premium Alcantara interior",
      "Advanced navigation & HUD",
    ],
    amenitiesIncluded: [
      "Track-day access (4 sessions/year)",
      "Concierge fueling & detailing",
      "Priority service appointments",
      "Insurance & maintenance package",
      "Complimentary luxury rental (1 week/year)",
    ],
    paymentPackages: {
      daily: 1800,
      monthly: 11000,
      yearly: 95000,
      yearlyDiscount: 5000,
    },
  },
  {
    id: "tabTwo",
    name: "Porsche Taycan Turbo S",
    thumbnail: listingCarImageGallery[4].url,
    packageSubscription: "Electric Prestige",
    type: "2023 Porsche Taycan Turbo S EV",
    features: [
      "Dual-motor all-wheel drive",
      "Custom sport chrono package",
      "Panoramic sunroof",
      "Adaptive cruise & lane assist",
    ],
    amenitiesIncluded: [
      "Free home EV charger installation",
      "Unlimited Supercharging (12 months)",
      "Annual software upgrade & tuning",
      "VIP Porsche Experience access",
      "Priority valet pickup & drop-off",
    ],
    paymentPackages: {
      daily: 1200,
      monthly: 7000,
      yearly: 65000,
      yearlyDiscount: 3000,
    },
  },
  {
    id: "tabThree",
    name: "Mercedes-AMG G63",
    thumbnail: listingCarImageGallery[7].url,
    packageSubscription: "Luxury SUV Plus",
    type: "2023 Mercedes-Benz G63 AMG",
    features: [
      "Handcrafted V8 Biturbo",
      "Luxury leather interior",
      "Off-road mode",
      "360° camera & surround sound",
    ],
    amenitiesIncluded: [
      "24/7 roadside concierge",
      "Quarterly detailing & ceramic coating",
      "Airport valet service",
      "Annual maintenance & inspection",
      "Complimentary SUV swap (2x/year)",
    ],
    paymentPackages: {
      daily: 900,
      monthly: 5400,
      yearly: 52000,
      yearlyDiscount: 2500,
    },
  },
];

const carAddOns = [
  { name: "Professional Chauffeur Service", price: 400, frequency: "daily" },
  { name: "Track Day Coaching", price: 800, frequency: "session" },
  { name: "Custom Wrap & Styling Package", price: 3000, frequency: "one-time" },
];

export { premiumCarData, carAddOns };


export { featuresTabData, additionalAddOns };
