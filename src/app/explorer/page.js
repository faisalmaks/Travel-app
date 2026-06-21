"use client";

import { useEffect, useState } from "react";
import CountryInfoPanel from "@/components/CountryInfoPanel";
import CityExplorer from "@/components/CityExplorer";
import { getCities } from "@/services/cityService";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import CountrySearch from "@/components/CountrySearch";

import {
  getCountries,
} from "@/services/countryService";

export default function ExplorerPage() {
  const [countries,
    setCountries] =
    useState([]);

  const [selectedCountry,
    setSelectedCountry] =
    useState(null);

    const [cities, setCities] =
  useState([]);

    useEffect(() => {
        if (!selectedCountry) return;

        const loadCities = async () => {
            const result =
            await getCities();

            const filtered =
            (result.data || []).filter(
                (city) =>
                city.country?._id ===
                    selectedCountry._id ||
                city.country ===
                    selectedCountry._id
            );

            setCities(filtered);
        };

        loadCities();
        }, [selectedCountry]);

  useEffect(() => {
    const loadData =
      async () => {
        const result =
          await getCountries();

        setCountries(
          result.data || []
        );
      };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      <h1 className="text-5xl font-bold text-white mb-8">
        Explore The World
      </h1>

      <CountrySearch
        countries={countries}
        onSelect={
          setSelectedCountry
        }
      />

      <InteractiveGlobe
        focusCountry={
          selectedCountry
        }
      />
      <CountryInfoPanel
        country={selectedCountry}
        />
        <CityExplorer cities={cities} />
    </div>
  );
}