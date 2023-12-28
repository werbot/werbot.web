<template>
  <div class="relative" v-click-outside="closeDropdown">
    <button class="dropdown" :class="{ active: (route.name as string).startsWith('profile') || (route.name as string).startsWith('admin') }" type="button" @click="toggleDropdown"
      :disabled="isLoading">
      <SvgIcon name="user" />
      <span class="hidden md:block">{{ proxy.$authStore.hasUserName }}</span>
      <SvgIcon name="chevron_down" />
    </button>

    <ul v-show="isDropdownOpen" class="dropdown-menu right-0" @click="closeDropdown">
      <li v-for="(menu, index) in dropdownMenuItems" :key="index">
        <hr v-if="menu.isSeparator && isUserRole(menu.isUserRole)" />
        <router-link active-class="current" :to="{ name: menu.routeName }" v-if="isUserRole(menu.isUserRole)">
          <SvgIcon :name="menu.icon" />
          <span>{{ menu.label }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { SvgIcon } from "@/components";
// @ts-ignore
import { directive as vClickOutside } from "click-outside-vue3";

const route = useRoute();
const props = defineProps<{
  isLoading?: boolean;
}>();

const dropdownMenuItems = [
  {
    label: "Profile settings",
    routeName: "profile-setting",
    icon: "profile",
    isSeparator: false,
  },
  {
    label: "SSH Keys",
    routeName: "profile-keys",
    icon: "key",
    isSeparator: false,
  },
  {
    label: "Profile logs",
    routeName: "profile-logs",
    icon: "logs",
    isSeparator: false,
  },
  {
    label: "Admin",
    routeName: "admin",
    icon: "admin",
    isSeparator: true,
    isUserRole: 3,
  },
  {
    label: "Logout",
    routeName: "auth-logout",
    icon: "logout",
    isSeparator: true,
  }
];

const { proxy } = getCurrentInstance() as any;

const isUserRole = (menuItem) => {
  if (!menuItem) {
    return true
  }
  return menuItem === proxy.$authStore.hasUserRole
};

const isDropdownOpen = ref(false);

const openDropdown = () => {
  if (props.isLoading) return false;
  isDropdownOpen.value = true;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const toggleDropdown = () => {
  isDropdownOpen.value ? closeDropdown() : openDropdown();
};

watch(
  () => props.isLoading,
  (isLoading) => {
    if (isLoading) {
      closeDropdown();
    }
  }
);
</script>
