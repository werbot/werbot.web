<script lang="ts">
  import Toggle from "$lib/components/form/Toggle.svelte";
  import { untrack } from "svelte";

  interface Props {
    initial?: boolean;
    name?: string;
  }

  let { initial = false, name }: Props = $props();
  let value = $state(untrack(() => initial));
</script>

<Toggle bind:value {name} />
<output data-testid="bound">{value}</output>
