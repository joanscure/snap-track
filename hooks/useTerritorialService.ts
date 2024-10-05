import { getCities, getStates } from "@/services/territorial.service";
import { useEffect, useState } from "react";

export const useTerrorialService = ({ state }: { state: string | null }) => {
  const [states, setStates] = useState<{ value: string; label: string }[]>([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

  const fetchStates = async () => {
    const _states = await getStates("97");
    setStates(
      _states.map((c: any) => ({
        value: String(c.id),
        label: c.name,
      }))
    );
  };

  const fetchCities = async () => {
    const _cities = await getCities(state ?? "");
    setCities(
      _cities.map((c: any) => ({
        value: String(c.id),
        label: c.name,
      }))
    );
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    console.log(state);
    if (!state) return;
    fetchCities();
  }, [state]);

  return { states, cities };
};
