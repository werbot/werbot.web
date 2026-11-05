<script lang="ts">
  import { onDestroy, onMount, untrack } from "svelte";
  import { SvelteURLSearchParams } from "svelte/reactivity";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Badge from "$lib/components/Badge.svelte";
  import Drawer from "$lib/components/Drawer.svelte";
  import EmptyState from "$lib/components/EmptyState.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import Select from "$lib/components/form/Select.svelte";
  import { routePath } from "$lib/navigation/registry";
  import { projectStore, usePageData } from "$lib/stores";
  import {
    decodeBase64,
    eventSectionLabel,
    eventTypeLabel,
    eventTypeToColor,
    showApiError,
    showMessage,
    toDate
  } from "$lib/utils";

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
  const LOADING_ROWS = Array.from({ length: 4 }, (_, index) => index);

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
  const total = $derived(Number(pageData.base.total ?? 0));
  const hasFilters = $derived(section > 0 || type > 0 || search !== "");

  const sectionOptions = [
    { value: 0, label: "All sections" },
    ...[Project_Section.project, Project_Section.setting, Project_Section.member].map((value) => ({
      value,
      label: eventSectionLabel(value)
    }))
  ];

  const typeOptions = [
    { value: 0, label: "All events" },
    ...[Type.onCreate, Type.onRemove, Type.onUpdate, Type.onOnline, Type.onOffline].map((value) => ({
      value,
      label: eventTypeLabel(value)
    }))
  ];

  let requestSeq = 0;
  let searchTimer: ReturnType<typeof setTimeout> | null = null;
  let searchInput = $state(untrack(() => search));
  let searchFocused = $state(false);
  let loaded = $state(false);
  let loading = $state(false);
  let loadError = $state(false);

  const showReset = $derived(hasFilters || searchInput.trim() !== "");
  const hasMetadata = $derived(typeof pageData.tmp.meta_data === "string" && pageData.tmp.meta_data.trim() !== "");

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
    loading = true;
    loadError = false;

    try {
      const res = await api().GET(`/v1/event/project/${projectId}`, query);

      if (seq !== requestSeq) {
        return;
      }

      if (res.data) {
        pageData.base = res.data.result ?? { total: 0, events: [] };
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
        loaded = true;
        loadError = true;
        return;
      }

      if (res.error) {
        await showApiError(res.error);
        loaded = true;
        loadError = true;
        return;
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      if (seq === requestSeq) {
        loaded = true;
        loadError = true;
      }
    } finally {
      if (seq === requestSeq) {
        loading = false;
      }
    }
  }

  function retry(): void {
    void getData(queryFromUrl());
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
      loading = false;
      loadError = false;
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

  <div class="desc flex flex-wrap items-center justify-between gap-2">
    <span>Project activity: sign-ins, changes and membership events.</span>
    <span class="text-sm text-gray-500" aria-live="polite">
      {#if loaded && !loadError}{total} {total === 1 ? "event" : "events"}{/if}
    </span>
  </div>

  <div class="content">
    <div class="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      <Input
        id="logs-search"
        class="w-full sm:min-w-64 sm:flex-1"
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
      <Select
        class="w-full sm:w-44"
        value={section}
        options={sectionOptions}
        ariaLabel="Filter by section"
        onchange={(value): void => applyFilters({ section: Number(value) })}
      />
      <Select
        class="w-full sm:w-44"
        value={type}
        options={typeOptions}
        ariaLabel="Filter by event type"
        onchange={(value): void => applyFilters({ type: Number(value) })}
      />
      {#if showReset}
        <Button lite class="w-full sm:w-auto" onclick={resetFilters}>Reset</Button>
      {/if}
    </div>
  </div>

  <div class="w-full overflow-x-auto">
    <table aria-busy={loading}>
      <caption class="sr-only">Project activity events</caption>
      <thead>
        <tr>
          <th class="w-40 sm:w-52">Date</th>
          <th class="hidden w-32 sm:table-cell">Section</th>
          <th class="w-28 sm:w-36">Event</th>
          <th class="hidden w-64 md:table-cell">IP address</th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        {#if loading && events.length === 0}
          {#each LOADING_ROWS as row (row)}
            <tr aria-hidden="true">
              <td><div class="h-4 w-40 animate-pulse rounded-sm bg-gray-100"></div></td>
              <td class="hidden sm:table-cell">
                <div class="h-5 w-20 animate-pulse rounded-sm bg-gray-100"></div>
              </td>
              <td><div class="h-5 w-16 animate-pulse rounded-sm bg-gray-100"></div></td>
              <td class="hidden md:table-cell">
                <div class="h-4 w-28 animate-pulse rounded-sm bg-gray-100"></div>
              </td>
              <td></td>
            </tr>
          {/each}
        {:else if loaded && loadError}
          <tr>
            <td colspan={5} class="whitespace-normal">
              <EmptyState
                icon="error"
                title="Couldn't load activity"
                description="The event list could not be loaded. Try again."
              >
                <Button lite onclick={retry}>Try again</Button>
              </EmptyState>
            </td>
          </tr>
        {:else if events.length > 0}
          {#each events as item, index (index)}
            <tr class="cursor" onclick={(): void => openDrawer(item)}>
              <td class="pr-3 text-sm whitespace-nowrap sm:text-base">{toDate(item.created_at, "full")}</td>
              <td class="hidden sm:table-cell">
                <Badge name={eventSectionLabel(item.section)} />
              </td>
              <td>
                <Badge name={eventTypeLabel(item.type)} color={eventTypeToColor[item.type]} />
              </td>
              <td class="hidden md:table-cell">
                <span class="block max-w-[18rem] truncate font-mono text-sm" title={item.session?.ip ?? ""}>
                  {item.session?.ip || "—"}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-sm text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                  aria-label="Open event details"
                  onclick={(event): void => {
                    event.stopPropagation();
                    openDrawer(item);
                  }}
                >
                  <SvgIcon name="chevron_right" class="h-5 w-5" />
                </button>
              </td>
            </tr>
          {/each}
        {:else if loaded}
          <tr>
            <td colspan={5} class="whitespace-normal">
              <EmptyState
                icon="logs"
                title={hasFilters ? "No events match your filters" : "No activity yet"}
                description={hasFilters
                  ? "Try a different search, section or event type."
                  : "Project events will appear here as soon as they happen."}
              >
                {#if hasFilters}
                  <Button lite onclick={resetFilters}>Clear filters</Button>
                {/if}
              </EmptyState>
            </td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>

  <Pagination {total} class="content" />
</div>

<Drawer isOpen={pageData.modal} title="Event details" maxWidth="600px" onclose={closeDrawer}>
  {#if pageData.tmp.section !== undefined || pageData.tmp.type !== undefined}
    <div class="mb-4 flex flex-wrap items-center gap-2">
      {#if pageData.tmp.section !== undefined}
        <Badge name={eventSectionLabel(pageData.tmp.section)} />
      {/if}
      {#if pageData.tmp.type !== undefined}
        <Badge name={eventTypeLabel(pageData.tmp.type)} color={eventTypeToColor[pageData.tmp.type]} />
      {/if}
      <span class="text-sm text-gray-500">{toDate(pageData.tmp.created_at, "full")}</span>
    </div>
  {/if}

  <table class="mini w-full">
    <tbody>
      <tr>
        <td class="w-32">Project ID</td>
        <td class="font-mono text-xs">{pageData.tmp.project_id ?? "—"}</td>
      </tr>
      <tr>
        <td class="w-32">Session ID</td>
        <td class="font-mono text-xs">{pageData.tmp.session?.id ?? "—"}</td>
      </tr>
      <tr>
        <td class="w-32">Remote IP</td>
        <td class="font-mono text-xs">{pageData.tmp.session?.ip ?? "—"}</td>
      </tr>
      <tr>
        <td class="w-32">User Agent</td>
        <td><span class="break-words">{pageData.tmp.session?.user_agent ?? "—"}</span></td>
      </tr>
      <tr>
        <td class="w-32">Created</td>
        <td>{toDate(pageData.tmp.created_at, "full")}</td>
      </tr>
      <tr>
        <td class="w-32">Metadata</td>
        <td>
          {#if hasMetadata}
            <pre class="max-h-64 overflow-auto font-mono text-xs whitespace-pre-wrap">{prettyMeta(
                pageData.tmp.meta_data
              )}</pre>
          {:else}
            <span class="text-gray-400">No metadata</span>
          {/if}
        </td>
      </tr>
    </tbody>
  </table>
</Drawer>
