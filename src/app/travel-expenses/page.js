"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import DataTable from "@/components/DataTable";

import {
  getTravelExpenses,
  createTravelExpense,
  updateTravelExpense,
  deleteTravelExpense,
} from "@/services/travelExpenseService";

import {
  getItineraries,
} from "@/services/itineraryService";

export default function TravelExpensesPage() {
  const [expenses, setExpenses] =
    useState([]);

  const [itineraries, setItineraries] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      itinerary: "",
      category: "other",
      amount: 0,
      currency: "EUR",
      spentAt: "",
      note: "",
    });

  const loadData = async () => {
    const expenseRes =
      await getTravelExpenses();

    const itineraryRes =
      await getItineraries();

    setExpenses(
      expenseRes.data || []
    );

    setItineraries(
      itineraryRes.data || []
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      itinerary:
        formData.itinerary,

      category:
        formData.category,

      amount: Number(
        formData.amount
      ),

      currency:
        formData.currency,

      spentAt:
        formData.spentAt,

      note:
        formData.note,
    };

    if (editingId) {
      await updateTravelExpense(
        editingId,
        payload
      );
    } else {
      await createTravelExpense(
        payload
      );
    }

    setOpen(false);

    loadData();
  };

  const handleDelete = async (
    id
  ) => {
    await deleteTravelExpense(id);

    loadData();
  };

  const tableData =
    expenses.map(
      (item) => ({
        ...item,

        itineraryTitle:
          item.itinerary
            ?.title ||
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
            Add Expense
          </button>

          <DataTable
            columns={[
              "itineraryTitle",
              "category",
              "amount",
              "currency",
            ]}
            data={tableData}
            onEdit={(item) => {
              setEditingId(
                item._id
              );

              setFormData({
                itinerary:
                  item.itinerary
                    ?._id,

                category:
                  item.category,

                amount:
                  item.amount,

                currency:
                  item.currency,

                spentAt:
                  item.spentAt?.substring(
                    0,
                    10
                  ),

                note:
                  item.note,
              });

              setOpen(true);
            }}
            onDelete={
              handleDelete
            }
          />

          <Modal
            open={open}
            title="Travel Expense"
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

              <select
                value={
                  formData.itinerary
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    itinerary:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              >
                <option value="">
                  Select Itinerary
                </option>

                {itineraries.map(
                  (
                    itinerary
                  ) => (
                    <option
                      key={
                        itinerary._id
                      }
                      value={
                        itinerary._id
                      }
                    >
                      {
                        itinerary.title
                      }
                    </option>
                  )
                )}
              </select>

              <select
                value={
                  formData.category
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              >
                <option>
                  food
                </option>

                <option>
                  hotel
                </option>

                <option>
                  transport
                </option>

                <option>
                  tickets
                </option>

                <option>
                  shopping
                </option>

                <option>
                  visa
                </option>

                <option>
                  other
                </option>

              </select>

              <input
                type="number"
                placeholder="Amount"
                value={
                  formData.amount
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount:
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
                type="date"
                value={
                  formData.spentAt
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    spentAt:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <textarea
                placeholder="Note"
                value={
                  formData.note
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    note:
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