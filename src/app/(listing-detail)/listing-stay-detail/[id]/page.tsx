
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
  //const listing: CarDataType = DEMO_CAR_LISTINGS[0];

  const listing = await getPropertyById(id);
  const currentUser = await getCurrentUser();

  return (
    <>
      <ClientListingDetails
        data={listing as any}
        currentUser={currentUser as any}
      />
    </>
  );
}

// ✅ METADATA FUNCTION
export async function generateMetadata({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
   // fetch data
 const listing = await getListingById(id);

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
