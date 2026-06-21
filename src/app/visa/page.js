"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import DataTable from "@/components/DataTable";

import {
  getVisaInfo,
  createVisaInfo,
  updateVisaInfo,
} from "@/services/visaService";

import {
  getCountries,
} from "@/services/countryService";

export default function VisaPage() {
  const [visaData, setVisaData] =
    useState([]);

  const [countries, setCountries] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      _id: "",
      country: "",
      passportCountry: "India",
      visaType: "",
      applicationMode: "embassy",
      documentsRequired: "",
      processingTime: "",
      feeAmount: 0,
      feeCurrency: "EUR",
      officialWebsite: "",
      notes: "",
    });

  const loadData = async () => {
    const visaRes =
      await getVisaInfo();

    const countryRes =
      await getCountries();

    setVisaData(
      visaRes.data || []
    );

    setCountries(
      countryRes.data || []
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      country:
        formData.country,

      passportCountry:
        formData.passportCountry,

      visaType:
        formData.visaType,

      applicationMode:
        formData.applicationMode,

      documentsRequired:
        formData.documentsRequired
          .split(",")
          .map((item) =>
            item.trim()
          ),

      processingTime:
        formData.processingTime,

      fee: {
        amount: Number(
          formData.feeAmount
        ),

        currency:
          formData.feeCurrency,
      },

      officialWebsite:
        formData.officialWebsite,

      notes:
        formData.notes,
    };

    if (editingId) {
      payload._id =
        editingId;

      await updateVisaInfo(
        payload
      );
    } else {
      await createVisaInfo(
        payload
      );
    }

    setOpen(false);

    loadData();
  };

  const tableData =
    visaData.map(
      (item) => ({
        ...item,

        countryName:
          item.country
            ?.name ||
          "N/A",

        feeAmount:
          item.fee
            ?.amount,

        feeCurrency:
          item.fee
            ?.currency,
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
            Add Visa Info
          </button>

          <DataTable
            columns={[
              "countryName",
              "passportCountry",
              "visaType",
              "applicationMode",
              "feeAmount",
            ]}
            data={tableData}
            onEdit={(item) => {
              setEditingId(
                item._id
              );

              setFormData({
                _id:
                  item._id,

                country:
                  item.country
                    ?._id,

                passportCountry:
                  item.passportCountry,

                visaType:
                  item.visaType,

                applicationMode:
                  item.applicationMode,

                documentsRequired:
                  item.documentsRequired?.join(
                    ", "
                  ),

                processingTime:
                  item.processingTime,

                feeAmount:
                  item.fee
                    ?.amount,

                feeCurrency:
                  item.fee
                    ?.currency,

                officialWebsite:
                  item.officialWebsite,

                notes:
                  item.notes,
              });

              setOpen(true);
            }}
            onDelete={() => {}}
          />

          <Modal
            open={open}
            title="Visa Information"
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
                placeholder="Passport Country"
                value={
                  formData.passportCountry
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    passportCountry:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Visa Type"
                value={
                  formData.visaType
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    visaType:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <select
                value={
                  formData.applicationMode
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    applicationMode:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              >
                <option>
                  evisa
                </option>

                <option>
                  embassy
                </option>

                <option>
                  visa_on_arrival
                </option>

                <option>
                  visa_free
                </option>

                <option>
                  other
                </option>

              </select>

              <input
                placeholder="Documents Required"
                value={
                  formData.documentsRequired
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    documentsRequired:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Processing Time"
                value={
                  formData.processingTime
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    processingTime:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                type="number"
                placeholder="Fee Amount"
                value={
                  formData.feeAmount
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeAmount:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Fee Currency"
                value={
                  formData.feeCurrency
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeCurrency:
                      e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Official Website"
                value={
                  formData.officialWebsite
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    officialWebsite:
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