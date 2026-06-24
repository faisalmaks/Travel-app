"use client";

import {
  FaGlobeAsia,
  FaUsers,
  FaShieldAlt,
  FaMoneyBillWave,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function CountryInfoPanel({
  country,
}) {
  if (!country) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        overflow-hidden
      "
    >
      <div className="relative h-[350px]">

        {country.image ? (
          <img
            src={country.image}
            alt={country.name}
            className="
              w-full
              h-full
              object-cover
            "
          />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-8 left-8 flex items-center gap-5">

          {country.flag && (
            <img
              src={country.flag}
              alt={country.name}
              className="
                w-20
                h-20
                rounded-full
                border-4
                border-white
              "
            />
          )}

          <div>

            <h2 className="text-5xl font-bold text-white">
              {country.name}
            </h2>

            <p className="text-slate-300 mt-2">
              {country.continent}
            </p>

          </div>

        </div>

      </div>

      <div className="p-8">

        <div className="grid lg:grid-cols-5 gap-4 mb-8">

          <div className="bg-slate-800 rounded-2xl p-5">

            <FaMapMarkerAlt className="text-emerald-400 mb-3" />

            <p className="text-slate-400 text-sm">
              Capital
            </p>

            <h3 className="text-white font-bold mt-2">
              {country.capital || "N/A"}
            </h3>

          </div>

          <div className="bg-slate-800 rounded-2xl p-5">

            <FaMoneyBillWave className="text-emerald-400 mb-3" />

            <p className="text-slate-400 text-sm">
              Currency
            </p>

            <h3 className="text-white font-bold mt-2">
              {country.currency || "N/A"}
            </h3>

          </div>

          <div className="bg-slate-800 rounded-2xl p-5">

            <FaUsers className="text-emerald-400 mb-3" />

            <p className="text-slate-400 text-sm">
              Population
            </p>

            <h3 className="text-white font-bold mt-2">
              {country.population
                ? country.population.toLocaleString()
                : "N/A"}
            </h3>

          </div>

          <div className="bg-slate-800 rounded-2xl p-5">

            <FaClock className="text-emerald-400 mb-3" />

            <p className="text-slate-400 text-sm">
              Timezone
            </p>

            <h3 className="text-white font-bold mt-2">
              {country.timezone || "N/A"}
            </h3>

          </div>

          <div className="bg-slate-800 rounded-2xl p-5">

            <FaShieldAlt className="text-emerald-400 mb-3" />

            <p className="text-slate-400 text-sm">
              Safety
            </p>

            <h3 className="text-white font-bold mt-2">
              {country.safetyLevel}
            </h3>

          </div>

        </div>

        <div className="bg-slate-800 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-4">

            <FaGlobeAsia className="text-emerald-400" />

            <h3 className="text-2xl font-bold text-white">
              About {country.name}
            </h3>

          </div>

          <p className="text-slate-300 leading-8">
            {country.description ||
              "No description available."}
          </p>

        </div>

      </div>

    </motion.div>
  );
}