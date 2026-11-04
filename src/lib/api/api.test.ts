import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const authStoreMock = vi.hoisted(() => {
  const state = { token: "t" };

  return {
    getToken: vi.fn((): string => state.token),
    refreshToken: vi.fn((): Promise<void> => Promise.resolve()),
    setToken: (token: string): void => {
      state.token = token;
    }
  };
});

vi.mock("$lib/stores/auth.svelte", () => ({ authStore: authStoreMock }));

import { api } from "$lib/api";

const fetchMock = vi.fn();

function jsonResponse(body: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

function emptyResponse(status: number): Response {
  return new Response(null, { status });
}

describe("api", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    authStoreMock.setToken("t");
    authStoreMock.refreshToken.mockReset();
    authStoreMock.refreshToken.mockResolvedValue(undefined);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("adds bearer token and JSON body", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ result: "ok" }));

    const result = await api(false).POST("/v1/items", { page: 1 }, { name: "value" });

    expect(result.data).toEqual({ result: "ok" });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url.endsWith("/v1/items?page=1")).toBe(true);
    expect(options.method).toBe("POST");
    expect(options.headers).toMatchObject({
      Authorization: "Bearer t",
      "Content-Type": "application/json"
    });
    expect(options.body).toBe(JSON.stringify({ name: "value" }));
  });

  it("retries three times on network failure then returns error string", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));

    const result = await api(false).GET("/v1/failing");

    expect(result).toEqual({ error: "Network error or request aborted", response: null });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("refreshes on 401 and retries once with the new token", async () => {
    authStoreMock.refreshToken.mockImplementation(async () => {
      authStoreMock.setToken("t2");
    });
    fetchMock.mockResolvedValueOnce(emptyResponse(401)).mockResolvedValueOnce(jsonResponse({ result: "ok" }));

    const result = await api(false).GET("/v1/secure");

    expect(result.data).toEqual({ result: "ok" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(authStoreMock.refreshToken).toHaveBeenCalledTimes(1);

    const [, secondOptions] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(secondOptions.headers).toMatchObject({ Authorization: "Bearer t2" });
  });

  it("returns data for 204", async () => {
    const response = emptyResponse(204);
    fetchMock.mockResolvedValue(response);

    const result = await api(false).DELETE("/v1/items/1");

    expect(result).toEqual({ data: {}, response });
  });
});
