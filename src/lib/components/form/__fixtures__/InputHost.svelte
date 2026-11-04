<script lang="ts">
  import Input from "$lib/components/form/Input.svelte";
  import { untrack } from "svelte";

  interface Props {
    initial?: string | null;
    name?: string;
    error?: string;
    required?: boolean;
    class?: string;
    onkeyup?: (event: KeyboardEvent) => void;
    onvaluechange?: (value: string) => void;
  }

  let { initial = "", name, error, required, class: className, onkeyup, onvaluechange }: Props = $props();
  let value = $state(untrack(() => initial));
</script>

<Input bind:value {name} {error} {required} class={className} {onkeyup} {onvaluechange} />
<output data-testid="bound">{value}</output>
