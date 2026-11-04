<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { routePath } from "$lib/navigation/registry";
  import { projectStore } from "$lib/stores";

  const params = $derived(page.params as { projectId?: string; serverId?: string });
  const projectId = $derived(params.projectId ?? "");
  const serverId = $derived(params.serverId ?? "");

  onMount(() => {
    document.title = "Server session info";
    void projectStore.serverNameByID(projectId, serverId);
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <div class="breadcrumbs">
      <div class="breadcrumbs">{projectStore.getServerNameByID(projectId, serverId)}</div>
      <span>
        <a href={routePath("projects-projectId-servers-serverId-session", { projectId, serverId })}>Sessions</a>
      </span>
    </div>
  </header>
</div>
