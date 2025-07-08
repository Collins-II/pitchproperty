
//import getCurrentUser from "@/app/actions/getCurrentUser";
//import getListingById from "@/app/actions/getCarListingById";
//import getReservations from "@/app/actions/getReservations";

import { Metadata } from 'next';
import ClientListingDetails from "../components/ClientDetails";
//import getCarListingById from "@/app/actions/getCarListingById";
import { IUser } from "@/lib/database/models/user.model";
import { DEMO_CAR_LISTINGS } from '@/data/listings';
import { CarDataType } from '@/data/types';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getCarListingById';
import { getPropertyById } from '@/app/actions/getListings';
import { IProperty } from '@/lib/database/models/property.model';
import { getCarLocations, getPropertiesGroupedByDistrict } from '@/app/actions/getLocations';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories';

export interface IParams {
  params: {
    id: string;
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

const ListingPage = async ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = await params;
  const propertyData = await getPropertiesGroupedByDistrict();
  const carData = await getCarLocations();

  const listing = await getPropertyById(id);
  const currentUser = await getCurrentUser();

  return (
    <>
      <ClientListingDetails
        data={listing as IProperty}
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
export async function generateMetadata({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
   // fetch data
 const listing = await getPropertyById(id);

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
