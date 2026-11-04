<script lang="ts">
  import { browser } from "$app/environment";
  import { afterNavigate, beforeNavigate, onNavigate } from "$app/navigation";
  import { done, start } from "nprogress";
  import { untrack } from "svelte";

  // eslint-disable-next-line no-relative-import-paths/no-relative-import-paths -- global stylesheet lives at src/app.css
  import "../app.css";
  import "virtual:svg-icons-register";
  import Alert from "$lib/components/Alert.svelte";
  import { registerAddons } from "$lib/addons/register";
  import { bootstrapStores } from "$lib/stores";
  import { menus, routes } from "@/generated/addons";

  let { children } = $props();

  // Register add-on routes and menus before any sidebar renders.
  registerAddons({ menus, routes });

  // Legacy main.ts silenced console.log in production.
  if (import.meta.env.PROD) {
    console.log = (): void => {};
  }

  beforeNavigate(() => start());
  afterNavigate(() => done());
  onNavigate((navigation) => {
    // SvelteKit reports load failures through +error and still runs
    // afterNavigate; a cancelled navigation does not, so clear the bar here.
    if (!navigation.to) {
      done();
    }
  });

  $effect(() => {
    document.title = "Werbot";
  });

  $effect(() => {
    if (browser) {
      untrack(() => bootstrapStores());
    }
  });
</script>

{@render children()}
<Alert />
