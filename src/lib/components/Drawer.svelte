<script lang="ts">
  import type { Snippet } from "svelte";

  import { clickOutside } from "$lib/actions/clickOutside";
  import Button from "$lib/components/form/Button.svelte";

  interface Props {
    title: string;
    isOpen?: boolean;
    maxWidth?: string;
    speed?: number;
    backgroundColor?: string;
    children: Snippet;
    footer?: Snippet;
    onclose: () => void;
  }

  let {
    title,
    isOpen = false,
    maxWidth = "500px",
    speed = 200,
    backgroundColor = "#fafafa",
    children,
    footer,
    onclose
  }: Props = $props();

  let drawerContent = $state<HTMLElement>();
  let isVisible = $state(false);
  let isTransitioning = $state(false);

  function toggleBackgroundScrolling(enable: boolean): void {
    document.body.style.overflow = enable ? "hidden" : "";
  }

  function closeDrawer(): void {
    if (!isTransitioning) {
      onclose();
    }
  }

  $effect(() => {
    const open = isOpen;
    const duration = speed;

    isTransitioning = true;

    if (open) {
      if (drawerContent) {
        drawerContent.scrollTop = 0;
      }

      toggleBackgroundScrolling(true);
      isVisible = true;
    } else {
      toggleBackgroundScrolling(false);
      setTimeout((): void => {
        isVisible = false;
      }, duration);
    }

    const timer = setTimeout((): void => {
      isTransitioning = false;
    }, duration);

    return (): void => {
      clearTimeout(timer);
    };
  });
</script>

<div>
  <div class="drawer" class:is-open={isOpen} class:is-visible={isVisible}>
    <div class="drawer__overlay" style:transition-duration="{speed}ms"></div>
    <div
      bind:this={drawerContent}
      class="drawer__content"
      style:max-width={maxWidth}
      style:transition-duration="{speed}ms"
      style:background-color={backgroundColor}
      use:clickOutside={closeDrawer}
    >
      <div class="pb-4">
        <h2>{title}</h2>
      </div>

      {@render children()}
      <div class="pt-4">
        {#if footer}
          {@render footer()}
        {:else}
          <Button onclick={closeDrawer}>Close</Button>
        {/if}
      </div>
    </div>
  </div>
</div>
