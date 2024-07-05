<template>
  <div ref="profileMenu" class="relative">
    <button
      class="dropdown"
      :class="{ active: (route.name as string).startsWith('profile') || (route.name as string).startsWith('admin') }"
      type="button"
      :disabled="props.isLoading"
      @click="toggleDropdown"
    >
      <SvgIcon name="user" />
      <span class="dot mr-1.5 mt-0.5 !h-2 !w-2" :class="wsStatus === 'OPEN' ? 'bg-green-500' : 'bg-gray-200'"></span>
      <span class="hidden md:block">{{ authStore.hasUserName }}</span>
      <SvgIcon name="chevron_down" />
    </button>

    <ul v-show="isDropdownOpen" class="dropdown-menu right-0" @click="closeDropdown()">
      <template v-for="(group, key, index) in topMenu">
        <template v-for="(item, _index) in group" :key="_index">
          <li v-if="isUserRole(item.isUserRole)">
            <router-link
              active-class="current"
              :to="item.link"
              :class="{ current: (route.name as string).startsWith(item.link.name) }"
            >
              <SvgIcon :name="item.icon" />
              <span>{{ item.name }}</span>
            </router-link>
            <hr v-if="_index === group.length - 1 && index != Object.keys(topMenu).length - 1" />
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store";
import { SvgIcon } from "@/components";
import { topMenu } from "@pages/profile/menu";
import { onClickOutside } from "@vueuse/core";

const profileMenu = ref(null);
const wsStatus = inject("wsStatus");

const route = useRoute();
const props = defineProps<{
  isLoading?: boolean;
}>();

const isDropdownOpen = ref(false);

const authStore = useAuthStore();
const isUserRole = (role?: number): boolean => role === undefined || role === authStore.hasUserRole;

const openDropdown = (): boolean => !props.isLoading && (isDropdownOpen.value = !isDropdownOpen.value);
const closeDropdown = (): boolean => (isDropdownOpen.value = false);
const toggleDropdown = (): boolean => (isDropdownOpen.value ? closeDropdown() : openDropdown());

onClickOutside(profileMenu, () => closeDropdown());

watch(
  () => props.isLoading,
  (isLoading) => {
    if (isLoading) {
      closeDropdown();
    }
  }
);
</script>
