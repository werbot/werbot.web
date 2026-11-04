<script lang="ts">
  import { onDestroy, onMount, untrack } from "svelte";
  import { SvelteURLSearchParams } from "svelte/reactivity";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Badge from "$lib/components/Badge.svelte";
  import Drawer from "$lib/components/Drawer.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import Select from "$lib/components/form/Select.svelte";
  import { routePath } from "$lib/navigation/registry";
  import { projectStore, usePageData } from "$lib/stores";
  import { decodeBase64, eventTypeToColor, showApiError, showMessage, toDate } from "$lib/utils";

  import { Type } from "@proto/event/enum";
  import { Project_Section } from "@proto/event/message";

  type EventRow = {
    project_id?: string;
    section: number;
    type: number;
    created_at?: unknown;
    meta_data?: string;
    session?: {
      id: string;
      ip: string;
      user_agent: string;
    };
  };

  const SEARCH_MAX_LENGTH = 128;

  function clampSearch(value: string): string {
    return value.slice(0, SEARCH_MAX_LENGTH);
  }

  const pageData = usePageData();

  const params = $derived(page.params as { projectId?: string });
  const projectId = $derived(params.projectId ?? "");

  const section = $derived(Number(page.url.searchParams.get("section")) || 0);
  const type = $derived(Number(page.url.searchParams.get("type")) || 0);
  const search = $derived(clampSearch(page.url.searchParams.get("search") ?? ""));
  const limit = $derived(Number(page.url.searchParams.get("limit")) || 25);
  const events = $derived((pageData.base.events ?? []) as EventRow[]);

  const sectionOptions = [
    { value: 0, label: "All sections" },
    { value: Project_Section.project, label: "project" },
    { value: Project_Section.setting, label: "setting" },
    { value: Project_Section.member, label: "member" }
  ];

  const typeOptions = [
    { value: 0, label: "All events" },
    { value: Type.onCreate, label: "onCreate" },
    { value: Type.onRemove, label: "onRemove" },
    { value: Type.onUpdate, label: "onUpdate" },
    { value: Type.onOnline, label: "onOnline" },
    { value: Type.onOffline, label: "onOffline" }
  ];

  let requestSeq = 0;
  let searchTimer: ReturnType<typeof setTimeout> | null = null;
  let searchInput = $state(untrack(() => search));
  let searchFocused = $state(false);
  let loaded = $state(false);

  function queryFromUrl(): Record<string, string> {
    const query: Record<string, string> = {};

    for (const key of ["section", "type", "search", "limit", "offset"]) {
      const value = page.url.searchParams.get(key);
      if (value !== null) {
        query[key] = key === "search" ? clampSearch(value) : value;
      }
    }

    return query;
  }

  async function getData(query: Record<string, string>): Promise<void> {
    const seq = ++requestSeq;

    try {
      const res = await api().GET(`/v1/event/project/${projectId}`, query);

      if (seq !== requestSeq) {
        return;
      }

      if (res.data) {
        pageData.base = res.data.result;
        loaded = true;
        return;
      }

      if (res.error?.code === 404) {
        pageData.base = { total: 0, events: [] };
        loaded = true;
        return;
      }

      if (res.error?.code === 400) {
        showMessage(res.error.result || res.error.message || "Bad Request", "connextWarning");
        return;
      }

      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  function navigate(query: SvelteURLSearchParams): void {
    void goto(`${page.url.pathname}?${query.toString()}`, {
      replaceState: true,
      keepFocus: true,
      noScroll: true
    });
  }

  function baseQuery(): SvelteURLSearchParams {
    const query = new SvelteURLSearchParams();

    query.set("limit", String(limit));
    query.set("offset", "0");

    return query;
  }

  function applyFilters(overrides: { section?: number; type?: number; search?: string }): void {
    const query = baseQuery();
    const nextSection = overrides.section ?? section;
    const nextType = overrides.type ?? type;
    const nextSearch = clampSearch(overrides.search ?? search);

    if (nextSection > 0) {
      query.set("section", String(nextSection));
    }
    if (nextType > 0) {
      query.set("type", String(nextType));
    }
    if (nextSearch !== "") {
      query.set("search", nextSearch);
    }

    navigate(query);
  }

  function cancelSearchTimer(): void {
    if (searchTimer !== null) {
      clearTimeout(searchTimer);
      searchTimer = null;
    }
  }

  function onSearchInput(value: string): void {
    cancelSearchTimer();

    searchTimer = setTimeout((): void => {
      searchTimer = null;
      applyFilters({ search: value });
    }, 300);
  }

  function resetFilters(): void {
    cancelSearchTimer();
    searchInput = "";
    navigate(baseQuery());
  }

  function openDrawer(item: EventRow): void {
    pageData.tmp = item;
    pageData.modal = true;
  }

  function closeDrawer(): void {
    pageData.tmp = {};
    pageData.modal = false;
  }

  function prettyMeta(value?: string): string {
    const decoded = decodeBase64(value ?? "");
    try {
      return JSON.stringify(JSON.parse(decoded), null, 2);
    } catch {
      return decoded;
    }
  }

  $effect(() => {
    const urlSearch = search;

    // Keep the field in sync with external URL changes only. While the field is
    // focused or a debounce is pending, the local input is the newer value.
    if (searchFocused || searchTimer !== null || urlSearch === searchInput) {
      return;
    }

    searchInput = clampSearch(urlSearch);
  });

  $effect(() => {
    // Clear the previous project's rows before the new project is requested.
    if (!projectId) {
      return;
    }

    untrack(() => {
      pageData.base = { total: 0, events: [] };
      loaded = false;
    });
  });

  $effect(() => {
    if (!projectId) {
      return;
    }

    void getData(queryFromUrl());
  });

  $effect(() => {
    if (!projectId) {
      return;
    }

    void projectStore.projectInfo(projectId);
  });

  onMount(() => {
    document.title = "Logs activities";
  });

  onDestroy(() => {
    requestSeq++;
    cancelSearchTimer();
  });
</script>

<div class="artboard">
  <header>
    <h1>Logs activities</h1>
    <a class="breadcrumbs" href={routePath("projects-projectId", { projectId })}>
      {projectStore.getProjectInfo(projectId)?.title ?? ""}
    </a>
  </header>

  <div class="content">
    <Select
      value={section}
      options={sectionOptions}
      onchange={(value): void => applyFilters({ section: Number(value) })}
    />
    <Select value={type} options={typeOptions} onchange={(value): void => applyFilters({ type: Number(value) })} />
    <Input
      id="logs-search"
      bind:value={searchInput}
      aria-label="Search by IP or User-Agent"
      placeholder="Search by IP or User-Agent"
      maxlength={SEARCH_MAX_LENGTH}
      onfocus={(): void => {
        searchFocused = true;
      }}
      onblur={(): void => {
        searchFocused = false;
      }}
      onvaluechange={onSearchInput}
    />
    <Button lite onclick={resetFilters}>Reset</Button>
  </div>

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
      {#each events as item, index (index)}
        <tr class="cursor" onclick={(): void => openDrawer(item)}>
          <td>{toDate(item.created_at, "full")}</td>
          <td>
            <Badge name={Project_Section[item.section]} />
          </td>
          <td>
            <Badge name={Type[item.type]} color={eventTypeToColor[item.type]} />
          </td>
          <td>{item.session?.ip}</td>
          <td>
            <button
              type="button"
              class="cursor-pointer"
              aria-label="Open event details"
              onclick={(event): void => {
                event.stopPropagation();
                openDrawer(item);
              }}
            >
              <SvgIcon name="chevron_right" />
            </button>
          </td>
        </tr>
      {/each}
      {#if loaded && events.length === 0}
        <tr>
          <td colspan="5">No events</td>
        </tr>
      {/if}
    </tbody>
  </table>

  <Pagination total={pageData.base.total} class="content" />
</div>

<Drawer isOpen={pageData.modal} title="Event details" maxWidth="600px" onclose={closeDrawer}>
  <table class="mini">
    <tbody>
      <tr>
        <td>Project ID</td>
        <td>{pageData.tmp.project_id}</td>
      </tr>
      <tr>
        <td>Session ID</td>
        <td>{pageData.tmp.session?.id}</td>
      </tr>
      {#if pageData.tmp.section !== undefined}
        <tr>
          <td width="120">Section</td>
          <td>
            <Badge name={Project_Section[pageData.tmp.section]} />
          </td>
        </tr>
      {/if}
      {#if pageData.tmp.type}
        <tr>
          <td width="120">Event</td>
          <td>
            <Badge name={Type[pageData.tmp.type]} color={eventTypeToColor[pageData.tmp.type]} />
          </td>
        </tr>
      {/if}
      <tr>
        <td>Remote IP</td>
        <td>{pageData.tmp.session?.ip}</td>
      </tr>
      <tr>
        <td>User Agent</td>
        <td>{pageData.tmp.session?.user_agent}</td>
      </tr>
      <tr>
        <td>Created</td>
        <td>{toDate(pageData.tmp.created_at, "full")}</td>
      </tr>
      <tr>
        <td>Metadata</td>
        <td>
          <div class="whitespace-pre-wrap">{prettyMeta(pageData.tmp.meta_data)}</div>
        </td>
      </tr>
    </tbody>
  </table>
</Drawer>
