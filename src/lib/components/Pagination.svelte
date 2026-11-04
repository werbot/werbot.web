<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { SvelteURLSearchParams } from "svelte/reactivity";

  interface PaginationQuery {
    limit: number;
    offset: number;
  }

  interface Props {
    total?: number;
    class?: string;
    onselectPage?: (q: PaginationQuery) => void;
  }

  let { total = 0, class: className = "", onselectPage }: Props = $props();

  const limit = $derived(Number(page.url.searchParams.get("limit")) || 25);
  const offset = $derived(Number(page.url.searchParams.get("offset")) || 0);
  const totalPages = $derived(Math.ceil(total / limit));
  const currentPage = $derived(Math.floor(offset / limit) + 1);

  function queryFor(pageNumber: number): PaginationQuery {
    return {
      limit,
      offset: (pageNumber - 1) * limit
    };
  }

  function hrefFor(pageNumber: number): string {
    const query = queryFor(pageNumber);
    const search = new SvelteURLSearchParams(page.url.searchParams);
    search.set("limit", String(query.limit));
    search.set("offset", String(query.offset));

    return `${page.url.pathname}?${search.toString()}`;
  }

  function selectPage(event: MouseEvent, pageNumber: number): void {
    event.preventDefault();

    onselectPage?.(queryFor(pageNumber));
    void goto(hrefFor(pageNumber));
  }
</script>

{#if totalPages > 1}
  <div class={className ? `pagination ${className}` : "pagination"}>
    {#each Array.from({ length: totalPages }, (_, index) => index + 1) as pageNumber (pageNumber)}
      <a
        class="pagination btn"
        class:btn-active={pageNumber === currentPage}
        href={hrefFor(pageNumber)}
        onclick={(event: MouseEvent): void => selectPage(event, pageNumber)}>{pageNumber}</a
      >
    {/each}
  </div>
{/if}
