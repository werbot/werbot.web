<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import { settingTabs } from "$lib/menus/project-tabs";
  import { usePageData } from "$lib/stores";
  import { authStore } from "$lib/stores/auth.svelte";
  import { showApiError, showMessage } from "$lib/utils";

  import { type Project_Request, type UpdateProject_Request } from "@proto/project/message";

  const pageData = usePageData();

  const params = $derived(page.params as { projectId?: string });
  const projectId = $derived(params.projectId ?? "");

  let original = { title: "", alias: "" };

  const getData = async (): Promise<void> => {
    try {
      const queryParams = {
        owner_id: authStore.hasUserID
      } as Project_Request;

      const res = await api().GET(`/v1/projects/${projectId}`, queryParams);
      if (res.data) {
        const project = res.data.result;
        pageData.base = project;
        original = { title: project.title ?? "", alias: project.alias ?? "" };
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const updateSetting = async (setting: { title: string } | { alias: string }): Promise<boolean> => {
    const res = await api().UPDATE(`/v1/projects/${projectId}`, {}, setting as unknown as UpdateProject_Request);
    if (res.error) {
      pageData.error = res.error.result ?? {};
      await showApiError(res.error);
      return false;
    }

    return true;
  };

  const onUpdate = async (): Promise<void> => {
    try {
      pageData.loading = true;
      pageData.error = {};

      const title = pageData.base.title ?? "";
      const alias = (pageData.base.alias ?? "").trim();

      if (title !== original.title) {
        if (!(await updateSetting({ title }))) {
          return;
        }
        original.title = title;
      }

      if (authStore.hasUserRole === 3 && alias !== original.alias) {
        if (!(await updateSetting({ alias }))) {
          return;
        }
        original.alias = alias;
      }

      showMessage("Project updated");
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.loading = false;
    }
  };

  onMount(() => {
    document.title = "Project setting";
    void getData();
  });
</script>

<div class="artboard">
  <header>
    <h1>Setting</h1>
  </header>
  <Tabs tabs={settingTabs} />

  <div class="content">
    <form
      onsubmit={(event): void => {
        event.preventDefault();
      }}
    >
      <div class="mb-5 flex flex-row">
        <Input bind:value={pageData.base.title} name="Title" error={pageData.error["title"]} class="mr-5 flex-grow" />
        <Input
          bind:value={pageData.base.alias}
          name="Login"
          error={pageData.error["alias"]}
          disabled={authStore.hasUserRole !== 3}
          class="flex-grow"
        />
      </div>

      <div class="mt-6">
        <div class="flex-none">
          <Button class="mr-5" loading={pageData.loading} onclick={onUpdate}>Update</Button>
        </div>
      </div>
    </form>
  </div>
</div>
