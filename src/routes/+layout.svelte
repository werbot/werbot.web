<script lang="ts">
  import { browser } from "$app/environment";
  import { untrack } from "svelte";

  // eslint-disable-next-line no-relative-import-paths/no-relative-import-paths -- global stylesheet lives at src/app.css
  import "../app.css";
  import "virtual:svg-icons-register";
  import { bootstrapStores } from "$lib/stores";

  let { children } = $props();

  $effect(() => {
    if (browser) {
      untrack(() => bootstrapStores());
    }
  });
</script>

{@render children()}
<div id="alert"></div>
