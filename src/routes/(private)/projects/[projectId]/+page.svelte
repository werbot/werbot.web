<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { routePath } from "$lib/navigation/registry";
  import { projectStore } from "$lib/stores";

  const params = $derived(page.params as { projectId?: string });
  const projectId = $derived(params.projectId ?? "");

  const infoItems = [
    { label: "Servers", routeName: "projects-projectId-servers", countKey: "servers_count" },
    { label: "Databases", routeName: "projects-projectId-databases", countKey: "databases_count" },
    { label: "Applications", routeName: "projects-projectId-applications", countKey: "applications_count" },
    { label: "Desktops", routeName: "projects-projectId-desktops", countKey: "desktops_count" },
    { label: "Containers", routeName: "projects-projectId-containers", countKey: "containers_count" },
    { label: "Clouds", routeName: "projects-projectId-clouds", countKey: "clouds_count" }
  ];

  const getData = async (): Promise<void> => {
    await projectStore.projectInfo(projectId);
  };

  $effect(() => {
    if (projectId) {
      void getData();
    }
  });

  onMount(() => {
    document.title = "Project information";
  });
</script>

<div class="artboard">
  <header>
    <h1>{projectStore.projects[projectId]?.info?.title ?? ""}</h1>
  </header>

  <div class="desc">Project information</div>

  <div class="content">
    <dl class="info">
      {#each infoItems as item (item.countKey)}
        <a href={routePath(item.routeName, { projectId })}>
          <div>
            <dt>{item.label}</dt>
            <dd>{projectStore.projects[projectId]?.info?.[item.countKey] || 0}</dd>
          </div>
        </a>
      {/each}
    </dl>
  </div>
</div>
