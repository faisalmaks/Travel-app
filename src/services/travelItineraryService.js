import api from "./api";

export const getItineraries = async () => {
  const response = await api.get(
    "/travel-itineraries"
  );

  return response.data;
};

export const getItineraryById =
  async (id) => {
    const response =
      await api.get(
        `/travel-itineraries/${id}`
      );

    return response.data;
  };

export const createItinerary =
  async (data) => {
    const response =
      await api.post(
        "/travel-itineraries",
        data
      );

    return response.data;
  };

export const updateItinerary =
  async (id, data) => {
    const response =
      await api.put(
        `/travel-itineraries/${id}`,
        data
      );

    return response.data;
  };

export const deleteItinerary =
  async (id) => {
    const response =
      await api.delete(
        `/travel-itineraries/${id}`
      );

    return response.data;
  };