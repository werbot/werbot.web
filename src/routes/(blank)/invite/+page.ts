import { redirect } from "@sveltejs/kit";

import { routePath } from "$lib/navigation/registry";

export function load(): void {
  throw redirect(307, routePath("404"));
}
