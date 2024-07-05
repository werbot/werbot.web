<template>
  <div class="form-dropdown">
    <label class="label">
      <span v-if="props.name" class="text">{{ fullName }}</span>
      <span v-if="props.error" class="error">{{ props.error }}</span>
    </label>

    <div ref="compSelect">
      <button type="button" @click="toggle()">
        <span>{{ value }}</span>
        <SvgIcon name="chevron_down" />
      </button>

      <ul v-if="open">
        <li v-for="(item, index) in props.options" :key="index" @click="setLanguage(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { SvgIcon } from "@/components";
import { onClickOutside } from "@vueuse/core";

const compSelect = ref(null);
onClickOutside(compSelect, () => close());

const open = ref(false);

const props = defineProps({
  name: {
    type: String,
    default: null
  },
  // eslint-disable-next-line vue/require-prop-types
  modelValue: {
    required: true
  },
  error: {
    type: String,
    default: null
  },
  required: Boolean,
  options: {
    type: Object,
    default: null
  }
});

const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue ?? "Choose option",
  set: (val) => emits("update:modelValue", val)
});

const fullName = computed(() => `${props.name}${props.required ? "*" : ""}`);

const toggle = (): boolean => (open.value = !open.value);
const close = (): boolean => (open.value = false);

const setLanguage = (val: string): void => {
  value.value = val;
  open.value = false;
};
</script>

<style lang="scss" scoped>
.form-dropdown {
  button {
    @apply inline-block h-10 min-w-[10rem] justify-between rounded border border-solid border-gray-300 py-2 pl-3 pr-2 leading-tight;
    @apply flex items-center whitespace-nowrap;
  }

  ul {
    @apply absolute z-10 mt-2 min-w-[10rem] rounded bg-gray-50 shadow-2xl ring-1 ring-gray-300;

    li {
      @apply cursor-pointer select-none px-3 py-2 hover:bg-gray-200;
    }
  }
}
</style>
