"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import DataTable from "@/components/DataTable";

import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "@/services/reviewService";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    user: "",
    targetType: "Hotel",
    targetId: "",
    rating: 1,
    comment: "",
    images: "",
  });

  const loadData = async () => {
    const response = await getReviews();
    setReviews(response.data || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      rating: Number(formData.rating),
      images: formData.images
        .split(",")
        .map((item) => item.trim()),
    };

    if (editingId) {
      await updateReview(editingId, payload);
    } else {
      await createReview(payload);
    }

    setOpen(false);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteReview(id);
    loadData();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Add Review
          </button>

          <DataTable
            columns={[
              "targetType",
              "rating",
              "comment",
            ]}
            data={reviews}
            onEdit={(item) => {
              setEditingId(item._id);
              setFormData(item);
              setOpen(true);
            }}
            onDelete={handleDelete}
          />

          <Modal
            open={open}
            title="Review"
            onClose={() => setOpen(false)}
          >
            <form
              onSubmit={handleSubmit}
              className="grid gap-4"
            >
              <input
                placeholder="User Id"
                value={formData.user}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    user: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <select
                value={formData.targetType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetType: e.target.value,
                  })
                }
                className="border p-2 rounded"
              >
                <option>Place</option>
                <option>Mosque</option>
                <option>Restaurant</option>
                <option>Hotel</option>
                <option>LocalGuide</option>
              </select>

              <input
                placeholder="Target Id"
                value={formData.targetId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetId: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <textarea
                placeholder="Comment"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    comment: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Image URLs"
                value={formData.images}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    images: e.target.value,
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