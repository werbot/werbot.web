<script lang="ts">
  import BlankLayout from "$lib/layouts/BlankLayout.svelte";

  let { children } = $props();
</script>

<BlankLayout>
  {@render children()}
</BlankLayout>
