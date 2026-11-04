<script lang="ts">
  import Toggle from "$lib/components/form/Toggle.svelte";
  import { untrack } from "svelte";

  interface Props {
    initial?: boolean;
    name?: string;
    class?: string;
    onchange?: (event: Event) => void;
  }

  let { initial = false, name, class: className, onchange }: Props = $props();
  let value = $state(untrack(() => initial));
</script>

<Toggle bind:value {name} class={className} {onchange} />
<output data-testid="bound">{value}</output>
