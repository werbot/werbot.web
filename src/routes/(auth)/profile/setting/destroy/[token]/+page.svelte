<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";

  import { api } from "$lib/api";
  import { authStore } from "$lib/stores/auth.svelte";
  import { showApiError, showMessage } from "$lib/utils";

  const destroyProfile = async (): Promise<void> => {
    const token = page.params.token ?? null;

    try {
      const res = await api().DELETE(`/v1/profiles/delete/${token}`);
      if (res.data) {
        showMessage(res.data.message);
        authStore.resetStore();
        await goto(resolve("/auth/signin"));
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      await goto(resolve("/"));
    }
  };

  onMount(() => {
    void destroyProfile();
  });
</script>

<div role="status">Please wait...</div>
