<script lang="ts">
  interface Props {
    name: string;
    color?: string;
    class?: string;
  }

  let { name, color = "gray", class: className = "" }: Props = $props();

  const classes = $derived(["badge", `badge-${color}`, className].filter(Boolean).join(" "));
</script>

<span class={classes}>{name}</span>
