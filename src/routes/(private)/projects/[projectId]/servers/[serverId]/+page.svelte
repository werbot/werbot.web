<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { api } from "$lib/api";
  import { createSchemeConnectToken } from "$lib/api/token";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import { serverTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { projectStore } from "$lib/stores";
  import { showApiError, showMessage, toDate } from "$lib/utils";

  import { SchemeType as ServerScheme } from "@proto/scheme/access";

  const params = $derived(page.params as { projectId?: string; serverId?: string });
  const projectId = $derived(params.projectId ?? "");
  const serverId = $derived(params.serverId ?? "");

  let schemeType = $state<number | null>(null);
  let connectToken = $state("");
  let connectExpiresAt = $state<unknown>(null);
  let connectLoading = $state(false);

  const isTelnet = $derived(schemeType === ServerScheme.server_telnet);

  const getData = async (): Promise<void> => {
    const res = await api().GET(`/v1/schemes/${projectId}/${serverId}`);
    if (res.data) {
      schemeType = res.data.result?.scheme_type ?? null;
    }
    if (res.error) {
      await showApiError(res.error, [404]);
    }
  };

  const createConnectToken = async (): Promise<void> => {
    try {
      connectLoading = true;
      const res = await createSchemeConnectToken(serverId);
      if (res.data) {
        connectToken = res.data.result?.token ?? "";
        connectExpiresAt = res.data.result?.expired_at ?? null;
        showMessage(res.data.message);
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      connectLoading = false;
    }
  };

  const copyConnectToken = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(connectToken);
      showMessage("The token has been copied to the clipboard");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  onMount(() => {
    document.title = "Server info";
    void projectStore.serverNameByID(projectId, serverId);
    void getData();
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

  {#if isTelnet}
    <div class="card mt-8">
      <span class="title">Telnet connection</span>
      <div class="desc">
        Generate a one-time token for the avocado telnet listener. The token expires after 5 minutes and works once.
      </div>

      <div class="mt-5 flex flex-wrap items-end gap-4">
        <Button loading={connectLoading} onclick={createConnectToken}>Generate token</Button>
        {#if connectToken}
          <Button lite onclick={copyConnectToken}>Copy</Button>
        {/if}
      </div>

      {#if connectToken}
        <div class="mt-5">
          <Input name="Token" value={connectToken} disabled={true} />
        </div>
        {#if connectExpiresAt}
          <div class="desc mt-2">Expires: {toDate(connectExpiresAt)}</div>
        {/if}
      {/if}
    </div>
  {/if}
</div>
