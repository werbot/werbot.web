<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import AssetSection from "$lib/components/AssetSection.svelte";
  import { routePath } from "$lib/navigation/registry";

  const params = $derived(page.params as { projectId?: string });
  const projectId = $derived(params.projectId ?? "");

  onMount(() => {
    document.title = "Databases";
  });
</script>

<AssetSection title="Databases" addHref={routePath("projects-projectId-databases-add", { projectId })} />
