"use client";

import HotelCard from "./HotelCard";

export default function HotelExplorer({
  hotels = [],
}) {
  if (!hotels.length) return null;

  return (
    <div>

      <div className="mb-8">

        <h2 className="text-4xl font-bold text-white">
          Hotels
        </h2>

        <p className="text-slate-400 mt-2">
          Stay in the best hotels
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {hotels.map((hotel) => (
          <HotelCard
            key={hotel._id}
            hotel={hotel}
          />
        ))}

      </div>

    </div>
  );
}