import axios from "axios";

import { useErrorStore } from "@/store";
// @ts-ignore
import * as NProgress from "nprogress";

import { getStorage } from "@/utils/storage";
import { useAuthStore } from "@/store";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.timeout = 5000;

axios.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return useAuthStore().refreshToken().then(() => {
        originalRequest.headers.Authorization = `Bearer ${getStorage("access_token")}`;
        return axios(originalRequest);
      });
    }

    if (error.response.status === 400 || error.response.status === 500) {
      useErrorStore().$state.message = error.response.data.message;
      if (error.response.data.result) {
        useErrorStore().$state.errors = error.response.data.result;
      }
    }

    return Promise.reject(error);
  }
);


axios.interceptors.request.use(
  (config) => {
    NProgress.start();
    config.headers["Authorization"] = `Bearer ${getStorage("access_token")}`;
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export function http<T = any>(method: Method, route: string, options = {}): Promise<T> {
  return axios.request<T, T>({
    method: method,
    url: route,
    ...options,
  });
}

