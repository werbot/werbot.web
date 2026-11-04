import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
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
  logged_in: true,
  hasUserRole: 2 as number | null,
  hasUserName: "Alice",
  hasUserID: "profile-1",
  user: { id: "profile-1", name: "Alice", surname: "Smith", email: "alice@example.com", role: 2 },
  refreshToken: vi.fn(),
  resetStore: vi.fn()
}));

vi.mock("$lib/stores/auth.svelte", () => ({ authStore: authMock }));

import { setPageState } from "$lib/test/page.svelte";
import Header from "$lib/components/Header.svelte";
import AuthGroupLayout from "@/routes/(auth)/+layout.svelte";
import DestroyToken from "@/routes/(auth)/profile/setting/destroy/[token]/+page.svelte";
import { load as profileIndexLoad } from "@/routes/(private)/profile/+page";
import AddKey from "@/routes/(private)/profile/keys/add/+page.svelte";
import Password from "@/routes/(private)/profile/setting/password/+page.svelte";
import Setting from "@/routes/(private)/profile/setting/+page.svelte";

const TOKEN = "374060a3-6c9c-44b5-9fbd-ce1ea8af6c7b";

function snippet(markup: string): Snippet {
  return createRawSnippet(() => ({
    render: () => markup
  }));
}

function inputAt(container: HTMLElement, index: number): HTMLInputElement {
  return container.querySelectorAll("input")[index] as HTMLInputElement;
}

function textareaAt(container: HTMLElement, index: number): HTMLTextAreaElement {
  return container.querySelectorAll("textarea")[index] as HTMLTextAreaElement;
}

function apiClient(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    GET: vi.fn().mockResolvedValue({ data: { result: { projects: [], total: 0 } } }),
    PUT: vi.fn(),
    POST: vi.fn(),
    UPDATE: vi.fn(),
    DELETE: vi.fn(),
    ...overrides
  };
}

