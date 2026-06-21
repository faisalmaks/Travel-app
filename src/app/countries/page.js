"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DataTable from "@/components/DataTable";
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

            <h1 className="text-3xl font-bold">
              Countries
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
            className="border p-2 w-full mb-4 rounded"
          />

          <DataTable
            columns={[
              "name",
              "code",
              "continent",
              "currency",
              "safetyLevel",
            ]}
            data={filteredCountries}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

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