<script lang="ts">
  import type { Snippet } from "svelte";

  import SvgIcon from "$lib/components/SvgIcon.svelte";

  interface Props {
    icon?: string;
    title: string;
    description?: string;
    class?: string;
    children?: Snippet;
  }

  let { icon, title, description, class: className = "", children }: Props = $props();

  const classes = $derived(
    ["flex flex-col items-center justify-center gap-3 px-6 py-12 text-center", className].filter(Boolean).join(" ")
  );
</script>

<div class={classes}>
  {#if icon}
    <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
      <SvgIcon name={icon} class="h-5 w-5" />
    </span>
  {/if}

  <div class="space-y-1">
    <p class="font-semibold text-gray-700">{title}</p>
    {#if description}
      <p class="mx-auto max-w-sm text-sm text-gray-500">{description}</p>
    {/if}
  </div>

  {#if children}
    <div class="pt-1">
      {@render children()}
    </div>
  {/if}
</div>
