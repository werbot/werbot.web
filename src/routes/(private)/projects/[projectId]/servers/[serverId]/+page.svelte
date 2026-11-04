<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import Tabs from "$lib/components/Tabs.svelte";
  import { serverTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { projectStore } from "$lib/stores";

  const params = $derived(page.params as { projectId?: string; serverId?: string });
  const projectId = $derived(params.projectId ?? "");
  const serverId = $derived(params.serverId ?? "");

  onMount(() => {
    document.title = "Server info";
    void projectStore.serverNameByID(projectId, serverId);
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <div class="breadcrumbs">{projectStore.getServerNameByID(projectId, serverId)}</div>
  </header>
  <Tabs tabs={serverTabs} />
  <div class="desc">
    Several options for adding new members are available. Choose the right one and follow the instructions.
  </div>
</div>
