<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Button from "$lib/components/form/Button.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import { settingTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { authStore } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  import { type DeleteProject_Request } from "@proto/project/message";

  const params = $derived(page.params as { projectId?: string });
  const projectId = $derived(params.projectId ?? "");

  const onDelete = async (): Promise<void> => {
    try {
      const queryParams = {
        project_id: projectId,
        owner_id: authStore.hasUserID
      } as DeleteProject_Request;

      const res = await api().DELETE(`/v1/projects`, queryParams);
      if (res.data) {
        showMessage(res.data.message);
        await goto(routePath("projects"));
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  onMount(() => {
    document.title = "Destroy project";
  });
</script>

<div class="artboard red">
  <header>
    <h1>Destroy this project</h1>
  </header>
  <Tabs tabs={settingTabs} />
  <div class="desc">This operation will permanently delete your project. It CAN NOT be undone.</div>

  <div class="content">
    <form
      onsubmit={(event): void => {
        event.preventDefault();
      }}
    >
      <Button class="red" onclick={onDelete}>Delete this project</Button>
    </form>
  </div>
</div>
