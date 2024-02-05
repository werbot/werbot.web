/*
import type { FetchRequest, FetchOptions, FetchResponse } from "ofetch";
import { ofetch } from "ofetch";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3003";
const fetcher = ofetch.create({
  baseURL: `${API_URL}/api`,
  async onRequest({ options }) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  },
  async onResponse({ response }) {
    if (response.status === 401 && localStorage.getItem("refresh_token")) {
      const { accessToken } = await ofetch("/auth/token", {
        baseURL: `${API_URL}/api`,
        method: "POST",
        body: {
          accessToken: localStorage.getItem("access_token"),
          refreshToken: localStorage.getItem("refresh_token"),
        },
      });

      localStorage.setItem("access_token", accessToken);
    }
  },
});

export default async <T>(request: FetchRequest, options?: FetchOptions) => {
  try {
    const response = await fetcher.raw(request, options);
    return response as FetchResponse<T>;
  } catch (error: any) {
    if (error.response?.status === 401 && localStorage.getItem("refresh_token")) {
      const response = await fetcher.raw(request, options);
      return response as FetchResponse<T>;
    }

    return error.response as FetchResponse<T>;
  }
};
*/
