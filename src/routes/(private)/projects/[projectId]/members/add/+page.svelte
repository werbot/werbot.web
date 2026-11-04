<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import { createProjectToken, tokenInviteLink } from "$lib/api/token";
  import Input from "$lib/components/form/Input.svelte";
  import Button from "$lib/components/form/Button.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import { membersTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { usePageData } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  type AddInvite_Request = {
    name: string;
    surname: string;
    email: string;
  };

  const pageData = usePageData();

  const params = $derived(page.params as { projectId?: string });
  const projectId = $derived(params.projectId ?? "");

  const onSendInvite = async (): Promise<void> => {
    try {
      pageData.loading = true;

      const bodyParams = <AddInvite_Request>{
        name: pageData.base.name?.trim() ?? "",
        surname: pageData.base.surname?.trim() ?? "",
        email: pageData.base.email?.trim() ?? ""
      };

      const res = await createProjectToken(projectId, bodyParams);
      if (res.data) {
        const token = res.data.result?.token;
        showMessage(token ? `Invitation created: ${tokenInviteLink(token)}` : res.data.message);
        pageData.error = {};
        await goto(routePath("projects-projectId-members-invites", { projectId }));
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
    document.title = "New member";
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-members-invites", { projectId })}>Invites</a>
      <span>New member</span>
    </h1>
  </header>
  <Tabs tabs={membersTabs} />

  <div class="desc">Description</div>
  <div class="content">
    <form
      onsubmit={(event): void => {
        event.preventDefault();
      }}
    >
      <div class="flex flex-row">
        <Input
          bind:value={pageData.base.name}
          name="Name"
          error={pageData.error["create_new_profile.name"]}
          disabled={pageData.loading}
          class="mr-5 flex-grow"
        />
        <Input
          bind:value={pageData.base.surname}
          name="Surname"
          error={pageData.error["create_new_profile.surname"]}
          disabled={pageData.loading}
          class="flex-grow"
        />
      </div>
      <Input
        bind:value={pageData.base.email}
        name="Email"
        error={pageData.error["create_new_profile.email"]}
        disabled={pageData.loading}
        class="mt-5 flex-grow"
      />

      <Button class="mt-8" loading={pageData.loading} onclick={onSendInvite}>Send invite</Button>
    </form>
  </div>
</div>
