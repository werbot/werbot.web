<script lang="ts">
  import Select from "$lib/components/form/Select.svelte";
  import { untrack } from "svelte";

  interface Props {
    initial?: string | number;
    name?: string;
    options?: Array<string | number | { value: string | number; label: string }>;
    class?: string;
    ariaLabel?: string;
    onchange?: (value: string | number) => void;
  }

  let { initial = "", name, options = [], class: className, ariaLabel, onchange }: Props = $props();
  let value = $state<string | number>(untrack(() => initial));
</script>

<Select bind:value {name} {options} class={className} {ariaLabel} {onchange} />
<output data-testid="bound">{value}</output>
