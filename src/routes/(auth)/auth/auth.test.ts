import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
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

const authMock = vi.hoisted(() => ({
  logged_in: false,
  error: {} as Record<string, string | null>,
  login: vi.fn(),
  resetError: vi.fn(),
  setError: vi.fn()
}));

const systemMock = vi.hoisted(() => ({
  invites: {
    project: null as string | null
  }
}));

vi.mock("$lib/stores", async (importOriginal) => {
  const actual = await importOriginal<typeof import("$lib/stores")>();
  return { ...actual, authStore: authMock, systemStore: systemMock };
});

const tokenApiMock = vi.hoisted(() => ({
  getTokenInfo: vi.fn(),
  registerToken: vi.fn(),
  acceptToken: vi.fn()
}));

vi.mock("$lib/api/token", async (importOriginal) => {
  const actual = await importOriginal<typeof import("$lib/api/token")>();
  return { ...actual, ...tokenApiMock };
});

import { setPageState } from "$lib/test/page.svelte";
import { Status } from "@proto/token/tokenenum";
import { load as authRootLoad } from "@/routes/(auth)/auth/+page";
import InviteProject from "@/routes/(auth)/invite/project/[invite]/+page.svelte";
import { load as inviteProjectLoad } from "@/routes/(blank)/invite/project/+page";
import { load as inviteRootLoad } from "@/routes/(blank)/invite/+page";
import Signin from "@/routes/(auth)/auth/signin/+page.svelte";
import Signup from "@/routes/(auth)/auth/signup/[[token]]/+page.svelte";

const INVITE = "374060a3-6c9c-44b5-9fbd-ce1ea8af6c7b";

function deferred<T>(): { promise: Promise<T>; resolve: (value: T) => void } {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });

  return { promise, resolve };
}

function inputAt(container: HTMLElement, index: number): HTMLInputElement {
  return container.querySelectorAll("input")[index] as HTMLInputElement;
}

describe("signin route", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    authMock.login.mockReset();
    authMock.logged_in = false;
    authMock.error = {};
    systemMock.invites.project = null;
  });

  it("signin submits email/password to authStore.login and navigates to the token target or /", async () => {
    setPageState("/auth/signin?token=" + INVITE);
    authMock.login.mockImplementation(async () => {
      authMock.logged_in = true;
    });

    const { container } = render(Signin);

    await fireEvent.input(inputAt(container, 0), { target: { value: "  user@example.com  " } });
    await fireEvent.input(inputAt(container, 1), { target: { value: " secret " } });
    await fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(gotoMock).toHaveBeenCalledWith(`/invite/project/${INVITE}`);
    });
    expect(authMock.login).toHaveBeenCalledWith({ email: "user@example.com", password: "secret" });
    expect(systemMock.invites.project).toBe(INVITE);
  });

  it("signin falls back to the stored invite target", async () => {
    setPageState("/auth/signin");
    systemMock.invites.project = INVITE;
    authMock.login.mockImplementation(async () => {
      authMock.logged_in = true;
    });

    const { container } = render(Signin);

    await fireEvent.input(inputAt(container, 0), { target: { value: "user@example.com" } });
    await fireEvent.input(inputAt(container, 1), { target: { value: "secret" } });
    await fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(gotoMock).toHaveBeenCalledWith(`/invite/project/${INVITE}`);
    });
  });

  it("signin navigates to the index without a pending invite", async () => {
    setPageState("/auth/signin");
    authMock.login.mockImplementation(async () => {
      authMock.logged_in = true;
    });

    const { container } = render(Signin);

    await fireEvent.input(inputAt(container, 0), { target: { value: "user@example.com" } });
    await fireEvent.input(inputAt(container, 1), { target: { value: "secret" } });
    await fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(gotoMock).toHaveBeenCalledWith("/");
    });
  });
});

