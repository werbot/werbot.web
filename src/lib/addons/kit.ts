import { goto } from "$app/navigation";
import { authStore, projectStore, systemStore } from "$lib/stores";
import { getMenu, menuHref } from "$lib/navigation/menus.svelte";
import { isActiveRoute, routePath } from "$lib/navigation/registry";

/** The only host API an add-on page may import. */
export async function gotoRoute(name: string, params: Record<string, string> = {}): Promise<void> {
  await goto(routePath(name, params));
}

export { authStore, getMenu, isActiveRoute, menuHref, projectStore, routePath, systemStore };
