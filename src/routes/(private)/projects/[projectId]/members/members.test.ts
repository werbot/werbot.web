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

const tokenApiMock = vi.hoisted(() => ({
  listProjectTokens: vi.fn(),
  createProjectToken: vi.fn(),
  deleteToken: vi.fn(),
  tokenInviteLink: vi.fn((token: string): string => `/invite/project/${token}`)
}));

vi.mock("$lib/api/token", async (importOriginal) => {
  const actual = await importOriginal<typeof import("$lib/api/token")>();
  return { ...actual, ...tokenApiMock };
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

vi.mock("$lib/stores", async (importOriginal) => {
  const actual = await importOriginal<typeof import("$lib/stores")>();
  return { ...actual, authStore: authMock };
});

import { setPageState } from "$lib/test/page.svelte";
import AddMember from "@/routes/(private)/projects/[projectId]/members/add/+page.svelte";
import Invites from "@/routes/(private)/projects/[projectId]/members/invites/+page.svelte";
import Members from "@/routes/(private)/projects/[projectId]/members/+page.svelte";

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

describe("project members routes", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    apiMock.mockReset();
    tokenApiMock.listProjectTokens.mockReset();
    tokenApiMock.createProjectToken.mockReset();
    tokenApiMock.deleteToken.mockReset();
    tokenApiMock.tokenInviteLink.mockClear();
    authMock.hasUserRole = 2;
    authMock.hasUserID = "profile-1";
    apiMock.mockReturnValue(apiClient());
  });

  it("members tab marks the active route", async () => {
    setPageState(`/projects/${projectId}/members`, { projectId });
    const getMock = vi.fn().mockResolvedValue({ data: { result: { total: 0, members: [] } } });
    apiMock.mockReturnValue(apiClient({ GET: getMock }));

    const { container } = render(Members);
    await tick();

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith(`/v1/members/project/${projectId}`, {});
    });

    const selected = container.querySelectorAll('[role="tab"][aria-selected="true"]');
    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveTextContent("Members");

    const hrefs = Array.from(container.querySelectorAll('[role="tab"] a')).map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual([`/projects/${projectId}/members`, `/projects/${projectId}/members/invites`]);
  });

  it("invite modal opens with the member form and closes on the footer button", async () => {
    setPageState(`/projects/${projectId}/members/invites`, { projectId });
    tokenApiMock.listProjectTokens.mockResolvedValue({
      data: {
        result: {
          total: 1,
          tokens: [
            {
              token: "invite-token",
              status: 2,
              created_at: { seconds: 1_760_000_000 },
              profile: { name: "Carla", surname: "Smith", email: "carla@example.com" }
            }
          ]
        }
      }
    });

    const { container } = render(Invites);
    await tick();

    await waitFor(() => {
      expect(screen.getByText("carla@example.com")).toBeInTheDocument();
    });

    const deleteIcon = container.querySelector('svg use[href="#icon-delete"]')?.closest("svg");
    expect(deleteIcon).not.toBeNull();

    await fireEvent.click(deleteIcon as SVGElement);
    await tick();

    expect(await screen.findByText("Are you sure you want to delete this invite")).toBeInTheDocument();
    expect(screen.getByText(/This action CANNOT be undone/)).toBeInTheDocument();

    await fireEvent.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(
      () => {
        expect(screen.queryByText("Are you sure you want to delete this invite")).toBeNull();
      },
      { timeout: 1_000 }
    );
  });

  it("copy invite link uses tokenInviteLink", async () => {
    setPageState(`/projects/${projectId}/members/add`, { projectId });
    tokenApiMock.createProjectToken.mockResolvedValue({
      data: { message: "Invitation created", result: { token: "invite-token" } }
    });

    const messages: string[] = [];
    const capture = (event: Event): void => {
      messages.push((event as CustomEvent<string>).detail);
    };
    window.addEventListener("connextSuccess", capture);

    try {
      const { container } = render(AddMember);

      await fireEvent.input(inputAt(container, 0), { target: { value: "  Carla  " } });
      await fireEvent.input(inputAt(container, 1), { target: { value: "  Smith  " } });
      await fireEvent.input(inputAt(container, 2), { target: { value: "  carla@example.com  " } });
      await fireEvent.click(screen.getByRole("button", { name: "Send invite" }));

      await waitFor(() => {
        expect(tokenApiMock.createProjectToken).toHaveBeenCalledWith(projectId, {
          name: "Carla",
          surname: "Smith",
          email: "carla@example.com"
        });
      });

      expect(tokenApiMock.tokenInviteLink).toHaveBeenCalledWith("invite-token");
      expect(messages).toContain("Invitation created: /invite/project/invite-token");
      expect(gotoMock).toHaveBeenCalledWith(`/projects/${projectId}/members/invites`);
    } finally {
      window.removeEventListener("connextSuccess", capture);
    }
  });
});
