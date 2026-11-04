<script lang="ts">
  import { untrack } from "svelte";

  interface Props {
    avatar?: boolean;
    title?: boolean;
    lines?: number;
    footer?: boolean;
  }

  let { avatar = false, title = true, lines = 3, footer = true }: Props = $props();

  const margins = [4, 5, 6, 8, 10, 16, 24, 32];
  // Same one-time random widths as the Vue component: computed once, not on every render.
  const count = untrack(() => lines);
  const lineSettings = Array.from({ length: count }, () => margins[Math.floor(Math.random() * margins.length)]);
</script>

<div class="animate-pulse">
  <div class="flex items-center justify-between space-x-4">
    {#if avatar}
      <div class="h-12 w-12 shrink-0 rounded-full bg-current"></div>
    {/if}
    {#if title}
      <div class="h-8 w-full rounded-sm bg-current"></div>
    {/if}
  </div>

  {#if lines > 0}
    <div class="mt-6 space-y-2">
      {#each lineSettings as setting, index (index)}
        <div class="h-4 rounded-sm bg-current mr-{setting}"></div>
      {/each}
    </div>
  {/if}

  {#if footer}
    <div class="mt-6 h-10 w-1/3 rounded-sm bg-current"></div>
  {/if}
</div>
