"use client";

import { MapPinIcon } from "@heroicons/react/24/solid";
import LocationMarker from "@/components/AnyReactComponent/LocationMarker";
import Label from "@/components/Label";
import GoogleMapReact from "google-map-react";
import React, { FC, useEffect, useState } from "react";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { useDispatch } from "react-redux";
import { updateAddressData, updateListingData, updateMapData } from "@/lib/redux-slice/property-slice";
import Input from "@/shared/Input";
import { StayDataType } from "@/data/types";
import dynamic from "next/dynamic";

export interface PageAddListing2Props {}

export const DynamicMap = dynamic(() => import("../../../components/MapContainer"), { ssr: false });

const PageAddListing2: FC<PageAddListing2Props> = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const listingData = useAppSelector((state) => state.property.data);

  const address = listingData.address || {};
  const dispatch = useDispatch();

  // Handler to dispatch data updates
  const handleDispatch = <K extends keyof StayDataType["address"]>(
    key: K,
    value: StayDataType["address"][K]
  ) => {
    dispatch(updateAddressData({ key, value }));
  };

   const handleMapDispatch = <K extends keyof StayDataType["map"]>(
    key: K,
    value: StayDataType["map"][K]
    ) => {
      dispatch(updateMapData({ key, value }));
    };

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const fetchCoordinatesFromAddress = async () => {
    const { state, state_district, suburb } = address;

    if (!state || !state_district || !suburb) {
      alert("Please fill in the state, state district, and suburb.");
      return;
    }

    setIsFetchingLocation(true);

    try {
      const query = `${suburb}, ${state_district}, ${state}`.replace(
        / /g,
        "+"
      );
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch coordinates.");
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error("No coordinates found for the given address.");
      }

      const { lat, lon } = data[0];
      setLocation({ lat: parseFloat(lat), long: parseFloat(lon) });
      handleMapDispatch("lat",parseFloat(lat))
      handleMapDispatch("lng",parseFloat(lon))
      // toast.success("Coordinates updated successfully!");
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch coordinates from the address.");
    } finally {
      setIsFetchingLocation(false);
    }
  };

  
  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }
  
    setIsFetchingLocation(true);
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, long: longitude });
  
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
  
          if (!response.ok) {
            throw new Error("Failed to fetch location data.");
          }
  
          const data = await response.json();
          const address = data.address || {};
  
          // Update Redux store with the correct address data
          handleDispatch("country", address.country);
          handleDispatch("state", address.state);
          handleDispatch("state_district", address.state_district);
          handleDispatch("suburb", address.suburb);
          handleDispatch(
            "street",
            `${address.house_number? address.house_number : "" } ${address.road}`.trim()
          );
  
          handleMapDispatch("lat",latitude)
          handleMapDispatch("lng",longitude)
        } catch (error) {
          console.error("Failed to fetch address details:", error);
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        console.error("Unable to retrieve your location:", error.message);
        setIsFetchingLocation(false);
      }
    );
  };
  

useEffect(() => {
    if (address.state && address.state_district && address.suburb) {
      fetchCoordinatesFromAddress();
    }
  }, [address.state, address.state_district, address.suburb]);

 
  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold">Your Car Location</h2>
        <div className="h-1 w-20 bg-primary-600 mt-2 rounded"></div>
      </div>

      <div className="space-y-6">
        <ButtonSecondary onClick={fetchCurrentLocation} disabled={isFetchingLocation}>
          <MapPinIcon className="w-5 h-5" />
          <span className="ml-2">{isFetchingLocation ? "Fetching..." : "Use My Location"}</span>
        </ButtonSecondary>

        {/*<FormItem label="Country/Region">
          <Select
            value={address.country}
            onChange={(e) => handleDispatch("country", e.target.value)}
          >
            <option value="Viet Nam">Viet Nam</option>
            <option value="Thailand">Thailand</option>
            <option value="France">France</option>
            <option value="Singapore">Singapore</option>
            <option value="Japan">Japan</option>
            <option value="Korea">Korea</option>
          </Select>
        </FormItem>*/}

        <FormItem label="Street">
          <Input
            placeholder="Enter your street"
            value={address.street || ""}
            onChange={(e) => handleDispatch("street", e.target.value)}
          />
        </FormItem>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FormItem label="City">
            <Input
              placeholder="City"
              value={address.state_district || ""}
              onChange={(e) => handleDispatch("state_district", e.target.value)}
            />
          </FormItem>
          <FormItem label="State">
            <Input
              placeholder="State"
              value={address.state || ""}
              onChange={(e) => handleDispatch("state", e.target.value)}
            />
          </FormItem>
          <FormItem label="Suburb">
            <Input
              placeholder="Suburb"
              value={address.suburb || ""}
              onChange={(e) => handleDispatch("suburb", e.target.value)}
            />
          </FormItem>
        </div>

        {location.lat !== 0 && (
          <div className="mt-6">
            <Label>Map Location</Label>
            <div className="aspect-video rounded-xl overflow-hidden mt-2">
              <DynamicMap position={[location.lat, location.long]} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PageAddListing2;
