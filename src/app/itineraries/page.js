"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import TripForm from "@/components/TripForm";
import { getCountries } from "@/services/countryService";

import {
  getItineraries,
  createItinerary,
  deleteItinerary,
} from "@/services/travelItineraryService";

export default function ItinerariesPage() {
  const [trips, setTrips] = useState([]);
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([]);

  const loadTrips = async () => {
    try {
      const result =
        await getItineraries();

      setTrips(
        result.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  loadTrips();

  const loadCountries = async () => {
    try {
      const result =
        await getCountries();

      setCountries(
        result.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  loadCountries();
}, []);

const handleCreateTrip =
  async (formData) => {
    try {
      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      await createItinerary({
        title: formData.title,
        country:
          formData.country,
        budget: Number(
          formData.budget
        ),
        startDate:
          formData.startDate,
        endDate:
          formData.endDate,
        user: user.id,
      });

      setOpen(false);

      loadTrips();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <div className="flex justify-between mb-8">

            <div>

              <h1 className="text-4xl font-bold text-white">
                My Trips
              </h1>

              <p className="text-slate-400 mt-2">
                Manage travel itineraries.
              </p>

            </div>

            <button
              onClick={() =>
                setOpen(true)
              }
              className="bg-emerald-500 text-white px-5 py-3 rounded-xl"
            >
              Create Trip
            </button>

          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {trips.map((trip) => (
              <div
                key={trip._id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
              >
                <h2 className="text-2xl font-bold text-white">
                  {trip.title}
                </h2>

                <div className="space-y-2 mt-4">

                  <p className="text-slate-400">
                    Country:
                    {" "}
                    {trip.country?.name}
                  </p>

                  <p className="text-slate-400">
                    Budget:
                    {" "}
                    ${trip.budget || 0}
                  </p>

                  <p className="text-slate-400">
                    Cities:
                    {" "}
                    {trip.cities?.length || 0}
                  </p>

                </div>

                <div className="flex gap-3 mt-6">

                  <button
                    className="flex-1 bg-blue-600 text-white py-2 rounded-xl"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteItinerary(
                        trip._id
                      ).then(
                        loadTrips
                      )
                    }
                    className="flex-1 bg-red-600 text-white py-2 rounded-xl"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

          <Modal
            open={open}
            title="Create Trip"
            onClose={() =>
              setOpen(false)
            }
          >
           <TripForm
              countries={countries}
              onSubmit={
                handleCreateTrip
              }
            />
          </Modal>

        </div>
      </div>
    </div>
  );
}