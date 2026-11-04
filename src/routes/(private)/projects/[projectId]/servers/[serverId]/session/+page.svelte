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
    document.title = "Server session list";
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

  <table>
    <thead>
      <tr>
        <th>Session ID</th>
        <th>Start session</th>
        <th>Client ip</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>0c3</td>
        <td>login_success</td>
        <td>162.158.90.222</td>
        <td>2.612766</td>
      </tr>
    </tbody>
  </table>
</div>
