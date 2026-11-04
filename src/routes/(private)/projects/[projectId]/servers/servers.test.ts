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

const projectId = "2bef1080-cd6e-49e5-8042-1224cf6a3da9";
const serverId = "156d8d65-cfe5-48a4-a636-198a5f509abf";

const serverBase = `/projects/${projectId}/servers/${serverId}`;

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
});
