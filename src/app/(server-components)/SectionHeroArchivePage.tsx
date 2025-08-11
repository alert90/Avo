"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeroSearchForm, { SearchTab } from "../(client-components)/(HeroSearchForm)/HeroSearchForm";
import Image from "next/image";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  currentPage: "Stays" | "Experiences" | "Cars";
  currentTab: SearchTab;
}

interface LocationData {
  id: number;
  title: string;
  image: string;
  banner_image: string;
  content: string;
  map_lat: string;
  map_lng: string;
  map_zoom: number;
  
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  listingType,
  currentPage,
  currentTab,
}) => {
  const searchParams = useSearchParams();
  const locationId = searchParams.get("location");

  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!locationId) return;

    const fetchLocation = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://avoguide.com/api/location/${locationId}`);
        const json = await res.json();
        setLocationData(json.data);
      } catch (err) {
        console.error("Failed to fetch location:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [locationId]);

  if (loading) {
    return <p className="text-center py-10">Loading location details...</p>;
  }

  if (!locationData) {
    return <p className="text-center py-10">No location found.</p>;
  }

  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            {locationData.title}
          </h2>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            <i className="text-2xl las la-map-marked"></i>
            <span className="ml-2.5">{locationData.title}</span>
            <span className="mx-5"></span>
            {listingType ? (
              listingType
            ) : (
              <>
                <i className="text-2xl las la-home"></i>
                <span className="ml-2.5">112 properties</span>
              </>
            )}
          </div>
        </div>
        <div className="flex-grow">
          <Image
            className="w-full h-full object-cover rounded-xl"
            src={locationData.banner_image || locationData.image}
            alt={locationData.title}
            width={1200}
            height={800}
            priority
          />
        </div>
      </div>

      <div className="hidden lg:flow-root w-full">
        <div className="z-10 lg:-mt-40 xl:-mt-56 w-full">
          <HeroSearchForm currentPage={currentPage} currentTab={currentTab} />
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;
