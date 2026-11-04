<script lang="ts">
  import { onMount } from "svelte";

  import SchemePicker from "$lib/components/SchemePicker.svelte";

  const groups = [
    [
      { name: "RDP", image: "/img/schemes/desktops/rdp.svg" },
      { name: "VNC", image: "/img/schemes/desktops/vnc.svg" }
    ]
  ];

  onMount(() => {
    document.title = "Step 1: Select the scheme you want to add";
  });
</script>

<SchemePicker title="Desktops" {groups} />
