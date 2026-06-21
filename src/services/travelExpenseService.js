import api from "./api";

export const getTravelExpenses = async () => {
  const response = await api.get(
    "/travel-expenses"
  );

  return response.data;
};

export const getTravelExpenseById = async (
  id
) => {
  const response = await api.get(
    `/travel-expenses/${id}`
  );

  return response.data;
};

export const createTravelExpense = async (
  data
) => {
  const response = await api.post(
    "/travel-expenses",
    data
  );

  return response.data;
};

export const updateTravelExpense = async (
  id,
  data
) => {
  const response = await api.put(
    `/travel-expenses/${id}`,
    data
  );

  return response.data;
};

export const deleteTravelExpense = async (
  id
) => {
  const response = await api.delete(
    `/travel-expenses/${id}`
  );

  return response.data;
};