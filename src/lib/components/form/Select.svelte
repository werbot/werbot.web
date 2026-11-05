<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  import { clickOutside } from "$lib/actions/clickOutside";
  import SvgIcon from "$lib/components/SvgIcon.svelte";

  export type SelectOption = string | number | { value: string | number; label: string };

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "onchange"> {
    name?: string;
    value: string | number;
    error?: string;
    required?: boolean;
    options: SelectOption[];
    class?: string;
    ariaLabel?: string;
    onchange?: (value: string | number) => void;
  }

  let {
    name,
    value = $bindable(),
    error,
    required,
    options,
    class: className = "",
    ariaLabel,
    onchange,
    ...rest
  }: Props = $props();

  let open = $state(false);

  const fullName = $derived(`${name}${required ? "*" : ""}`);

  const optionValue = (option: SelectOption): string | number => (typeof option === "object" ? option.value : option);

  const optionLabel = (option: SelectOption): string => (typeof option === "object" ? option.label : String(option));

  const selectedOption = $derived(options.find((option) => optionValue(option) === value));
  const selectedLabel = $derived(
    selectedOption !== undefined ? optionLabel(selectedOption) : (value ?? "Choose option")
  );
  const accessibleLabel = $derived(ariaLabel ? `${ariaLabel}: ${selectedLabel}` : undefined);

  const toggle = (): void => {
    open = !open;
  };

  const close = (): void => {
    open = false;
  };

  const setValue = (option: SelectOption): void => {
    const nextValue = optionValue(option);

    value = nextValue;
    open = false;
    onchange?.(nextValue);
  };
</script>

<div {...rest} class="form-dropdown {className}">
  <!-- svelte-ignore a11y_label_has_associated_control (layout label kept verbatim from the legacy component) -->
  <label class="label">
    {#if name}
      <span class="text">{fullName}</span>
    {/if}
    {#if error}
      <span class="error">{error}</span>
    {/if}
  </label>

  <div use:clickOutside={close}>
    <button type="button" aria-label={accessibleLabel} onclick={toggle}>
      <span>{selectedLabel}</span>
      <SvgIcon name="chevron_down" />
    </button>

    {#if open}
      <ul>
        {#each options as option, index (index)}
          <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions (legacy parity: pick on click, no keyboard picker) -->
          <li
            onclick={(): void => {
              setValue(option);
            }}
          >
            {optionLabel(option)}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
