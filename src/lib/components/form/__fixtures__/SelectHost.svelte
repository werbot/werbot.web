<script lang="ts">
  import Select from "$lib/components/form/Select.svelte";
  import { untrack } from "svelte";

  interface Props {
    initial?: string | number;
    name?: string;
    options?: Array<string | number>;
  }

  let { initial = "", name, options = [] }: Props = $props();
  let value = $state<string | number>(untrack(() => initial));
</script>

<Select bind:value {name} {options} />
<output data-testid="bound">{value}</output>
