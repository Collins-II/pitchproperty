// NO "use client" here – this is a server component
import getPremiumListings from "@/app/actions/getListings";
import {getCarPremium} from "@/app/actions/getCarPremiums";
import ClientCreateAuctionPage from "../../components/ClientCreateAuctionPage";


const CreatePage = async () => {
  const properties = await getPremiumListings();
  const cars = await getCarPremium();

  return <ClientCreateAuctionPage properties={properties} cars={cars} />;
};

export default CreatePage;
