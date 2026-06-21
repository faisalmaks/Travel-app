import api from "./api";

export const getFavorites = async () => {
  const response = await api.get("/favorite");
  return response.data;
};

export const createFavorite = async (data) => {
  const response = await api.post(
    "/favorite",
    data
  );

  return response.data;
};

export const updateFavorite = async (id, data) => {
  const response = await api.put(
    `/favorite/${id}`,
    data
  );

  return response.data;
};

export const deleteFavorite = async (id) => {
  const response = await api.delete(
    `/favorite/${id}`
  );

  return response.data;
};