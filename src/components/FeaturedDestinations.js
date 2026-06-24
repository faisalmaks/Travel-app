"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  FaHotel,
  FaUtensils,
  FaMosque,
} from "react-icons/fa";

import { getCountries } from "@/services/countryService";

export default function FeaturedDestinations() {
  const [countries, setCountries] =
    useState([]);

  useEffect(() => {
    const loadCountries =
      async () => {
        try {
          const result =
            await getCountries();

          const countryList =
            result?.data ||
            result ||
            [];

          setCountries(
            countryList.slice(0, 6)
          );
        } catch (error) {
          console.error(error);
        }
      };

    loadCountries();
  }, []);

  return (
    <div className="mb-12">

      <div className="mb-8">

        <h2 className="text-4xl font-bold text-white">
          Featured Destinations
        </h2>

        <p className="text-slate-400 mt-2">
          Explore destinations from your database
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {countries.map(
          (country, index) => (

            <motion.div
              key={country._id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.1,
              }}
              whileHover={{
                y: -10,
              }}
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                overflow-hidden
              "
            >

              <div className="relative h-64">

                {country.image ? (
                  <img
                    src={
                      country.image
                    }
                    alt={
                      country.name
                    }
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4">

                  <h3 className="text-3xl font-bold text-white">
                    {
                      country.name
                    }
                  </h3>

                  <p className="text-slate-300">
                    {
                      country.capital
                    }
                  </p>

                </div>

              </div>

              <div className="p-6">

                <div className="grid grid-cols-3 gap-3 mb-6">

                  <div className="bg-slate-800 rounded-xl p-3 text-center">

                    <FaHotel className="mx-auto text-emerald-400 mb-2" />

                    <p className="text-white font-bold">
                      --
                    </p>

                  </div>

                  <div className="bg-slate-800 rounded-xl p-3 text-center">

                    <FaUtensils className="mx-auto text-cyan-400 mb-2" />

                    <p className="text-white font-bold">
                      --
                    </p>

                  </div>

                  <div className="bg-slate-800 rounded-xl p-3 text-center">

                    <FaMosque className="mx-auto text-yellow-400 mb-2" />

                    <p className="text-white font-bold">
                      --
                    </p>

                  </div>

                </div>

                <Link
                  href={`/countries/${country._id}`}
                >
                  <button
                    className="
                      w-full
                      py-3
                      rounded-xl
                      bg-emerald-500
                      hover:bg-emerald-600
                      text-white
                      font-semibold
                    "
                  >
                    Explore Destination
                  </button>
                </Link>

              </div>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}