describe("profile routes", () => {
  beforeEach(() => {
    gotoMock.mockClear();
    redirectMock.mockClear();
    apiMock.mockReset();
    authMock.hasUserRole = 2;
    authMock.refreshToken.mockClear();
    authMock.resetStore.mockClear();
  });

  it("profile index redirects to profile-setting", () => {
    expect(() => profileIndexLoad()).toThrow();
    expect(redirectMock).toHaveBeenCalledWith(307, "/profile/setting");
  });

  it("topMenu hides admin item for role != 3 and shows it for role 3", async () => {
    apiMock.mockReturnValue(apiClient());

    const hidden = render(Header);
    await tick();
    await fireEvent.click(hidden.container.querySelectorAll("button.dropdown")[1]);

    expect(screen.queryByText("Admin")).toBeNull();
    hidden.unmount();

    authMock.hasUserRole = 3;

    const shown = render(Header);
    await tick();
    await fireEvent.click(shown.container.querySelectorAll("button.dropdown")[1]);

    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("destroy token page renders under the auth layout", async () => {
    setPageState(`/profile/setting/destroy/${TOKEN}`, { token: TOKEN });

    const deleteMock = vi.fn().mockResolvedValue({ data: { message: "Profile deleted" } });
    apiMock.mockReturnValue(apiClient({ DELETE: deleteMock }));

    const layout = render(AuthGroupLayout, {
      props: { children: snippet('<div role="status">Please wait...</div>') }
    });
    await tick();

    expect(layout.container.querySelector(".fon.center")).not.toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("Please wait...");

    const page = render(DestroyToken);
    await tick();

    expect(page.container.querySelector('[role="status"]')).not.toBeNull();
    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith(`/v1/profiles/delete/${TOKEN}`);
    });
  });

  it("keys/add submits trimmed title and key", async () => {
    const postMock = vi.fn().mockResolvedValue({ data: { message: "Key added" } });
    apiMock.mockReturnValue(apiClient({ POST: postMock }));

    const { container } = render(AddKey);

    await fireEvent.input(inputAt(container, 0), { target: { value: "  My key  " } });
    await fireEvent.input(textareaAt(container, 0), { target: { value: "  ssh-rsa AAA  " } });
    await fireEvent.click(screen.getByRole("button", { name: "Add SSH key" }));

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith("/v1/keys", {}, { title: "My key", key: "ssh-rsa AAA" });
    });
  });

  it("setting submits trimmed name and surname without email for non-admin users", async () => {
    const updateMock = vi.fn().mockResolvedValue({ data: { result: {} } });
    apiMock.mockReturnValue(apiClient({ UPDATE: updateMock }));

    const { container } = render(Setting);

    expect(inputAt(container, 0).disabled).toBe(true);

    await fireEvent.input(inputAt(container, 1), { target: { value: "  Alice  " } });
    await fireEvent.input(inputAt(container, 2), { target: { value: "  Smith  " } });
    await fireEvent.click(screen.getByRole("button", { name: "Update profile" }));

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledTimes(2);
    });
    expect(updateMock).toHaveBeenNthCalledWith(1, "/v1/profiles", {}, { name: "Alice" });
    expect(updateMock).toHaveBeenNthCalledWith(2, "/v1/profiles", {}, { surname: "Smith" });
  });

  it("setting lets admins update the email", async () => {
    authMock.hasUserRole = 3;
    const updateMock = vi.fn().mockResolvedValue({ data: { result: {} } });
    apiMock.mockReturnValue(apiClient({ UPDATE: updateMock }));

    const { container } = render(Setting);

    expect(inputAt(container, 0).disabled).toBe(false);

    await fireEvent.input(inputAt(container, 0), { target: { value: "  alice@example.com  " } });
    await fireEvent.input(inputAt(container, 1), { target: { value: "  Alice  " } });
    await fireEvent.input(inputAt(container, 2), { target: { value: "  Smith  " } });
    await fireEvent.click(screen.getByRole("button", { name: "Update profile" }));

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledTimes(3);
    });
    expect(updateMock).toHaveBeenNthCalledWith(1, "/v1/profiles", {}, { email: "alice@example.com" });
    expect(updateMock).toHaveBeenNthCalledWith(2, "/v1/profiles", {}, { name: "Alice" });
    expect(updateMock).toHaveBeenNthCalledWith(3, "/v1/profiles", {}, { surname: "Smith" });
  });

  it("password submits trimmed old and new passwords", async () => {
    const updateMock = vi.fn().mockResolvedValue({ data: { message: "Password updated" } });
    apiMock.mockReturnValue(apiClient({ UPDATE: updateMock }));

    const { container } = render(Password);

    await fireEvent.input(inputAt(container, 0), { target: { value: "  oldpass123  " } });
    await fireEvent.input(inputAt(container, 1), { target: { value: "  newpass123  " } });
    await fireEvent.input(inputAt(container, 2), { target: { value: "newpass123" } });
    await fireEvent.click(screen.getByRole("button", { name: "Update password" }));

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledWith(
        "/v1/profiles/password",
        {},
        { old_password: "oldpass123", new_password: "newpass123" }
      );
    });
  });

  it("password keeps the legacy exception that new_password2 is not trimmed", async () => {
    const updateMock = vi.fn();
    apiMock.mockReturnValue(apiClient({ UPDATE: updateMock }));

    const { container } = render(Password);

    await fireEvent.input(inputAt(container, 0), { target: { value: "oldpass123" } });
    await fireEvent.input(inputAt(container, 1), { target: { value: "  newpass123  " } });
    await fireEvent.input(inputAt(container, 2), { target: { value: "newpass123 " } });
    await fireEvent.click(screen.getByRole("button", { name: "Update password" }));

    await waitFor(() => {
      expect(screen.getAllByText("Passwords do not match").length).toBeGreaterThan(0);
    });
    expect(updateMock).not.toHaveBeenCalled();
  });
});
