import api from "./api";

export const getCountries = async () => {
  const response = await api.get("/countries");
  return response.data;
};

export const getCountryById = async (id) => {
  const response = await api.get(`/countries/${id}`);
  return response.data;
};

export const createCountry = async (data) => {
  const response = await api.post("/countries", data);
  return response.data;
};

export const updateCountry = async (id, data) => {
  const response = await api.put(`/countries/${id}`, data);
  return response.data;
};

export const deleteCountry = async (id) => {
  const response = await api.delete(`/countries/${id}`);
  return response.data;
};