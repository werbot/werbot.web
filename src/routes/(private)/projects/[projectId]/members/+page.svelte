<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Badge from "$lib/components/Badge.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Toggle from "$lib/components/form/Toggle.svelte";
  import { membersTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { usePageData } from "$lib/stores";
  import { showApiError } from "$lib/utils";

  import { Role } from "@proto/profile/enum";

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

      const res = await api().GET(`/v1/members/project/${projectId}`, queryParams);
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

      const res = await api().UPDATE(`/v1/members/project/${projectId}/${member.member_id}`, {}, { active: online });
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

  onMount(() => {
    document.title = "Members list";
    void getData(queryFromUrl());
  });
</script>

<div class="artboard">
  <header>
    <h1>Members</h1>
  </header>
  <Tabs tabs={membersTabs} />

  {#if pageData.base.total > 0}
    <table>
      <thead>
        <tr>
          <th class="w-12"></th>
          <th>Name</th>
          <th class="w-12">
            <SvgIcon name="server" class="text-gray-700" />
          </th>
          <th class="w-12">
            <SvgIcon name="database" class="text-gray-700" />
          </th>
          <th class="w-12">
            <SvgIcon name="application" class="text-gray-700" />
          </th>
          <th class="w-12">
            <SvgIcon name="desktop" class="text-gray-700" />
          </th>
          <th class="w-12">
            <SvgIcon name="container" class="text-gray-700" />
          </th>
          <th class="w-12">
            <SvgIcon name="cloud" class="text-gray-700" />
          </th>
          <th class="w-20">Role</th>
          <th class="w-20">Activity</th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        {#each pageData.base.members ?? [] as item, index (index)}
          <tr>
            <td>
              <div class="flex items-center">
                <span class="dot" class:bg-green-500={item.online} class:bg-gray-200={!item.online}></span>
              </div>
            </td>
            <td>{item.name}</td>
            <td>{item.schemes_count}</td>
            <td>999</td>
            <td>999</td>
            <td>999</td>
            <td>999</td>
            <td>999</td>
            <td class="flex items-center">
              <Badge name={Role[item.role]} />
            </td>
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
                href={routePath("projects-projectId-members", { projectId })}
                class:current={page.url.pathname === routePath("projects-projectId-members", { projectId })}
              >
                <SvgIcon name="setting" class="text-gray-700" />
              </a>
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
