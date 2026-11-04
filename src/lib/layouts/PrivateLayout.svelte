<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import type { Snippet } from "svelte";

  import Header from "$lib/components/Header.svelte";
  import LayoutNavigation from "$lib/layouts/Navigation.svelte";
  import { wsStore } from "$lib/stores";
  import { authStore } from "$lib/stores/auth.svelte";

  interface Props {
    layoutStyle?: string;
    children: Snippet;
  }

  let { layoutStyle, children }: Props = $props();

  let adminChecked = false;

  // Legacy parity: the old private layout checks the role once when it mounts, so
  // a client-side transition into /admin after mount is not rechecked.
  $effect(() => {
    if (adminChecked) {
      return;
    }
    adminChecked = true;

    if (page.url.pathname.startsWith("/admin") && authStore.hasUserRole !== 3) {
      goto(resolve("/"));
    }
  });

  $effect(() => {
    wsStore.open();
    return (): void => wsStore.close();
  });

  $effect(() => {
    if (wsStore.status === "OPEN" && authStore.hasUserID) {
      wsStore.send(JSON.stringify({ action: "subscribe", user_id: authStore.hasUserID }));
    }
  });

  $effect(() => {
    const data = wsStore.data;
    if (!data) {
      return;
    }

    try {
      const { code, action } = JSON.parse(data);
      if (code === 200 && action === "subscribe") {
        wsStore.send(JSON.stringify({ action: "info" }));
      } else if (code === 401) {
        wsStore.close();
        wsStore.open();
      }
    } catch {
      // Legacy assumed every frame was JSON; ignore anything else.
    }
  });
</script>

<div class="px-6">
  <Header />

  {#if !layoutStyle}
    <div class="content">
      <LayoutNavigation />
      <div class="right">
        <div id="alert"></div>
        {@render children()}
      </div>
    </div>
  {/if}

  {#if layoutStyle === "blank"}
    <div class="content">
      <div id="alert"></div>
      {@render children()}
    </div>
  {/if}
</div>
