<script lang="ts">
  import { onMount } from "svelte";

  import { resolve } from "$app/paths";
  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Pagination from "$lib/components/Pagination.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import { routePath } from "$lib/navigation/registry";
  import { usePageData } from "$lib/stores";
  import { showApiError, toDate } from "$lib/utils";

  import { type Projects_Request as ListProjects_Request } from "@proto/project/message";

  const pageData = usePageData();

  function queryFromUrl(): Record<string, string> {
    const params: Record<string, string> = {};
    const limit = page.url.searchParams.get("limit");
    const offset = page.url.searchParams.get("offset");

    if (limit !== null) {
      params.limit = limit;
    }
    if (offset !== null) {
      params.offset = offset;
    }

    return params;
  }

  const getData = async (routeQuery: { limit?: string | number; offset?: string | number } = {}): Promise<void> => {
    try {
      const queryParams = {
        ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
        ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
      } as unknown as ListProjects_Request;

      const res = await api().GET(`/v1/projects`, queryParams);
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

  onMount(() => {
    document.title = "Projects list";
    void getData(queryFromUrl());
  });
</script>

<div class="artboard">
  <header>
    <h1>Projects list</h1>
    <a href={resolve("/projects/add")} class="breadcrumbs">
      <SvgIcon name="plus_square" class="mr-3" />
      add new
    </a>
  </header>

  {#if pageData.base.total > 0}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th class="w-40">Login</th>
          <th class="w-14">
            <SvgIcon name="users" />
          </th>
          <th class="w-14">
            <SvgIcon name="server" />
          </th>
          <th class="w-32">Created</th>
          <th class="w-14"></th>
        </tr>
      </thead>
      <tbody>
        {#each pageData.base.projects ?? [] as item, index (index)}
          <tr>
            <td>
              <a href={routePath("projects-projectId", { projectId: item.project_id })}>
                {item.title}
              </a>
            </td>
            <td>{item.alias}</td>
            <td>{item.members_count}</td>
            <td>{item.servers_count}</td>
            <td>{toDate(item.created_at, "lite")}</td>
            <td>
              <a href={routePath("projects-projectId-setting", { projectId: item.project_id })}>
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
