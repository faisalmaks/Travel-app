"use client";

export default function CountryHighlights() {
  const countries = [
    "Saudi Arabia",
    "Turkey",
    "Malaysia",
    "Indonesia",
    "UAE",
  ];

  return (
    <div className="grid md:grid-cols-5 gap-4 mb-8">
      {countries.map((country) => (
        <div
          key={country}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center"
        >
          <h3 className="text-white font-semibold">
            {country}
          </h3>
        </div>
      ))}
    </div>
  );
}