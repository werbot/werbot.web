<template>
  <ul class="flex flex-wrap bg-gray-100 pl-3 text-center text-gray-700" id="mainTab" role="tablist">
    <li v-for="(item, index) in props.tabs" :key="index">
      <div :id="'tab-' + index" role="tab" :aria-controls="index" :aria-selected="isActive(item)">
        <RouterLink :to="item.link" class="inline-block p-4 focus:outline-none text-gray-700"
          :class="{ 'bg-gray-200': isActive(item), 'hover:bg-gray-800 hover:text-gray-200': !isActive(item) }">
          {{ item.name }}
        </RouterLink>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
});

const isActive = (item: any) => item.link.name === route.name;
</script>
