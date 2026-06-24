"use client";

import { useMemo, useState } from "react";
import {
  FaSearch,
  FaGlobeAsia,
} from "react-icons/fa";

export default function CountrySearch({
  countries = [],
  onSelect,
}) {
  const [query, setQuery] =
    useState("");

  const filteredCountries =
    useMemo(() => {
      if (!query) return [];

      return countries
        .filter((country) =>
          country.name
            ?.toLowerCase()
            .includes(
              query.toLowerCase()
            )
        )
        .slice(0, 8);
    }, [query, countries]);

  return (
    <div className="relative">

      <div className="relative">

        <FaSearch
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          type="text"
          placeholder="Search countries, destinations, capitals..."
          className="
            w-full
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            py-5
            pl-14
            pr-5
            text-white
            outline-none
            focus:border-emerald-500
          "
        />

      </div>

      {filteredCountries.length >
        0 && (
        <div
          className="
            absolute
            top-full
            left-0
            right-0
            mt-3
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            overflow-hidden
            z-50
          "
        >

          {filteredCountries.map(
            (country) => (
              <button
                key={
                  country._id
                }
                onClick={() => {
                  onSelect(
                    country
                  );

                  setQuery(
                    country.name
                  );
                }}
                className="
                  w-full
                  px-5
                  py-4
                  text-left
                  hover:bg-slate-800
                  transition
                  flex
                  items-center
                  gap-4
                "
              >

                {country.flag ? (
                  <img
                    src={
                      country.flag
                    }
                    alt={
                      country.name
                    }
                    className="
                      w-10
                      h-10
                      rounded-full
                    "
                  />
                ) : (
                  <FaGlobeAsia
                    className="
                      text-emerald-400
                    "
                  />
                )}

                <div>

                  <p className="text-white font-medium">
                    {
                      country.name
                    }
                  </p>

                  <p className="text-slate-400 text-sm">
                    {
                      country.continent
                    }
                  </p>

                </div>

              </button>
            )
          )}

        </div>
      )}

    </div>
  );
}