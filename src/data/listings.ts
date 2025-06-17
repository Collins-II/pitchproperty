import __stayListing from "./jsons/__stayListing.json";
import __carsListing from "./jsons/__carsListing.json";
import __experiencesListing from "./jsons/__experiencesListing.json";
import {
  DEMO_STAY_CATEGORIES,
  DEMO_EXPERIENCES_CATEGORIES,
} from "./taxonomies";
import { CarDataType, ExperiencesDataType, StayDataType } from "./types";
import { DEMO_AUTHORS } from "./authors";
import car1 from "@/images/cars/1.png";
import car2 from "@/images/cars/2.png";
import car3 from "@/images/cars/3.png";
import car4 from "@/images/cars/4.png";
import car5 from "@/images/cars/5.png";
import car6 from "@/images/cars/6.png";
import car7 from "@/images/cars/7.png";
import car8 from "@/images/cars/8.png";
import car9 from "@/images/cars/9.png";
import car10 from "@/images/cars/10.png";
import car11 from "@/images/cars/11.png";
import car12 from "@/images/cars/12.png";
import car13 from "@/images/cars/13.png";
import car14 from "@/images/cars/14.png";
import car15 from "@/images/cars/15.png";
import car16 from "@/images/cars/16.png";
import { Route } from "@/routers/types";
const carsImgs = [
  car1,
  car2,
  car3,
  car4,
  car5,
  car6,
  car7,
  car8,
  car9,
  car10,
  car11,
  car12,
  car13,
  car14,
  car15,
  car16,
];

const DEMO_STAY_LISTINGS = __stayListing.map((post, index): any => {
  //  ##########  GET CATEGORY BY CAT ID ######## //
  const category = DEMO_STAY_CATEGORIES.filter(
    (taxonomy) => taxonomy.id === post.listingCategoryId
  )[0];

  return {
    ...post,
    id: `stayListing_${index}_`,
    saleOff: !index ? "-20% today" : post.saleOff,
    isAds: !index ? true : post.isAds,
    author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
    listingCategory: "",
    href: post.href as Route,
  };
});

const DEMO_EXPERIENCES_LISTINGS = __experiencesListing.map(
  (post, index): ExperiencesDataType => {
    //  ##########  GET CATEGORY BY CAT ID ######## //
    const category = DEMO_EXPERIENCES_CATEGORIES.filter(
      (taxonomy) => taxonomy.id === post.listingCategoryId
    )[0];

    return {
      ...post,
      id: `experiencesListing_${index}_`,
      saleOff: !index ? "-20% today" : post.saleOff,
      isAds: !index ? true : post.isAds,
      author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
      listingCategory: category,
      href: post.href as Route,
    };
  }
);

const DEMO_CAR_LISTINGS = __carsListing.map((post, index): any => {
  //  ##########  GET CATEGORY BY CAT ID ######## //
  const category = DEMO_EXPERIENCES_CATEGORIES.filter(
    (taxonomy) => taxonomy.id === post.listingCategoryId
  )[0];

  return {
    ...post,
    id: `carsListing_${index}_`,
    saleOff: !index ? "-20% today" : post.saleOff,
    isAds: !index ? true : post.isAds,
    author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
    listingCategory: category,
    featuredImage: carsImgs[index],
    href: post.href as Route,
  };
});

