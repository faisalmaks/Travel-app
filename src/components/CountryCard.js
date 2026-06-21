"use client";

import { motion } from "framer-motion";

export default function CountryCard({
  country,
  onEdit,
  onDelete,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
    >
      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {country.name}
          </h2>

          <p className="text-slate-400 mt-1">
            {country.continent}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            country.safetyLevel === "high"
              ? "bg-green-500/20 text-green-400"
              : country.safetyLevel === "medium"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {country.safetyLevel}
        </span>

      </div>

      <div className="mt-5 space-y-2">

        <p className="text-slate-300">
          Currency: {country.currency}
        </p>

        <p className="text-slate-300">
          Languages:{" "}
          {country.languages?.join(", ")}
        </p>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => onEdit(country)}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl"
        >
          Edit
        </button>

        <button
          onClick={() =>
            onDelete(country._id)
          }
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl"
        >
          Delete
        </button>

      </div>

    </motion.div>
  );
}