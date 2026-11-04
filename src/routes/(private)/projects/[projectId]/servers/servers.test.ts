import { render, screen, waitFor } from "@testing-library/svelte";
import { tick } from "svelte";
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
  hasUserRole: 2 as number | null,
  hasUserID: "profile-1",
  hasUserName: "Penny",
  user: { id: "profile-1", name: "Penny", surname: "Smith", email: "penny@example.com", role: 2 },
  refreshToken: vi.fn(),
  resetStore: vi.fn()
}));

const projectMock = vi.hoisted(() => ({
  projects: {},
  projectInfo: vi.fn(),
  getProjectInfo: vi.fn(),
  getServerNameByID: vi.fn(() => "Git server"),
  resetStore: vi.fn(),
  serverNameByID: vi.fn().mockResolvedValue(undefined),
  updateServerNameByID: vi.fn()
}));

vi.mock("$lib/stores", async (importOriginal) => {
  const actual = await importOriginal<typeof import("$lib/stores")>();
  return { ...actual, authStore: authMock, projectStore: projectMock };
});

import { setPageState } from "$lib/test/page.svelte";
import ServersAddScheme from "@/routes/(private)/projects/[projectId]/servers/add/[scheme]/+page.svelte";
import ServersAdd from "@/routes/(private)/projects/[projectId]/servers/add/+page.svelte";
import Servers from "@/routes/(private)/projects/[projectId]/servers/+page.svelte";
import ServerDetail from "@/routes/(private)/projects/[projectId]/servers/[serverId]/+page.svelte";
import ServerActivity from "@/routes/(private)/projects/[projectId]/servers/[serverId]/activity/+page.svelte";
import ServerDestroy from "@/routes/(private)/projects/[projectId]/servers/[serverId]/destroy/+page.svelte";
import ServerFirewall from "@/routes/(private)/projects/[projectId]/servers/[serverId]/firewall/+page.svelte";
import ServerMembersAdd from "@/routes/(private)/projects/[projectId]/servers/[serverId]/members/add/+page.svelte";
import ServerMember from "@/routes/(private)/projects/[projectId]/servers/[serverId]/members/[memberId]/+page.svelte";
import ServerMemberLog from "@/routes/(private)/projects/[projectId]/servers/[serverId]/members/[memberId]/[logId]/+page.svelte";
import ServerMembers from "@/routes/(private)/projects/[projectId]/servers/[serverId]/members/+page.svelte";
import ServerSession from "@/routes/(private)/projects/[projectId]/servers/[serverId]/session/+page.svelte";
import ServerSessionId from "@/routes/(private)/projects/[projectId]/servers/[serverId]/session/[sessionId]/+page.svelte";
import ServerSetting from "@/routes/(private)/projects/[projectId]/servers/[serverId]/setting/+page.svelte";

import type { Component } from "svelte";

function apiClient(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    GET: vi.fn().mockResolvedValue({ data: { result: {} } }),
    PUT: vi.fn(),
    POST: vi.fn(),
    UPDATE: vi.fn(),
    DELETE: vi.fn(),
    ...overrides
  };
}

function week(): Record<string, number[]> {
  return Object.fromEntries(
    ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day, index) => [
      day,
      Array.from({ length: 24 }, (_, hour) => Number((day.length + hour + index) % 2 === 0))
    ])
  );
}

const projectId = "2bef1080-cd6e-49e5-8042-1224cf6a3da9";
const serverId = "156d8d65-cfe5-48a4-a636-198a5f509abf";
const memberId = "9d3f7efc-14a5-436d-a763-314441d6e0a5";
const logId = "00000000-0000-0000-0000-000000000000";

const serverBase = `/projects/${projectId}/servers/${serverId}`;

interface TabPage {
  component: Component;
  path: string;
  params: Record<string, string>;
  title: string;
  loadsServerName?: boolean;
  hasTabs?: boolean;
}

const SERVER_PAGES: TabPage[] = [
  { component: ServerDetail, path: serverBase, params: { projectId, serverId }, title: "Server info" },
  {
    component: ServerSession,
    path: `${serverBase}/session`,
    params: { projectId, serverId },
    title: "Server session list"
  },
  {
    component: ServerSessionId,
    path: `${serverBase}/session/${logId}`,
    params: { projectId, serverId, sessionId: logId },
    title: "Server session info",
    hasTabs: false
  },
  { component: ServerMembers, path: `${serverBase}/members`, params: { projectId, serverId }, title: "Server member" },
  {
    component: ServerMembersAdd,
    path: `${serverBase}/members/add`,
    params: { projectId, serverId },
    title: "Server member add"
  },
  {
    component: ServerMember,
    path: `${serverBase}/members/${memberId}`,
    params: { projectId, serverId, memberId },
    title: "Server member"
  },
  {
    component: ServerMemberLog,
    path: `${serverBase}/members/${memberId}/${logId}`,
    params: { projectId, serverId, memberId, logId },
    title: "Server member",
    loadsServerName: false
  },
  {
    component: ServerActivity,
    path: `${serverBase}/activity`,
    params: { projectId, serverId },
    title: "Server activity"
  },
  {
    component: ServerFirewall,
    path: `${serverBase}/firewall`,
    params: { projectId, serverId },
    title: "Server firewall"
  },
  { component: ServerSetting, path: `${serverBase}/setting`, params: { projectId, serverId }, title: "Server setting" },
  { component: ServerDestroy, path: `${serverBase}/destroy`, params: { projectId, serverId }, title: "Destroy server" }
];

