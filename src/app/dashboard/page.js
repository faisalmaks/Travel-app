"use client";

import InteractiveGlobe from "@/components/InteractiveGlobe";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

import {
  FaGlobeAsia,
  FaCity,
  FaHotel,
  FaUtensils,
  FaStar,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function DashboardPage() {
  const stats = [
    {
      title: "Countries",
      value: 45,
      icon: <FaGlobeAsia size={28} />,
    },
    {
      title: "Cities",
      value: 320,
      icon: <FaCity size={28} />,
    },
    {
      title: "Hotels",
      value: 1250,
      icon: <FaHotel size={28} />,
    },
    {
      title: "Restaurants",
      value: 2800,
      icon: <FaUtensils size={28} />,
    },
  ];

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
              <div className="grid lg:grid-cols-2 gap-8 mb-12">

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

                <InteractiveGlobe />

              </div>
            </div>

            

            {/* STATS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

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