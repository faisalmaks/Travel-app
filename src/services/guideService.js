import api from "./api";

export const getGuides = async () => {
  const response = await api.get("/local-guides");
  return response.data;
};

export const createGuide = async (data) => {
  const response = await api.post(
    "/local-guides",
    data
  );

  return response.data;
};

export const updateGuide = async (id, data) => {
  const response = await api.put(
    `/local-guides/${id}`,
    data
  );

  return response.data;
};

export const deleteGuide = async (id) => {
  const response = await api.delete(
    `/local-guides/${id}`
  );

  return response.data;
};