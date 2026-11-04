<script lang="ts">
  import Input from "$lib/components/form/Input.svelte";
  import { untrack } from "svelte";

  interface Props {
    initial?: string | null;
    name?: string;
    error?: string;
    required?: boolean;
  }

  let { initial = "", name, error, required }: Props = $props();
  let value = $state(untrack(() => initial));
</script>

<Input bind:value {name} {error} {required} />
<output data-testid="bound">{value}</output>
