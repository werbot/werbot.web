<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { api } from "$lib/api";
  import { clickOutside } from "$lib/actions/clickOutside";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import { topMenu } from "$lib/menus/profile";
  import { menuHref } from "$lib/navigation/menus.svelte";
  import { isActiveRoute, routePath } from "$lib/navigation/registry";
  import { wsStore } from "$lib/stores";
  import { authStore } from "$lib/stores/auth.svelte";
  import type { MenuItem } from "$lib/utils";
  import { showApiError } from "$lib/utils";

  interface ProjectSummary {
    project_id: string;
    title: string;
  }

  const pathname = $derived(page.url.pathname);
  // `page.params` is typed with the root layout params only, so the nested
  // project param needs its own view here.
  const params = $derived(page.params as { projectId?: string });
  const profileActive = $derived(pathname.startsWith("/profile") || pathname.startsWith("/admin"));
  const projectActive = $derived(pathname.startsWith("/projects"));

  const wsStatus = $derived(wsStore.status);

  let isProfileDropdownOpen = $state(false);
  let isProjectDropdownOpen = $state(false);
  let projects = $state<ProjectSummary[]>([]);
  let projectsTotal = $state(0);

  const projectTitle = $derived(
    projects.find((project) => project.project_id === params.projectId)?.title ?? "Projects"
  );

  function isUserRole(role?: number): boolean {
    return role === undefined || role === authStore.hasUserRole;
  }

  function isProfileItemActive(item: MenuItem): boolean {
    return item.link.name ? isActiveRoute(item.link.name, pathname) : false;
  }

  function toggleProfileDropdown(): void {
    isProfileDropdownOpen = !isProfileDropdownOpen;
  }

  function closeProfileDropdown(): void {
    isProfileDropdownOpen = false;
  }

  function toggleProjectDropdown(): void {
    isProjectDropdownOpen = !isProjectDropdownOpen;
  }

  function closeProjectDropdown(): void {
    isProjectDropdownOpen = false;
  }

  onMount(async () => {
    try {
      const res = await api().GET(`/v1/projects`, { limit: 5 });

      if (res.data) {
        projects = res.data.result?.projects ?? [];
        projectsTotal = res.data.result?.total ?? 0;
      }
      if (res.error) {
        await showApiError(res.error, [404]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  });
</script>

<nav class="header">
  <div class="logo">
    <a href={routePath("index")}>
      <img src="/img/logo_name.svg" alt="Werbot" />
    </a>
  </div>
  <div class="flex-grow">
    <div class="relative" use:clickOutside={closeProjectDropdown}>
      <button class="dropdown" class:active={projectActive} type="button" onclick={toggleProjectDropdown}>
        <SvgIcon name="project" />
        <span class="hidden md:block">{projectTitle}</span>
        <SvgIcon name="chevron_down" />
      </button>

      {#if isProjectDropdownOpen}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <ul class="dropdown-menu" onclick={closeProjectDropdown}>
          {#each projects as project (project.project_id)}
            <li>
              <a
                href={routePath("projects-projectId", { projectId: project.project_id })}
                class:current={params.projectId === project.project_id}
              >
                <SvgIcon name="project" />
                <span>{project.title}</span>
              </a>
            </li>
          {/each}
          {#if projectsTotal > 5}
            <div>
              <li><hr /></li>
              <li>
                <a href={routePath("projects")}>
                  <SvgIcon name="project" />
                  <span>Show all projects</span>
                </a>
              </li>
            </div>
          {/if}
          <li><hr /></li>
          <li>
            <a href={routePath("projects-add")} class:current={isActiveRoute("projects-add", pathname)}>
              <SvgIcon name="plus" />
              <span>Add new project</span>
            </a>
          </li>
        </ul>
      {/if}
    </div>
  </div>
  <div>
    <a href={routePath("index")} class="shared" class:current={pathname === "/"}>
      <SvgIcon name="share" class="mr-2 w-5 text-gray-700" />
      Servers<span class="hidden sm:block">&nbsp;shared with me</span>
    </a>
  </div>
  <div>
    <div class="relative" use:clickOutside={closeProfileDropdown}>
      <button class="dropdown" class:active={profileActive} type="button" onclick={toggleProfileDropdown}>
        <SvgIcon name="user" />
        <span class="dot mt-0.5 mr-1.5 !h-2 !w-2 {wsStatus === 'OPEN' ? 'bg-green-500' : 'bg-gray-200'}"></span>
        <span class="hidden md:block">{authStore.hasUserName}</span>
        <SvgIcon name="chevron_down" />
      </button>

      {#if isProfileDropdownOpen}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <ul class="dropdown-menu right-0" onclick={closeProfileDropdown}>
          {#each Object.entries(topMenu) as [key, group], index (key)}
            {#each group as item, itemIndex (item.name)}
              {#if isUserRole(item.isUserRole)}
                <li>
                  <a href={menuHref(item)} class:current={isProfileItemActive(item)}>
                    <SvgIcon name={item.icon ?? ""} />
                    <span>{item.name}</span>
                  </a>
                  {#if itemIndex === group.length - 1 && index !== Object.keys(topMenu).length - 1}
                    <hr />
                  {/if}
                </li>
              {/if}
            {/each}
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</nav>
<hr />