describe("signup route", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    authMock.logged_in = false;
    tokenApiMock.getTokenInfo.mockReset();
    tokenApiMock.registerToken.mockReset();
    tokenApiMock.acceptToken.mockReset();
    setPageState(`/auth/signup/${INVITE}`, { token: INVITE });
  });

  it("signup disables submit until the token loads and rejects passwords under 8 characters", async () => {
    const info = deferred<unknown>();
    tokenApiMock.getTokenInfo.mockReturnValue(info.promise);

    const { container } = render(Signup);
    const button = screen.getByRole("button", { name: "Registration" }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);

    info.resolve({
      data: {
        result: { status: Status.sent, section: 1, profile: { email: "invited@example.com" } }
      }
    });

    await waitFor(() => {
      expect(button.disabled).toBe(false);
    });
    expect(inputAt(container, 0).value).toBe("invited@example.com");

    await fireEvent.input(inputAt(container, 1), { target: { value: "short" } });
    await fireEvent.input(inputAt(container, 2), { target: { value: "short" } });
    await fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Weak password")).toBeInTheDocument();
    });
    expect(tokenApiMock.registerToken).not.toHaveBeenCalled();
    expect(tokenApiMock.acceptToken).not.toHaveBeenCalled();
  });

  it("signup rejects mismatched passwords with the password2 error", async () => {
    tokenApiMock.getTokenInfo.mockResolvedValue({
      data: {
        result: { status: Status.sent, section: 1, profile: { email: "invited@example.com" } }
      }
    });

    const { container } = render(Signup);
    const button = screen.getByRole("button", { name: "Registration" }) as HTMLButtonElement;

    await waitFor(() => {
      expect(button.disabled).toBe(false);
    });

    await fireEvent.input(inputAt(container, 1), { target: { value: "password-one" } });
    await fireEvent.input(inputAt(container, 2), { target: { value: "password-two" } });
    await fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
    expect(inputAt(container, 2)).toHaveClass("error");
    expect(tokenApiMock.registerToken).not.toHaveBeenCalled();
  });

  it("signup registers the invited profile with the token password", async () => {
    tokenApiMock.getTokenInfo.mockResolvedValue({
      data: {
        result: { status: Status.sent, section: 1, profile: { email: "invited@example.com" } }
      }
    });
    tokenApiMock.registerToken.mockResolvedValue({ data: { result: { message: "Registration completed" } } });

    const { container } = render(Signup);
    const button = screen.getByRole("button", { name: "Registration" }) as HTMLButtonElement;

    await waitFor(() => {
      expect(button.disabled).toBe(false);
    });

    await fireEvent.input(inputAt(container, 1), { target: { value: "password-one" } });
    await fireEvent.input(inputAt(container, 2), { target: { value: "password-one" } });
    await fireEvent.click(button);

    await waitFor(() => {
      expect(tokenApiMock.registerToken).toHaveBeenCalledWith(INVITE, "password-one");
    });
    await waitFor(() => {
      expect(gotoMock).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("signup redirects an existing profile to signin with the invite token", async () => {
    tokenApiMock.getTokenInfo.mockResolvedValue({
      data: {
        result: { status: Status.sent, section: 1, profile_exists: true }
      }
    });

    render(Signup);

    await waitFor(() => {
      expect(gotoMock).toHaveBeenCalledWith(`/auth/signin?token=${INVITE}`);
    });
  });
});

describe("invite route", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    authMock.logged_in = false;
    tokenApiMock.getTokenInfo.mockReset();
    tokenApiMock.acceptToken.mockReset();
  });

  it("invite route loads token info and shows its status", async () => {
    setPageState(`/invite/project/${INVITE}`, { invite: INVITE });
    tokenApiMock.getTokenInfo.mockResolvedValue({ data: { result: { status: Status.used } } });

    const { container } = render(InviteProject);

    await waitFor(() => {
      expect(screen.getByText(/has already been used to add the current account/)).toBeInTheDocument();
    });
    expect(tokenApiMock.getTokenInfo).toHaveBeenCalledWith(INVITE);
    expect(container.querySelector(".artboard.yellow")).not.toBeNull();
  });

  it("invite route shows the invalid message when the token request fails", async () => {
    setPageState(`/invite/project/${INVITE}`, { invite: INVITE });
    tokenApiMock.getTokenInfo.mockResolvedValue({ error: { code: 404, message: "Not Found", result: "Not Found" } });

    const { container } = render(InviteProject);

    await waitFor(() => {
      expect(screen.getByText("The link to join the project is invalid.")).toBeInTheDocument();
    });
    expect(container.querySelector(".artboard.red")).not.toBeNull();
  });

  it("invite route sends an unauthenticated new profile to signup", async () => {
    setPageState(`/invite/project/${INVITE}`, { invite: INVITE });
    tokenApiMock.getTokenInfo.mockResolvedValue({ data: { result: { status: Status.sent, section: 1 } } });

    render(InviteProject);

    await waitFor(() => {
      expect(gotoMock).toHaveBeenCalledWith(`/auth/signup/${INVITE}`);
    });
  });

  it("invite route sends an unauthenticated existing profile to signin", async () => {
    setPageState(`/invite/project/${INVITE}`, { invite: INVITE });
    tokenApiMock.getTokenInfo.mockResolvedValue({
      data: { result: { status: Status.sent, section: 1, profile_id: "profile-1" } }
    });

    render(InviteProject);

    await waitFor(() => {
      expect(gotoMock).toHaveBeenCalledWith(`/auth/signin?token=${INVITE}`);
    });
  });

  it("invite route accepts the token for an authenticated user", async () => {
    setPageState(`/invite/project/${INVITE}`, { invite: INVITE });
    authMock.logged_in = true;
    tokenApiMock.getTokenInfo.mockResolvedValue({ data: { result: { status: Status.sent, section: 1 } } });
    tokenApiMock.acceptToken.mockResolvedValue({ data: { result: {} } });

    render(InviteProject);

    await waitFor(() => {
      expect(tokenApiMock.acceptToken).toHaveBeenCalledWith(INVITE);
    });
    await waitFor(() => {
      expect(gotoMock).toHaveBeenCalledWith("/");
    });
  });
});

describe("invite redirects", () => {
  beforeEach(() => {
    redirectMock.mockClear();
  });

  it("auth root redirects to signin", () => {
    expect(() => authRootLoad()).toThrow();
    expect(redirectMock).toHaveBeenCalledWith(307, "/auth/signin");
  });

  it("invite root redirects to the 404 route", () => {
    expect(() => inviteRootLoad()).toThrow();
    expect(redirectMock).toHaveBeenCalledWith(307, "/404");
  });

  it("invite project root redirects to signin", () => {
    expect(() => inviteProjectLoad()).toThrow();
    expect(redirectMock).toHaveBeenCalledWith(307, "/auth/signin");
  });
});
