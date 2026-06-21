"use client";

export default function CityExplorer({
  cities = [],
}) {
  if (!cities.length) return null;

  return (
    <div className="mt-8">

      <h2 className="text-3xl font-bold text-white mb-6">
        Cities
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cities.map((city) => (
          <div
            key={city._id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-emerald-500 transition"
          >
            <h3 className="text-xl font-semibold text-white">
              {city.name}
            </h3>

            <p className="text-slate-400 mt-2">
              {city.bestTimeToVisit}
            </p>

            <p className="text-slate-300 mt-4 line-clamp-3">
              {city.description}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}