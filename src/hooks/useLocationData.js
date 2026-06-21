import { useEffect, useState } from "react";
import { getCities } from "@/services/cityService";
import { getCountries } from "@/services/countryService";

export default function useLocationData() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function load() {
      const cityRes =
        await getCities();

      const countryRes =
        await getCountries();

      setCities(
        cityRes.data || []
      );

      setCountries(
        countryRes.data || []
      );
    }

    load();
  }, []);

  return {
    cities,
    countries,
  };
}