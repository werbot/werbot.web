import { fireEvent, render, screen } from "@testing-library/svelte";
import { createRawSnippet, type Snippet, tick } from "svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";

const gotoMock = vi.hoisted(() => vi.fn());
const pageMock = vi.hoisted(() => ({
  url: new URL("http://localhost/"),
  params: {} as Record<string, string>
}));

vi.mock("$app/navigation", () => ({ goto: gotoMock }));
vi.mock("$app/state", () => ({ page: pageMock }));

import Drawer from "$lib/components/Drawer.svelte";
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

describe("interactive components", () => {
  beforeEach(() => {
    gotoMock.mockReset();
    setPage("/");
    document.body.style.overflow = "";
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
    render(Pagination, { props: { total: 35, onselectPage } });

    const links = screen.getAllByRole("link");

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
});
