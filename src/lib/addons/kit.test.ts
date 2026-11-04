import { beforeEach, describe, expect, it, vi } from "vitest";

const gotoMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

vi.mock("$app/navigation", () => ({ goto: gotoMock }));

import { gotoRoute, isActiveRoute, routePath } from "./kit";

describe("addon kit", () => {
  beforeEach(() => {
    gotoMock.mockClear();
  });

  it("navigates to a named route with params", async () => {
    await gotoRoute("projects-projectId-servers", { projectId: "p1" });

    expect(gotoMock).toHaveBeenCalledWith("/projects/p1/servers");
  });

  it("exposes the host route helpers", () => {
    expect(routePath("admin-users")).toBe("/admin/users");
    expect(isActiveRoute("admin", "/admin/users")).toBe(true);
    expect(isActiveRoute("admin", "/projects")).toBe(false);
  });
});
