// NO "use client" here – this is a server component
import getPremiumListings from "@/app/actions/getListings";
import { getCarPremium } from "@/app/actions/getCarPremiums";
import Index from "./components";


const CreatePage = async () => {
  const properties = await getPremiumListings();
  const cars = await getCarPremium();

  return <Index properties={properties} cars={cars} />;
};

export default CreatePage;
