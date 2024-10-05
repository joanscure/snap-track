import { HttpService } from "@/core/services/http-service";

export const getCountries = async () => {
  const data = await HttpService.get("/company/countries-admin");
  return data.info;
};
export const getStates = async (countryId: string) => {
  if (countryId == "") return [];
  const data = await HttpService.get(`/company/public-states/${countryId}`);
  return data.info;
};
export const getCities = async (stateId: string) => {
  if (stateId == "") return [];
  const data = await HttpService.get(`/company/public-cities/${stateId}`);
  return data.info;
};
