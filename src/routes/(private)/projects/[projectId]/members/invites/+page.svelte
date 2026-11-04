<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import {
    deleteToken,
    isTokenUsable,
    listProjectTokens,
    tokenProfile,
    tokenStatusColor,
    tokenStatusName
  } from "$lib/api/token";
  import Badge from "$lib/components/Badge.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Button from "$lib/components/form/Button.svelte";
  import { membersTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { authStore, usePageData } from "$lib/stores";
  import { showApiError, showMessage, toDate } from "$lib/utils";

  const pageData = usePageData();

  const params = $derived(page.params as { projectId?: string });
  const projectId = $derived(params.projectId ?? "");

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
        ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
        ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
      };

      const res = await listProjectTokens(projectId, queryParams);
      if (res.data) {
        pageData.base = res.data.result;
      }
      if (res.error) {
        pageData.base = { total: 0, tokens: [] };
        await showApiError(res.error, [404]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const onSelectPage = (event: { limit: number; offset: number }): void => {
    void getData(event);
  };

  const openModal = (id: number): void => {
    pageData.modal = true;
    pageData.tmp = id;
  };

  const closeModal = (): void => {
    pageData.modal = false;
  };

  const removeInvite = async (id: number): Promise<void> => {
    try {
      const token = pageData.base.tokens[id];

      const res = await deleteToken(token.token, authStore.hasUserID);
      if (res.data) {
        closeModal();
        pageData.base.tokens.splice(id, 1);
        pageData.base.total = pageData.base.total - 1;
        showMessage(res.data.message);
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  onMount(() => {
    document.title = "Add member";
    void getData(queryFromUrl());
  });
</script>

<div class="artboard">
  <header>
    <h1>Invites</h1>
    <a href={routePath("projects-projectId-members-add", { projectId })} class="breadcrumbs">
      <SvgIcon name="plus_square" class="mr-3" />
      new member
    </a>
  </header>
  <Tabs tabs={membersTabs} />

  {#if pageData.base.total > 0}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th class="w-40">Invited</th>
          <th class="w-24">Status</th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        {#each pageData.base.tokens ?? [] as item, index (index)}
          <tr>
            <td>{tokenProfile(item).name} {tokenProfile(item).surname}</td>
            <td>{tokenProfile(item).email}</td>
            <td>{item.created_at ? toDate(item.created_at) : ""}</td>
            <td>
              <Badge name={tokenStatusName(item.status)} color={tokenStatusColor(item.status)} />
            </td>
            <td>
              {#if isTokenUsable(item)}
                <SvgIcon
                  name="delete"
                  class="cursor-pointer text-red-500"
                  onclick={(): void => openModal(Number(index))}
                />
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <div class="desc">Empty</div>
  {/if}

  <Pagination total={pageData.base.total} class="content" onselectPage={onSelectPage} />
</div>

<Modal showModal={pageData.modal} title="Are you sure you want to delete this invite" onclose={closeModal}>
  <p>This action CANNOT be undone.<br /></p>
  {#snippet footer()}
    <div class="flex flex-row justify-end">
      <Button
        class="red"
        onclick={(): void => {
          void removeInvite(pageData.tmp);
        }}>Delete invite</Button
      >
      <Button class="ml-5" onclick={closeModal}>Close</Button>
    </div>
  {/snippet}
</Modal>
