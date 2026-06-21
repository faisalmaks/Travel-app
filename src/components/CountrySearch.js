"use client";

export default function CountrySearch({
  countries,
  onSelect,
}) {
  return (
    <div className="mb-8">

      <input
        type="text"
        placeholder="Search country..."
        className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white"
        onChange={(e) => {
          const value =
            e.target.value.toLowerCase();

          const country =
            countries.find(
              (c) =>
                c.name
                  .toLowerCase()
                  .includes(value)
            );

          if (country) {
            onSelect(country);
          }
        }}
      />

    </div>
  );
}