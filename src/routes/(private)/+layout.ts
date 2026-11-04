import { redirect } from "@sveltejs/kit";

import { systemStore } from "$lib/stores";
import { authStore } from "$lib/stores/auth.svelte";
import { getStorage } from "$lib/utils";

export function load(): void {
  if (!getStorage("access_token")) {
    throw redirect(307, "/auth/signin");
  }

  if (!authStore.hasUserID) {
    authStore.getProfile();
  }
  systemStore.getVersion();
}
