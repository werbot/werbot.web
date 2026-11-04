import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { createRawSnippet, type Snippet, tick } from "svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";

const gotoMock = vi.hoisted(() => vi.fn());

vi.mock("$app/navigation", () => ({ goto: gotoMock }));

vi.mock("$app/state", async () => {
  const { pageState } = await import("$lib/test/page.svelte");
  return { page: pageState };
});

const apiMock = vi.hoisted(() => vi.fn());
vi.mock("$lib/api", () => ({ api: apiMock }));

const authMock = vi.hoisted(() => ({
  logged_in: true,
  hasUserRole: 3 as number | null,
  hasUserID: "profile-1",
  hasUserName: "Admin",
  user: { id: "profile-1", name: "Admin", surname: "User", email: "admin@werbot.net", role: 3 },
  refreshToken: vi.fn(),
  resetStore: vi.fn()
}));

const wsMock = vi.hoisted(() => ({
  status: "CLOSED" as "OPEN" | "CLOSED" | "CONNECTING",
  data: null as string | null,
  send: vi.fn(),
  open: vi.fn(),
  close: vi.fn()
}));

vi.mock("$lib/stores", async (importOriginal) => {
  const actual = await importOriginal<typeof import("$lib/stores")>();
  return { ...actual, authStore: authMock, wsStore: wsMock };
});

import { setPageState } from "$lib/test/page.svelte";
import Navigation from "$lib/components/Navigation.svelte";
import PrivateLayout from "$lib/layouts/PrivateLayout.svelte";
import AdminIndex from "@/routes/(private)/admin/+page.svelte";
import License from "@/routes/(private)/admin/licenses/+page.svelte";
import Projects from "@/routes/(private)/admin/projects/+page.svelte";
import Settings from "@/routes/(private)/admin/settings/+page.svelte";
import Subscriptions from "@/routes/(private)/admin/subscriptions/+page.svelte";
import Users from "@/routes/(private)/admin/users/+page.svelte";

function snippet(markup: string): Snippet {
  return createRawSnippet(() => ({
    render: () => markup
  }));
}

function apiClient(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    GET: vi.fn().mockResolvedValue({ data: { result: { tokens: [] } } }),
    PUT: vi.fn(),
    POST: vi.fn(),
    UPDATE: vi.fn(),
    DELETE: vi.fn(),
    ...overrides
  };
}

describe("admin routes", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    apiMock.mockReset();
    wsMock.open.mockClear();
    wsMock.close.mockClear();
    authMock.hasUserRole = 3;
    setPageState("/admin");
    apiMock.mockReturnValue(apiClient());
  });

  it("admin menu renders Users, Projects, Subscriptions, License, Settings in order", async () => {
    setPageState("/admin/users");

    const { container } = render(Navigation);
    await tick();

    const sidebar = container.querySelector(".sidebar");
    expect(sidebar).not.toBeNull();

    const labels = Array.from(sidebar?.querySelectorAll("a span") ?? []).map((item) => item.textContent?.trim());

    expect(labels).toEqual(["Users", "Projects", "Subscriptions", "License", "Settings"]);
    // group10, group20 and group100 keep the legacy separators.
    expect(sidebar?.querySelectorAll("hr")).toHaveLength(2);
  });

  it("non-admin direct visit to /admin lands on /", async () => {
    authMock.hasUserRole = 2;
    setPageState("/admin");

    render(PrivateLayout, { props: { children: snippet('<div class="artboard">child</div>') } });
    await tick();

    expect(gotoMock).toHaveBeenCalledTimes(1);
    expect(gotoMock).toHaveBeenCalledWith("/");
  });

  it("placeholder pages render their legacy headings and titles", async () => {
    const pages = [
      { component: AdminIndex, heading: "Statistic", title: "Statistic" },
      { component: License, heading: "License", title: "License" },
      { component: Projects, heading: "Projects", title: "Projects" },
      { component: Settings, heading: "Settings", title: "Settings" },
      { component: Subscriptions, heading: "Subscriptions", title: "Subscriptions" }
    ];

    for (const page of pages) {
      const { unmount } = render(page.component);
      await tick();

      expect(screen.getByRole("heading", { name: page.heading })).toBeInTheDocument();
      expect(screen.getByText("section under development")).toBeInTheDocument();
      expect(document.title).toBe(page.title);

      unmount();
    }
  });

  it("users page renders an empty state instead of crashing when tokens are missing", async () => {
    apiMock.mockReturnValue(apiClient({ GET: vi.fn().mockResolvedValue({ data: {} }) }));

    render(Users);
    await tick();

    await waitFor(() => {
      expect(screen.getByText("No registration invitations yet.")).toBeInTheDocument();
    });
  });

  it("users page creates a trimmed registration invite and shows its link", async () => {
    const getMock = vi.fn().mockResolvedValue({ data: { result: { tokens: [] } } });
    const postMock = vi
      .fn()
      .mockResolvedValue({ data: { result: { token: "invite-token" }, message: "Invite created" } });
    apiMock.mockReturnValue(apiClient({ GET: getMock, POST: postMock }));

    const { container } = render(Users);
    await tick();

    const inputs = container.querySelectorAll("input");
    await fireEvent.input(inputs[0], { target: { value: "  user@werbot.net  " } });
    await fireEvent.input(inputs[1], { target: { value: "  Alice  " } });
    await fireEvent.input(inputs[2], { target: { value: "  Smith  " } });
    await fireEvent.click(screen.getByRole("button", { name: "Create invite" }));

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith(
        "/v1/tokens/profile",
        {},
        {
          email: "user@werbot.net",
          name: "Alice",
          surname: "Smith"
        }
      );
    });

    const inviteLink = `${window.location.origin}/auth/signup/invite-token`;
    const link = await screen.findByRole("link", { name: inviteLink });
    expect(link).toHaveAttribute("href", inviteLink);
  });
});
