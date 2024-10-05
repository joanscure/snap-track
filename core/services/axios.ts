import { API_URL } from "@/constants/App";
import { Either, Left, Right } from "@/core/interfaces/either";
import {
  BadRequestErrorType,
  BadRequestFailure,
  Failure,
} from "@/core/interfaces/failure";
import { executelogout } from "@/core/services/exeute-logout";
import { getTokenStorage } from "@/core/services/token";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface ResponseDto<T> {
  status: number;
  message: string;
  info: T;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getTokenStorage();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("error: ", error.response?.status);
    return Promise.reject(error);
  }
);

const handleUnauthorized = (error: any) => {
  if (error?.response?.status === 401) {
    console.log("error:" + error?.response?.status);
    executelogout();
  }
};

const axiosService = {
  // Axios GET method
  get: async <T>(
    url: string,
    params = {}
  ): Promise<Either<Failure, ResponseDto<T>>> => {
    console.log(url + " get");
    try {
      const response: AxiosResponse<ResponseDto<T>> = await axiosInstance.get(
        url,
        { params }
      );
      return new Right<ResponseDto<T>, ResponseDto<T>>(
        handleResponse(response)
      );
    } catch (error) {
      console.log({ server: error });
      handleUnauthorized(error);
      return new Left(handleError(error));
    }
  },

  // Axios POST method
  post: async <T>(
    url: string,
    data = {}
  ): Promise<Either<Failure, ResponseDto<T>>> => {
    try {
      console.log(url + " post");
      const response: AxiosResponse<ResponseDto<T>> = await axiosInstance.post(
        url,
        data
      );
      return new Right<ResponseDto<T>, ResponseDto<T>>(
        handleResponse(response)
      );
    } catch (error) {
      console.log({ server: error });
      handleUnauthorized(error);
      return new Left(handleError(error));
    }
  },

  // Axios PUT method
  put: async <T>(
    url: string,
    data = {}
  ): Promise<Either<Failure, ResponseDto<T>>> => {
    console.log(url + " post");
    try {
      const response: AxiosResponse<ResponseDto<T>> = await axiosInstance.put(
        url,
        data
      );
      return new Right<ResponseDto<T>, ResponseDto<T>>(
        handleResponse(response)
      );
    } catch (error) {
      console.log({ server: error });
      handleUnauthorized(error);
      return new Left(handleError(error));
    }
  },

  // Axios DELETE method
  delete: async <T>(url: string): Promise<Either<Failure, ResponseDto<T>>> => {
    try {
      const response: AxiosResponse<ResponseDto<T>> =
        await axiosInstance.delete(url);
      return new Right<ResponseDto<T>, ResponseDto<T>>(
        handleResponse(response)
      );
    } catch (error) {
      console.log({ server: error });
      handleUnauthorized(error);
      return new Left(handleError(error));
    }
  },
};

// Helper function to handle successful responses
const handleResponse = <T>(
  response: AxiosResponse<ResponseDto<T>>
): ResponseDto<T> => {
  const data = response.data;
  return {
    status: response.status,
    message: data.message,
    info: data.info,
  };
};

// Helper function to handle errors
const handleError = (error: any): Failure => {
  if (error.response) {
    const data = error.response.data;

    let errosString = "";
    if (data.errors) {
      errosString = formatErrorObjectToString(data.errors);
    }
    return new BadRequestFailure(data.message, data.errors, errosString);
  }
  return {
    message: error.response?.statusText || "Unknown Error",
  };
};
const formatErrorObjectToString = (errorObject: BadRequestErrorType) => {
  let result = "";
  let count = 0;
  for (const key in errorObject) {
    if (Object.prototype.hasOwnProperty.call(errorObject, key)) {
      result += `${++count}. ${errorObject[key][0]}\n`;
    }
  }
  if (result.length > 0) {
    result = result.slice(0, -1);
  }
  return result;
};

export default axiosService;
