import api from "./api";

export const getRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};

export const createRestaurant = async (data) => {
  const response = await api.post("/restaurants", data);
  return response.data;
};

export const updateRestaurant = async (id, data) => {
  const response = await api.put(`/restaurants/${id}`, data);
  return response.data;
};

export const deleteRestaurant = async (id) => {
  const response = await api.delete(`/restaurants/${id}`);
  return response.data;
};