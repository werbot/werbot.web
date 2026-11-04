<script lang="ts">
  import { onMount } from "svelte";

  import { routePath } from "$lib/navigation/registry";
  import { projectStore } from "$lib/stores";

  interface Props {
    memberId: string;
    serverId: string;
    projectId: string;
  }

  // eslint-disable-next-line svelte/no-unused-props -- memberId is part of the legacy BServerName contract
  let props: Props = $props();

  onMount(async () => {
    await projectStore.serverNameByID(props.projectId, props.serverId);
  });
</script>

<a href={routePath("projects-projectId-servers", { projectId: props.projectId })}>
  {projectStore.getServerNameByID(props.projectId, props.serverId)}
</a>
