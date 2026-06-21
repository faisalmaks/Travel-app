import api from "./api";

export const getCities = async () => {
  const response = await api.get("/cities");
  return response.data;
};

export const getCityById = async (id) => {
  const response = await api.get(`/cities/${id}`);
  return response.data;
};

export const createCity = async (data) => {
  const response = await api.post("/cities", data);
  return response.data;
};

export const updateCity = async (id, data) => {
  const response = await api.put(`/cities/${id}`, data);
  return response.data;
};

export const deleteCity = async (id) => {
  const response = await api.delete(`/cities/${id}`);
  return response.data;
};