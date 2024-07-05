/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { done, start } from "nprogress";
import { useAuthStore } from "@/store";

export function api(progress: boolean = true) {
  const baseURL = import.meta.env.VITE_API_URL ?? "";
  const timeoutDuration = 5000;
  const retry = 3;
  const retryDelay = 500;

  async function handleRequest(url: string, options: RequestInit, params: Record<string, any> = {}): Promise<any> {
    if (progress) {
      start();
    }

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${baseURL}${url}?${queryString}` : baseURL + url;

    try {
      let response = await fetchRetry(fullUrl, retryDelay, retry, options);

      if (response.status === 401) {
        const authStore = useAuthStore();
        await authStore.refreshToken();

        const newToken = authStore.getToken();
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newToken}`
        };
        response = await fetchRetry(fullUrl, retryDelay, retry, options);
      }

      if (response.status === 204 || response.headers.get("Content-Length") === "0") {
        return response.ok ? { data: {}, response } : { error: {}, response };
      }

      if (response.ok) {
        return { data: await response.json(), response };
      }

      // handle errors
      let error: string | object = await response.text();
      try {
        error = JSON.parse(error);
      } catch {
        // noop
      }

      return { error, response };
    } catch (error) {
      console.error("Unexpected error:", error);
      return { error: "Network error or request aborted", response: null };
    } finally {
      if (progress) {
        done();
      }
    }
  }

  function createOptions(method: string, body?: HeadersInit): RequestInit {
    const authStore = useAuthStore();
    const token = authStore.getToken();

    const headers: HeadersInit = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(body && Object.keys(body).length > 0 && { "Content-Type": "application/json" })
    };

    return {
      method,
      ...(body && Object.keys(body).length > 0 && { body: JSON.stringify(body) }),
      headers
    };
  }

  function wait(delay: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  async function fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    options.signal = controller.signal;

    try {
      const response = await fetch(url, options);
      clearTimeout(timeoutId);
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  async function fetchRetry(url: string, delay: number, tries: number, fetchOptions: RequestInit): Promise<Response> {
    for (let attempt = 1; attempt <= tries; attempt++) {
      try {
        return await fetchWithTimeout(url, fetchOptions, timeoutDuration);
      } catch (err) {
        if (attempt === tries) {
          throw err;
        }
        await wait(delay);
      }
    }
  }

  return {
    async GET(url: string, params?: object): Promise<any> {
      return handleRequest(url, createOptions("GET"), params);
    },

    async PUT(url: string, params?: object, body?: any): Promise<any> {
      return handleRequest(url, createOptions("PUT", body), params);
    },

    async POST(url: string, params?: object, body?: any): Promise<any> {
      return handleRequest(url, createOptions("POST", body), params);
    },

    async UPDATE(url: string, params?: object, body?: any): Promise<any> {
      return handleRequest(url, createOptions("PATCH", body), params);
    },

    async DELETE(url: string, params?: object, body?: any): Promise<any> {
      return handleRequest(url, createOptions("DELETE", body), params);
    }
  };
}
