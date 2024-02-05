<template>
  <div class="form-dropdown">
    <label class="label">
      <span v-if="name" class="text">{{ name }}{{ required ? "*" : "" }}</span>
      <span v-if="error" class="error">
        {{ error }}
      </span>
    </label>

    <div ref="compSelect">
      <button type="button" @click="toggle">
        <span>{{ value }}</span>
        <SvgIcon name="chevron_down" />
      </button>

      <ul v-if="open">
        <li v-for="(item) in options" @click="setLanguage(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { SvgIcon } from "@/components";

const compSelect = ref(null);
import { onClickOutside } from "@vueuse/core";
onClickOutside(compSelect, event => close());

const open = ref(false);

const props = defineProps({
  name: {
    type: String,
  },
  modelValue: {
    required: false,
  },
  error: {
    type: String,
  },
  required: {
    type: Boolean,
  },
  options: Object,
});

const emits = defineEmits(["update:modelValue"]);
const value = computed({
  get: () => {
    if (props.modelValue === undefined) {
      return "Choose option";
    }

    return props.modelValue;
  },
  set: (val) => {
    emits("update:modelValue", val);
  },
});

const toggle = () => {
  open.value = !open.value;
};

const close = () => {
  open.value = false;
};

const setLanguage = (val: string) => {
  value.value = val;
  open.value = false;
};
</script>

<style lang="scss" scoped>
.form-dropdown {
  button {
    @apply min-w-[10rem] justify-between inline-block rounded border border-solid border-gray-300 px-2 py-2 leading-tight;
    @apply flex items-center whitespace-nowrap;
  }

  ul {
    @apply absolute z-10 mt-2 min-w-[10rem] rounded bg-gray-50 ring-1 ring-gray-300;

    li {
      @apply cursor-pointer select-none p-2 hover:bg-gray-200;
    }
  }
}
</style>
