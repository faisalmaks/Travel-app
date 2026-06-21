"use client";

export default function CountryInfoPanel({
  country,
}) {
  if (!country) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mt-8">

      <div className="flex items-center gap-4">

        {country.flag && (
          <img
            src={country.flag}
            alt={country.name}
            className="w-16 h-16 rounded-full"
          />
        )}

        <div>

          <h2 className="text-3xl font-bold text-white">
            {country.name}
          </h2>

          <p className="text-slate-400">
            {country.continent}
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-4 gap-4 mt-8">

        <div className="bg-slate-800 rounded-2xl p-4">
          <p className="text-slate-400">
            Capital
          </p>

          <p className="text-white font-semibold">
            {country.capital ||
              "N/A"}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4">
          <p className="text-slate-400">
            Currency
          </p>

          <p className="text-white font-semibold">
            {country.currency ||
              "N/A"}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4">
          <p className="text-slate-400">
            Population
          </p>

          <p className="text-white font-semibold">
            {country.population ||
              "N/A"}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4">
          <p className="text-slate-400">
            Safety
          </p>

          <p className="text-white font-semibold">
            {country.safetyLevel}
          </p>
        </div>

      </div>

      <p className="text-slate-300 mt-6">
        {country.description}
      </p>

    </div>
  );
}