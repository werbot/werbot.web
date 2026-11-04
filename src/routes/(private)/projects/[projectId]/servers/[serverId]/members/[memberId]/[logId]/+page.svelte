<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import Tabs from "$lib/components/Tabs.svelte";
  import { serverTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";

  const params = $derived(page.params as { projectId?: string });
  const projectId = $derived(params.projectId ?? "");

  onMount(() => {
    document.title = "Server member";
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <h1>Member log</h1>
  </header>
  <Tabs tabs={serverTabs} />
</div>
