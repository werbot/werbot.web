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
  let phase = $state<"idle" | "enter" | "leave">("idle");
  let entered = $state(false);
  let initialized = false;
  let enterTimer: ReturnType<typeof setTimeout> | undefined;
  let enterToTimer: ReturnType<typeof setTimeout> | undefined;
  let leaveTimer: ReturnType<typeof setTimeout> | undefined;

  // Only `showModal` is read here. Writing `rendered`/`phase` must not re-run this
  // effect: a re-run would clean up the pending timers and pin the modal on
  // `opacity-0` (animation-enter-from) forever.
  $effect(() => {
    const open = showModal;

    clearTimeout(enterTimer);
    clearTimeout(enterToTimer);
    clearTimeout(leaveTimer);

    if (open) {
      rendered = true;
      phase = "enter";
      entered = false;

      // Two-phase enter transition: apply -from, then swap to -to on the next frame.
      enterToTimer = setTimeout((): void => {
        entered = true;
      }, 16);
      enterTimer = setTimeout((): void => {
        phase = "idle";
        entered = false;
      }, 150);
    } else if (initialized) {
      phase = "leave";
      leaveTimer = setTimeout((): void => {
        rendered = false;
        phase = "idle";
      }, 150);
    }

    initialized = true;

    return (): void => {
      clearTimeout(enterTimer);
      clearTimeout(enterToTimer);
      clearTimeout(leaveTimer);
    };
  });

  const classes = $derived(
    [
      "modal",
      phase === "enter" ? "animation-enter-active" : "",
      phase === "enter" && !entered ? "animation-enter-from" : "",
      phase === "enter" && entered ? "animation-enter-to" : "",
      phase === "leave" ? "animation-leave-active animation-leave-to" : ""
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
