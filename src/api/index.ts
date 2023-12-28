import axios from "axios";

// @ts-ignore
import * as NProgress from "nprogress";

import { getStorage } from "@/utils/storage";
import { useAuthStore, useErrorStore } from "@/store";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.timeout = 15000;

// This code intercepts responses from Axios requests and performs certain actions based on the response.
axios.interceptors.response.use(
  // If the response is successful, hide the progress bar and return the response.
  (response) => {
    NProgress.done();
    return response;
  },
  // If there is an error in the response, hide the progress bar and perform further actions based on
  // the status code and other parts of the error response.
  async (error) => {
    NProgress.done();

    const { status, config, data } = error.response;

    // If the status code is 401 (unauthorized) and this request hasn't already been retried,
    // attempt to refresh the token and retry the request with the new token.
    if (status === 401 && !config.__isRetryRequest) {
      try {
        config.__isRetryRequest = true;
        await useAuthStore().refreshToken();
        config.headers.Authorization = `Bearer ${getStorage("access_token")}`;
        return axios(config);
      } catch (error) {
        // If there's an error while attempting to refresh the token, reject the promise.
        // The error will be handled by the caller of the original request.
        return Promise.reject(error);
      }
    }
    // If the status code is 400 or 500, extract the error message and any validation errors
    // from the error response and store them in the appropriate stores using the `useErrorStore` hook.
    else if (status === 400 || status === 404 || status === 500) {
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

    // In all cases, reject the promise with the original error.
    // The error will be handled by the caller of the original request.
    return Promise.reject(error);
  },
);

// This code intercepts requests from Axios and adds an authentication header to them,
// as well as displaying a progress bar.
axios.interceptors.request.use(
  // If the request is successful, show the progress bar and add the authorization header
  (config) => {
    NProgress.start();
    const token = getStorage("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // If there's an error in the request, hide the progress bar and reject the promise with the error.
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  },
);

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// This function is a generic http request helper that can be used to call any Rest API endpoint.
export function http<T = any>(method: Method, route: string, options = {}): Promise<T> {
  const config = {
    method,
    url: route,
    ...options,
  };
  return axios.request<T, T>(config);
}
