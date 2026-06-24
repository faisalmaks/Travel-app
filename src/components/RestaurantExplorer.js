"use client";

import {
  FaStar,
  FaUtensils,
} from "react-icons/fa";

export default function RestaurantExplorer({
  restaurants = [],
}) {
  if (!restaurants.length) return null;

  return (
    <div>

      <div className="mb-8">

        <h2 className="text-4xl font-bold text-white">
          Restaurants
        </h2>

        <p className="text-slate-400 mt-2">
          Discover halal dining options
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {restaurants.map(
          (restaurant) => (
            <div
              key={restaurant._id}
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                overflow-hidden
              "
            >

              <div className="h-56">

                {restaurant.images?.[0] ? (
                  <img
                    src={
                      restaurant.images[0]
                    }
                    alt={
                      restaurant.name
                    }
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                ) : (
                  <div className="h-full bg-slate-800 flex items-center justify-center">
                    <FaUtensils
                      size={50}
                      className="text-slate-500"
                    />
                  </div>
                )}

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white">
                  {restaurant.name}
                </h3>

                <p className="text-slate-400 mt-2">
                  {restaurant.city?.name}
                </p>

                <div className="flex items-center gap-2 mt-4">

                  <FaStar className="text-yellow-400" />

                  <span className="text-white">
                    {restaurant.rating}
                  </span>

                </div>

                <p className="text-emerald-400 mt-4">
                  {restaurant.halalStatus}
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
                  View Restaurant
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}