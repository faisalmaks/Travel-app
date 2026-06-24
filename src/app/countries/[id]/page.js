"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

import { getCountryById } from "@/services/countryService";
import { getHotels } from "@/services/hotelService";
import { getRestaurants } from "@/services/restaurantService";
import { getMosques } from "@/services/mosqueService";
import { getVisaInfo } from "@/services/visaInfoService";
import { getLocalGuides } from "@/services/localGuideService";

export default function CountryDetailsPage() {
  const params = useParams();

  const [country, setCountry] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [mosques, setMosques] = useState([]);
  const [visaInfo, setVisaInfo] = useState(null);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    if (params?.id) {
      loadCountry();
    }
  }, [params?.id]);

  const loadCountry = async () => {
    try {
      const countryRes = await getCountryById(params.id);
      const hotelRes = await getHotels();
      const restaurantRes = await getRestaurants();
      const mosqueRes = await getMosques();
      const visaRes = await getVisaInfo();
      const guideRes = await getLocalGuides();

      const currentCountry = countryRes.data;

      setCountry(currentCountry);

      setHotels(
        (hotelRes.data || []).filter(
          (hotel) => hotel.country?._id === params.id
        )
      );

      setRestaurants(
        (restaurantRes.data || []).filter(
          (restaurant) => restaurant.country?._id === params.id
        )
      );

      setMosques(
        (mosqueRes.data || []).filter(
          (mosque) => mosque.country?._id === params.id
        )
      );

      setVisaInfo(
        (visaRes.data || []).find(
          (visa) =>
            visa.country === params.id ||
            visa.country?._id === params.id
        )
      );

      setGuides(
        (guideRes.data || []).filter(
          (guide) =>
            guide.city?.country === params.id ||
            guide.city?.country?._id === params.id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!country) {
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-950">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <div className="p-8">

            {/* HERO */}

            <div className="relative h-[400px] rounded-3xl overflow-hidden mb-8">

              {country.image && (
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-10 left-10">

                <h1 className="text-6xl font-bold text-white">
                  {country.name}
                </h1>

                <p className="text-slate-300 text-xl mt-2">
                  {country.capital}
                </p>

              </div>

            </div>

            {/* ENTITY COUNTS */}

            <div className="grid lg:grid-cols-4 gap-6 mb-8">

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400">
                  Hotels
                </p>
                <h2 className="text-4xl font-bold text-white">
                  {hotels.length}
                </h2>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400">
                  Restaurants
                </p>
                <h2 className="text-4xl font-bold text-white">
                  {restaurants.length}
                </h2>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400">
                  Mosques
                </p>
                <h2 className="text-4xl font-bold text-white">
                  {mosques.length}
                </h2>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400">
                  Guides
                </p>
                <h2 className="text-4xl font-bold text-white">
                  {guides.length}
                </h2>
              </div>

            </div>

            {/* COUNTRY INFO */}

            <div className="grid lg:grid-cols-4 gap-6 mb-8">

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400">
                  Population
                </p>
                <h2 className="text-3xl text-white font-bold mt-2">
                  {country.population?.toLocaleString() || "N/A"}
                </h2>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400">
                  Currency
                </p>
                <h2 className="text-3xl text-white font-bold mt-2">
                  {country.currency || "N/A"}
                </h2>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400">
                  Timezone
                </p>
                <h2 className="text-2xl text-white font-bold mt-2">
                  {country.timezone || "N/A"}
                </h2>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400">
                  Safety
                </p>
                <h2 className="text-2xl text-emerald-400 font-bold mt-2">
                  {country.safetyLevel}
                </h2>
              </div>

            </div>

            {/* ABOUT */}

            <div className="bg-slate-900 rounded-3xl p-8 mb-10">

              <h2 className="text-3xl font-bold text-white mb-4">
                About
              </h2>

              <p className="text-slate-300 leading-8">
                {country.description}
              </p>

            </div>

            {/* HOTELS */}

            <section className="mb-10">

              <h2 className="text-3xl font-bold text-white mb-6">
                Hotels
              </h2>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {hotels.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800"
                  >
                    {hotel.images?.[0] && (
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="h-52 w-full object-cover"
                      />
                    )}

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white">
                        {hotel.name}
                      </h3>

                      <p className="text-emerald-400 mt-2">
                        ${hotel.pricePerNight}/night
                      </p>

                      <p className="text-slate-400 mt-2">
                        Muslim Friendly: {hotel.muslimFriendlyScore}/10
                      </p>
                    </div>
                  </div>
                ))}

              </div>

            </section>

            {/* RESTAURANTS */}

            <section className="mb-10">

              <h2 className="text-3xl font-bold text-white mb-6">
                Restaurants
              </h2>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant._id}
                    className="bg-slate-900 rounded-3xl border border-slate-800 p-6"
                  >
                    <h3 className="text-xl text-white font-bold">
                      {restaurant.name}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      Halal: {restaurant.halalStatus}
                    </p>

                    <p className="text-slate-400 mt-2">
                      Rating: {restaurant.rating}
                    </p>
                  </div>
                ))}

              </div>

            </section>

            {/* MOSQUES */}

            <section className="mb-10">

              <h2 className="text-3xl font-bold text-white mb-6">
                Mosques
              </h2>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {mosques.map((mosque) => (
                  <div
                    key={mosque._id}
                    className="bg-slate-900 rounded-3xl border border-slate-800 p-6"
                  >
                    <h3 className="text-xl text-white font-bold">
                      {mosque.name}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      Capacity: {mosque.capacity}
                    </p>

                    <p className="text-slate-400 mt-2">
                      Sect: {mosque.sect}
                    </p>
                  </div>
                ))}

              </div>

            </section>

            {/* VISA INFO */}

            {visaInfo && (
              <section className="mb-10">

                <h2 className="text-3xl font-bold text-white mb-6">
                  Visa Information
                </h2>

                <div className="bg-slate-900 rounded-3xl p-8">

                  <p className="text-slate-300">
                    Type: {visaInfo.visaType}
                  </p>

                  <p className="text-slate-300 mt-2">
                    Mode: {visaInfo.applicationMode}
                  </p>

                  <p className="text-slate-300 mt-2">
                    Processing Time: {visaInfo.processingTime}
                  </p>

                  <p className="text-slate-300 mt-2">
                    Fee: {visaInfo.fee?.amount} {visaInfo.fee?.currency}
                  </p>

                </div>

              </section>
            )}

            {/* GUIDES */}

            <section className="mb-10">

              <h2 className="text-3xl font-bold text-white mb-6">
                Local Guides
              </h2>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {guides.map((guide) => (
                  <div
                    key={guide._id}
                    className="bg-slate-900 rounded-3xl border border-slate-800 p-6"
                  >
                    <p className="text-white font-bold">
                      Rating: {guide.rating}
                    </p>

                    <p className="text-slate-400 mt-2">
                      Languages: {guide.languages?.join(", ")}
                    </p>

                    <p className="text-slate-400 mt-2">
                      {guide.bio}
                    </p>
                  </div>
                ))}

              </div>

            </section>

          </div>

        </div>

      </div>
    </ProtectedRoute>
  );
}