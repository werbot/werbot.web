<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class"> {
    name: string;
    color?: string;
    class?: string;
  }

  let { name, color = "gray", class: className = "", ...rest }: Props = $props();

  const classes = $derived(["badge", `badge-${color}`, className].filter(Boolean).join(" "));
</script>

<span {...rest} class={classes}>{name}</span>
