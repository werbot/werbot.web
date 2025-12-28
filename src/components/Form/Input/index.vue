<template>
  <div class="form-control" :for="id" :class="props.class">
    <label class="label">
      <span v-if="props.name" class="text">{{ fullName }}</span>
      <span v-if="props.error" class="error">{{ props.error }}</span>
    </label>
    <input
      v-model="value"
      :type="props.type"
      class="input"
      :class="props.error ? 'error' : ''"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :autocomplete="props.autocomplete"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: null
  },
  // eslint-disable-next-line vue/require-prop-types
  modelValue: {
    required: true
  },
  id: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: "text"
  },
  error: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  },
  disabled: Boolean,
  required: Boolean,
  placeholder: {
    type: String,
    default: null
  },
  autocomplete: {
    type: String,
    default: null
  }
});

const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val)
});

const fullName = computed(() => `${props.name}${props.required ? "*" : ""}`);
</script>

<style>
@reference "tailwindcss";

.input {
  @apply h-10 rounded-sm border border-solid border-gray-300 bg-gray-50 pl-3;

  &:focus {
    @apply border-sky-600;
  }

  &.warning,
  &.error {
    @apply border-red-300 bg-red-50;

    &:focus {
      @apply border-red-600 ring-red-600;
    }
  }

  &.disabled,
  &[disabled] {
    @apply cursor-not-allowed border-transparent bg-gray-300;
  }
}
</style>
