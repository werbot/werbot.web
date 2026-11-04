import { beforeEach, describe, expect, it, vi } from "vitest";

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

import { load } from "@/routes/(auth)/profile/setting/destroy/[token]/+page";

describe("profile destroy token guard", () => {
  beforeEach(() => {
    localStorage.clear();
    redirectMock.mockClear();
  });

  it("redirects anonymous visitors to signin", () => {
    expect(() => load()).toThrow();
    expect(redirectMock).toHaveBeenCalledWith(307, "/auth/signin");
  });

  it("allows a visitor with an access token", () => {
    localStorage.setItem("access_token", "access-token");

    expect(() => load()).not.toThrow();
    expect(redirectMock).not.toHaveBeenCalled();
  });
});
