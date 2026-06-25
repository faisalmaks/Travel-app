"use client";

import { useEffect, useRef, useState } from "react";
import { getCountries } from "@/services/countryService";
import dynamic from "next/dynamic";
import { getHotels } from "@/services/hotelService";
import { getRestaurants } from "@/services/restaurantService";
import { getMosques } from "@/services/mosqueService";

const Globe = dynamic(
  () => import("react-globe.gl"),
  {
    ssr: false,
  }
);

export default function InteractiveGlobe({
  focusCountry,
}) {
  const globeRef = useRef();

  const [countries, setCountries] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const [countryStats, setCountryStats] = useState({
        hotels: 0,
        restaurants: 0,
        mosques: 0,
      });

  const [dimensions, setDimensions] = useState({
        width: 800,
        height: 800,
      });

  const loadCountries = async () => {
      try {
        const data = await getCountries();

        const countryList = Array.isArray(data)
          ? data
          : data?.data || [];

        const formattedCountries =
          countryList
            .filter(
              (country) =>
                country.location?.lat &&
                country.location?.lng
            )
            .map((country) => ({
              ...country,
              lat: country.location.lat,
              lng: country.location.lng,
              size: 0.5,
            }));

        setCountries(formattedCountries);
      } catch (error) {
        console.error(error);
      }
    };
  useEffect(() => {
      loadCountries();
    }, []);

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: 850,
        height: 850,
      });
    };

    updateSize();

    window.addEventListener(
      "resize",
      updateSize
    );

    return () =>
      window.removeEventListener(
        "resize",
        updateSize
      );
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    const controls =
      globeRef.current.controls();

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    globeRef.current.pointOfView(
      {
        lat: 20,
        lng: 0,
        altitude: 2.8,
      },
      0
    );
  }, []);

  useEffect(() => {
  if (
    !focusCountry ||
    !focusCountry.location ||
    !globeRef.current
  ) {
    return;
  }

  globeRef.current.pointOfView(
    {
      lat:
        focusCountry.location.lat,
      lng:
        focusCountry.location.lng,
      altitude: 2,
    },
    2500
  );
}, [focusCountry]);

useEffect(() => {
  if (!selectedCountry) return;

  const loadStats = async () => {
    try {
      const hotelsData = await getHotels();
      const restaurantsData =
        await getRestaurants();
      const mosquesData =
        await getMosques();

      const hotels =
        hotelsData?.data ||
        hotelsData ||
        [];

      const restaurants =
        restaurantsData?.data ||
        restaurantsData ||
        [];

      const mosques =
        mosquesData?.data ||
        mosquesData ||
        [];

      setCountryStats({
        hotels: hotels.filter(
          (hotel) =>
            hotel.country?._id ===
              selectedCountry._id ||
            hotel.country ===
              selectedCountry._id
        ).length,

        restaurants:
          restaurants.filter(
            (restaurant) =>
              restaurant.country?._id ===
                selectedCountry._id ||
              restaurant.country ===
                selectedCountry._id
          ).length,

        mosques: mosques.filter(
          (mosque) =>
            mosque.country?._id ===
              selectedCountry._id ||
            mosque.country ===
              selectedCountry._id
        ).length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  loadStats();
}, [selectedCountry]);

 

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900">

      <Globe
        onPointClick={(point) => {setSelectedCountry(point);}}
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#10b981"
        atmosphereAltitude={0.2}

        pointsData={countries}
        pointAltitude={0.01}
        pointRadius={0.5}
        pointColor={() => "#10b981"}

        labelsData={countries}
        labelLat="lat"
        labelLng="lng"
        labelText={(d) => d.name}
        labelSize={1.5}
        labelColor={() => "#ffffff"}
        labelDotRadius={0.4}
      />

      {selectedCountry && (
          <div className="border-t border-slate-800 bg-slate-950 p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <div className="flex items-center gap-4">

                  {selectedCountry.flag && (
                    <img
                      src={selectedCountry.flag}
                      alt={selectedCountry.name}
                      className="w-14 h-14 rounded-full"
                    />
                  )}

                  <div>

                    <h2 className="text-3xl font-bold text-white">
                      {selectedCountry.name}
                    </h2>

                    <p className="text-slate-400">
                      {selectedCountry.continent}
                    </p>

                  </div>

                </div>
                  <button
                    onClick={() => {
                      window.location.href =
                        `/countries/${selectedCountry._id}`;
                    }}
                    className="
                      mt-4
                      px-4
                      py-2
                      bg-emerald-500
                      rounded-lg
                      text-white
                    "
                  >
                    Explore Destination
                  </button>

              </div>

              <button
                onClick={() =>
                  globeRef.current.pointOfView(
                    {
                      lat: selectedCountry.lat,
                      lng: selectedCountry.lng,
                      altitude: 1.2,
                    },
                    1500
                  )
                }
                className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg text-white"
              >
                Focus
              </button>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Hotels
                </p>

                <h3 className="text-2xl text-white font-bold">
                  {countryStats.hotels}
                </h3>
              </div>

              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Restaurants
                </p>

                <h3 className="text-2xl text-white font-bold">
                  {countryStats.restaurants}
                </h3>
              </div>

              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Mosques
                </p>

                <h3 className="text-2xl text-white font-bold">
                  {countryStats.mosques}
                </h3>
              </div>

              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Currency
                </p>

                <h3 className="text-2xl text-white font-bold">
                  {selectedCountry.currency}
                </h3>
              </div>

            </div>

          </div>
        )}

    </div>
  );
}