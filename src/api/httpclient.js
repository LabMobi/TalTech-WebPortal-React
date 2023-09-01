import axios from "axios";
import { toast } from "taltech-styleguide";
import { store } from "../redux/store/store";

const BASE_URL = `https://taltech.appit.cloud/api`;

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {},
});

let requestInProgress = false; // Is a request in progress?
let intervalId = null; // setInterval ID
let currentLanguage;

// Interceptor before sending Axios requests
AxiosInstance.interceptors.request.use(
  (config) => {
    requestInProgress = true;

    if (process.env.NODE_ENV === "development") {
      console.log(">>>REQUEST", JSON.stringify(config));
    }
    const state = store.getState();
    currentLanguage = state.app.currentLanguage;
    const token = state?.app?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    requestInProgress = false;
    if (process.env.NODE_ENV === "development") {
      console.log(">>>REQUEST ERROR", { error });
    }

    return Promise.reject(error);
  }
);

// Interceptor after receiving Axios responses
AxiosInstance.interceptors.response.use(
  (response) => {
    requestInProgress = false;

    // if (process.env.NODE_ENV === "development") {
    console.log(">>>RESPONSE", { response });
    // }

    return response.data;
  },
  (error) => {
    requestInProgress = false;

    if (process.env.NODE_ENV === "development") {
      console.log(">>>RESPONSE ERROR", { error });
    }

    if (error?.response?.data?.error) {
      toast.error(
        `${error.response.data.error} - Code: ${
          error.response.status || error.response.code
        }`
      );
    } else if (error?.response?.data?.message) {
      toast.error(
        `${error.response.data.message} - Code: ${
          error.response.status || error.response.code
        }`
      );
    } else if (error.message) {
      toast.error(
        `${error.message} - Code: ${
          error.response.status || error.response.code
        }`
      );
    }

    return Promise.reject(error);
  }
);

// Informs the user if a request is still in progress
function checkRequestInProgress() {
  if (requestInProgress) {
    toast.info(
      currentLanguage === "est"
        ? "Operatsioon on veel pooleli..."
        : "The operation is still in progress..."
    );
  }
}

// Starts a setInterval to periodically check the request status
function startRequestInterval() {
  intervalId = setInterval(checkRequestInProgress, 3000);
}

// Stops the setInterval
function stopRequestInterval() {
  clearInterval(intervalId);
}

// An object managing HTTP requests
const HttpClient = {
  Post: async (url = "", data = {}, config = undefined) => {
    try {
      startRequestInterval();
      const response = await AxiosInstance.post(url, data, config);
      return response;
    } catch (error) {
      throw error;
    } finally {
      stopRequestInterval();
    }
  },
  Put: async (url = "", data = {}, config = undefined) => {
    try {
      startRequestInterval();
      const response = await AxiosInstance.put(url, data, config);
      return response;
    } catch (error) {
      throw error;
    } finally {
      stopRequestInterval();
    }
  },
  Get: async (url = "", params) => {
    try {
      startRequestInterval();
      const response = await AxiosInstance.get(url, { params });
      return response;
    } catch (error) {
      throw error;
    } finally {
      stopRequestInterval();
    }
  },
  Delete: async (url = "", params) => {
    try {
      startRequestInterval();
      const response = await AxiosInstance.delete(url, { params });
      return response;
    } catch (error) {
      throw error;
    } finally {
      stopRequestInterval();
    }
  },
  Patch: async (url = "", data = {}, config = undefined) => {
    try {
      startRequestInterval();
      const response = await AxiosInstance.patch(url, data, config);
      return response;
    } catch (error) {
      throw error;
    } finally {
      stopRequestInterval();
    }
  },
};

export default HttpClient;
