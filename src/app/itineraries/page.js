"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import DataTable from "@/components/DataTable";

import {
  getItineraries,
  createItinerary,
  updateItinerary,
  deleteItinerary,
} from "@/services/itineraryService";

import {
  getCountries,
} from "@/services/countryService";

import {
  getCities,
} from "@/services/cityService";

export default function ItineraryPage() {
  const [itineraries, setItineraries] =
    useState([]);

  const [countries, setCountries] =
    useState([]);

  const [cities, setCities] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      user: "",
      country: "",
      cities: "",
      startDate: "",
      endDate: "",
      budget: 0,
      isPublic: false,
    });

  const loadData = async () => {
    const itineraryRes =
      await getItineraries();

    const countryRes =
      await getCountries();

    const cityRes =
      await getCities();

    setItineraries(
      itineraryRes.data || []
    );

    setCountries(
      countryRes.data || []
    );

    setCities(
      cityRes.data || []
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,

      user: formData.user,

      country:
        formData.country,

      cities:
        formData.cities
          .split(",")
          .map((item) =>
            item.trim()
          ),

      startDate:
        formData.startDate,

      endDate:
        formData.endDate,

      budget: Number(
        formData.budget
      ),

      isPublic:
        formData.isPublic,
    };

    if (editingId) {
      await updateItinerary(
        editingId,
        payload
      );
    } else {
      await createItinerary(
        payload
      );
    }

    setOpen(false);

    loadData();
  };

  const handleDelete = async (
    id
  ) => {
    await deleteItinerary(id);

    loadData();
  };

  const tableData =
    itineraries.map(
      (item) => ({
        ...item,

        countryName:
          item.country
            ?.name ||
          "N/A",
      })
    );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          <button
            onClick={() =>
              setOpen(true)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Add Itinerary
          </button>

          <DataTable
            columns={[
              "title",
              "countryName",
              "budget",
              "isPublic",
            ]}
            data={tableData}
            onEdit={(item) => {
              setEditingId(
                item._id
              );

              setFormData({
                title:
                  item.title,

                user:
                  item.user
                    ?._id,

                country:
                  item.country
                    ?._id,

                cities:
                  item.cities
                    ?.map(
                      (
                        city
                      ) =>
                        city._id
                    )
                    .join(
                      ","
                    ),

                startDate:
                  item.startDate?.substring(
                    0,
                    10
                  ),

                endDate:
                  item.endDate?.substring(
                    0,
                    10
                  ),

                budget:
                  item.budget,

                isPublic:
                  item.isPublic,
              });

              setOpen(true);
            }}
            onDelete={
              handleDelete
            }
          />

          <Modal
            open={open}
            title="Travel Itinerary"
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
                placeholder="Title"
                value={
                  formData.title
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="User Id"
                value={
                  formData.user
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    user:
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

              <input
                placeholder="City IDs comma separated"
                value={
                  formData.cities
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cities:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                type="date"
                value={
                  formData.startDate
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startDate:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                type="date"
                value={
                  formData.endDate
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    endDate:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                type="number"
                placeholder="Budget"
                value={
                  formData.budget
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budget:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <label>
                <input
                  type="checkbox"
                  checked={
                    formData.isPublic
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isPublic:
                        e.target
                          .checked,
                    })
                  }
                />

                Public
              </label>

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