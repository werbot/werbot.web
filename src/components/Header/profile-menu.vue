<template>
  <div class="relative" ref="profileMenu">
    <button class="dropdown" :class="{ active: (route.name as string).startsWith('profile') || (route.name as string).startsWith('admin') }" type="button" @click="toggleDropdown"
      :disabled="isLoading">
      <SvgIcon name="user" />
      <span class="dot !w-2 !h-2 mr-1.5 mt-0.5" :class="wsStatus === 'OPEN' ? 'bg-green-500' : 'bg-gray-200'"></span>
      <span class="hidden md:block">{{ proxy.$authStore.hasUserName }}</span>
      <SvgIcon name="chevron_down" />
    </button>

    <ul v-show="isDropdownOpen" class="dropdown-menu right-0" @click="closeDropdown">
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
import { ref, watch, getCurrentInstance, inject } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store";
import { SvgIcon } from "@/components";
import { topMenu } from "@/pages/profile/menu";

const authStore = useAuthStore();
const profileMenu = ref(null);
import { onClickOutside } from "@vueuse/core";
onClickOutside(profileMenu, event => closeDropdown());

const wsStatus = inject("wsStatus");

const route = useRoute();
const props = defineProps<{
  isLoading?: boolean;
}>();

const isDropdownOpen = ref(false);

const { proxy } = getCurrentInstance() as any;

const isUserRole = (role) => role === undefined || role === proxy.$authStore.hasUserRole;

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
