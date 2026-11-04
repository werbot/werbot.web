<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  import { clickOutside } from "$lib/actions/clickOutside";
  import SvgIcon from "$lib/components/SvgIcon.svelte";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    name?: string;
    value: string | number;
    error?: string;
    required?: boolean;
    options: Array<string | number>;
    class?: string;
  }

  let { name, value = $bindable(), error, required, options, class: className = "", ...rest }: Props = $props();

  let open = $state(false);

  const fullName = $derived(`${name}${required ? "*" : ""}`);

  const toggle = (): void => {
    open = !open;
  };

  const close = (): void => {
    open = false;
  };

  const setValue = (option: string | number): void => {
    value = option;
    open = false;
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
    <button type="button" onclick={toggle}>
      <span>{value ?? "Choose option"}</span>
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
            {option}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
