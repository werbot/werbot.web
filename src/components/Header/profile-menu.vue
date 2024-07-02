<template>
  <div class="relative" ref="profileMenu">
    <button class="dropdown" :class="{ active: (route.name as string).startsWith('profile') || (route.name as string).startsWith('admin') }" type="button" @click="toggleDropdown"
      :disabled="props.isLoading">
      <SvgIcon name="user" />
      <span class="dot !w-2 !h-2 mr-1.5 mt-0.5" :class="wsStatus === 'OPEN' ? 'bg-green-500' : 'bg-gray-200'"></span>
      <span class="hidden md:block">{{ authStore.hasUserName }}</span>
      <SvgIcon name="chevron_down" />
    </button>

    <ul v-show="isDropdownOpen" class="dropdown-menu right-0" @click="closeDropdown()">
      <template v-for="(group, key, index) of topMenu">
        <template v-for="(item, iindex) in group">
          <li v-if="isUserRole(item.isUserRole)">
            <router-link active-class="current" :to="item.link" :class="{ current: (route.name as string).startsWith(item.link.name) }">
              <SvgIcon :name="item.icon" />
              <span>{{ item.name }}</span>
            </router-link>
            <hr v-if="(iindex === group.length - 1) && (index != Object.keys(topMenu).length - 1)" />
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, inject } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store";
import { SvgIcon } from "@/components";
import { topMenu } from "@pages/profile/menu";
import { onClickOutside } from "@vueuse/core";

const profileMenu = ref(null);
onClickOutside(profileMenu, e => closeDropdown());

const wsStatus = inject("wsStatus");

const route = useRoute();
const props = defineProps<{
  isLoading?: boolean;
}>();

const isDropdownOpen = ref(false);

const authStore = useAuthStore();
const isUserRole = (role) => role === undefined || role === authStore.hasUserRole;

const openDropdown = () => !props.isLoading && (isDropdownOpen.value = !isDropdownOpen.value);
const closeDropdown = () => isDropdownOpen.value = false;
const toggleDropdown = () => isDropdownOpen.value ? closeDropdown() : openDropdown();

watch(
  () => props.isLoading,
  (isLoading) => {
    if (isLoading) {
      closeDropdown();
    }
  }
);
</script>
