<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  import { api } from "$lib/api";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { routePath } from "$lib/navigation/registry";
  import { usePageData } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  import { type AddProject_Request } from "@proto/project/message";

  const pageData = usePageData();

  const onSubmit = async (): Promise<void> => {
    try {
      pageData.loading = true;

      const bodyParams = {
        title: pageData.base.title,
        login: pageData.base.login?.trim()
      } as unknown as AddProject_Request;

      const res = await api().POST(`/v1/projects`, {}, bodyParams);
      if (res.data) {
        showMessage(res.data.message);
        pageData.error = {};
        const projectId = res.data.result.project_id;
        await goto(routePath("projects-projectId", { projectId }));
      }
      if (res.error) {
        pageData.error = res.error.result;
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.loading = false;
    }
  };

  onMount(() => {
    document.title = "New project";
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={resolve("/projects")}> Projects list </a>
    </h1>
    <div class="breadcrumbs">New project</div>
  </header>

  <div class="desc">Create a new project where you can add new servers and invite members.</div>

  <div class="content">
    <form
      onsubmit={(event): void => {
        event.preventDefault();
      }}
    >
      <div class="flex flex-row">
        <Input bind:value={pageData.base.title} name="Title" error={pageData.error["title"]} class="mr-5 flex-grow" />
        <Input bind:value={pageData.base.login} name="Login" error={pageData.error["login"]} class="flex-grow" />
      </div>

      <Button class="mt-8" loading={pageData.loading} onclick={onSubmit}>Add project</Button>
    </form>
  </div>
</div>
