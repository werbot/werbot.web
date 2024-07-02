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
        <li v-for="(item) in props.options" @click="setLanguage(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { FormButton, SvgIcon } from "@/components";
import { onClickOutside } from "@vueuse/core";

const compSelect = ref(null);
onClickOutside(compSelect, e => close());

const open = ref(false);

const props = defineProps({
  name: String,
  modelValue: {
    required: false,
  },
  error: String,
  required: Boolean,
  options: Object,
});

const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue ?? "Choose option",
  set: (val) => emits("update:modelValue", val),
});

const fullName = computed(() => `${props.name}${props.required ? "*" : ""}`);

const toggle = () => open.value = !open.value;
const close = () => open.value = false;

const setLanguage = (val: string) => {
  value.value = val;
  open.value = false;
};
</script>

<style lang="scss" scoped>
.form-dropdown {
  button {
    @apply min-w-[10rem] h-10 justify-between inline-block rounded border border-solid border-gray-300 pl-3 pr-2 py-2 leading-tight;
    @apply flex items-center whitespace-nowrap;
  }

  ul {
    @apply absolute z-10 mt-2 min-w-[10rem] rounded bg-gray-50 ring-1 ring-gray-300 shadow-2xl;

    li {
      @apply cursor-pointer select-none px-3 py-2 hover:bg-gray-200;
    }
  }
}
</style>
