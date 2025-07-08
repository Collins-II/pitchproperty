
//import getCurrentUser from "@/app/actions/getCurrentUser";
//import getListingById from "@/app/actions/getCarListingById";
//import getReservations from "@/app/actions/getReservations";

import { Metadata } from 'next';
import ListingCarDetailPage from "./carClient";
//import getCarListingById from "@/app/actions/getCarListingById";
import { IUser } from "@/lib/database/models/user.model";
import { DEMO_CAR_LISTINGS } from '@/data/listings';
import { CarDataType } from '@/data/types';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getCarListingById';
import getCarListingById from '@/app/actions/getCarListingById';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories';
import { getCarLocations, getPropertiesGroupedByDistrict } from '@/app/actions/getLocations';

export interface IParams {
  params: {
    carId: string;
  }
}

/*export async function generateMetadata(
  { params }: IParams,
): Promise<Metadata> {
  // read route param

  // fetch data
  const listing = await getCarListingById(params);

  return {
    title: listing?.title,
    description: listing?.description,
    keywords: [listing?.title, listing?.property_type],
    icons: {
      icon: '/images/logo1.png'
    }
  }
}*/

const ListingPage = async ({params}: {params: Promise<{ carId: string }>}) => {
  const { carId } = await params;
  //const listing: CarDataType = DEMO_CAR_LISTINGS[0];
  const propertyData = await getPropertiesGroupedByDistrict();
  const carData = await getCarLocations();
  const listing = await getCarListingById(carId);
  const currentUser = await getCurrentUser();

  return (
    <>
      <ListingCarDetailPage
        carData={listing as any}
        currentUser={currentUser as any}
      />
      {/* OTHER SECTION */}
        <div className="container py-12 lg:py-18">
              <SectionSliderNewCategories
               propertyData={propertyData}
               carData={carData}
                categoryCardType="card5"
                itemPerRow={5}
                heading="Properties to explore"
                subHeading="Popular properties that Kingsland City recommends for you"
                sliderStyle="style2"
              />
        </div>
    </>
  );
}

// ✅ METADATA FUNCTION
export async function generateMetadata({params}: {params: Promise<{ carId: string }>}) {
  const { carId } = await params;
   // fetch data
 const listing = await getListingById(carId);

  return {
    title: listing?.title,
    description: listing?.description,
    keywords: [listing?.title, listing?.property_type],
    icons: {
      icon: '/images/logo1.png'
    }
  }
}


export default ListingPage;
