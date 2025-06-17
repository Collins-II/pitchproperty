"use client";

import React, { FC, useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngBounds } from "leaflet";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import ButtonClose from "@/shared/ButtonClose";
import Checkbox from "@/shared/Checkbox";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import StayCard2 from "@/components/StayCard2";
import { StayDataType } from "@/data/types";
import { useRouter } from "next/navigation";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/CurrencyStore/store";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import PropertyCardH from "@/components/PropertyCardH";
import { IProperty } from "@/lib/database/models/property.model";

const DEMO_STAYS = DEMO_STAY_LISTINGS.slice(0, 12);

const containerStyle = {
  width: "100%",
  height: "100%",
};

const customIcon = new L.Icon({
  iconUrl: "/images/marker_icon.png", // Ensure you have a marker icon
  iconSize: [41, 41],
  iconAnchor: [12, 41],
});

export interface SectionGridHasMapProps {
  data: IProperty[];
  city: string;
}

const ITEMS_PER_PAGE = 9;

const MapEvents = ({ setBounds }: { setBounds: (bounds: L.LatLngBounds) => void }) => {
  useMapEvents({
    moveend: (e) => {
      setBounds(e.target.getBounds());
    },
  });
  return null;
};

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({ data, city }) => {
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const convertPrice = useConvertPrice();
  const router = useRouter();
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const [filteredData, setFilteredData] = useState<IProperty[]>(data);
  const [searchAsMove, setSearchAsMove] = useState(false);
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const defaultCenter: [number, number] = DEMO_STAYS.length > 0 
  ? [DEMO_STAYS[0].map.lat, DEMO_STAYS[0].map.lng] 
  : [0, 0]; // Fallback to (0,0) if no data

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (searchAsMove && mapBounds) {
      setFilteredData(
        data.filter(
          (stay) =>
            mapBounds.contains([stay.map.lat, stay.map.lng])
        )
      );
    }
  }, [mapBounds, searchAsMove, data]);
  

  const MapWithBounds = ({ setMapBounds }: { setMapBounds: (bounds: LatLngBounds) => void }) => {
  useMapEvents({
    moveend: (event) => {
      setMapBounds(event.target.getBounds());
    },
  });

  return null; // This component only handles map events
};

  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* CARD LIST */}
        <div className="min-h-screen w-full xl:w-[60%] 2xl:w-[60%] max-w-[1184px] flex-shrink-0 xl:px-8 pt-4">
          <Heading2 heading={city} count={data.length} className="!mb-8" />
          <div className="mb-8 lg:mb-11">
            <TabFilters data={data} setFilteredData={setFilteredData} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 2xl:gap-x-6 gap-y-8">
            {paginatedData.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setCurrentHoverID(item.id as string | number)}
                onMouseLeave={() => setCurrentHoverID(-1)}
              >
                <StayCard2 data={item} key={item.id} />
              </div>
            ))}
          </div>
          <div className="flex mt-16 justify-center items-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {!showFullMapFixed && (
          <div
            className="flex xl:hidden items-center justify-center fixed bottom-16 md:bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30 space-x-3 text-sm cursor-pointer"
            onClick={() => setShowFullMapFixed(true)}
          >
            <i className="text-lg las la-map"></i>
            <span>Show map</span>
          </div>
        )}

        {/* MAP SECTION */}
        <div className={`xl:flex-1 xl:static xl:block ${showFullMapFixed ? "fixed inset-0 z-50" : "hidden"}`}>
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <div className="absolute bottom-5 left-3 lg:bottom-auto lg:top-2.5 lg:left-1/2 transform lg:-translate-x-1/2 py-2 px-4 bg-white dark:bg-neutral-800 shadow-xl z-10 rounded-2xl min-w-max">
              <Checkbox
                className="text-xs xl:text-sm"
                name="searchAsMove"
                label="Search as I move the map"
                //checked={searchAsMove}
                handleDispatch={() => setSearchAsMove(!searchAsMove)}
              />
            </div>

            {/* LEAFLET MAP */}
           <MapContainer
             center={defaultCenter}
             zoom={13}
             className="w-full h-full"
             style={containerStyle}
            >

              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredData.map((item) => (
                <Marker key={item.id} position={[item.map.lat, item.map.lng]} icon={customIcon}>
                  <Popup>
                <div className="w-48">
                  <img src={item.featuredImage as string} alt={item.title} className="w-full h-28 object-cover rounded-md" />
                  <h3 className="text-sm font-semibold mt-2">{item.title}</h3>
                  <p className="text-gray-600 text-xs">{selectedCurrency} {formatNumberWithCommas(convertPrice(Number(item.price)))}</p>
    
                  <button
                    aria-label={`View details of ${item.title}`}
                    onClick={() => router.push(`/listing-stay-detail`)} 
                    className="w-full flex justify-center rounded-full shadow-sm bg-primary-600 px-6 py-3 text-lg font-bold text-white hover:text-primary-600 shadow-lg transition duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-400">
                      <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </Popup>
                </Marker>
              ))}
              <MapWithBounds setMapBounds={setMapBounds} />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
