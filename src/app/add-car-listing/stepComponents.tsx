import PageAddListing1 from "./[[...stepIndex]]/PageAddListing1";
import PageAddListing2 from "./[[...stepIndex]]/PageAddListing2";
import PageAddListing3 from "./[[...stepIndex]]/PageAddListing3";
import PageAddListing4 from "./[[...stepIndex]]/PageAddListing4";
import PageAddListing5 from "./[[...stepIndex]]/PageAddListing5";
import PageAddListing6 from "./[[...stepIndex]]/PageAddListing6";
//import PageAddListing7 from "./[[...stepIndex]]/PageAddListing7";
import PageAddListing8 from "./[[...stepIndex]]/PageAddListing8";
import PageAddListing9 from "./[[...stepIndex]]/PageAddListing9";
import PageAddListing10 from "./[[...stepIndex]]/PageAddListing10";
import { StayDataType } from "@/data/types";
import { ICar } from "@/lib/database/models/car.model";

export const stepToKey: (keyof ICar)[] = [
    "author",
    "title",
    "featuredImage",
    "address",
    "reviewStart",
    "reviewCount",
    "galleryImgs",
    "price",
    "listingCategory",
    "saleOff",
    "isAds",
    "mapAddress",
  ];

const stepComponents: { [key: number]: React.ComponentType<any> } = {
  1: PageAddListing1,
  2: PageAddListing2,
  3: PageAddListing3,
  4: PageAddListing4,
  5: PageAddListing5,
  6: PageAddListing6,
  //7: PageAddListing7,
  7: PageAddListing8,
  8: PageAddListing9,
  9: PageAddListing10,
};

export default stepComponents;
