<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Badge from "$lib/components/Badge.svelte";
  import Drawer from "$lib/components/Drawer.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import { usePageData } from "$lib/stores";
  import { authStore } from "$lib/stores/auth.svelte";
  import { decodeBase64, eventTypeToColor, showApiError, toDate } from "$lib/utils";

  import { Type as EventType } from "@proto/event/enum";
  import { Profile_Section } from "@proto/event/message";

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

  const openDrawer = async (id: string): Promise<void> => {
    try {
      const res = await api().GET(`/v1/event/profile/${authStore.hasUserID}/${id}`);
      if (res.data) {
        pageData.tmp = res.data.result;
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.modal = true;
    }
  };

  const closeDrawer = (): void => {
    pageData.tmp = {};
    pageData.modal = false;
  };

  const getData = async (query: { limit?: string | number; offset?: string | number } = {}): Promise<void> => {
    try {
      const queryParams = {
        ...(query?.limit !== undefined && { limit: query.limit }),
        ...(query?.offset !== undefined && { offset: query.offset })
      };

      const res = await api().GET(`/v1/event/profile/${authStore.hasUserID}`, queryParams);
      if (res.data) {
        pageData.base = res.data.result;
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const onSelectPage = (event: { limit: number; offset: number }): void => {
    void getData(event);
  };

  onMount(() => {
    document.title = "Profile logs";
    void getData(queryFromUrl());
  });
</script>

<div class="artboard">
  <header>
    <h1>Profile logs</h1>
  </header>

  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th class="w-32">Section</th>
        <th class="w-32">Event</th>
        <th class="w-64">Ip</th>
        <th class="w-8"></th>
      </tr>
    </thead>
    <tbody>
      {#each pageData.base.records ?? [] as item, index (index)}
        <tr
          class="cursor"
          onclick={(): void => {
            void openDrawer(item.id);
          }}
        >
          <td>{toDate(item.created_at, "full")}</td>
          <td>
            <Badge name={Profile_Section[item.section]} />
          </td>
          <td>
            <Badge name={EventType[item.event]} color={eventTypeToColor[item.event]} />
          </td>
          <td>{item.ip}</td>
          <td>
            <SvgIcon name="chevron_right" />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <Pagination total={pageData.base.total} class="content" onselectPage={onSelectPage} />
</div>

<Drawer isOpen={pageData.modal} title="Name" maxWidth="600px" onclose={closeDrawer}>
  <table class="mini">
    <tbody>
      <tr>
        <td>ID</td>
        <td>{pageData.tmp.id}</td>
      </tr>
      <tr>
        <td>Session ID</td>
        <td>{pageData.tmp.session_id}</td>
      </tr>
      {#if pageData.tmp.event}
        <tr>
          <td width="120">Event</td>
          <td>
            <Badge name={EventType[pageData.tmp.event]} color={eventTypeToColor[pageData.tmp.event]} />
          </td>
        </tr>
      {/if}
      <tr>
        <td>Remote IP</td>
        <td>{pageData.tmp.ip}</td>
      </tr>
      <tr>
        <td>User Agent</td>
        <td>{pageData.tmp.user_agent}</td>
      </tr>
      <tr>
        <td>Created</td>
        <td>{toDate(Object(pageData.tmp.created_at), "full")}</td>
      </tr>
      <tr>
        <td>Metadata</td>
        <td>
          {decodeBase64(pageData.tmp.meta_data)}
        </td>
      </tr>
    </tbody>
  </table>
</Drawer>
