import axios from "axios";
import * as NProgress from "nprogress";

import { getStorage } from "@/utils/storage";
import { useAuthStore, useErrorStore } from "@/store";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.timeout = 15000;

axios.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },

  async (error) => {
    NProgress.done();
    const { status, config, data } = error.response;

    if (status === 401 && !config.__isRetryRequest) {
      if (data.result === "The token has been revoked") {
        useAuthStore().resetStore();
        window.location.reload();
      }

      try {
        config.__isRetryRequest = true;
        await useAuthStore().refreshToken();
        config.headers.Authorization = `Bearer ${getStorage("access_token")}`;
        return axios(config);
      } catch (error) {
        return Promise.reject(error);
      }
    } else if (status === 400 || status === 404 || status === 500) {
      const { message, result } = data;
      const errorStore = useErrorStore();
      if (typeof result === "string") {
        errorStore.resetStore();
        errorStore.setErrorMessage(result);
      } else {
        errorStore.setErrorMessage(message);
        if (result) {
          errorStore.setErrors(result);
        }
      }
    }
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  (config) => {
    NProgress.start();
    const token = getStorage("access_token");

    //var isoDateString = new Date().toISOString();
    //if (isoDateString > getStorage("expires_at")) {
    //  useAuthStore().refreshToken();
    //}

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  },
);

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export function http<T = any>(method: Method, route: string, options = {}): Promise<T> {
  const config = {
    method,
    url: route,
    ...options,
  };
  return axios.request<T, T>(config);
}
