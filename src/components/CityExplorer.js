"use client";

import { motion } from "framer-motion";
import {
  FaCity,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

export default function CityExplorer({
  cities = [],
}) {
  if (!cities.length) return null;

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-4xl font-bold text-white">
            Explore Cities
          </h2>

          <p className="text-slate-400 mt-2">
            Discover destinations inside this country
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {cities.map((city, index) => (

          <motion.div
            key={city._id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              y: -8,
            }}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              overflow-hidden
            "
          >

            <div className="h-52 bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">

              <FaCity
                size={70}
                className="text-white"
              />

            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold text-white">
                {city.name}
              </h3>

              <div className="flex items-center gap-2 mt-4 text-slate-400">

                <FaCalendarAlt />

                <span>
                  {city.bestTimeToVisit ||
                    "All Year"}
                </span>

              </div>

              <p className="text-slate-300 mt-5 line-clamp-4">
                {city.description ||
                  "No description available"}
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
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                Explore City

                <FaArrowRight />
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}