"use client";

import {
  FaStar,
  FaMapMarkerAlt,
  FaMosque,
  FaWifi,
  FaParking,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function HotelCard({
  hotel,
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

        {hotel.images?.[0] ? (
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full bg-slate-800 flex items-center justify-center text-slate-500">
            No Image Available
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4">

          <h2 className="text-3xl font-bold text-white">
            {hotel.name}
          </h2>

          <div className="flex items-center gap-2 text-slate-200 mt-2">
            <FaMapMarkerAlt />
            <span>
              {hotel.city?.name}
            </span>
          </div>

        </div>

      </div>

      <div className="p-6">

        <div className="flex items-center gap-1 text-yellow-400 mb-4">

          {[...Array(hotel.starRating || 5)].map(
            (_, i) => (
              <FaStar key={i} />
            )
          )}

        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">

          <div className="bg-slate-800 rounded-xl p-3 text-center">

            <FaMosque className="mx-auto text-emerald-400 mb-2" />

            <p className="text-xs text-slate-400">
              Muslim Score
            </p>

            <p className="text-white font-bold">
              {hotel.muslimFriendlyScore}/10
            </p>

          </div>

          <div className="bg-slate-800 rounded-xl p-3 text-center">

            <FaWifi className="mx-auto text-cyan-400 mb-2" />

            <p className="text-xs text-slate-400">
              WiFi
            </p>

            <p className="text-white font-bold">
              Free
            </p>

          </div>

          <div className="bg-slate-800 rounded-xl p-3 text-center">

            <FaParking className="mx-auto text-yellow-400 mb-2" />

            <p className="text-xs text-slate-400">
              Parking
            </p>

            <p className="text-white font-bold">
              Yes
            </p>

          </div>

        </div>

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-400 text-sm">
              Starting From
            </p>

            <p className="text-3xl font-bold text-emerald-400">
              ${hotel.pricePerNight}
            </p>

          </div>

          <button
            className="
              bg-emerald-500
              hover:bg-emerald-600
              px-6
              py-3
              rounded-xl
              text-white
              font-semibold
            "
          >
            View Details
          </button>

        </div>

      </div>
    </motion.div>
  );
}