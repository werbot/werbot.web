<script lang="ts">
  import AuthLayout from "$lib/layouts/AuthLayout.svelte";

  let { children } = $props();
</script>

<AuthLayout>
  {@render children()}
</AuthLayout>
