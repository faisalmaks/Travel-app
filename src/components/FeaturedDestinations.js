"use client";

const destinations = [
  {
    name: "Saudi Arabia",
    city: "Riyadh",
  },
  {
    name: "Turkey",
    city: "Istanbul",
  },
  {
    name: "UAE",
    city: "Dubai",
  },
];

export default function FeaturedDestinations() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {destinations.map((item) => (
        <div
          key={item.name}
          className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden"
        >
          <div className="h-48 bg-gradient-to-r from-emerald-500 to-cyan-500" />

          <div className="p-5">
            <h3 className="text-xl font-bold text-white">
              {item.name}
            </h3>

            <p className="text-slate-400">
              {item.city}
            </p>

            <button className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-xl">
              Explore
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}