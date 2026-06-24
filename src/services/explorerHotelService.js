import api from "./api";

export const getHotelsByCountry = async (
  countryId
) => {
  const response =
    await api.get("/hotels");

  const hotels =
    response.data?.data ||
    response.data ||
    [];

  return hotels.filter(
    (hotel) =>
      hotel.country?._id ===
        countryId ||
      hotel.country === countryId
  );
};