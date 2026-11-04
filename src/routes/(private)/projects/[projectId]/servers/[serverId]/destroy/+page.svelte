<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Tabs from "$lib/components/Tabs.svelte";
  import Button from "$lib/components/form/Button.svelte";
  import { serverTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { projectStore } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  const params = $derived(page.params as { projectId?: string; serverId?: string });
  const projectId = $derived(params.projectId ?? "");
  const serverId = $derived(params.serverId ?? "");

  const onDelete = async (): Promise<void> => {
    try {
      const res = await api().DELETE(`/v1/schemes/${projectId}/${serverId}`);
      if (res.data) {
        showMessage(res.data.message);
        await goto(routePath("projects-projectId-servers", { projectId }));
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  onMount(() => {
    document.title = "Destroy server";
    void projectStore.serverNameByID(projectId, serverId);
  });
</script>

<div class="artboard red">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <div class="breadcrumbs">{projectStore.getServerNameByID(projectId, serverId)}</div>
  </header>

  <Tabs tabs={serverTabs} />
  <div class="desc">
    This action CANNOT be undone. This will permanently delete the server and if you’d like to use it in the future, you
    will need to added it again.
  </div>

  <div class="content">
    <form
      onsubmit={(event): void => {
        event.preventDefault();
      }}
    >
      <Button class="red" onclick={onDelete}>Delete this server</Button>
    </form>
  </div>
</div>
