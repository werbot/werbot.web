import { authStore } from "$lib/stores/auth.svelte";
import { projectStore } from "$lib/stores/project.svelte";
import { systemStore } from "$lib/stores/system.svelte";

export { authStore, projectStore, systemStore };
export { usePageData } from "$lib/stores/page-data.svelte";
export type { PageData } from "$lib/stores/page-data.svelte";

export function bootstrapStores(): void {
  if (authStore.logged_in) {
    authStore.getProfile();
    systemStore.getVersion();
  }
}
