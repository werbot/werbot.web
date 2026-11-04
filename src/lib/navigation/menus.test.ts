import { beforeEach, describe, expect, it } from "vitest";

import { getMenu, menuHref, registerAddons } from "$lib/navigation/menus.svelte";
import type { MenuGroup } from "$lib/utils";

function clearAddons(): void {
  registerAddons({
    routes: [],
    menus: { admin: [], profile: [], project: [] }
  });
}

describe("navigation menus", () => {
  beforeEach(() => {
    clearAddons();
  });

  it("merges core and add-on groups with sorting", () => {
    const addon: MenuGroup = {
      group10: [
        { name: "Addon first", link: { name: "admin-users" }, sort: 1 },
        { name: "Addon last", link: { name: "admin-settings" }, sort: 30 }
      ]
    };

    registerAddons({ routes: [], menus: { admin: [addon], profile: [], project: [] } });

    const menu = getMenu("admin");
    const group = menu.group10.map((item) => item.name);

    expect(group[0]).toBe("Addon first");
    expect(group).toContain("Users");
    expect(group[group.length - 1]).toBe("Addon last");
    expect(group.indexOf("Addon first")).toBeLessThan(group.indexOf("Users"));
  });

  it("resolves a named menu link to a path with the current project param", () => {
    const item = { name: "Servers", link: { name: "projects-projectId-servers" } };

    expect(menuHref(item, { projectId: "p" })).toBe("/projects/p/servers");
  });

  it("ignores add-on topMenu", () => {
    registerAddons({
      routes: [],
      menus: {
        admin: [],
        profile: [],
        project: [],
        topMenu: {
          group10: [{ name: "Hidden", link: { name: "profile-logs" } }]
        }
      } as never
    });

    const menu = getMenu("profile");
    const names = Object.values(menu)
      .flat()
      .map((item) => item.name);

    expect(names).toEqual(["Settings", "SSH keys", "Logs"]);
    expect(names).not.toContain("Hidden");
  });
});
