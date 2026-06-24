import api from "./api";

export const getRestaurantsByCountry =
  async (countryId) => {
    const response =
      await api.get("/restaurants");

    const restaurants =
      response.data?.data ||
      response.data ||
      [];

    return restaurants.filter(
      (restaurant) =>
        restaurant.country?._id ===
          countryId ||
        restaurant.country ===
          countryId
    );
  };