import api from "./api";

export const getReviews = async () => {
  const response = await api.get("/reviews");
  return response.data;
};

export const createReview = async (data) => {
  const response = await api.post("/reviews", data);
  return response.data;
};

export const updateReview = async (id, data) => {
  const response = await api.put(`/reviews/${id}`, data);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await api.delete(`/reviews/${id}`);
  return response.data;
};