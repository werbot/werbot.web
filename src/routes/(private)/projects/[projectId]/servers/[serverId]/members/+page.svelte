<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Modal from "$lib/components/Modal.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Button from "$lib/components/form/Button.svelte";
  import Toggle from "$lib/components/form/Toggle.svelte";
  import { serverTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { authStore, projectStore, usePageData } from "$lib/stores";
  import { showApiError, showMessage, toDate } from "$lib/utils";

  const pageData = usePageData();

  pageData.base = { total: 0, members: [] };
  pageData.tmp = { id: null };

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

      const res = await api().GET(`/v1/members/scheme/${serverId}`, queryParams);
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

  const changeMemberActive = async (index: number, online: boolean): Promise<void> => {
    try {
      const member = pageData.base.members[Number(index)];

      const res = await api().UPDATE(
        `/v1/members/scheme/${serverId}/${member.scheme_member_id}`,
        {},
        { active: online }
      );
      if (res.data) {
        member.active = online;
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const removeMember = async (id: number): Promise<void> => {
    try {
      const member = pageData.base.members[Number(id)];

      const res = await api().DELETE(`/v1/members/scheme/${serverId}/${member.scheme_member_id}`);
      if (res.data) {
        closeModal();
        pageData.base.members.splice(id, 1);
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

  const openModal = (id: number): void => {
    pageData.modal = true;
    pageData.tmp.id = id;
  };

  const closeModal = (): void => {
    pageData.modal = false;
  };

  onMount(() => {
    document.title = "Server member";
    void projectStore.serverNameByID(projectId, serverId);
    void getData(queryFromUrl());
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <div class="breadcrumbs">{projectStore.getServerNameByID(projectId, serverId)}</div>
    <a href={routePath("projects-projectId-servers-serverId-members-add", { projectId, serverId })} class="breadcrumbs">
      <SvgIcon name="plus_square" class="mr-3" />
      add new
    </a>
  </header>
  <Tabs tabs={serverTabs} />

  {#if pageData.base.total > 0}
    <table>
      <thead>
        <tr>
          <th class="w-12"></th>
          <th>Member</th>
          <th>Login</th>
          <th class="w-40">Last update</th>
          <th class="w-20">Activity</th>
          <th class="w-8"></th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        {#each pageData.base.members as item, index (index)}
          <tr>
            <td>
              <div class="flex items-center">
                <span class="dot bg-green-500"></span>
              </div>
            </td>
            <td>{item.name} {item.surname}</td>
            <td>{item.alias}</td>
            <td>{item.updated_at?.seconds > 0 ? toDate(item.updated_at) : ""}</td>
            <td>
              <div class="flex items-center">
                <Toggle
                  id={index}
                  bind:value={item.active}
                  onchange={(): void => {
                    void changeMemberActive(Number(index), item.active);
                  }}
                />
              </div>
            </td>
            <td>
              <a
                href={routePath("projects-projectId-servers-serverId-members-memberId", {
                  projectId,
                  serverId,
                  memberId: item.scheme_member_id
                })}
                class:current={page.url.pathname ===
                  routePath("projects-projectId-servers-serverId-members-memberId", {
                    projectId,
                    serverId,
                    memberId: item.scheme_member_id
                  })}
              >
                <SvgIcon name="logs" class="text-gray-700" />
              </a>
            </td>
            <td>
              <SvgIcon
                name="delete"
                class="cursor-pointer text-red-500"
                onclick={(): void => openModal(Number(index))}
              />
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

<Modal showModal={pageData.modal} title="Are you sure you want to delete this member?" onclose={closeModal}>
  <p>This action CANNOT be undone. But this member can be added again.<br /></p>
  {#snippet footer()}
    <div class="flex flex-row justify-end">
      <Button
        class="red"
        onclick={(): void => {
          void removeMember(pageData.tmp.id);
        }}>Delete member</Button
      >
      <Button class="ml-5" onclick={closeModal}>Close</Button>
    </div>
  {/snippet}
</Modal>
