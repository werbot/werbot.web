import { render, screen } from "@testing-library/svelte";
import { createRawSnippet, type Snippet, tick } from "svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";

const gotoMock = vi.hoisted(() => vi.fn());

vi.mock("$app/navigation", () => ({ goto: gotoMock }));

vi.mock("$app/state", async () => {
  const { pageState } = await import("$lib/test/page.svelte");
  return { page: pageState };
});

const redirectMock = vi.hoisted(() =>
  vi.fn((status: number, location: string): never => {
    const error = new Error(`redirect:${status}:${location}`) as Error & { status: number; location: string };
    error.status = status;
    error.location = location;
    throw error;
  })
);

vi.mock("@sveltejs/kit", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@sveltejs/kit")>();
  return { ...actual, redirect: redirectMock };
});

const apiMock = vi.hoisted(() => vi.fn());
vi.mock("$lib/api", () => ({ api: apiMock }));

const authMock = vi.hoisted(() => ({
  logged_in: false,
  hasUserRole: null as number | null,
  hasUserID: null as string | null,
  hasUserName: "Alice",
  getProfile: vi.fn()
}));

const systemMock = vi.hoisted(() => ({
  versions: { ui: "1.0 (00000000)", api: "1.0 (00000000)" },
  getVersion: vi.fn()
}));

const wsMock = vi.hoisted(() => ({
  status: "CLOSED" as "OPEN" | "CLOSED" | "CONNECTING",
  data: null as string | null,
  send: vi.fn(),
  open: vi.fn(),
  close: vi.fn()
}));

vi.mock("$lib/stores", () => ({
  authStore: authMock,
  systemStore: systemMock,
  wsStore: wsMock
}));

import { setPageState } from "$lib/test/page.svelte";
import PrivateLayout from "$lib/layouts/PrivateLayout.svelte";
import { load } from "@/routes/(private)/+layout";
import ErrorPage from "@/routes/+error.svelte";

function snippet(markup: string): Snippet {
  return createRawSnippet(() => ({
    render: () => markup
  }));
}

describe("private layout load", () => {
  beforeEach(() => {
    localStorage.clear();
    redirectMock.mockClear();
    authMock.getProfile.mockClear();
    systemMock.getVersion.mockClear();
    authMock.logged_in = false;
    authMock.hasUserID = null;
  });

  it("private layout load redirects to signin without a token", () => {
    expect(() => load()).toThrow();
    expect(redirectMock).toHaveBeenCalledWith(307, "/auth/signin");
  });

  it("private layout load allows an authenticated user", () => {
    localStorage.setItem("access_token", "access-token");

    expect(() => load()).not.toThrow();

    expect(authMock.getProfile).toHaveBeenCalledTimes(1);
    expect(systemMock.getVersion).toHaveBeenCalledTimes(1);
  });

  it("private layout load does not refetch an already hydrated profile", () => {
    localStorage.setItem("access_token", "access-token");
    authMock.hasUserID = "profile-1";

    expect(() => load()).not.toThrow();

    expect(authMock.getProfile).not.toHaveBeenCalled();
    expect(systemMock.getVersion).toHaveBeenCalledTimes(1);
  });
});

describe("private layout admin mount-time check", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    wsMock.open.mockClear();
    wsMock.close.mockClear();
    authMock.hasUserRole = null;
    authMock.hasUserID = null;
    setPageState("/");
    apiMock.mockReturnValue({
      GET: vi.fn().mockResolvedValue({ data: { result: { projects: [], total: 0 } } })
    });
  });

  it("redirects a non-admin opening /admin to the home page, but does not recheck later navigation", async () => {
    authMock.hasUserRole = 2;
    setPageState("/admin");

    render(PrivateLayout, { props: { children: snippet('<div class="artboard">child</div>') } });
    await tick();

    expect(gotoMock).toHaveBeenCalledTimes(1);
    expect(gotoMock).toHaveBeenCalledWith("/");

    setPageState("/admin/users");
    await tick();

    expect(gotoMock).toHaveBeenCalledTimes(1);
  });

  it("keeps an admin on /admin", async () => {
    authMock.hasUserRole = 3;
    setPageState("/admin");

    render(PrivateLayout, { props: { children: snippet('<div class="artboard">child</div>') } });
    await tick();

    expect(gotoMock).not.toHaveBeenCalled();
  });
});

describe("private layout branches", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    authMock.hasUserRole = 3;
    apiMock.mockReturnValue({
      GET: vi.fn().mockResolvedValue({ data: { result: { projects: [], total: 0 } } })
    });
  });

  it("renders the blank branch without the sidebar when layoutStyle is blank", async () => {
    setPageState("/");

    const { container } = render(PrivateLayout, {
      props: { layoutStyle: "blank", children: snippet('<div class="artboard">child</div>') }
    });
    await tick();

    const content = container.querySelector(".px-6 > .content");
    expect(content).not.toBeNull();
    expect(content?.querySelector(".left")).toBeNull();
    expect(content?.querySelector("#alert")).not.toBeNull();
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("renders the sidebar branch when layoutStyle is unset", async () => {
    setPageState("/profile/setting");

    const { container } = render(PrivateLayout, {
      props: { children: snippet('<div class="artboard">child</div>') }
    });
    await tick();

    const content = container.querySelector(".px-6 > .content");
    expect(content).not.toBeNull();
    expect(content?.querySelector(".left")).not.toBeNull();
    expect(content?.querySelector(".left .sidebar")).not.toBeNull();
    expect(content?.querySelector(".right #alert")).not.toBeNull();
    expect(screen.getByText("child")).toBeInTheDocument();
  });
});

describe("error page", () => {
  it("renders the 404 content and sets the document title", async () => {
    document.title = "";

    render(ErrorPage);
    await tick();

    expect(screen.getByRole("heading", { name: "404 - Page Not Found" })).toBeInTheDocument();
    expect(document.title).toBe("404 - Page Not Found");
  });
});
