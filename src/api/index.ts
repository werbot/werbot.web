import { start, done } from "nprogress";
import { getStorage, showMessage } from "@/utils";

export function api(progress: boolean = true) {
  //const logoutPath = "/auth/logout";
  const baseURL = import.meta.env.VITE_API_URL ?? "";
  const timeout = 10000;

  async function handleRequest(url: string, options: RequestInit, params: object): Promise<any> {
    if (progress) start();

    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const fullUrl = queryString ? `${baseURL}${url}?${queryString}` : baseURL + url;

    const controller = new AbortController();
    const fetchTimeout = setTimeout(() => controller.abort(), timeout);
    options.signal = controller.signal;

    try {
      const response = await fetch(fullUrl, options);
      clearTimeout(fetchTimeout);

      //if (response.status === 401) {
      //console.error(`401 error after ${attempts} attempts`);
      //return { error: `Unauthorized after ${attempts} attempts`, response };
      //document.location.href = logoutPath;
      //return;
      //}

      //if (response.status === 401) {
      //  // document.location.href = signinPath;
      //  // return;
      //  console.log("401 error");
      //}

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

        const statusMessageMap: { [key: number]: string } = {
          401: "connextError",
          404: "connextError",
          500: "connextWarning"
        };

        const messageType = statusMessageMap[response.status];
        if (messageType) {
          const message = error["result"] || error["message"];
          showMessage(message, messageType);
        }
      } catch {
        // noop
      }

      return { error, response };
    } catch (error) {
      clearTimeout(fetchTimeout);
      console.error("Unexpected error:", error);
      showMessage("Network error or request aborted", "connextWarning");
      return { error: "Network error or request aborted", response: null };
    } finally {
      if (progress) done();
    }
  }

  function createOptions(method: string, body?: HeadersInit): RequestInit {
    const accessToken = getStorage("access_token");
    const headers: HeadersInit = {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...(body && Object.keys(body).length > 0 && { "Content-Type": "application/json" })
    };

    return {
      method,
      ...(body && Object.keys(body).length > 0 && { body: JSON.stringify(body) }),
      headers
    };
  }

  return {
    /** Call a GET endpoint */
    async GET(url: string, params?: object): Promise<any> {
      return handleRequest(url, createOptions("GET"), params);
    },
    /** Call a PUT endpoint */
    async PUT(url: string, params?: object, body?: HeadersInit): Promise<any> {
      return handleRequest(url, createOptions("PUT", body), params);
    },
    /** Call a POST endpoint */
    async POST(url: string, params?: object, body?: HeadersInit): Promise<any> {
      return handleRequest(url, createOptions("POST", body), params);
    },
    /** Call a UPDATE endpoint */
    async UPDATE(url: string, params?: object, body?: HeadersInit): Promise<any> {
      return handleRequest(url, createOptions("PATCH", body), params);
    },
    /** Call a DELETE endpoint */
    async DELETE(url: string, params?: object, body?: HeadersInit): Promise<any> {
      return handleRequest(url, createOptions("DELETE", body), params);
    }
  };
}
