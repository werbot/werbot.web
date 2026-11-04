<script lang="ts">
  import { page } from "$app/state";

  import PrivateLayout from "$lib/layouts/PrivateLayout.svelte";

  let { children } = $props();

  const layoutStyle = $derived(page.data.layoutStyle);
</script>

<PrivateLayout {layoutStyle}>
  {@render children()}
</PrivateLayout>
