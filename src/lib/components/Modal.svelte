<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";

  import Button from "$lib/components/form/Button.svelte";

  interface Props {
    showModal: boolean;
    title: string;
    children: Snippet;
    footer?: Snippet;
    onclose: () => void;
  }

  let { showModal, title, children, footer, onclose }: Props = $props();

  let rendered = $state(untrack(() => showModal));
  let entering = $state(false);
  let leaving = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    if (showModal) {
      if (!rendered) {
        rendered = true;
        entering = true;
        timer = setTimeout((): void => {
          entering = false;
        }, 150);
      }
    } else if (rendered) {
      leaving = true;
      timer = setTimeout((): void => {
        rendered = false;
        leaving = false;
      }, 150);
    }

    return (): void => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  });

  const classes = $derived(
    [
      "modal",
      entering ? "animation-enter-active animation-enter-from" : "",
      leaving ? "animation-leave-active animation-leave-to" : ""
    ]
      .filter(Boolean)
      .join(" ")
  );

  function closeModal(): void {
    onclose();
  }
</script>

{#if rendered}
  <div class={classes}>
    <div class="modal-box">
      <h1>{title}</h1>
      <div class="py-4">
        {@render children()}
      </div>
      {#if footer}
        {@render footer()}
      {:else}
        <div class="form-control">
          <Button onclick={closeModal}>Close</Button>
        </div>
      {/if}
    </div>
  </div>
{/if}
