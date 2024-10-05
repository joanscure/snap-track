import { LocalStorage } from "@/core/services/localstorage-service";
import { BadRequest } from "@/core/interfaces/bad-request";
import { API_URL, TOKEN_KEY_STORAGE, USER_KEY_STORAGE } from "@/constants/App";

export const HttpService = {
  get: async (url: string) => {
    //const token = LocalStorage.get<string>(TOKEN_KEY_STORAGE);
    try {
      const response = await fetch(API_URL + url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.statusCode == 401) {
        //LocalStorage.remove(TOKEN_KEY_STORAGE);
        //LocalStorage.remove(USER_KEY_STORAGE);
        //window.location.reload();
      }
      if (data.status == 500) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
      throw Error("Something went wrong");
    }
  },
  post: async (url: string, data: { [key: string]: any }) => {
    //const token = LocalStorage.get<string>(TOKEN_KEY_STORAGE);
    const body = JSON.stringify(data);
    const _body = JSON.parse(body);
    console.log({ _body });
    const response = await fetch(API_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      body,
    });
    if (!response.ok) {
      console.log({ response });
      throw new Error(response.statusText);
    }

    const result = await response.json();
    console.log({ result });

    if (result.status == 400) {
      throw new BadRequest(result.message, result.errors);
    }

    if (result.status == 401) {
      //LocalStorage.remove(TOKEN_KEY_STORAGE);
      //LocalStorage.remove(USER_KEY_STORAGE);
      //window.location.reload();
    }
    if (result.status == 500) {
      throw new Error(result.message);
    }
    return result;
  },
  postFormData: async (url: string, data: FormData) => {
    const token = LocalStorage.get<string>(TOKEN_KEY_STORAGE);
    const response = await fetch(API_URL + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const result = await response.json();

    if (result.status == 400) {
      throw new BadRequest(result.message, result.errors);
    }

    if (result.statusCode === 401) {
      LocalStorage.remove(TOKEN_KEY_STORAGE);
      LocalStorage.remove(USER_KEY_STORAGE);
      window.location.reload();
    }
    if (result.status == 500) {
      throw new Error(result.message);
    }
    return result;
  },
  put: async (url: string, data: { [key: string]: string | number }) => {
    const token = LocalStorage.get<string>(TOKEN_KEY_STORAGE);
    const response = await fetch(API_URL + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.statusCode === 401) {
      LocalStorage.remove(TOKEN_KEY_STORAGE);
      LocalStorage.remove(USER_KEY_STORAGE);
      window.location.reload();
    }
    if (result.status == 500) {
      throw new Error(result.message);
    }
    return result;
  },
  delete: async (url: string) => {
    const token = LocalStorage.get<string>(TOKEN_KEY_STORAGE);
    const response = await fetch(API_URL + url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    if (result.statusCode === 401) {
      LocalStorage.remove(TOKEN_KEY_STORAGE);
      LocalStorage.remove(USER_KEY_STORAGE);
      window.location.reload();
    }
    if (result.status == 500) {
      throw new Error(result.message);
    }
    return result;
  },
};
