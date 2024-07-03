<template>
  <div class="animate-pulse">
    <div class="flex items-center justify-between space-x-4">
      <div v-if="avatar" class="h-12 w-12 shrink-0 rounded-full bg-current"></div>
      <div v-if="title" class="h-8 w-full rounded-lg bg-current"></div>
    </div>

    <div v-if="lines > 0" class="mt-6 space-y-2">
      <div
        v-for="(setting, index) in lineSettings"
        :key="index"
        class="h-4 rounded-lg bg-current"
        :class="setting.margin"
      ></div>
    </div>

    <div v-if="footer" class="mt-6 h-10 w-1/3 rounded-lg bg-current"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  avatar: {
    type: Boolean,
    default: false
  },
  title: {
    type: Boolean,
    default: true
  },
  lines: {
    type: Number,
    default: 3
  },
  footer: {
    type: Boolean,
    default: true
  }
});

const lineSettings = new Array(props.lines).fill(undefined).map(() => {
  const margins = [4, 5, 6, 8, 10, 16, 24, 32];
  const margin = margins[Math.floor(Math.random() * margins.length)];

  return {
    margin: `mr-${margin}`
  };
});
</script>
