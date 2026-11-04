import { redirect } from "@sveltejs/kit";

import { getStorage } from "$lib/utils";

export function load(): void {
  if (!getStorage("access_token")) {
    throw redirect(307, "/auth/signin");
  }
}
