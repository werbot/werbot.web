<script lang="ts">
  import { page } from "$app/state";

  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import { getMenu, menuHref } from "$lib/navigation/menus.svelte";
  import { isActiveRoute } from "$lib/navigation/registry";
  import type { MenuItem } from "$lib/utils";

  const pathname = $derived(page.url.pathname);
  const projectId = $derived(page.params.projectId ?? "");
  const profileMenu = $derived(getMenu("profile"));
  const projectMenu = $derived(getMenu("project"));
  const adminMenu = $derived(getMenu("admin"));

  const isProfileRoute = $derived(pathname.startsWith("/profile"));
  // The project sidebar only has project-scoped links, so it needs a projectId.
  // /projects and /projects/add stay sidebar-less (layoutStyle "blank" in legacy).
  const isProjectRoute = $derived(pathname.startsWith("/projects") && projectId !== "");
  // Legacy parity: Vue checked route.path !== "/projects/new" although the admin
  // and projects prefixes never overlap. Kept so the port matches the source.
  const isAdminRoute = $derived(pathname.startsWith("/admin") && (pathname as string) !== "/projects/new");

  function isActive(item: MenuItem): boolean {
    return item.link.name ? isActiveRoute(item.link.name, pathname) : false;
  }
</script>

{#if isProfileRoute}
  <nav class="sidebar">
    <ul>
      {#each Object.entries(profileMenu) as [key, group], index (key)}
        {#each group as item (item.link.name)}
          <li>
            <a href={menuHref(item)} class:current={isActive(item)}>
              <SvgIcon name={item.icon ?? ""} />
              <span>{item.name}</span>
            </a>
          </li>
        {/each}
        {#if index !== Object.keys(profileMenu).length - 1}
          <li><hr /></li>
        {/if}
      {/each}
    </ul>
  </nav>
{/if}

{#if isProjectRoute}
  <nav class="sidebar">
    <ul>
      {#each Object.entries(projectMenu) as [key, group], index (key)}
        {#each group as item (item.link.name)}
          <li>
            <a href={menuHref(item, { projectId })} class:current={isActive(item)}>
              <SvgIcon name={item.icon ?? ""} />
              <span>{item.name}</span>
            </a>
          </li>
        {/each}
        {#if index !== Object.keys(projectMenu).length - 1}
          <li><hr /></li>
        {/if}
      {/each}
    </ul>
  </nav>
{/if}

{#if isAdminRoute}
  <nav class="sidebar">
    <ul>
      {#each Object.entries(adminMenu) as [key, group], index (key)}
        {#each group as item (item.link.name)}
          <li>
            <a href={menuHref(item)}>
              <SvgIcon name={item.icon ?? ""} />
              <span>{item.name}</span>
            </a>
          </li>
        {/each}
        {#if index !== Object.keys(adminMenu).length - 1}
          <li><hr /></li>
        {/if}
      {/each}
    </ul>
  </nav>
{/if}
