<template>
  <nav v-if="isProfileRoute" class="sidebar">
    <ul>
      <template v-for="(group, key, index) in profileMenu" :key="key">
        <li v-for="item in group" :key="item.link.name">
          <router-link :to="item.link" :class="{ current: isActive(item.link.name) }">
            <SvgIcon :name="item.icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
        <li v-if="index !== profileMenu.length - 1">
          <hr />
        </li>
      </template>
    </ul>
  </nav>

  <nav v-if="isProjectRoute" class="sidebar">
    <ul>
      <template v-for="(group, key, index) in projectMenu" :key="key">
        <li v-for="item in group" :key="item.link.name">
          <router-link
            :to="{ name: item.link.name, params: { projectId: route.params.projectId } }"
            :class="{ current: isActive(item.link.name) }"
          >
            <SvgIcon :name="item.icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
        <li v-if="index !== projectMenu.length - 1">
          <hr />
        </li>
      </template>
    </ul>
  </nav>

  <nav v-if="isAdminRoute" class="sidebar">
    <ul>
      <template v-for="(group, key, index) in adminMenu" :key="key">
        <li v-for="item in group" :key="item.link.name">
          <router-link :to="item.link">
            <SvgIcon :name="item.icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
        <li v-if="index !== adminMenu.length - 1">
          <hr />
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { useRoute } from "vue-router";
import { SvgIcon } from "@/components";

const route = useRoute();

const adminMenu = inject("adminMenu");
const profileMenu = inject("profileMenu");
const projectMenu = inject("projectMenu");

const isProfileRoute = computed(() => (route.name as string).startsWith("profile"));
const isProjectRoute = computed(() => (route.name as string).startsWith("projects"));
const isAdminRoute = computed(() => (route.name as string).startsWith("admin") && route.path !== "/projects/new");

const isActive = (linkName: string): boolean => (route.name as string).startsWith(linkName);
</script>

<style lang="scss">
.sidebar {
  @apply mb-6 mt-2;

  hr {
    @apply my-4;
  }

  li {
    @apply mb-3;

    a {
      @apply -m-2 flex items-center rounded p-2 leading-5 text-gray-400 no-underline;

      &:hover {
        @apply bg-gray-100;
      }

      span {
        @apply hidden sm:inline-block;
      }

      svg {
        @apply inline-block w-5 fill-gray-400 pr-0 align-middle sm:mr-2;
      }

      &.current {
        @apply bg-gray-200 text-gray-700;

        svg {
          @apply fill-gray-700;
        }
      }
    }
  }
}
</style>
