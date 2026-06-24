"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import CountryCard from "@/components/CountryCard";
import Modal from "@/components/Modal";

import {
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} from "@/services/countryService";

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] = useState({
      name: "",
      code: "",
      continent: "",
      description: "",
      currency: "",
      languages: "",
      bestTimeToVisit: "",
      safetyLevel: "medium",

      image: "",
      flag: "",
      capital: "",
      population: "",
      timezone: "",

      location: {
        lat: "",
        lng: "",
      },
    });

  const loadCountries = async () => {
    try {
      const result = await getCountries();

      setCountries(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      languages:
        formData.languages
          .split(",")
          .map((item) => item.trim()),
    };

    try {
      if (editingId) {
        await updateCountry(
          editingId,
          payload
        );
      } else {
        await createCountry(payload);
      }

      setOpen(false);

      setEditingId(null);

      loadCountries();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (country) => {
    setEditingId(country._id);

    setFormData({
      ...country,
      languages:
        country.languages?.join(", "),
    });

    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Delete this country?"
      )
    )
      return;

    await deleteCountry(id);

    loadCountries();
  };

  const filteredCountries =
    countries.filter((country) =>
      country.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          <div className="flex justify-between mb-6">

            <h1 className="text-5xl font-bold text-white">
              Explore Countries
            </h1>

            <button
              onClick={() =>
                setOpen(true)
              }
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Country
            </button>

          </div>

          <input
            placeholder="Search Country"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              px-5
              py-4
              text-white
              mb-8
            "
          />

          <div className="grid lg:grid-cols-3 gap-8">

            {filteredCountries.map((country) => (

              <CountryCard
                key={country._id}
                country={country}
              />

            ))}

          </div>

          <Modal
            open={open}
            title={
              editingId
                ? "Edit Country"
                : "Add Country"
            }
            onClose={() =>
              setOpen(false)
            }
          >
            <form
              onSubmit={
                handleSubmit
              }
              className="grid gap-4"
            >
              <input
                placeholder="Country Name"
                value={
                  formData.name
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Code"
                value={
                  formData.code
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    code:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Continent"
                value={
                  formData.continent
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    continent:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Currency"
                value={
                  formData.currency
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currency:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Country Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Flag URL"
                value={formData.flag}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    flag: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Capital"
                value={formData.capital}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capital: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Population"
                value={formData.population}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    population: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Timezone"
                value={formData.timezone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    timezone: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Latitude"
                value={formData.location.lat}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      lat: e.target.value,
                    },
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Longitude"
                value={formData.location.lng}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      lng: e.target.value,
                    },
                  })
                }
                className="border p-2 rounded"
              />

              <textarea
                placeholder="Description"
                value={
                  formData.description
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Languages comma separated"
                value={
                  formData.languages
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    languages:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <select
                value={
                  formData.safetyLevel
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    safetyLevel:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>

              <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded"
              >
                Save
              </button>
            </form>
          </Modal>

        </div>
      </div>
    </div>
  );
}