const amenities = [
  {
    category: "General amenities",
    items: [
      { label: "Wifi", name: "Wifi", defaultChecked: true },
      { label: "Internet", name: "Internet" },
      { label: "TV", name: "TV", defaultChecked: true },
      { label: "Air conditioning", name: "Air conditioning" },
      { label: "Fan", name: "Fan" },
      { label: "Private entrance", name: "Private entrance" },
      { label: "Dryer", name: "Dryer", defaultChecked: true },
      { label: "Heater", name: "Heater" },
      { label: "Washing machine", name: "Washing machine" },
      { label: "Detergent", name: "Detergent", defaultChecked: true },
      { label: "Clothes dryer", name: "Clothes dryer" },
      { label: "Baby cot", name: "Baby cot" },
      { label: "Desk", name: "Desk", defaultChecked: true },
      { label: "Fridge", name: "Fridge" },
    ],
  },
  {
    category: "Other amenities",
    items: [
      { label: "Wardrobe", name: "Wardrobe", defaultChecked: true },
      { label: "Cloth hook", name: "Cloth hook" },
      { label: "Extra cushion", name: "Extra cushion", defaultChecked: true },
      { label: "Gas stove", name: "Gas stove" },
      { label: "Toilet paper", name: "Toilet paper" },
      { label: "Free toiletries", name: "Free toiletries", defaultChecked: true },
      { label: "Makeup table", name: "Makeup table" },
      { label: "Hot pot", name: "Hot pot" },
      { label: "Bathroom heaters", name: "Bathroom heaters" },
      { label: "Kettle", name: "Kettle", defaultChecked: true },
      { label: "Dishwasher", name: "Dishwasher" },
      { label: "BBQ grill", name: "BBQ grill", defaultChecked: true },
      { label: "Toaster", name: "Toaster", defaultChecked: true },
      { label: "Towel", name: "Towel" },
      { label: "Dining table", name: "Dining table" },
    ],
  },
  {
    category: "Safe amenities",
    items: [
      { label: "Fire siren", name: "Fire siren"},
      { label: "Fire extinguisher", name: "Fire extinguisher" },
      { label: "Anti-theft key", name: "Anti-theft key" },
      { label: "Safe vault", name: "Safe vault" },
    ],
  },
];

interface VehicleParameter {
  name: string;
  icon?: string;
  description?: string;
  type: "performance" | "safety" | "technology" | "comfort" | "efficiency";
  valueType?: "string" | "boolean" | "number"; // Indicates data type for flexibility
  unit?: string; // Optional unit for numeric values (e.g., "MPG", "HP")
}

export const vehicleUtilities: VehicleParameter[] = [
  {
    name: "Engine Power",
    description: "Horsepower output of the engine",
    type: "performance",
    valueType: "number",
    unit: "HP",
  },
  {
    name: "Fuel Efficiency",
    description: "Miles per gallon combined",
    type: "efficiency",
    valueType: "number",
    unit: "MPG",
  },
  {
    name: "Forward Collision-Avoidance Assist",
    description: "Assists in avoiding frontal collisions",
    type: "safety",
    valueType: "boolean",
  },
  {
    name: "Blind-Spot Collision Warning",
    description: "Warns when vehicles are in your blind spot",
    type: "safety",
    valueType: "boolean",
  },
  {
    name: "Proximity Key with Push Button Start",
    description: "Convenient keyless entry and ignition",
    type: "technology",
    valueType: "boolean",
  },
  {
    name: "Touchscreen Display",
    description: "Size of the infotainment touchscreen",
    type: "technology",
    valueType: "number",
    unit: "inches",
  },
  {
    name: "Smart Cruise Control",
    description: "Adaptive cruise control with stop & go",
    type: "technology",
    valueType: "boolean",
  },
  {
    name: "Seating Capacity",
    description: "Maximum number of seats",
    type: "comfort",
    valueType: "number",
  },
  {
    name: "Climate Control",
    description: "Dual-zone climate control",
    type: "comfort",
    valueType: "boolean",
  },
  {
    name: "Drivetrain",
    description: "Type of drivetrain (e.g., AWD, FWD)",
    type: "performance",
    valueType: "string",
  },
  {
    name: "Transmission Type",
    description: "Type of transmission (Automatic/Manual)",
    type: "performance",
    valueType: "string",
  },
  {
    name: "Daytime Running Lights",
    description: "LED Daytime Running Lights (DRL)",
    type: "safety",
    valueType: "boolean",
  },
  {
    name: "Fuel Type",
    description: "Gasoline, Diesel, Electric, or Hybrid",
    type: "efficiency",
    valueType: "string",
  },
  {
    name: "Warranty",
    description: "Factory warranty coverage in years",
    type: "performance",
    valueType: "number",
    unit: "years",
  },
  {
    name: "Tire Pressure Monitoring System",
    description: "Monitors tire pressure levels",
    type: "safety",
    valueType: "boolean",
  },
];


