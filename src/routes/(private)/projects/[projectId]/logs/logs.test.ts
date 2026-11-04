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

const authMock = vi.hoisted(() => ({
  logged_in: true,
  hasUserRole: 2 as number | null,
  hasUserName: "Penny",
  hasUserID: "profile-1",
  user: { id: "profile-1", name: "Penny", surname: "Smith", email: "penny@example.com", role: 2 },
  refreshToken: vi.fn(),
  resetStore: vi.fn()
}));

vi.mock("$lib/stores/auth.svelte", () => ({ authStore: authMock }));

import { setPageState } from "$lib/test/page.svelte";
import Logs from "@/routes/(private)/projects/[projectId]/logs/+page.svelte";
import { Type } from "@proto/event/enum";
import { Project_Section } from "@proto/event/message";

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

describe("project logs route", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    apiMock.mockReset();
    projectMock.projects = {};
    projectMock.projectInfo.mockReset();
    projectMock.projectInfo.mockResolvedValue(undefined);
    projectMock.getProjectInfo.mockReset();
    projectMock.getProjectInfo.mockReturnValue(undefined);
    authMock.hasUserID = "profile-1";
    apiMock.mockReturnValue(apiClient());
  });

  it("renders project events and opens the drawer", async () => {
    setPageState(`/projects/${projectId}/logs`, { projectId });
    const getMock = vi.fn().mockResolvedValue({
      data: {
        result: {
          total: 1,
          events: [
            {
              project_id: projectId,
              section: Project_Section.member,
              type: Type.onCreate,
              session: { id: "session-1", ip: "192.168.0.1", user_agent: "Mozilla/5.0 Android" },
              meta_data: "eyJhY3Rpb24iOiJhZGQifQ==",
              created_at: { seconds: 1_760_000_000 }
            }
          ]
        }
      }
    });
    apiMock.mockReturnValue(apiClient({ GET: getMock }));

    const { container } = render(Logs);
    await tick();

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith(`/v1/event/project/${projectId}`, {});
    });
    expect(await screen.findByText("member")).toBeInTheDocument();
    expect(screen.getByText("onCreate")).toBeInTheDocument();

    await fireEvent.click(container.querySelector("tbody tr") as HTMLTableRowElement);
    expect(await screen.findByText("session-1")).toBeInTheDocument();
    expect(screen.getByText(/"action": "add"/)).toBeInTheDocument();
  });

  it("sends filters from the URL and resets the offset", async () => {
    setPageState(`/projects/${projectId}/logs?section=1&type=3&search=192.168&offset=25`, { projectId });
    const getMock = vi.fn().mockResolvedValue({ data: { result: { total: 0, events: [] } } });
    apiMock.mockReturnValue(apiClient({ GET: getMock }));

    render(Logs);
    await tick();

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith(`/v1/event/project/${projectId}`, {
        section: "1",
        type: "3",
        search: "192.168",
        offset: "25"
      });
    });
  });

  it("shows an empty state on 404 instead of an error toast", async () => {
    setPageState(`/projects/${projectId}/logs?search=nope`, { projectId });
    const getMock = vi.fn().mockResolvedValue({ error: { code: 404, result: "Project not found" } });
    apiMock.mockReturnValue(apiClient({ GET: getMock }));

    const messages: string[] = [];
    const capture = (event: Event): void => {
      messages.push((event as CustomEvent<string>).detail);
    };
    window.addEventListener("connextError", capture);

    try {
      render(Logs);
      await tick();

      expect(await screen.findByText("No events")).toBeInTheDocument();
      expect(messages).toEqual([]);
    } finally {
      window.removeEventListener("connextError", capture);
    }
  });

  it("updates the URL when a filter is applied", async () => {
    setPageState(`/projects/${projectId}/logs`, { projectId });
    apiMock.mockReturnValue(
      apiClient({
        GET: vi.fn().mockResolvedValue({ data: { result: { total: 0, events: [] } } })
      })
    );

    const { container } = render(Logs);
    await tick();

    const sectionButton = container.querySelector(".form-dropdown button") as HTMLButtonElement;
    await fireEvent.click(sectionButton);
    await fireEvent.click(screen.getByText("member"));

    await waitFor(() => {
      expect(gotoMock).toHaveBeenCalledWith(
        `/projects/${projectId}/logs?limit=25&offset=0&section=3`,
        expect.objectContaining({ replaceState: true })
      );
    });
  });

  it("resets filters but keeps the limit", async () => {
    setPageState(`/projects/${projectId}/logs?section=1&type=3&search=192.168&limit=10&offset=25`, { projectId });
    apiMock.mockReturnValue(
      apiClient({
        GET: vi.fn().mockResolvedValue({ data: { result: { total: 0, events: [] } } })
      })
    );

    render(Logs);
    await tick();

    await fireEvent.click(screen.getByText("Reset"));

    expect(gotoMock).toHaveBeenCalledWith(
      `/projects/${projectId}/logs?limit=10&offset=0`,
      expect.objectContaining({ replaceState: true })
    );
  });

  it("clears the search input on reset", async () => {
    setPageState(`/projects/${projectId}/logs`, { projectId });
    apiMock.mockReturnValue(
      apiClient({
        GET: vi.fn().mockResolvedValue({ data: { result: { total: 0, events: [] } } })
      })
    );

    const { container } = render(Logs);
    await tick();

    const input = container.querySelector("#logs-search") as HTMLInputElement;
    await fireEvent.input(input, { target: { value: "10.0" } });
    await fireEvent.click(screen.getByText("Reset"));

    expect(input.value).toBe("");
    expect(gotoMock).toHaveBeenCalledWith(
      `/projects/${projectId}/logs?limit=25&offset=0`,
      expect.objectContaining({ replaceState: true })
    );
  });

  it("debounces the search before updating the URL", async () => {
    setPageState(`/projects/${projectId}/logs`, { projectId });
    apiMock.mockReturnValue(
      apiClient({
        GET: vi.fn().mockResolvedValue({ data: { result: { total: 0, events: [] } } })
      })
    );

    const { container } = render(Logs);
    await tick();

    const input = container.querySelector("#logs-search") as HTMLInputElement;
    expect(input).not.toBeNull();

    await fireEvent.input(input, { target: { value: "10.0" } });
    expect(gotoMock).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(gotoMock).toHaveBeenCalledWith(
        `/projects/${projectId}/logs?limit=25&offset=0&search=10.0`,
        expect.objectContaining({ replaceState: true })
      );
    });
  });
});
