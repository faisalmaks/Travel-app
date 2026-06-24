"use client";

import { useEffect, useState } from "react";
import CountryInfoPanel from "@/components/CountryInfoPanel";
import CityExplorer from "@/components/CityExplorer";
import { getCities } from "@/services/cityService";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import CountrySearch from "@/components/CountrySearch";
import HotelExplorer from "@/components/HotelExplorer";
import { getHotelsByCountry, } from "@/services/explorerHotelService";
import RestaurantExplorer  from "@/components/RestaurantExplorer";
import {  getRestaurantsByCountry, } from "@/services/explorerRestaurantService";
import {  getCountries, } from "@/services/countryService";
import MosqueExplorer  from "@/components/MosqueExplorer";
import {  getMosquesByCountry, } from "@/services/explorerMosqueService";

export default function ExplorerPage() {
  const [countries,
    setCountries] =
    useState([]);

  const [selectedCountry,
    setSelectedCountry] =
    useState(null);

  const [restaurants,
    setRestaurants] =
    useState([]);

  const [cities, setCities] =
    useState([]);

  const [hotels, setHotels] =
    useState([]);

  const [mosques,
    setMosques] =
    useState([]);

    useEffect(() => {
      if (!selectedCountry) return;

      const loadMosques =
        async () => {
          const result =
            await getMosquesByCountry(
              selectedCountry._id
            );

          setMosques(result);
        };

      loadMosques();
    }, [selectedCountry]);

    useEffect(() => {
      if (!selectedCountry) return;

      const loadRestaurants =
        async () => {
          const result =
            await getRestaurantsByCountry(
              selectedCountry._id
            );

          setRestaurants(result);
        };

      loadRestaurants();
    }, [selectedCountry]);

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
         if (!selectedCountry) return;

          const loadHotels =
            async () => {
              const result =
                await getHotelsByCountry(
                  selectedCountry._id
                );

              setHotels(result);
            };

          loadHotels();
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

      <div className="max-w-[1700px] mx-auto p-8">

          <div className="mb-12">

            <p className="text-emerald-400 font-semibold mb-4">
              Discover New Destinations
            </p>

            <h1 className="text-6xl font-bold text-white leading-tight">
              Explore The
              <span className="text-emerald-400 block">
                Muslim Travel World
              </span>
            </h1>

            <p className="text-slate-400 mt-6 text-xl max-w-3xl">
              Search countries, explore cities,
              discover hotels, restaurants,
              mosques and travel information.
            </p>

          </div>

          <div className="mb-8">

            <CountrySearch
              countries={countries}
              onSelect={setSelectedCountry}
            />

          </div>

          <div className="mb-10">

            <InteractiveGlobe
              focusCountry={selectedCountry}
            />

          </div>

          {selectedCountry && (

            <div className="space-y-8">

              <CountryInfoPanel
                country={selectedCountry}
              />

              <>
                <CityExplorer
                  cities={cities}
                />

                <HotelExplorer
                  hotels={hotels}
                />

                <RestaurantExplorer
                  restaurants={restaurants}
                />

                <MosqueExplorer
                  mosques={mosques}
                />
              </>

            </div>

          )}

        </div>
  );
}