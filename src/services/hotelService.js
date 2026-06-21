import api from "./api";

export const getHotels = async () => {
  const response = await api.get("/hotels");
  return response.data;
};

export const getHotelById = async (id) => {
  const response = await api.get(`/hotels/${id}`);
  return response.data;
};

export const createHotel = async (data) => {
  const response = await api.post("/hotels", data);
  return response.data;
};

export const updateHotel = async (id, data) => {
  const response = await api.put(`/hotels/${id}`, data);
  return response.data;
};

export const deleteHotel = async (id) => {
  const response = await api.delete(`/hotels/${id}`);
  return response.data;
};