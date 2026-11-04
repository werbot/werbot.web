import { SvelteURL } from "svelte/reactivity";

/** Reactive stand-in for SvelteKit's `$app/state` page used by component tests. */
export const pageState = $state({
  url: new SvelteURL("http://localhost/"),
  params: {} as Record<string, string>,
  data: {} as Record<string, unknown>
});

export function setPageState(
  path: string,
  params: Record<string, string> = {},
  data: Record<string, unknown> = {}
): void {
  pageState.url = new SvelteURL(`http://localhost${path}`);
  pageState.params = params;
  pageState.data = data;
}
