<script lang="ts">
  import { onMount } from "svelte";

  import { Tabs } from "$lib/components";
  import { settingTabs } from "$lib/menus/project-tabs";

  onMount(() => {
    document.title = "Teams";
  });
</script>

<div class="artboard">
  <header>
    <h1>API</h1>
  </header>
  <Tabs tabs={settingTabs} />

  <div class="desc">Description</div>
  <div class="content">section under development</div>
</div>
