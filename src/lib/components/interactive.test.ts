import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { createRawSnippet, type Snippet, tick } from "svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";

const gotoMock = vi.hoisted(() => vi.fn());
const apiGetMock = vi.hoisted(() => vi.fn());
const pageMock = vi.hoisted(() => ({
  url: new URL("http://localhost/"),
  params: {} as Record<string, string>
}));

vi.mock("$app/navigation", () => ({ goto: gotoMock }));
vi.mock("$app/state", () => ({ page: pageMock }));
vi.mock("$lib/api", (): { api: () => { GET: typeof apiGetMock } } => ({
  api: (): { GET: typeof apiGetMock } => ({ GET: apiGetMock })
}));
vi.mock("$lib/stores", () => ({
  authStore: { hasUserName: "Alice", hasUserRole: 3 },
  wsStore: { status: "CLOSED" }
}));

import Drawer from "$lib/components/Drawer.svelte";
import Header from "$lib/components/Header.svelte";
import Modal from "$lib/components/Modal.svelte";
import Navigation from "$lib/components/Navigation.svelte";
import Pagination from "$lib/components/Pagination.svelte";
import Tabs from "$lib/components/Tabs.svelte";
import type { MenuItem } from "$lib/utils";

function snippet(markup: string): Snippet {
  return createRawSnippet(() => ({
    render: () => markup
  }));
}

function setPage(path: string, params: Record<string, string> = {}): void {
  pageMock.url = new URL(`http://localhost${path}`);
  pageMock.params = params;
}

function linkFor(text: string): HTMLAnchorElement {
  const link = screen.getByText(text).closest("a");

  if (!(link instanceof HTMLAnchorElement)) {
    throw new Error(`No anchor for ${text}`);
  }

  return link;
}

function linkWithText(text: string): HTMLAnchorElement {
  const link = screen
    .getAllByRole("link")
    .find((candidate) => candidate.textContent?.replace(/\s+/g, " ").trim() === text);

  if (!(link instanceof HTMLAnchorElement)) {
    throw new Error(`No link with text ${text}`);
  }

  return link;
}

function modalElement(): HTMLElement {
  const modal = document.querySelector(".modal");

  if (!(modal instanceof HTMLElement)) {
    throw new Error("Modal element not found");
  }

  return modal;
}

