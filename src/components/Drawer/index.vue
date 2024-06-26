<template>
  <div>
    <div class="drawer" :class="{ 'is-open': props.isOpen, 'is-visible': isVisible }">
      <div class="drawer__overlay" :style="{ transitionDuration: `${props.speed}ms` }"></div>
      <div class="drawer__content" ref="drawer" :style="{ maxWidth: props.maxWidth, transitionDuration: `${props.speed}ms`, backgroundColor: props.backgroundColor }">
        <div class="pb-4">
          <h2>{{ props.title }}</h2>
        </div>

        <slot />
        <div class="pt-4">
          <slot name="footer">
            <button class="btn" @click="closeDrawer">Close</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, getCurrentInstance } from "vue";
import { onClickOutside } from "@vueuse/core";

const drawer = ref(null);
onClickOutside(drawer, (e) => closeDrawer());

const isVisible = ref(false);
const isTransitioning = ref(false);
const { emit } = getCurrentInstance();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },

  maxWidth: {
    type: String,
    required: false,
    default: "500px",
  },

  speed: {
    type: Number,
    required: false,
    default: 200,
  },

  backgroundColor: {
    type: String,
    required: false,
    default: "#fafafa",
  },
});

const toggleBackgroundScrolling = (enable) => {
  const body = document.querySelector("body");
  body.style.overflow = enable ? "hidden" : null;
};

const closeDrawer = () => {
  if (!isTransitioning.value) {
    emit("close");
  }
};

watch(
  () => props.isOpen,
  (val) => {
    isTransitioning.value = true;

    if (val) {
      const drawerContent = document.getElementsByClassName("drawer__content")[0] as HTMLElement;
      drawerContent.scrollTop = 0;

      toggleBackgroundScrolling(true);
      isVisible.value = true;
    } else {
      toggleBackgroundScrolling(false);
      setTimeout(() => (isVisible.value = false), props.speed);
    }

    setTimeout(() => (isTransitioning.value = false), props.speed);
  },
);
</script>

<style lang="scss" scoped>
.drawer {
  @apply invisible;

  &.is-visible {
    @apply visible;
  }

  &.is-open {
    .drawer__overlay {
      @apply opacity-50;
    }

    .drawer__content {
      @apply translate-x-0;
    }
  }

  &__overlay {
    @apply fixed inset-x-0 inset-y-0 w-full z-50 opacity-0 transition-opacity bg-black select-none;
  }

  &__content {
    @apply fixed inset-y-0 h-full w-full right-0 overflow-auto flex transition-transform flex-col translate-x-full shadow-2xl z-[999];
    @apply bg-red-200 p-6;
  }
}
</style>
