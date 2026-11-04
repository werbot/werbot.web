<script lang="ts">
  import type { HTMLLabelAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLLabelAttributes, "class" | "for" | "id"> {
    name?: string;
    value: boolean;
    disabled?: boolean;
    id?: string | number;
    class?: string;
  }

  let { name, value = $bindable(), disabled = false, id, class: className = "", ...rest }: Props = $props();

  const toggleId = $derived(`toggle_${id}`);
  const classes = $derived(["toggle", className].filter(Boolean).join(" "));
</script>

<label {...rest} for={toggleId} class={classes}>
  <input
    id={toggleId}
    type="checkbox"
    class="peer sr-only"
    checked={value}
    {disabled}
    onchange={(event): void => {
      value = event.currentTarget.checked;
    }}
  />
  <div
    class="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"
  ></div>
  {#if name}
    <span class="ml-3">{name}</span>
  {/if}
</label>
