<template>
  <div>
    <div class="drawer" :class="{ 'is-open': props.isOpen, 'is-visible': isVisible }">
      <div class="drawer__overlay" :style="{ transitionDuration: `${props.speed}ms` }"></div>
      <div
        ref="drawer"
        class="drawer__content"
        :style="{
          maxWidth: props.maxWidth,
          transitionDuration: `${props.speed}ms`,
          backgroundColor: props.backgroundColor
        }"
      >
        <div class="pb-4">
          <h2>{{ props.title }}</h2>
        </div>

        <slot />
        <div class="pt-4">
          <slot name="footer">
            <FormButton @click="closeDrawer()">Close</FormButton>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, getCurrentInstance } from "vue";
import { FormButton } from "@/components";
import { onClickOutside } from "@vueuse/core";

const drawer = ref(null);
onClickOutside(drawer, () => closeDrawer());

const isVisible = ref(false);
const isTransitioning = ref(false);
const { emit } = getCurrentInstance();

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  isOpen: {
    type: Boolean,
    required: false,
    default: false
  },

  maxWidth: {
    type: String,
    required: false,
    default: "500px"
  },

  speed: {
    type: Number,
    required: false,
    default: 200
  },

  backgroundColor: {
    type: String,
    required: false,
    default: "#fafafa"
  }
});

const toggleBackgroundScrolling = (enable): void => {
  const body = document.querySelector("body");
  body.style.overflow = enable ? "hidden" : null;
};

const closeDrawer = (): void => {
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
  }
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
    @apply fixed inset-x-0 inset-y-0 z-50 w-full select-none bg-black opacity-0 transition-opacity;
  }

  &__content {
    @apply fixed inset-y-0 right-0 z-[999] flex h-full w-full translate-x-full flex-col overflow-auto shadow-2xl transition-transform;
    @apply bg-red-200 p-6;
  }
}
</style>
