<template>
  <div class="form-control" :for="id" :class="class">
    <label class="label">
      <span v-if="props.name" class="text">{{ fullName }}</span>
      <span v-if="props.error" class="error">{{ props.error }}</span>
    </label>
    <input :type="props.type" v-model="value" :class="props.error ? 'error' : ''" class="input" :disabled="props.disabled" :placeholder="props.placeholder"
      :autocomplete="props.autocomplete" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  name: String,
  modelValue: {
    required: true,
  },
  id: String,
  type: {
    type: String,
    default: "text",
  },
  error: String,
  class: String,
  disabled: Boolean,
  required: Boolean,
  placeholder: String,
  autocomplete: String,
});

const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});

const fullName = computed(() => `${props.name}${props.required ? "*" : ""}`);
</script>
