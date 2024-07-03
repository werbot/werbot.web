<template>
  <label :for="toggleId" class="toggle">
    <input
      :id="toggleId"
      v-model="value"
      type="checkbox"
      class="peer sr-only"
      :checked="Boolean(value)"
      :disabled="props.disabled"
    />
    <div
      class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white"
    ></div>
    <span v-if="props.name" class="ml-3">{{ props.name }}</span>
  </label>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: null
  },
  modelValue: {
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  id: {}
});

const emits = defineEmits(["update:modelValue"]);

const toggleId = `toggle_${props.id}`;

const value = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val)
});
</script>

<style lang="scss">
.toggle {
  @apply relative inline-flex cursor-pointer select-none items-center;
}
</style>
