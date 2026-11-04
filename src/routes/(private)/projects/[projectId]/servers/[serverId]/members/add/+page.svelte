<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { api } from "$lib/api";
  import {
    createSchemeToken,
    deleteToken,
    listSchemeTokens,
    tokenAcceptLink,
    tokenProfile,
    tokenStatusName
  } from "$lib/api/token";
  import Badge from "$lib/components/Badge.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { serverTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { projectStore, usePageData } from "$lib/stores";
  import { authStore } from "$lib/stores/auth.svelte";
  import { showApiError, showMessage, toDate } from "$lib/utils";

  const pageData = usePageData();

  pageData.base = { total: 0, members: [], inviteEmail: "", schemeInvites: [] };
  pageData.tmp = { inviteLink: null };

  const params = $derived(page.params as { projectId?: string; serverId?: string });
  const projectId = $derived(params.projectId ?? "");
  const serverId = $derived(params.serverId ?? "");

  function queryFromUrl(): Record<string, string> {
    const query: Record<string, string> = {};
    const limit = page.url.searchParams.get("limit");
    const offset = page.url.searchParams.get("offset");

    if (limit !== null) {
      query.limit = limit;
    }
    if (offset !== null) {
      query.offset = offset;
    }

    return query;
  }

  const getData = async (routeQuery: { limit?: string | number; offset?: string | number } = {}): Promise<void> => {
    try {
      const queryParams = {
        ...(authStore.hasUserRole === 3 && { owner_id: authStore.hasUserID }),
        ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
        ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
      };

      const res = await api().GET(`/v1/members/scheme/${serverId}/search`, queryParams);
      if (res.data) {
        pageData.base = res.data.result;
      }
      if (res.error) {
        await showApiError(res.error, [404]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const onSelectPage = (event: { limit: number; offset: number }): void => {
    void getData(event);
  };

  const addingMember = async (index: number): Promise<void> => {
    try {
      pageData.loading = true;
      const member = pageData.base.members[Number(index)];

      const bodyParams = {
        member_id: member.member_id,
        active: member.active
      };

      const res = await api().POST(`/v1/members/scheme/${serverId}`, {}, bodyParams);
      if (res.data) {
        pageData.base.members.splice(index, 1);
        pageData.base.total = pageData.base.total - 1;
        showMessage(res.data.message);
        pageData.error = {};
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

  const loadInvites = async (): Promise<void> => {
    const res = await listSchemeTokens(serverId);
    if (res.data) {
      pageData.base.schemeInvites = res.data.result.tokens ?? [];
    }
    if (res.error) {
      pageData.base.schemeInvites = [];
    }
  };

  const removeInvite = async (token: string): Promise<void> => {
    const res = await deleteToken(token, authStore.hasUserRole === 3 ? authStore.hasUserID : null);
    if (res.data) {
      showMessage(res.data.message);
      await loadInvites();
    }
    if (res.error) {
      await showApiError(res.error);
    }
  };

  const sendInvite = async (): Promise<void> => {
    const email = pageData.base.inviteEmail?.trim();

    if (!email) {
      return;
    }

    pageData.loading = true;
    try {
      const res = await createSchemeToken(serverId, { email });
      if (res.data) {
        pageData.tmp.inviteLink = tokenAcceptLink(res.data.result.token);
        pageData.base.inviteEmail = "";
        showMessage(res.data.message);
        await loadInvites();
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } finally {
      pageData.loading = false;
    }
  };

  onMount(() => {
    document.title = "Server member add";
    void projectStore.serverNameByID(projectId, serverId);
    void Promise.all([getData(queryFromUrl()), loadInvites()]);
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <div class="breadcrumbs">
      {projectStore.getServerNameByID(projectId, serverId)}
      <span>
        <a href={routePath("projects-projectId-servers-serverId-members", { projectId, serverId })}>Members</a>
      </span>
      <span>Add new</span>
    </div>
  </header>
  <Tabs tabs={serverTabs} />

  {#if pageData.base.total > 0}
    <table>
      <thead>
        <tr>
          <th>Member</th>
          <th>Login</th>
          <th class="w-20">Status</th>
          <th class="w-20">Add</th>
        </tr>
      </thead>
      <tbody>
        {#each pageData.base.members as item, index (index)}
          <tr>
            <td>{item.name} {item.surname}</td>
            <td>{item.alias}</td>
            <td>
              {#if item.active}
                <Badge name="online" color="green" />
              {:else}
                <Badge name="offline" color="red" />
              {/if}
            </td>
            <td>
              <div class="flex items-center">
                <SvgIcon
                  name="plus_square"
                  class="cursor-pointer"
                  onclick={(): void => {
                    void addingMember(Number(index));
                  }}
                />
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <div class="desc">Empty</div>
  {/if}

  <Pagination total={pageData.base.total} class="content" onselectPage={onSelectPage} />

  <div class="card mt-8">
    <span class="title">Invite by email</span>
    <div class="desc">
      Send a one-time link to a user who is not in the project yet. Accepting it grants access to this server.
    </div>
    <div class="mt-5 flex flex-wrap items-end gap-4">
      <Input bind:value={pageData.base.inviteEmail} name="Email" placeholder="user@werbot.net" />
      <Button loading={pageData.loading} onclick={sendInvite}>Create invite link</Button>
    </div>
    {#if pageData.tmp.inviteLink}
      <div class="mt-5 break-all">
        <b>Invitation link:</b>
        <a href={pageData.tmp.inviteLink}>{pageData.tmp.inviteLink}</a>
      </div>
    {/if}

    {#if pageData.base.schemeInvites?.length}
      <div class="mt-8 overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Created</th>
              <th class="w-20">Delete</th>
            </tr>
          </thead>
          <tbody>
            {#each pageData.base.schemeInvites as item, index (index)}
              <tr>
                <td>{tokenProfile(item).email}</td>
                <td>{tokenStatusName(item.status)}</td>
                <td>{toDate(item.created_at)}</td>
                <td>
                  <SvgIcon
                    name="delete"
                    class="cursor-pointer text-red-500"
                    onclick={(): void => {
                      void removeInvite(item.token);
                    }}
                  />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<div class="m-6">
  In order to add a new member, he must first be invited to the general list of
  <a href={routePath("projects-projectId-members", { projectId })}>project members</a>.
</div>
