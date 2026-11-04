<script lang="ts">
  import Select from "$lib/components/form/Select.svelte";
  import { untrack } from "svelte";

  interface Props {
    initial?: string | number;
    name?: string;
    options?: Array<string | number>;
    class?: string;
  }

  let { initial = "", name, options = [], class: className }: Props = $props();
  let value = $state<string | number>(untrack(() => initial));
</script>

<Select bind:value {name} {options} class={className} />
<output data-testid="bound">{value}</output>
