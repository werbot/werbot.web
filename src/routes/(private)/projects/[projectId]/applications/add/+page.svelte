<script lang="ts">
  import { onMount } from "svelte";

  import SchemePicker from "$lib/components/SchemePicker.svelte";

  const groups = [
    [{ name: "Site", image: "/img/schemes/applications/site.svg" }],
    [{ name: "Grafana", image: "/img/schemes/applications/grafana.svg" }],
    [{ name: "Kibana", image: "/img/schemes/applications/kibana.svg" }],
    [{ name: "Portainer", image: "/img/schemes/applications/portainer.svg" }],
    [{ name: "Rancher", image: "/img/schemes/applications/rancher.svg" }]
  ];

  onMount(() => {
    document.title = "Step 1: Select the scheme you want to add";
  });
</script>

<SchemePicker title="Applications" {groups} />
