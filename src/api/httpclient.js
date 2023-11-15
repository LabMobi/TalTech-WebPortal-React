import axios from "axios";
import { toast } from "taltech-styleguide";
import { store } from "../redux/store/store";
import { getCurrentLanguage } from "../localization/i18n.config";

const BASE_URL = `https://taltech.appit.cloud/api`;

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {},
});

// Interceptor before sending Axios requests
AxiosInstance.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log(">>>REQUEST", JSON.stringify(config));
    }
    const state = store.getState();
    const token = state?.app?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.log(">>>REQUEST ERROR", { error });
    }

    return Promise.reject(error);
  }
);

// Interceptor after receiving Axios responses
AxiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(">>>RESPONSE", { response });
    }

    return response.data;
  },
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.log(">>>RESPONSE ERROR", { error });
    }
    if (error?.response?.data?.error === "Invalid or expired OTP") {
      const otpErrorMessage =
        getCurrentLanguage() === "est"
          ? "Kehtetu või aegunud kontrollkood"
          : "Invalid or expired verification code";
      toast.error(otpErrorMessage);
      error.response.data.error = otpErrorMessage;
    } else {
      if (error?.response?.data?.error) {
        toast.error(error.response.data.error);
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      }
    }
    return Promise.reject(error);
  }
);

// An object managing HTTP requests
const HttpClient = {
  Post: async (url = "", data = {}, config = undefined) => {
    try {
      const response = await AxiosInstance.post(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  },
  Put: async (url = "", data = {}, config = undefined) => {
    try {
      const response = await AxiosInstance.put(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  },
  Get: async (url = "", params) => {
    try {
      const response = await AxiosInstance.get(url, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },
  Delete: async (url = "", params) => {
    try {
      const response = await AxiosInstance.delete(url, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },
  Patch: async (url = "", data = {}, config = undefined) => {
    try {
      const response = await AxiosInstance.patch(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default HttpClient;
