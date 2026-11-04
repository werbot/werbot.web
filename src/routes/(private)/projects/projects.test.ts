import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
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
  hasUserName: "Penny",
  hasUserID: "profile-1",
  user: { id: "profile-1", name: "Penny", surname: "Smith", email: "penny@example.com", role: 2 },
  refreshToken: vi.fn(),
  resetStore: vi.fn()
}));

const projectMock = vi.hoisted(() => ({
  projects: {} as Record<
    string,
    { info: Record<string, unknown>; servers: Record<string, unknown>; timestamp: number }
  >,
  projectInfo: vi.fn(),
  getProjectInfo: vi.fn(),
  getServerNameByID: vi.fn(),
  resetStore: vi.fn(),
  serverNameByID: vi.fn(),
  updateServerNameByID: vi.fn()
}));

vi.mock("$lib/stores", async (importOriginal) => {
  const actual = await importOriginal<typeof import("$lib/stores")>();
  return { ...actual, projectStore: projectMock };
});

vi.mock("$lib/stores/auth.svelte", () => ({ authStore: authMock }));

import { setPageState } from "$lib/test/page.svelte";
import Navigation from "$lib/components/Navigation.svelte";
import AddProject from "@/routes/(private)/projects/add/+page.svelte";
import ProjectInfo from "@/routes/(private)/projects/[projectId]/+page.svelte";
import SettingApi from "@/routes/(private)/projects/[projectId]/setting/api/+page.svelte";
import SettingDestroy from "@/routes/(private)/projects/[projectId]/setting/destroy/+page.svelte";
import Setting from "@/routes/(private)/projects/[projectId]/setting/+page.svelte";
import ProjectsList from "@/routes/(private)/projects/+page.svelte";

function inputAt(container: HTMLElement, index: number): HTMLInputElement {
  return container.querySelectorAll("input")[index] as HTMLInputElement;
}

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

