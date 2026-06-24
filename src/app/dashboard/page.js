"use client";

import InteractiveGlobe from "@/components/InteractiveGlobe";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getCountries } from "@/services/countryService";
import { getCities } from "@/services/cityService";
import { getHotels } from "@/services/hotelService";
import { getRestaurants } from "@/services/restaurantService";
import { getMosques } from "@/services/mosqueService";
import { FaMosque } from "react-icons/fa";

import {
  FaGlobeAsia,
  FaCity,
  FaHotel,
  FaUtensils,
  FaStar,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function DashboardPage() {
  const [stats, setStats] = useState([
      {
        title: "Countries",
        value: 0,
        icon: <FaGlobeAsia size={28} />,
      },
      {
        title: "Cities",
        value: 0,
        icon: <FaCity size={28} />,
      },
      {
        title: "Hotels",
        value: 0,
        icon: <FaHotel size={28} />,
      },
      {
        title: "Restaurants",
        value: 0,
        icon: <FaUtensils size={28} />,
      },
    ]);

const [mosqueCount, setMosqueCount] =
    useState(0);

  useEffect(() => {
      const loadStats = async () => {
        try {
          const countries =
            await getCountries();

          const cities =
            await getCities();

          const hotels =
            await getHotels();

          const restaurants =
            await getRestaurants();

          const mosques =
            await getMosques();

          const countryList =
            countries?.data ||
            countries ||
            [];

          const cityList =
            cities?.data ||
            cities ||
            [];

          const hotelList =
            hotels?.data ||
            hotels ||
            [];

          const restaurantList =
            restaurants?.data ||
            restaurants ||
            [];

          const mosqueList =
            mosques?.data ||
            mosques ||
            [];

          setStats([
            {
              title: "Countries",
              value: countryList.length,
              icon: <FaGlobeAsia size={28} />,
            },
            {
              title: "Cities",
              value: cityList.length,
              icon: <FaCity size={28} />,
            },
            {
              title: "Hotels",
              value: hotelList.length,
              icon: <FaHotel size={28} />,
            },
            {
              title: "Restaurants",
              value: restaurantList.length,
              icon: <FaUtensils size={28} />,
            },
          ]);

          setMosqueCount(
            mosqueList.length
          );
        } catch (error) {
          console.error(error);
        }
      };

      loadStats();
    }, []);
  

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-950">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <div className="p-8">

            <div className="mb-10">

              <h1 className="text-4xl font-bold text-white">
                Travel Dashboard
              </h1>

              <p className="text-slate-400 mt-2">
                Monitor destinations, hotels,
                restaurants and traveler activity.
              </p>

            </div>
            <div className="mb-8">
              <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 mb-12">

                <div className="flex flex-col justify-center">

                  <p className="text-emerald-400 font-semibold mb-4">
                    Explore The World
                  </p>

                  <h1 className="text-6xl font-bold text-white leading-tight">
                    Discover
                    <span className="text-emerald-400 block">
                      Muslim Friendly
                    </span>
                    Destinations
                  </h1>

                  <p className="text-slate-400 mt-6 text-lg">
                    Countries, cities, hotels,
                    restaurants, mosques and travel guides.
                  </p>

                </div>

                <InteractiveGlobe
                  focusCountry={{
                    name: "Saudi Arabia",
                    location: {
                      lat: 23.8859,
                      lng: 45.0792,
                    },
                  }}
                />

              </div>
            </div>

            

            {/* STATS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">

              {stats.map((item, index) => (
                
                <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.03,
                  }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                  >

                  <div className="flex justify-between items-center">
                  

                    <div>

                      <p className="text-slate-400">
                        {item.title}
                      </p>

                      <h2 className="text-4xl font-bold text-white mt-2">
                        {item.value}
                      </h2>

                    </div>

                    <div className="text-emerald-400">
                      {item.icon}
                    </div>

                  </div>

                </motion.div>

              ))}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-2xl
                  p-6
                "
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-slate-400">
                      Mosques
                    </p>

                    <h2 className="text-4xl font-bold text-white mt-2">
                      {mosqueCount}
                    </h2>

                  </div>

                  <FaMosque
                    size={28}
                    className="text-emerald-400"
                  />

                </div>

              </motion.div>

            </div>
      <FeaturedDestinations />

            {/* SECOND ROW */}

            <div className="grid lg:grid-cols-2 gap-6 mb-8">

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <h2 className="text-white text-xl font-semibold mb-4">
                  Trending Destinations
                </h2>

                <div className="space-y-4">

                  <div className="flex justify-between text-slate-300">
                    <span>Saudi Arabia</span>
                    <span>12,500 Visits</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Turkey</span>
                    <span>10,900 Visits</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Dubai</span>
                    <span>8,600 Visits</span>
                  </div>

                </div>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <h2 className="text-white text-xl font-semibold mb-4">
                  Recent Reviews
                </h2>

                <div className="space-y-5">

                  <div>
                    <div className="flex items-center gap-2 text-yellow-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>

                    <p className="text-slate-300 mt-2">
                      Amazing experience in Riyadh.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-yellow-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>

                    <p className="text-slate-300 mt-2">
                      Great hotel and food options.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* ACTIVITY FEED */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <h2 className="text-white text-xl font-semibold mb-5">
                Live Activity
              </h2>

              <div className="space-y-4 text-slate-300">

                <p>
                  🌍 New country added: Saudi Arabia
                </p>

                <p>
                  🏨 New hotel added in Dubai
                </p>

                <p>
                  ⭐ New review submitted
                </p>

                <p>
                  ❤️ Destination added to favorites
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </ProtectedRoute>
  );
}