<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLTextareaAttributes, "value" | "rows" | "placeholder" | "disabled" | "class"> {
    name?: string;
    value: string | number | null;
    rows?: number;
    error?: string;
    class?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
  }

  let {
    name,
    value = $bindable(),
    rows = 6,
    error,
    class: className = "",
    disabled,
    required,
    placeholder,
    ...rest
  }: Props = $props();

  const fullName = $derived(`${name}${required ? "*" : ""}`);
</script>

<div class="form-control {className}">
  <!-- svelte-ignore a11y_label_has_associated_control (layout label kept verbatim from the Vue component) -->
  <label class="label">
    {#if name}
      <span class="text">{fullName}</span>
    {/if}
    {#if error}
      <span class="error">{error}</span>
    {/if}
  </label>

  <textarea
    {...rest}
    class={error ? "error" : ""}
    {disabled}
    {placeholder}
    {rows}
    value={value ?? ""}
    oninput={(event): void => {
      value = event.currentTarget.value;
    }}></textarea>
</div>
