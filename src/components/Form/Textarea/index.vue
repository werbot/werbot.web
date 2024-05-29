<template>
  <div class="form-control" :class="props.class">
    <label class="label">
      <span v-if="props.name" class="text">{{ fullName }}</span>
      <span v-if="props.error" class="error">{{ props.error }}</span>
    </label>

    <textarea v-model="(value as string)" :class="props.error ? 'error' : ''" :disabled="props.disabled" :placeholder="props.placeholder" :rows="props.rows"></textarea>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  name: String,
  modelValue: {
    required: true,
  },
  rows: {
    type: Number,
    default: 6,
  },
  error: String,
  class: String,
  disabled: Boolean,
  required: Boolean,
  placeholder: String,
});

const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});

const fullName = computed(() => `${props.name}${props.required ? "*" : ""}`);
</script>
