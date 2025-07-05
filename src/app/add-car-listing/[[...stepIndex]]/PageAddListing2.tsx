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
import { updateAddressField, updateMapField } from "@/lib/redux-slice/car-slice";
import Input from "@/shared/Input";
import { DynamicMap } from "@/app/add-listing/[[...stepIndex]]/PageAddListing2";
import { CarDataType } from "@/data/types";
import { ICar } from "@/lib/database/models/car.model";

export interface PageAddListing2Props {}

const PageAddListing2: FC = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const listingData = useAppSelector((state) => state.car.data);
  const address = listingData.address || {};
  const dispatch = useDispatch();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const handleDispatch =  <K extends keyof ICar["address"]>(
      key: K,
      value: ICar["address"][K]
    ) => {
    dispatch(updateAddressField({ key, value }));
  };

  const handleMapDispatch = <K extends keyof ICar["map"]>(key: K, value: ICar["map"][K]) => {
    dispatch(updateMapField({ key, value }));
  };

  const fetchCoordinatesFromAddress = async () => {
    const { state, state_district, suburb } = address;
    if (!state || !state_district || !suburb) return;

    setIsFetchingLocation(true);
    try {
      const query = `${suburb}, ${state_district}, ${state}`.replace(/ /g, "+");
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`
      );
      const data = await res.json();
      if (data?.length) {
        const { lat, lon } = data[0];
        setLocation({ lat: parseFloat(lat), long: parseFloat(lon) });
        handleMapDispatch("lat", parseFloat(lat));
        handleMapDispatch("lng", parseFloat(lon));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchingLocation(false);
    }
  };

  useEffect(() => {
    if (address.state && address.state_district && address.suburb) {
      fetchCoordinatesFromAddress();
    }
  }, [address]);

  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) return;

    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;
      setLocation({ lat: latitude, long: longitude });

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const addr = data.address || {};

        handleDispatch("country", addr.country);
        handleDispatch("state", addr.state);
        handleDispatch("state_district", addr.state_district);
        handleDispatch("suburb", addr.suburb);
        handleDispatch("street", `${addr.house_number || ""} ${addr.road || ""}`.trim());

        handleMapDispatch("lat", latitude);
        handleMapDispatch("lng", longitude);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetchingLocation(false);
      }
    });
  };

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