const dummyCar_DATA = [
  {
    id: "9824dd51-14bc-4a05-ba7d-1ca3c3c08bd7",
    authorId: 5,
    date: "May 20, 2021",
    href: "/listing-car-detail",
    listingCategoryId: 10,
    title: "KONA Electric",
    featuredImage: "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
    galleryImgs: [
      "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
      "",
      "",
      ""
    ],
    commentCount: 17,
    viewCount: 97,
    like: true,
    address: "8953 Golf Course Terrace",
    reviewStart: 5.0,
    reviewCount: 126,
    price: "$124",
    gearshift: "Auto gearbox",
    seats: 4,
    saleOff: null,
    isAds: null,
    map: { lat: 55.2094559, lng: 61.5594641 }
  },
  {
    id: "12a181b6-114c-45fa-a0cf-f4285bc7d952",
    authorId: 7,
    date: "May 20, 2021",
    href: "/listing-car-detail",
    listingCategoryId: 18,
    title: "KONA Electric",
    featuredImage: "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
    galleryImgs: [
      "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
      "",
      "",
      ""
    ],
    commentCount: 40,
    viewCount: 902,
    like: true,
    address: "2606 Straubel Crossing",
    reviewStart: 4.6,
    reviewCount: 217,
    price: "$382",
    gearshift: "Auto gearbox",
    seats: 4,
    saleOff: null,
    isAds: null,
    map: { lat: 55.1972153, lng: 61.4407266 }
  },
  {
    id: "6132eeac-7895-4bc0-8c32-1155f01cd386",
    authorId: 9,
    date: "May 20, 2021",
    href: "/listing-car-detail",
    listingCategoryId: 3,
    title: "KONA Electric",
    featuredImage: "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
    galleryImgs: [
      "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
      "",
      "",
      ""
    ],
    commentCount: 81,
    viewCount: 254,
    like: false,
    address: "14 Petterle Trail",
    reviewStart: 3.8,
    reviewCount: 534,
    price: "$105",
    gearshift: "Auto gearbox",
    seats: 4,
    saleOff: null,
    isAds: null,
    map: { lat: 55.247483, lng: 61.5229791 }
  },
  {
    id: "13c7e75e-a892-46e2-85ab-6b65d7976fab",
    authorId: 8,
    date: "May 20, 2021",
    href: "/listing-car-detail",
    listingCategoryId: 19,
    title: "KONA Electric",
    featuredImage:
      "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
    galleryImgs: [
      "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
      "",
      "",
      "",
    ],
    commentCount: 93,
    viewCount: 504,
    like: false,
    address: "9976 Brentwood Trail",
    reviewStart: 3.4,
    reviewCount: 513,
    price: "$122",
    gearshift: "Auto gearbox",
    seats: 4,
    saleOff: "-10% today",
    isAds: null,
    map: { lat: 59.955413, lng: 30.337844 },
  },
  {
    id: "c9ddbe20-f1f8-4a37-a2d5-9f1b5f3dd35e",
    authorId: 3,
    date: "May 20, 2021",
    href: "/listing-car-detail",
    listingCategoryId: 19,
    title: "KONA Electric",
    featuredImage:
      "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
    galleryImgs: [
      "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
      "",
      "",
      "",
    ],
    commentCount: 46,
    viewCount: 88,
    like: true,
    address: "0 Graceland Alley",
    reviewStart: 3.2,
    reviewCount: 220,
    price: "$144",
    gearshift: "Auto gearbox",
    seats: 4,
    saleOff: null,
    isAds: null,
    map: { lat: 59.955413, lng: 30.337844 },
  },
  {
    id: "cc7cfa04-e20d-4487-8b2c-10d71a71c7a9",
    authorId: 9,
    date: "May 20, 2021",
    href: "/listing-car-detail",
    listingCategoryId: 7,
    title: "KONA Electric",
    featuredImage:
      "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
    galleryImgs: [
      "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
      "",
      "",
      "",
    ],
    commentCount: 74,
    viewCount: 432,
    like: false,
    address: "84 Golf Course Plaza",
    reviewStart: 3.8,
    reviewCount: 502,
    price: "$326",
    gearshift: "Auto gearbox",
    seats: 4,
    saleOff: null,
    isAds: null,
    map: { lat: 59.955413, lng: 30.337844 },
  },
];


export { DEMO_STAY_LISTINGS, DEMO_EXPERIENCES_LISTINGS, DEMO_CAR_LISTINGS,amenities ,dummyCar_DATA };
