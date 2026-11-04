import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const apiMock = vi.hoisted(() => vi.fn());

vi.mock("$lib/api", () => ({ api: apiMock }));

import { bootstrapStores, projectStore, systemStore, usePageData } from "$lib/stores";
import { authStore } from "$lib/stores/auth.svelte";

interface MockClient {
  GET: any;
  POST: any;
}

function mockClient(GET: any = vi.fn(), POST: any = vi.fn()): MockClient {
  apiMock.mockReturnValue({
    GET,
    POST,
    PUT: vi.fn(),
    UPDATE: vi.fn(),
    DELETE: vi.fn()
  });

  return { GET, POST };
}

function encodePart(value: object): string {
  return btoa(JSON.stringify(value)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function jwt(payload: object): string {
  return `${encodePart({ alg: "none", typ: "JWT" })}.${encodePart(payload)}.signature`;
}

describe("stores", () => {
  beforeEach(() => {
    localStorage.clear();
    apiMock.mockReset();
    authStore.resetStore();
    projectStore.resetStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("login stores both tokens and loads the profile", async () => {
    const post = vi.fn().mockResolvedValue({
      data: { result: { access_token: "access-token", refresh_token: "refresh-token" } }
    });
    mockClient(vi.fn(), post);
    const profileSpy = vi.spyOn(authStore, "getProfile").mockResolvedValue(undefined);

    await authStore.login({ email: "user@example.com", password: "secret" });

    expect(localStorage.getItem("access_token")).toBe("access-token");
    expect(localStorage.getItem("refresh_token")).toBe("refresh-token");
    expect(authStore.logged_in).toBe(true);
    expect(profileSpy).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("/auth/signin", {}, { email: "user@example.com", password: "secret" });
  });

  it("refreshToken keeps the old refresh token when response omits it", async () => {
    localStorage.setItem("refresh_token", "refresh-old");
    const post = vi.fn().mockResolvedValue({ data: { result: { access_token: "access-new" } } });
    mockClient(vi.fn(), post);
    const profileSpy = vi.spyOn(authStore, "getProfile").mockResolvedValue(undefined);

    await authStore.refreshToken();

    expect(localStorage.getItem("access_token")).toBe("access-new");
    expect(localStorage.getItem("refresh_token")).toBe("refresh-old");
    expect(authStore.logged_in).toBe(true);
    expect(profileSpy).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("/auth/refresh", {}, { refresh: "refresh-old" });
  });

  it("resetStore clears tokens and resets the project store", () => {
    localStorage.setItem("access_token", "access-token");
    localStorage.setItem("refresh_token", "refresh-token");
    const projectResetSpy = vi.spyOn(projectStore, "resetStore");

    authStore.resetStore();

    expect(localStorage.getItem("access_token")).toBeNull();
    expect(localStorage.getItem("refresh_token")).toBeNull();
    expect(authStore.logged_in).toBe(false);
    expect(projectResetSpy).toHaveBeenCalledTimes(1);
  });

  it("getProfile reads name, role, id, session_id, expires_at from the JWT and fills surname/email from the API", async () => {
    localStorage.setItem(
      "access_token",
      jwt({ sub: "session-1", exp: 1700000000, User: { name: "Alice", roles: 2, profile_id: "profile-1" } })
    );
    const get = vi.fn().mockResolvedValue({ data: { result: { surname: "Smith", email: "alice@example.com" } } });
    mockClient(get);

    await authStore.getProfile();

    expect(authStore.user).toEqual({
      id: "profile-1",
      name: "Alice",
      surname: "Smith",
      email: "alice@example.com",
      role: 2
    });
    expect(authStore.session_id).toBe("session-1");
    expect(authStore.expires_at).toBe(1700000000);
    expect(get).toHaveBeenCalledWith("/v1/profiles", { profile_id: "profile-1" });
  });

  it("projectInfo loads the single project and skips the request within the cache window", async () => {
    const get = vi.fn().mockResolvedValue({ data: { result: { title: "Project One" } } });
    mockClient(get);

    await projectStore.projectInfo("p1");

    expect(projectStore.projects.p1.info).toEqual({ title: "Project One" });
    expect(get).toHaveBeenCalledWith("/v1/projects/p1");
    expect(get).toHaveBeenCalledTimes(1);

    await projectStore.projectInfo("p1");
    expect(get).toHaveBeenCalledTimes(1);

    projectStore.projects.p1.timestamp = Date.now() - 3601 * 1000;
    await projectStore.projectInfo("p1");
    expect(get).toHaveBeenCalledTimes(2);
  });

  it("updateServerNameByID does nothing for an unknown project", async () => {
    await projectStore.updateServerNameByID("missing", "server-1", "Renamed");

    expect(projectStore.projects).toEqual({});
  });

  it("usePageData returns a mutable page state object", () => {
    const pageData = usePageData();

    pageData.loading = true;
    pageData.base = { id: "1" };

    expect(pageData).toMatchObject({
      base: { id: "1" },
      tmp: {},
      modal: false,
      skeleton: false,
      loading: true,
      error: {}
    });
  });

  it("bootstrapStores loads the profile and version for a logged-in session", async () => {
    const post = vi.fn().mockResolvedValue({
      data: { result: { access_token: "access-token", refresh_token: "refresh-token" } }
    });
    mockClient(vi.fn(), post);
    const profileSpy = vi.spyOn(authStore, "getProfile").mockResolvedValue(undefined);
    const versionSpy = vi.spyOn(systemStore, "getVersion").mockResolvedValue(undefined);

    await authStore.login({ email: "user@example.com", password: "secret" });
    profileSpy.mockClear();

    bootstrapStores();

    expect(profileSpy).toHaveBeenCalledTimes(1);
    expect(versionSpy).toHaveBeenCalledTimes(1);
  });
});
