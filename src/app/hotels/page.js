"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import HotelCard from "@/components/HotelCard";
import ProtectedRoute from "@/components/ProtectedRoute";

import { getHotels } from "@/services/hotelService";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadHotels = async () => {
    try {
      setLoading(true);

      const data = await getHotels();

      const hotelList = Array.isArray(data)
        ? data
        : data?.data || [];

      setHotels(hotelList);
      setFilteredHotels(hotelList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);

  useEffect(() => {
    const results = hotels.filter((hotel) =>
      hotel.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredHotels(results);
  }, [search, hotels]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-950">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <div className="p-8">

            <div className="mb-10">

              <h1 className="text-5xl font-bold text-white">
                Hotels
              </h1>

              <p className="text-slate-400 mt-3">
                Discover Muslim-friendly hotels around the world.
              </p>

            </div>

            <div className="mb-8">

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search hotels..."
                className="
                  w-full
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                "
              />

            </div>

            {loading ? (

              <div className="text-slate-400">
                Loading hotels...
              </div>

            ) : (

              <div className="grid lg:grid-cols-3 gap-8">

                {filteredHotels.map((hotel) => (

                  <HotelCard
                    key={hotel._id}
                    hotel={hotel}
                  />

                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    </ProtectedRoute>
  );
}