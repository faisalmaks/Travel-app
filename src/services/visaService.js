import api from "./api";

export const getVisaInfo = async () => {
  const response = await api.get("/visa-info");
  return response.data;
};

export const getVisaInfoById = async (id) => {
  const response = await api.get(
    `/visa-info/${id}`
  );

  return response.data;
};

export const createVisaInfo = async (data) => {
  const response = await api.post(
    "/visa-info",
    data
  );

  return response.data;
};

export const updateVisaInfo = async (data) => {
  const response = await api.put(
    "/visa-info",
    data
  );

  return response.data;
};