import { describe, expect, it } from "vitest";

import { menu as adminMenu } from "$lib/menus/admin";
import { menu as profileMenu, topMenu } from "$lib/menus/profile";
import { membersTabs, serverTabs, settingTabs } from "$lib/menus/project-tabs";
import { menu as projectsMenu } from "$lib/menus/projects";
import type { MenuGroup, MenuItem } from "$lib/utils";
import { isActiveRoute, routePath, routePathWithQuery, ROUTES } from "$lib/navigation/registry";

function menuItems(menu: MenuGroup): MenuItem[] {
  return Object.values(menu).flat();
}

describe("route registry", () => {
  it("routePath fills project and server params", () => {
    expect(routePath("projects-projectId-servers-serverId", { projectId: "p", serverId: "s" })).toBe(
      "/projects/p/servers/s"
    );
  });

  it("routePath throws a named error for an unknown name", () => {
    expect(() => routePath("does-not-exist")).toThrowError("Unknown route name: does-not-exist");
  });

  it("routePathWithQuery appends an encoded query to the route path", () => {
    expect(routePathWithQuery("auth-signin", { token: "a b" })).toBe("/auth/signin?token=a+b");
    expect(routePathWithQuery("auth-signin", {})).toBe("/auth/signin");
  });

  it("isActiveRoute matches nested paths", () => {
    expect(isActiveRoute("profile", "/profile/setting")).toBe(true);
    expect(isActiveRoute("profile", "/projects")).toBe(false);
  });

  it("every menu link in core menus resolves", () => {
    const params = {
      projectId: "p",
      serverId: "s",
      memberId: "m",
      sessionId: "x",
      logId: "l",
      invite: "i",
      token: "t",
      scheme: "ssh"
    };
    const items = [
      ...menuItems(adminMenu),
      ...menuItems(profileMenu),
      ...menuItems(topMenu),
      ...menuItems(projectsMenu),
      ...settingTabs,
      ...membersTabs,
      ...serverTabs
    ];

    for (const item of items) {
      expect(item.link.name, `${item.name} has no link name`).toBeTruthy();
      expect(() => routePath(item.link.name as string, params)).not.toThrow();
      expect(routePath(item.link.name as string, params).startsWith("/")).toBe(true);
    }
  });

  it("keeps every core route name unique", () => {
    const names = ROUTES.map((route) => route.name);

    expect(new Set(names).size).toBe(names.length);
  });
});
