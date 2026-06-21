"use client";

import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HotelCard({
  hotel,
  onEdit,
  onDelete,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden"
    >
      <div className="h-48 bg-slate-800">

        {hotel.images?.[0] ? (
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500">
            No Image
          </div>
        )}

      </div>

      <div className="p-5">

        <h2 className="text-xl font-bold text-white">
          {hotel.name}
        </h2>

        <p className="text-slate-400 flex items-center gap-2 mt-2">
          <FaMapMarkerAlt />
          {hotel.city?.name}
        </p>

        <div className="flex items-center gap-1 mt-3 text-yellow-400">

          {[...Array(hotel.starRating)].map(
            (_, i) => (
              <FaStar key={i} />
            )
          )}

        </div>

        <p className="text-emerald-400 mt-3">
          ${hotel.pricePerNight}/night
        </p>

        <p className="text-slate-300 mt-2">
          Muslim Friendly:
          {" "}
          {hotel.muslimFriendlyScore}/10
        </p>

        <div className="flex gap-3 mt-5">

          <button
            onClick={() => onEdit(hotel)}
            className="flex-1 bg-emerald-500 text-white py-2 rounded-xl"
          >
            Edit
          </button>

          <button
            onClick={() =>
              onDelete(hotel._id)
            }
            className="flex-1 bg-red-500 text-white py-2 rounded-xl"
          >
            Delete
          </button>

        </div>

      </div>

    </motion.div>
  );
}