describe("projects routes", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    apiMock.mockReset();
    authMock.hasUserID = "profile-1";
    authMock.hasUserRole = 2;
    projectMock.projects = {};
    projectMock.projectInfo.mockReset();
    projectMock.projectInfo.mockResolvedValue(undefined);
    setPageState("/projects");
  });

  it("projects list renders the limit/offset query defaults", async () => {
    const getMock = vi.fn().mockResolvedValue({
      data: {
        result: {
          total: 30,
          projects: [
            {
              project_id: "p1",
              title: "project1",
              alias: "project1",
              members_count: 7,
              servers_count: 2,
              created_at: { seconds: 1_760_000_000 }
            }
          ]
        }
      }
    });
    apiMock.mockReturnValue(apiClient({ GET: getMock }));

    const { container } = render(ProjectsList);
    await tick();

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith("/v1/projects", {});
    });

    expect(await screen.findByRole("link", { name: "project1" })).toHaveAttribute("href", "/projects/p1");
    expect(container.querySelector("tbody tr td:nth-child(2)")?.textContent).toBe("project1");

    const pages = Array.from(container.querySelectorAll(".pagination a")).map((link) => link.getAttribute("href"));
    expect(pages).toEqual(["/projects?limit=25&offset=0", "/projects?limit=25&offset=25"]);
  });

  it("projects list forwards the limit/offset query to the API", async () => {
    setPageState("/projects?limit=10&offset=20");
    const getMock = vi.fn().mockResolvedValue({ data: { result: { total: 0, projects: [] } } });
    apiMock.mockReturnValue(apiClient({ GET: getMock }));

    render(ProjectsList);
    await tick();

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith("/v1/projects", { limit: "10", offset: "20" });
    });
  });

  it("projects list does not send the legacy member_id filter for role-3 users", async () => {
    authMock.hasUserRole = 3;
    authMock.hasUserID = "member-7";
    const getMock = vi.fn().mockResolvedValue({ data: { result: { total: 0, projects: [] } } });
    apiMock.mockReturnValue(apiClient({ GET: getMock }));

    render(ProjectsList);
    await tick();

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith("/v1/projects", {});
    });
  });

  it("add project submits the legacy trim rules and redirects to the new project", async () => {
    setPageState("/projects/add");
    const postMock = vi.fn().mockResolvedValue({ data: { message: "Project added", result: { project_id: "p1" } } });
    apiMock.mockReturnValue(apiClient({ POST: postMock }));

    const { container } = render(AddProject);

    await fireEvent.input(inputAt(container, 0), { target: { value: "  My project  " } });
    await fireEvent.input(inputAt(container, 1), { target: { value: "  myproject  " } });
    await fireEvent.click(screen.getByRole("button", { name: "Add project" }));

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith("/v1/projects", {}, { title: "  My project  ", alias: "myproject" });
    });
    expect(gotoMock).toHaveBeenCalledWith("/projects/p1");
  });

  it("project menu resolves project-scoped links with the current projectId", async () => {
    setPageState(`/projects/${projectId}`, { projectId });

    const { container } = render(Navigation);
    await tick();

    const hrefs = Array.from(container.querySelectorAll(".sidebar a")).map((link) => link.getAttribute("href"));

    expect(hrefs).toEqual([
      `/projects/${projectId}/servers`,
      `/projects/${projectId}/databases`,
      `/projects/${projectId}/applications`,
      `/projects/${projectId}/desktops`,
      `/projects/${projectId}/containers`,
      `/projects/${projectId}/clouds`,
      `/projects/${projectId}/members`,
      `/projects/${projectId}/teams`,
      `/projects/${projectId}/logs`,
      `/projects/${projectId}/setting`
    ]);
  });

  it("project information loads the project store and links the counters", async () => {
    setPageState(`/projects/${projectId}`, { projectId });
    projectMock.projects = {
      [projectId]: {
        info: {
          title: "Project One",
          servers_count: 2,
          databases_count: 3,
          applications_count: 4,
          desktops_count: 5,
          containers_count: 6,
          clouds_count: 7
        },
        servers: {},
        timestamp: 0
      }
    };

    const { container } = render(ProjectInfo);
    await tick();

    await waitFor(() => {
      expect(projectMock.projectInfo).toHaveBeenCalledWith(projectId);
    });

    expect(screen.getByRole("heading", { name: "Project One" })).toBeInTheDocument();
    expect(screen.getByText("Project information")).toBeInTheDocument();
    expect(container.querySelector('a[href="/projects/' + projectId + '/servers"]')).not.toBeNull();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("project settings tabs mark the active route", async () => {
    setPageState(`/projects/${projectId}/setting/api`, { projectId });

    const { container } = render(SettingApi);
    await tick();

    const selected = container.querySelectorAll('[role="tab"][aria-selected="true"]');
    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveTextContent("Api");

    const hrefs = Array.from(container.querySelectorAll('[role="tab"] a')).map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual([
      `/projects/${projectId}/setting`,
      `/projects/${projectId}/setting/api`,
      `/projects/${projectId}/setting/destroy`
    ]);
  });

  it("project setting loads the project and submits the changed fields", async () => {
    setPageState(`/projects/${projectId}/setting`, { projectId });
    authMock.hasUserID = "owner-1";
    authMock.hasUserRole = 3;
    const getMock = vi.fn().mockResolvedValue({ data: { result: { title: "Project", alias: "project" } } });
    const updateMock = vi.fn().mockResolvedValue({ data: { message: "Project updated" } });
    apiMock.mockReturnValue(apiClient({ GET: getMock, UPDATE: updateMock }));

    const { container } = render(Setting);
    await tick();

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith(`/v1/projects/${projectId}`, { owner_id: "owner-1" });
    });

    await waitFor(() => {
      expect(inputAt(container, 0).value).toBe("Project");
      expect(inputAt(container, 1).value).toBe("project");
    });

    await fireEvent.input(inputAt(container, 0), { target: { value: "  New title  " } });
    await fireEvent.input(inputAt(container, 1), { target: { value: "  new-login  " } });
    await fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledTimes(2);
    });

    expect(updateMock).toHaveBeenNthCalledWith(1, `/v1/projects/${projectId}`, {}, { title: "  New title  " });
    expect(updateMock).toHaveBeenNthCalledWith(2, `/v1/projects/${projectId}`, {}, { alias: "new-login" });
  });

  it("project setting keeps the login read-only for non-admin users", async () => {
    setPageState(`/projects/${projectId}/setting`, { projectId });
    authMock.hasUserID = "owner-1";
    authMock.hasUserRole = 1;
    const getMock = vi.fn().mockResolvedValue({ data: { result: { title: "Project", alias: "project" } } });
    const updateMock = vi.fn().mockResolvedValue({ data: { message: "Project updated" } });
    apiMock.mockReturnValue(apiClient({ GET: getMock, UPDATE: updateMock }));

    const { container } = render(Setting);
    await tick();

    await waitFor(() => {
      expect(inputAt(container, 1).value).toBe("project");
    });
    expect(inputAt(container, 1).disabled).toBe(true);

    await fireEvent.input(inputAt(container, 0), { target: { value: "New title" } });
    await fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledTimes(1);
    });
    expect(updateMock).toHaveBeenCalledWith(`/v1/projects/${projectId}`, {}, { title: "New title" });
  });

  it("destroy project deletes it and returns to the projects list", async () => {
    setPageState(`/projects/${projectId}/setting/destroy`, { projectId });
    authMock.hasUserID = "owner-1";
    const deleteMock = vi.fn().mockResolvedValue({ data: { message: "Project deleted" } });
    apiMock.mockReturnValue(apiClient({ DELETE: deleteMock }));

    render(SettingDestroy);
    await tick();

    await fireEvent.click(screen.getByRole("button", { name: "Delete this project" }));

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith(`/v1/projects/${projectId}`, { owner_id: "owner-1" });
    });
    expect(gotoMock).toHaveBeenCalledWith("/projects");
  });
});
