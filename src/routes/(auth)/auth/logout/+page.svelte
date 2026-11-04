<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { routePath } from "$lib/navigation/registry";
  import { authStore } from "$lib/stores";

  const logout = async (): Promise<void> => {
    try {
      await authStore.logout();
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      await goto(routePath("auth-signin"));
    }
  };

  onMount(() => {
    document.title = "Please wait...";
    void logout();
  });
</script>

<div role="status">Please wait...</div>
