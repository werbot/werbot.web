<script lang="ts">
  import type { FullAutoFill, HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<
    HTMLInputAttributes,
    "value" | "type" | "id" | "placeholder" | "autocomplete" | "disabled" | "class"
  > {
    name?: string;
    value: string | number | null;
    id?: string;
    type?: string;
    error?: string;
    class?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    autocomplete?: string;
  }

  let {
    name,
    value = $bindable(),
    id,
    type = "text",
    error,
    class: className = "",
    disabled,
    required,
    placeholder,
    autocomplete,
    ...rest
  }: Props = $props();

  const fullName = $derived(`${name}${required ? "*" : ""}`);
  const classes = $derived(error ? "input error" : "input");
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
  <input
    {...rest}
    {id}
    {type}
    class={classes}
    {disabled}
    {placeholder}
    autocomplete={autocomplete as FullAutoFill | undefined}
    value={value ?? ""}
    oninput={(event): void => {
      value = event.currentTarget.value;
    }}
  />
</div>
