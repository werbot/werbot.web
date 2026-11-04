<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import AssetSection from "$lib/components/AssetSection.svelte";
  import { routePath } from "$lib/navigation/registry";

  const params = $derived(page.params as { projectId?: string });
  const projectId = $derived(params.projectId ?? "");

  onMount(() => {
    document.title = "Desktops";
  });
</script>

<AssetSection title="Desktops" addHref={routePath("projects-projectId-desktops-add", { projectId })} />
