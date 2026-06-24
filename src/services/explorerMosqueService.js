import { getMosques } from "./mosqueService";

export const getMosquesByCountry =
  async (countryId) => {
    const data = await getMosques();

    const mosques =
      data?.data ||
      data ||
      [];

    return mosques.filter(
      (mosque) =>
        mosque.country?._id ===
          countryId ||
        mosque.country ===
          countryId
    );
  };