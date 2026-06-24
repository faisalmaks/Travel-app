import api from "./api";

export const getLocalGuides = async () => {
  const response = await api.get("/local-guides");
  return response.data;
};

export const getLocalGuideById = async (id) => {
  const response = await api.get(`/local-guides/${id}`);
  return response.data;
};