import { HttpService } from "@/core/services/http-service";

export const getInfo = async () => {
  const data = await HttpService.get("/customer-logistics/info");
  return data.info as any;
};
export const saveTracking = (trackingArray: string[], notes: string) => {
  return HttpService.post("/customer-logistics/save-alerts", {
    trackingArray,
    notes,
  });
};