describe("servers routes", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    apiMock.mockReset();
    authMock.hasUserRole = 2;
    authMock.hasUserID = "profile-1";
    projectMock.serverNameByID.mockClear();
    projectMock.getServerNameByID.mockReturnValue("Git server");
    setPageState("/projects");
    apiMock.mockReturnValue(apiClient());
  });

  it("server list keeps its legacy columns and links", async () => {
    const getMock = vi.fn().mockResolvedValue({
      data: {
        result: {
          total: 1,
          schemes: [
            {
              scheme_id: serverId,
              title: "Git server",
              online: true,
              count_members: 1,
              address: "secret.net.google.com",
              auth_method: 2,
              scheme_type: 103,
              active: true
            }
          ]
        }
      }
    });
    apiMock.mockReturnValue(apiClient({ GET: getMock }));

    setPageState(`/projects/${projectId}/servers`, { projectId });

    const { container } = render(Servers);
    await tick();

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith(`/v1/schemes/${projectId}/server`, {});
    });

    const headers = Array.from(container.querySelectorAll("thead th")).map((cell) => cell.textContent?.trim());
    expect(headers).toEqual(["", "Title", "Users", "Address", "Auth", "Scheme", "Activity", "", "", "", ""]);

    const title = screen.getByRole("link", { name: "Git server" });
    expect(title).toHaveAttribute("href", `${serverBase}/session`);
    expect(container.querySelector("td .dot")).toHaveClass("bg-green-500");
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Hostname")).toBeInTheDocument();
    expect(screen.getByText("server_ssh")).toBeInTheDocument();

    const iconLinks = Array.from(container.querySelectorAll("tbody tr:last-child td a")).map((link) =>
      link.getAttribute("href")
    );
    expect(iconLinks).toEqual([
      `${serverBase}/session`,
      `${serverBase}/members`,
      `${serverBase}/activity`,
      `${serverBase}/firewall`,
      `${serverBase}/setting`
    ]);
  });

  it("server add step 1 and step 2 render under the same layout and tabs", async () => {
    setPageState(`/projects/${projectId}/servers/add`, { projectId });

    const step1 = render(ServersAdd);
    await tick();

    const artboard = step1.container.querySelector(".artboard");
    expect(step1.container.firstElementChild).toBe(artboard);

    const header = step1.container.querySelector(".artboard > header");
    expect(header?.querySelector(":scope > h1 > a")).toHaveAttribute("href", `/projects/${projectId}/servers`);
    expect(header?.querySelector(":scope > h1")).toHaveTextContent("Servers");
    expect(header?.querySelector(":scope > div.breadcrumbs")).toHaveTextContent("Select scheme");
    expect(step1.container.querySelector(".desc")).toHaveTextContent("Step 1: Select the scheme you want to add.");

    const elements = Array.from(step1.container.querySelectorAll(".content ol.schemes > li.element"));
    expect(elements).toHaveLength(4);
    expect(elements[0].querySelector("a")).toHaveAttribute("href", `/projects/${projectId}/servers/add/server_ssh`);
    expect(elements[0].querySelector("div")).toHaveTextContent("SSH");
    expect(elements.slice(1).map((item) => item.classList.contains("disable"))).toEqual([true, true, true]);
    expect(elements.slice(1).map((item) => item.querySelector("div")?.textContent)).toEqual(["Telnet", "TCP", "UDP"]);
    expect(document.title).toBe("Step 1: Select the scheme you want to add");

    step1.unmount();

    setPageState(`/projects/${projectId}/servers/add/server_ssh`, { projectId, scheme: "server_ssh" });

    const step2 = render(ServersAddScheme);
    await tick();

    const schemeArtboard = step2.container.querySelector(".artboard");
    expect(step2.container.firstElementChild).toBe(schemeArtboard);

    const schemeHeader = step2.container.querySelector(".artboard > header");
    expect(schemeHeader?.querySelector(":scope > h1 > a")).toHaveAttribute("href", `/projects/${projectId}/servers`);
    expect(schemeHeader?.querySelector(":scope > div.breadcrumbs > a")).toHaveAttribute(
      "href",
      `/projects/${projectId}/servers/add`
    );
    expect(schemeHeader?.querySelector(":scope > div.breadcrumbs > a")).toHaveTextContent("Select scheme");
    expect(schemeHeader?.querySelector(":scope > div.breadcrumbs > span")).toHaveTextContent("server_ssh");
    expect(step2.container.querySelector(".desc")).toHaveTextContent("Step 2: Fill in the fields to connect.");

    const form = step2.container.querySelector(".artboard > form");
    expect(form).not.toBeNull();
    expect(form?.querySelectorAll(":scope > .divider")).toHaveLength(2);
    expect(form?.querySelector(".form-dropdown .label .text")).toHaveTextContent("Auth");
    expect(screen.getByRole("button", { name: "Add server" })).toBeInTheDocument();
    expect(document.title).toBe("Step 2: Fill in the fields to connect");

    expect(gotoMock).not.toHaveBeenCalled();
  });

  it("server detail tabs resolve serverId from params", async () => {
    for (const page of SERVER_PAGES) {
      setPageState(page.path, page.params);

      const { container, unmount } = render(page.component);
      await tick();

      const tabs = Array.from(container.querySelectorAll('[role="tab"] a'));
      if (page.hasTabs === false) {
        expect(tabs).toHaveLength(0);
      } else {
        expect(tabs.map((tab) => tab.getAttribute("href"))).toEqual([
          serverBase,
          `${serverBase}/session`,
          `${serverBase}/members`,
          `${serverBase}/activity`,
          `${serverBase}/firewall`,
          `${serverBase}/setting`,
          `${serverBase}/destroy`
        ]);
      }
      expect(document.title).toBe(page.title);
      if (page.loadsServerName !== false) {
        expect(projectMock.serverNameByID).toHaveBeenCalledWith(projectId, serverId);
      }

      if (page.component === ServerSessionId) {
        const sessions = container.querySelector(".breadcrumbs a");
        expect(sessions).toHaveTextContent("Sessions");
        expect(sessions).toHaveAttribute("href", `${serverBase}/session`);
      }

      const selected = container.querySelectorAll('[role="tab"][aria-selected="true"]');
      const isTabRoot =
        page.path === serverBase ||
        ["/session", "/members", "/activity", "/firewall", "/setting", "/destroy"].some(
          (suffix) => page.path === `${serverBase}${suffix}`
        );

      if (isTabRoot) {
        expect(selected).toHaveLength(1);
      } else {
        expect(selected).toHaveLength(0);
      }

      unmount();
      projectMock.serverNameByID.mockClear();
    }
  });

  it("firewall and activity tables keep their column sets", async () => {
    const weekData = week();
    const getMock = vi.fn().mockImplementation((url: string) => {
      if (url.endsWith("/activity")) {
        return Promise.resolve({ data: { result: { week: weekData } } });
      }

      return Promise.resolve({
        data: {
          result: {
            country: {
              wite_list: true,
              list: [
                { country_id: "1", country_code: "CN", country_name: "China" },
                { country_id: "2", country_code: "RU", country_name: "Russian Federation" }
              ]
            },
            network: {
              wite_list: false,
              list: [
                { network_id: "1", network: "192.168.1.0/24" },
                { network_id: "2", network: "127.0.0.3" }
              ]
            }
          }
        }
      });
    });
    apiMock.mockReturnValue(apiClient({ GET: getMock }));

    setPageState(`${serverBase}/activity`, { projectId, serverId });

    const activity = render(ServerActivity);
    await tick();

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith(`/v1/schemes/${projectId}/${serverId}/activity`);
    });

    const rows = Array.from(activity.container.querySelectorAll(".artboard table tr"));
    expect(rows).toHaveLength(7);

    const days = rows.map((row) => row.querySelector("td")?.textContent?.trim());
    expect(days).toEqual(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]);

    for (const [index, row] of rows.entries()) {
      const cells = row.querySelectorAll("td");
      expect(cells).toHaveLength(2);
      expect(row.querySelectorAll("input[type=checkbox]")).toHaveLength(24);
      expect(row.querySelectorAll(".square")).toHaveLength(24);
      expect(row.querySelectorAll(".square")[0]).toHaveTextContent("0");
      expect(row.querySelectorAll(".square")[23]).toHaveTextContent("23");
      expect(cells[0].querySelector("span")).toHaveClass(index >= 5 ? "text-red-500" : "cursor-pointer");
    }

    activity.unmount();

    setPageState(`${serverBase}/firewall`, { projectId, serverId });

    const firewall = render(ServerFirewall);
    await tick();

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith(`/v1/schemes/${projectId}/${serverId}/firewall`);
    });

    const sections = Array.from(firewall.container.querySelectorAll(".artboard > .content"));
    expect(sections).toHaveLength(2);
    expect(sections[0].querySelector(":scope > .w-28")).toHaveTextContent("Countries:");
    expect(sections[1].querySelector(":scope > .w-28")).toHaveTextContent("Networks:");

    const countryTags = Array.from(sections[0].querySelectorAll(".firewall-tags-item"));
    expect(countryTags.map((tag) => tag.textContent?.trim())).toEqual(["China", "Russian Federation"]);

    const networkTags = Array.from(sections[1].querySelectorAll(".firewall-tags-item"));
    expect(networkTags.map((tag) => tag.textContent?.trim())).toEqual(["192.168.1.0 - 192.168.1.255", "127.0.0.3"]);

    expect(firewall.container.querySelectorAll("input[type=text]")).toHaveLength(2);
    expect(firewall.container.querySelectorAll(".toggle")).toHaveLength(2);
  });
});
