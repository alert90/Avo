"use client";

import React, { useEffect, useState } from "react";
import CardCategoryBox1 from "@/components/CardCategoryBox1";
import Heading from "@/shared/Heading";
import { TaxonomyType } from "@/data/types";

interface LocationType {
  id: number;
  title: string;
  image: string;
}

export interface SectionGridCategoryBoxProps {
  headingCenter?: boolean;
  categoryCardType?: "card1";
  className?: string;
  gridClassName?: string;
}

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categoryCardType = "card1",
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  const [categories, setCategories] = useState<TaxonomyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const allLocations: LocationType[] = await fetchAllLocations();
        const sortedLocations = sortLocations(allLocations);

        const mappedCategories: TaxonomyType[] = sortedLocations.map((location) => ({
          id: String(location.id),
          name: location.title,
          thumbnail: location.image,
          count: 0,
          taxonomy: "category",
          href: `/listing-stay-map?location=${location.id}`,
        }));

        setCategories(mappedCategories);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const CardComponent = CardCategoryBox1;

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading desc="Discover great places near where you live" isCenter={headingCenter}>
        Explore nearby
      </Heading>

      {loading ? (
        <p className="text-center py-10">Loading locations...</p>
      ) : (
        <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
          {categories.map((item) => (
            <CardComponent key={item.id} taxonomy={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionGridCategoryBox;

/** =====================
 * Helpers
 * ===================== */
async function fetchAllLocations(): Promise<LocationType[]> {
  let allLocations: LocationType[] = [];
  let currentPage = 3;
  let lastPage = 1;

  do {
    const res = await fetch(`https://avoguide.com/api/locations?page=${currentPage}`);
    const json = await res.json();

    allLocations = allLocations.concat(json.data);
    lastPage = json.last_page ?? 1;
    currentPage++;
  } while (currentPage <= lastPage);

  return allLocations;
}

function sortLocations(locations: LocationType[]): LocationType[] {
  return [...locations].sort((a, b) => a.id - b.id);
}
