"use client";

import { useState } from "react";

export default function TripForm({
  countries = [],
  onSubmit,
}) {
  const [formData, setFormData] =
    useState({
      title: "",
      country: "",
      budget: "",
      startDate: "",
      endDate: "",
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="grid gap-4"
    >
      <input
        placeholder="Trip Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
        className="border p-2 rounded"
      />

      <select
        value={formData.country}
        onChange={(e) =>
          setFormData({
            ...formData,
            country: e.target.value,
          })
        }
        className="border p-2 rounded"
      >
        <option value="">
          Select Country
        </option>

        {countries.map((country) => (
          <option
            key={country._id}
            value={country._id}
          >
            {country.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Budget"
        value={formData.budget}
        onChange={(e) =>
          setFormData({
            ...formData,
            budget: e.target.value,
          })
        }
        className="border p-2 rounded"
      />

      <input
        type="date"
        value={formData.startDate}
        onChange={(e) =>
          setFormData({
            ...formData,
            startDate: e.target.value,
          })
        }
        className="border p-2 rounded"
      />

      <input
        type="date"
        value={formData.endDate}
        onChange={(e) =>
          setFormData({
            ...formData,
            endDate: e.target.value,
          })
        }
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-emerald-500 text-white py-2 rounded"
      >
        Create Trip
      </button>
    </form>
  );
}