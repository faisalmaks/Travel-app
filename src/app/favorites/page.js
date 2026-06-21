"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import DataTable from "@/components/DataTable";

import {
  getFavorites,
  createFavorite,
  deleteFavorite,
  updateFavorite,
} from "@/services/favoriteService";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    user: "",
    itemType: "Country",
    itemId: "",
    notes: "",
  });

  const loadData = async () => {
    const response =
      await getFavorites();

    setFavorites(
      response.data || []
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateFavorite(
        editingId,
        formData
      );
    } else {
      await createFavorite(
        formData
      );
    }

    setOpen(false);

    loadData();
  };

  const handleDelete = async (id) => {
    await deleteFavorite(id);

    loadData();
  };

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
            Add Favorite
          </button>

          <DataTable
            columns={[
              "itemType",
              "notes",
            ]}
            data={favorites}
            onEdit={(item) => {
              setEditingId(
                item._id
              );

              setFormData(item);

              setOpen(true);
            }}
            onDelete={
              handleDelete
            }
          />

          <Modal
            open={open}
            title="Favorite"
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
                  formData.itemType
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    itemType:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              >
                <option>
                  Country
                </option>

                <option>
                  City
                </option>

                <option>
                  Place
                </option>

                <option>
                  Mosque
                </option>

                <option>
                  Restaurant
                </option>

                <option>
                  Hotel
                </option>

                <option>
                  TravelItinerary
                </option>

              </select>

              <input
                placeholder="Item Id"
                value={
                  formData.itemId
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    itemId:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <textarea
                placeholder="Notes"
                value={
                  formData.notes
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notes:
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