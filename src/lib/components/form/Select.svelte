<script lang="ts">
  import { clickOutside } from "$lib/actions/clickOutside";
  import SvgIcon from "$lib/components/SvgIcon.svelte";

  interface Props {
    name?: string;
    value: string | number;
    error?: string;
    required?: boolean;
    options: Array<string | number>;
  }

  let { name, value = $bindable(), error, required, options }: Props = $props();

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

<div class="form-dropdown">
  <!-- svelte-ignore a11y_label_has_associated_control (layout label kept verbatim from the Vue component) -->
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
          <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions (Vue parity: pick on click, no keyboard picker) -->
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
