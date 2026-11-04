<script lang="ts">
  import { page } from "$app/state";

  import { routePath } from "$lib/navigation/registry";
  import type { MenuItem } from "$lib/utils";

  interface Props {
    tabs: MenuItem[];
  }

  let { tabs }: Props = $props();

  const pathname = $derived(normalize(page.url.pathname));

  function normalize(value: string): string {
    return value.length > 1 ? value.replace(/\/+$/, "") : value;
  }

  function href(item: MenuItem): string {
    return item.link.name ? routePath(item.link.name, page.params) : "#";
  }

  function isActive(item: MenuItem): boolean {
    return normalize(href(item)) === pathname;
  }

  function getClass(item: MenuItem): string {
    if (isActive(item)) {
      return item.danger ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-700";
    }
    return item.danger
      ? "hover:bg-red-600 hover:text-white text-red-700"
      : "hover:bg-gray-800 hover:text-gray-200 text-gray-700";
  }
</script>

<ul id="mainTab" class="flex flex-wrap bg-gray-100 pl-3 text-center text-gray-700" role="tablist">
  {#each tabs as item, index (index)}
    <li>
      <div id="tab-{index}" role="tab" aria-controls="control-{index}" aria-selected={isActive(item)}>
        <a href={href(item)} class="inline-block p-4 focus:outline-hidden {getClass(item)}">{item.name}</a>
      </div>
    </li>
  {/each}
</ul>
