import api from "./api";

export const getMosques = async () => {
  const response = await api.get("/mosque");
  return response.data;
};

export const createMosque = async (data) => {
  const response = await api.post("/mosque", data);
  return response.data;
};

export const updateMosque = async (id, data) => {
  const response = await api.put(`/mosque/${id}`, data);
  return response.data;
};

export const deleteMosque = async (id) => {
  const response = await api.delete(`/mosque/${id}`);
  return response.data;
};