import api from "./api";

export const getVisaInfo = async () => {
  const response = await api.get("/visa-info");
  return response.data;
};

export const getVisaInfoById = async (id) => {
  const response = await api.get(`/visa-info/${id}`);
  return response.data;
};