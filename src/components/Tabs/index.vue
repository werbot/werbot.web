<template>
  <ul id="mainTab" class="flex flex-wrap bg-gray-100 pl-3 text-center text-gray-700" role="tablist">
    <li v-for="(item, index) in props.tabs" :key="index">
      <div :id="'tab-' + index" role="tab" :aria-controls="'control-' + index" :aria-selected="isActive(item)">
        <router-link :to="item.link" class="inline-block p-4 focus:outline-none" :class="getClass(item)">
          {{ item.name }}
        </router-link>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { MenuItem } from "@/interface/menu";

const route = useRoute();
const props = defineProps<{ tabs: MenuItem[] }>();

const isActive = (item: MenuItem): boolean => {
  return item.link.name === route.name;
};

const getClass = (item: MenuItem): string => {
  if (isActive(item)) {
    return item.danger ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-700";
  }
  return item.danger
    ? "hover:bg-red-600 hover:text-white text-red-700"
    : "hover:bg-gray-800 hover:text-gray-200 text-gray-700";
};
</script>
@/interface/menu
