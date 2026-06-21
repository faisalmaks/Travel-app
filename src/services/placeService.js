import api from "./api";

export const getPlaces = async () => {
  const response = await api.get("/places");
  return response.data;
};

export const getPlaceById = async (id) => {
  const response = await api.get(`/places/${id}`);
  return response.data;
};

export const createPlace = async (data) => {
  const response = await api.post("/places", data);
  return response.data;
};

export const updatePlace = async (id, data) => {
  const response = await api.patch(`/places/${id}`, data);
  return response.data;
};

export const deletePlace = async (id) => {
  const response = await api.delete(`/places/${id}`);
  return response.data;
};