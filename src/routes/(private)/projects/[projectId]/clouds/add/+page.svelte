<script lang="ts">
  import { onMount } from "svelte";

  import SchemePicker from "$lib/components/SchemePicker.svelte";

  const groups = [
    [
      { name: "Amazon", image: "/img/schemes/clouds/amazon.svg" },
      { name: "Azure", image: "/img/schemes/clouds/azure.svg" },
      { name: "Google", image: "/img/schemes/clouds/google.svg" },
      { name: "DO", image: "/img/schemes/clouds/digitalocean.svg" },
      { name: "Hetzner", image: "/img/schemes/clouds/hetzner.svg" }
    ]
  ];

  onMount(() => {
    document.title = "Step 1: Select the scheme you want to add";
  });
</script>

<SchemePicker title="Clouds" {groups} />
