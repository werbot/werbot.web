import { menu as adminMenu } from "$lib/menus/admin";
import { menu as profileMenu } from "$lib/menus/profile";
import { menu as projectsMenu } from "$lib/menus/projects";
import { registerRoutes, type RouteDef, routePath } from "$lib/navigation/registry";
import { type MenuGroup, type MenuItem, mergeMenus } from "$lib/utils";

export type MenuSection = "admin" | "profile" | "project";

export interface AddonPayload {
  routes: RouteDef[];
  menus: Record<MenuSection, MenuGroup[]>;
}

const coreMenus: Record<MenuSection, MenuGroup> = {
  admin: adminMenu,
  profile: profileMenu,
  project: projectsMenu
};

let addonMenus = $state<Record<MenuSection, MenuGroup[]>>({
  admin: [],
  profile: [],
  project: []
});

export function getMenu(section: MenuSection): MenuGroup {
  return mergeMenus([coreMenus[section], ...addonMenus[section]]);
}

export function menuHref(item: MenuItem, params: Record<string, string> = {}): string {
  if (!item.link.name) {
    throw new Error(`Menu item ${item.name} has no route name`);
  }

  return routePath(item.link.name, { ...(item.link.params ?? {}), ...params });
}

export function registerAddons(payload: AddonPayload): void {
  registerRoutes(payload.routes ?? []);

  const menus = payload.menus ?? ({} as Partial<AddonPayload["menus"]>);

  addonMenus = {
    admin: menus.admin ?? [],
    profile: menus.profile ?? [],
    project: menus.project ?? []
  };
}
