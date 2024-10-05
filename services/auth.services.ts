import { HttpService } from "@/core/services/http-service";

export const loginCustomer = (username: string, password: string) => {
  return HttpService.post("/auth/login-public", {
    username,
    password,
  });
};

export const createCustomer = async (body: any) => {
  const data = await HttpService.post("/customer/public", body);
  return data.info as any;
};
export const forgotPassswordCustomer = async (body: any) => {
  const data = await HttpService.post("/customer-logistics/send-code", body);
  return data.info as any;
};
