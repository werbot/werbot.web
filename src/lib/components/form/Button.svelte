<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    disabled?: boolean;
    rotate?: boolean;
    lite?: boolean;
    loading?: boolean;
    children: Snippet;
    onclick?: (e: MouseEvent) => void;
    class?: string;
  }

  let {
    disabled = false,
    rotate = false,
    lite = false,
    loading = false,
    children,
    onclick,
    class: className = ""
  }: Props = $props();

  const classes = $derived([lite ? "lite" : "main", className].filter(Boolean).join(" "));
</script>

<button class={classes} disabled={disabled || loading} {onclick}>
  {#if loading}
    <div>
      <span>Loading...</span>
    </div>
  {:else}
    <div class:animate-spin={rotate}>
      {@render children()}
    </div>
  {/if}
</button>
