<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Badge from "$lib/components/Badge.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import Toggle from "$lib/components/form/Toggle.svelte";
  import { routePath } from "$lib/navigation/registry";
  import { usePageData } from "$lib/stores";
  import { addressToColor, getAddressType, serverSchemeToColor, showApiError, showMessage } from "$lib/utils";

  import { SchemeType as ServerScheme } from "@proto/scheme/access";
  import { Address } from "@proto/scheme/scheme";

  const pageData = usePageData();

  pageData.base = { total: 0, servers: [] };

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

      const res = await api().GET(`/v1/schemes/${projectId}/server`, queryParams);
      if (res.data) {
        const result = res.data.result;
        const schemes = Array.isArray(result.schemes) ? result.schemes : [];

        pageData.base = {
          total: result.total ?? schemes.length,
          servers: schemes.map((scheme: any) => ({
            ...scheme,
            server_id: scheme.scheme_id,
            auth: scheme.auth_method,
            scheme: scheme.scheme_type
          }))
        };
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

  const changeServerActive = async (index: number, online: boolean): Promise<void> => {
    try {
      const server = pageData.base.servers[Number(index)];

      const res = await api(false).UPDATE(`/v1/schemes/${projectId}/${server.server_id}`, {}, { active: online });
      if (res.data) {
        showMessage(res.data.message, online ? undefined : "connextWarning");
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  function addressColor(address: string): string {
    const addressToColorMap: Record<string, string> = {
      IPv4: addressToColor[Address.IPv4],
      IPv6: addressToColor[Address.IPv6]
    };

    return addressToColorMap[address] || addressToColor[Address.Hostname];
  }

  onMount(() => {
    document.title = "Servers list";
    void getData(queryFromUrl());
  });
</script>

<div class="artboard">
  <header>
    <h1>Servers</h1>

    <a href={routePath("projects-projectId-servers-add", { projectId })} class="breadcrumbs">
      <SvgIcon name="plus_square" class="mr-3" />
      add new
    </a>
  </header>

  {#if pageData.base.total > 0}
    <table>
      <thead>
        <tr>
          <th class="w-12"></th>
          <th>Title</th>
          <th class="w-16">Users</th>
          <th class="w-32">Address</th>
          <th class="w-16">Auth</th>
          <th class="w-20">Scheme</th>
          <th class="w-20">Activity</th>
          <th class="w-8"></th>
          <th class="w-8"></th>
          <th class="w-8"></th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        {#each pageData.base.servers as item, index (index)}
          <tr>
            <td>
              <div class="flex items-center">
                <span class="dot" class:bg-green-500={item.online} class:bg-gray-200={!item.online}></span>
              </div>
            </td>
            <td>
              <a
                href={routePath("projects-projectId-servers-serverId-session", {
                  projectId,
                  serverId: item.server_id
                })}
                class:current={page.url.pathname ===
                  routePath("projects-projectId-servers-serverId-session", {
                    projectId,
                    serverId: item.server_id
                  })}
              >
                {item.title}
              </a>
            </td>

            <td class="flex items-center">
              {#if item.count_members}
                <div>{item.count_members}</div>
              {:else}
                <div>0</div>
              {/if}
            </td>

            <td class="pr-1.5">
              <Badge name={getAddressType(item.address)} color={addressColor(getAddressType(item.address))} />
            </td>
            <td>
              <div class="flex items-center">
                {#if item.auth == 1}
                  <SvgIcon name="password" />
                {:else if item.auth == 2}
                  <SvgIcon name="key" />
                {:else}
                  <SvgIcon name="agent" />
                {/if}
              </div>
            </td>
            <td class="flex items-center">
              <Badge name={ServerScheme[item.scheme]} color={serverSchemeToColor[item.scheme]} />
            </td>
            <td>
              <div class="flex items-center">
                <Toggle
                  id={index}
                  bind:value={item.active}
                  onchange={(): void => {
                    void changeServerActive(Number(index), item.active);
                  }}
                />
              </div>
            </td>
            <td>
              <a
                href={routePath("projects-projectId-servers-serverId-members", {
                  projectId,
                  serverId: item.server_id
                })}
                class:current={page.url.pathname ===
                  routePath("projects-projectId-servers-serverId-members", {
                    projectId,
                    serverId: item.server_id
                  })}
              >
                <SvgIcon name="users" class="text-gray-700" />
              </a>
            </td>
            <td>
              <a
                href={routePath("projects-projectId-servers-serverId-activity", {
                  projectId,
                  serverId: item.server_id
                })}
                class:current={page.url.pathname ===
                  routePath("projects-projectId-servers-serverId-activity", {
                    projectId,
                    serverId: item.server_id
                  })}
              >
                <SvgIcon name="clock" class="text-gray-700" />
              </a>
            </td>
            <td>
              <a
                href={routePath("projects-projectId-servers-serverId-firewall", {
                  projectId,
                  serverId: item.server_id
                })}
                class:current={page.url.pathname ===
                  routePath("projects-projectId-servers-serverId-firewall", {
                    projectId,
                    serverId: item.server_id
                  })}
              >
                <SvgIcon name="firewall" class="text-gray-700" />
              </a>
            </td>
            <td>
              <a
                href={routePath("projects-projectId-servers-serverId-setting", {
                  projectId,
                  serverId: item.server_id
                })}
                class:current={page.url.pathname ===
                  routePath("projects-projectId-servers-serverId-setting", {
                    projectId,
                    serverId: item.server_id
                  })}
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
