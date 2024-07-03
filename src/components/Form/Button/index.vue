<template>
  <button :class="props.lite ? 'lite' : 'main'" :disabled="props.disabled || props.loading">
    <div v-if="loading">
      <span>Loading...</span>
    </div>
    <div v-else :class="{ 'animate-spin': props.rotate }">
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  disabled: Boolean,
  rotate: Boolean,
  lite: Boolean,
  loading: Boolean
});
</script>

<style lang="scss">
button {
  &.main {
    @apply inline-block rounded bg-sky-600 p-3.5 text-white;
    @apply transition duration-100 ease-in-out;

    &:hover,
    &:focus {
      @apply bg-sky-700;
    }

    &:active {
      @apply bg-sky-800;
    }

    &.red {
      @apply bg-red-600;
    }

    &.red:hover,
    &.red:focus {
      @apply bg-red-700;
    }

    &.red:active {
      @apply bg-red-800;
    }

    &.green {
      @apply bg-green-600;
    }

    &.green:hover,
    &.green:focus {
      @apply bg-green-700;
    }

    &.green:active {
      @apply bg-green-800;
    }

    &.yellow {
      @apply bg-yellow-600;
    }

    &.yellow:hover,
    &.yellow:focus {
      @apply bg-yellow-700;
    }

    &.yellow:active {
      @apply bg-yellow-800;
    }

    &.gray {
      @apply bg-gray-600;
    }

    &.gray:hover,
    &.gray:focus {
      @apply bg-gray-700;
    }

    &.gray:active {
      @apply bg-gray-800;
    }

    &.disabled,
    &.disabled:hover,
    & .disabled,
    & .disabled:hover,
    &[disabled],
    &[disabled]:hover {
      @apply cursor-not-allowed border-transparent bg-gray-300 text-gray-500;
    }

    &.loading,
    & .loading {
      &.btn-square:before,
      &.btn-circle:before {
        @apply mr-0;
      }

      &.btn-xl:before,
      &.btn-lg:before {
        @apply h-5 w-5;
      }

      &.btn-sm:before,
      &.btn-xs:before {
        @apply h-3 w-3;
      }
    }
  }

  &.lite {
    @apply inline-block h-10 rounded border border-gray-300 px-2 text-gray-400;

    &:hover,
    &:focus {
      @apply border-gray-800 bg-gray-800 text-gray-100;
    }

    &:active {
      @apply border-green-600 bg-green-600;
    }

    &[disabled],
    &[disabled]:hover {
      @apply cursor-not-allowed border-transparent bg-gray-300 text-gray-400;
    }
  }
}
</style>
