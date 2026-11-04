<script lang="ts">
  import { onMount } from "svelte";

  import SchemePicker from "$lib/components/SchemePicker.svelte";

  const groups = [
    [
      { name: "Docker", image: "/img/schemes/containers/docker.svg" },
      { name: "K8S", image: "/img/schemes/containers/k8s.svg" },
      { name: "podman", image: "/img/schemes/containers/podman.svg" }
    ]
  ];

  onMount(() => {
    document.title = "Step 1: Select the scheme you want to add";
  });
</script>

<SchemePicker title="Containers" {groups} />
