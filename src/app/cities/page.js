"use client";

import { useEffect, useState } from "react";
import EntityCard from "@/components/EntityCard";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";


import {
  getCities,
  createCity,
  updateCity,
  deleteCity,
} from "@/services/cityService";

import {
  getCountries,
} from "@/services/countryService";

export default function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    latitude: "",
    longitude: "",
    popularFor: "",
    muslimPopulationNote: "",
    bestTimeToVisit: "",
  });

  const loadData = async () => {
    try {
      const cityResponse =
        await getCities();

      const countryResponse =
        await getCountries();

      setCities(cityResponse.data || []);

      setCountries(
        countryResponse.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      country: "",
      description: "",
      latitude: "",
      longitude: "",
      popularFor: "",
      muslimPopulationNote: "",
      bestTimeToVisit: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,

      latitude: Number(
        formData.latitude
      ),

      longitude: Number(
        formData.longitude
      ),

      popularFor:
        formData.popularFor
          .split(",")
          .map((item) =>
            item.trim()
          ),
    };

    try {
      if (editingId) {
        await updateCity(
          editingId,
          payload
        );
      } else {
        await createCity(payload);
      }

      setOpen(false);

      resetForm();

      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (city) => {
    setEditingId(city._id);

    setFormData({
      name: city.name || "",

      country:
        city.country?._id ||
        city.country,

      description:
        city.description || "",

      latitude:
        city.latitude || "",

      longitude:
        city.longitude || "",

      popularFor:
        city.popularFor?.join(
          ", "
        ) || "",

      muslimPopulationNote:
        city.muslimPopulationNote ||
        "",

      bestTimeToVisit:
        city.bestTimeToVisit ||
        "",
    });

    setOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      confirm(
        "Delete this city?"
      );

    if (!confirmDelete) return;

    await deleteCity(id);

    loadData();
  };

  const filteredCities =
    cities.filter((city) =>
      city.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const tableData =
    filteredCities.map((city) => ({
      ...city,

      country:
        city.country?.name ||
        "N/A",
    }));

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          <div className="flex justify-between mb-6">

            <h1 className="text-3xl font-bold">
              Cities
            </h1>

            <button
              onClick={() => {
                resetForm();
                setOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add City
            </button>

          </div>

          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full border p-2 rounded mb-5"
          />

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <EntityCard
                key={city._id}
                title={city.name}
                subtitle={city.country?.name}
                description={city.description}
                badge="City"
                onEdit={() => handleEdit(city)}
                onDelete={() =>
                  handleDelete(city._id)
                }
              />
            ))}
          </div>

          <Modal
            open={open}
            title={
              editingId
                ? "Edit City"
                : "Add City"
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
                type="text"
                placeholder="City Name"
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

              <select
                value={
                  formData.country
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    country:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              >
                <option value="">
                  Select Country
                </option>

                {countries.map(
                  (
                    country
                  ) => (
                    <option
                      key={
                        country._id
                      }
                      value={
                        country._id
                      }
                    >
                      {
                        country.name
                      }
                    </option>
                  )
                )}
              </select>

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
                placeholder="Latitude"
                value={
                  formData.latitude
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    latitude:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Longitude"
                value={
                  formData.longitude
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    longitude:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Popular For (comma separated)"
                value={
                  formData.popularFor
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    popularFor:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Muslim Population Note"
                value={
                  formData.muslimPopulationNote
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    muslimPopulationNote:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Best Time To Visit"
                value={
                  formData.bestTimeToVisit
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bestTimeToVisit:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

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