describe("interactive components", () => {
  beforeEach(() => {
    gotoMock.mockReset();
    apiGetMock.mockReset();
    apiGetMock.mockResolvedValue({ data: { result: { projects: [], total: 0 } } });
    setPage("/");
    document.body.style.overflow = "";
  });

  it("Modal opens from the closed state with visible opacity and the enter-to class", async () => {
    const onclose = vi.fn();
    const props = {
      title: "Delete server",
      children: snippet('<p data-testid="slot">Body</p>'),
      onclose
    };

    const { rerender } = render(Modal, { props: { ...props, showModal: false } });

    expect(screen.queryByText("Delete server")).toBeNull();

    await rerender({ ...props, showModal: true });
    await tick();

    expect(modalElement()).toHaveClass("animation-enter-active", "animation-enter-from");

    await new Promise((resolve) => setTimeout(resolve, 25));
    await tick();

    expect(modalElement()).toHaveClass("animation-enter-to");
    expect(modalElement()).not.toHaveClass("animation-enter-from");
    expect(window.getComputedStyle(modalElement()).opacity).toBe("1");
  });

  it("Modal recovers when closed and reopened within the leave duration", async () => {
    const onclose = vi.fn();
    const props = {
      title: "Delete server",
      children: snippet('<p data-testid="slot">Body</p>'),
      onclose
    };

    const { rerender } = render(Modal, { props: { ...props, showModal: true } });

    await rerender({ ...props, showModal: false });
    await tick();
    expect(modalElement()).toHaveClass("animation-leave-active", "animation-leave-to");

    await rerender({ ...props, showModal: true });
    await new Promise((resolve) => setTimeout(resolve, 25));
    await tick();

    expect(modalElement()).toHaveClass("animation-enter-to");
    expect(modalElement()).not.toHaveClass("animation-leave-to");
    expect(modalElement()).not.toHaveClass("animation-enter-from");
  });

  it("Modal emits onclose from the footer button and keeps the slot markup", async () => {
    const onclose = vi.fn();

    render(Modal, {
      props: {
        showModal: true,
        title: "Delete server",
        children: snippet('<p data-testid="slot">Body</p>'),
        onclose
      }
    });

    expect(screen.getByText("Delete server").tagName).toBe("H1");
    expect(screen.getByTestId("slot")).toHaveTextContent("Body");

    await fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(onclose).toHaveBeenCalledTimes(1);
  });

  it("Drawer locks body scroll on open, unlocks on close, guards close during speed ms", async () => {
    const onclose = vi.fn();
    const base = {
      title: "Server details",
      children: snippet('<p data-testid="drawer-slot">Body</p>'),
      maxWidth: "500px",
      speed: 20,
      backgroundColor: "#fafafa",
      onclose
    };

    const { rerender } = render(Drawer, { props: { ...base, isOpen: false } });

    await tick();
    expect(document.body.style.overflow).not.toBe("hidden");

    await rerender({ ...base, isOpen: true });
    await tick();

    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByTestId("drawer-slot")).toHaveTextContent("Body");

    await fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onclose).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 40));
    await fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onclose).toHaveBeenCalledTimes(1);

    await rerender({ ...base, isOpen: false });
    await tick();

    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("Pagination builds limit/offset and calls onselectPage", async () => {
    const onselectPage = vi.fn();

    setPage("/projects?limit=10&offset=10");
    const { container } = render(Pagination, { props: { total: 35, class: "content", onselectPage } });

    const links = screen.getAllByRole("link");

    expect(container.querySelector(".pagination")).toHaveClass("content");
    expect(links).toHaveLength(4);
    expect(links[0]).toHaveAttribute("href", "/projects?limit=10&offset=0");
    expect(links[1]).toHaveAttribute("href", "/projects?limit=10&offset=10");
    expect(links[1]).toHaveClass("btn-active");

    await fireEvent.click(links[2]);

    expect(onselectPage).toHaveBeenCalledWith({ limit: 10, offset: 20 });
    expect(gotoMock).toHaveBeenCalledWith("/projects?limit=10&offset=20");
  });

  it("Tabs marks the active route and applies danger classes", () => {
    const tabs: MenuItem[] = [
      { name: "Main", link: { name: "profile-setting" } },
      { name: "Password", link: { name: "profile-setting-password" } },
      { name: "Destroy", link: { name: "profile-setting-destroy" }, danger: true }
    ];

    setPage("/profile/setting/password");
    render(Tabs, { props: { tabs } });

    expect(linkFor("Password")).toHaveClass("bg-gray-200", "text-gray-700");
    expect(linkFor("Main")).toHaveClass("hover:bg-gray-800", "text-gray-700");
    expect(linkFor("Destroy")).toHaveClass("text-red-700", "hover:bg-red-600");
    expect(linkFor("Destroy")).not.toHaveClass("bg-red-100");
  });

  it("Navigation renders the profile, project and admin groups with hrefs", () => {
    setPage("/profile/setting");
    const profile = render(Navigation);

    expect(linkFor("Settings")).toHaveAttribute("href", "/profile/setting");
    expect(linkFor("Settings")).toHaveClass("current");
    expect(linkFor("SSH keys")).toHaveAttribute("href", "/profile/keys");
    expect(linkFor("Logs")).toHaveAttribute("href", "/profile/logs");

    profile.unmount();

    setPage("/projects/p/servers", { projectId: "p" });
    const project = render(Navigation);

    expect(linkFor("Servers")).toHaveAttribute("href", "/projects/p/servers");
    expect(linkFor("Servers")).toHaveClass("current");
    expect(linkFor("Databases")).toHaveAttribute("href", "/projects/p/databases");
    expect(linkFor("Settings")).toHaveAttribute("href", "/projects/p/setting");

    project.unmount();

    setPage("/admin/users");
    render(Navigation);

    expect(linkFor("Users")).toHaveAttribute("href", "/admin/users");
    expect(linkFor("Projects")).toHaveAttribute("href", "/admin/projects");
    expect(linkFor("Subscriptions")).toHaveAttribute("href", "/admin/subscriptions");
    expect(linkFor("Users")).not.toHaveClass("current");
  });

  it("Navigation does not resolve project links without a projectId", () => {
    setPage("/projects");
    const list = render(Navigation);

    expect(list.container.querySelector(".sidebar")).toBeNull();
    list.unmount();

    setPage("/projects/add");

    expect(() => render(Navigation)).not.toThrow();
  });

  it("Header loads five projects and renders both dropdowns", async () => {
    apiGetMock.mockResolvedValue({
      data: { result: { projects: [{ project_id: "p1", title: "Alpha" }], total: 6 } }
    });
    setPage("/projects/p1", { projectId: "p1" });
    render(Header);

    await waitFor(() => expect(apiGetMock).toHaveBeenCalledWith("/v1/projects", { limit: 5 }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Alpha" })).toBeInTheDocument());

    await fireEvent.click(screen.getByRole("button", { name: "Alpha" }));

    expect(linkWithText("Alpha")).toHaveAttribute("href", "/projects/p1");
    expect(linkWithText("Alpha")).toHaveClass("current");
    expect(linkWithText("Show all projects")).toHaveAttribute("href", "/projects");
    expect(linkWithText("Add new project")).toHaveAttribute("href", "/projects/add");

    await fireEvent.click(screen.getByRole("button", { name: "Alice" }));

    expect(linkWithText("Settings")).toHaveAttribute("href", "/profile/setting");
    expect(linkWithText("Admin")).toHaveAttribute("href", "/admin");
    expect(linkWithText("Logout")).toHaveAttribute("href", "/auth/logout");
  });

  it("Header marks Add new project current on /projects/add", async () => {
    setPage("/projects/add");
    render(Header);

    await waitFor(() => expect(screen.getByRole("button", { name: "Projects" })).toBeInTheDocument());

    await fireEvent.click(screen.getByRole("button", { name: "Projects" }));

    expect(linkWithText("Add new project")).toHaveClass("current");
  });
});
