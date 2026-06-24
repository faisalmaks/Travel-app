"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CountryCard({
  country,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.2,
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
            src={country.image}
            alt={country.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full bg-slate-800" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4">

          <h2 className="text-3xl font-bold text-white">
            {country.name}
          </h2>

          <p className="text-slate-300">
            {country.capital}
          </p>

        </div>

      </div>

      <div className="p-6">

        <div className="grid grid-cols-2 gap-3 mb-5">

          <div className="bg-slate-800 rounded-xl p-4">

            <p className="text-slate-400 text-sm">
              Currency
            </p>

            <p className="text-white font-bold mt-1">
              {country.currency || "-"}
            </p>

          </div>

          <div className="bg-slate-800 rounded-xl p-4">

            <p className="text-slate-400 text-sm">
              Population
            </p>

            <p className="text-white font-bold mt-1">
              {country.population
                ? country.population.toLocaleString()
                : "-"}
            </p>

          </div>

        </div>

        <div className="mb-5">

          <p className="text-slate-300 line-clamp-3">
            {country.description}
          </p>

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
            Explore Country
          </button>
        </Link>

      </div>

    </motion.div>
  );
}