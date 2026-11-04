import { authStore } from "$lib/stores/auth.svelte";
import { projectStore } from "$lib/stores/project.svelte";
import { systemStore } from "$lib/stores/system.svelte";
import { wsStore } from "$lib/stores/ws.svelte";

export { projectStore, systemStore, wsStore };
export { usePageData } from "$lib/stores/page-data.svelte";
export type { PageData } from "$lib/stores/page-data.svelte";

export function bootstrapStores(): void {
  if (authStore.logged_in) {
    // The private layout load hydrates the profile before the shell mounts, so
    // do not fetch it twice for the same session.
    if (!authStore.hasUserID) {
      authStore.getProfile();
    }
    systemStore.getVersion();
  }
}
