"use client";

import {
  FaMosque,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function MosqueExplorer({
  mosques = [],
}) {
  if (!mosques.length) return null;

  return (
    <div>

      <div className="mb-8">

        <h2 className="text-4xl font-bold text-white">
          Mosques
        </h2>

        <p className="text-slate-400 mt-2">
          Discover nearby mosques
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {mosques.map((mosque) => (

          <div
            key={mosque._id}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              overflow-hidden
            "
          >

            <div className="h-56 bg-gradient-to-r from-emerald-600 to-cyan-600 flex items-center justify-center">

              <FaMosque
                size={70}
                className="text-white"
              />

            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold text-white">
                {mosque.name}
              </h3>

              <div className="flex items-center gap-2 mt-3 text-slate-400">

                <FaMapMarkerAlt />

                <span>
                  {mosque.city?.name}
                </span>

              </div>

              <div className="flex items-center gap-2 mt-3 text-slate-400">

                <FaUsers />

                <span>
                  Capacity:
                  {" "}
                  {mosque.capacity || 0}
                </span>

              </div>

              <p className="text-slate-300 mt-4 line-clamp-3">
                {mosque.description}
              </p>

              <button
                className="
                  mt-6
                  w-full
                  py-3
                  rounded-xl
                  bg-emerald-500
                  hover:bg-emerald-600
                  text-white
                  font-semibold
                "
              >
                View Mosque
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}