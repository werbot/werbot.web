<template>
  <!-- Profile block -->
  <nav class="sidebar" v-if="(route.name as string).startsWith('profile')">
    <ul>
      <template v-for="(group, key, index) of profileMenu">
        <li v-for="(item) in group">
          <router-link active-class="current" :to="item.link" :class="{ current: (route.name as string).startsWith(item.link.name) }">
            <SvgIcon :name="item.icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
        <li v-if="index != Object.keys(profileMenu).length - 1">
          <hr />
        </li>
      </template>
    </ul>
  </nav>

  <!-- Project block -->
  <nav class="sidebar" v-if="(route.name as string).startsWith('projects')">
    <ul>
      <template v-for="(group, key, index) of projectMenu">
        <li v-for="(item) in group">
          <router-link active-class="current" :to="{ name: item.link.name, params: { projectId: route.params.projectId } }"
            :class="{ current: (route.name as string).startsWith(item.link.name) }">
            <SvgIcon :name="item.icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
        <li v-if="index != Object.keys(projectMenu).length - 1">
          <hr />
        </li>
      </template>
    </ul>
  </nav>

  <!-- Admin block -->
  <nav class="sidebar" v-if="(route.name as string).startsWith('admin') && route.path !== '/projects/new'">
    <ul>
      <template v-for="(group, key, index) of adminMenu">
        <li v-for="(item) in group">
          <router-link active-class="current" :to="item.link">
            <SvgIcon :name="item.icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
        <li v-if="index != Object.keys(adminMenu).length - 1">
          <hr />
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useRoute } from "vue-router";
import { SvgIcon } from "@/components";

const route = useRoute();

const adminMenu = inject('adminMenu')
const profileMenu = inject('profileMenu')
const projectMenu = inject('projectMenu')
</script>

<style lang="scss">
.sidebar {
  @apply mb-6;

  li {
    @apply mb-4 w-3 sm:w-36;

    a {
      @apply leading-5 text-gray-400;

      &:hover {
        @apply -m-2 rounded bg-gray-100 p-2;
      }

      span {
        @apply hidden sm:inline-block;
      }

      svg {
        @apply inline-block w-5 fill-gray-400 pr-0 align-middle sm:mr-2.5;
      }

      &.current {
        @apply -m-2 rounded bg-gray-200 p-2 text-gray-700;

        svg {
          @apply fill-gray-700;
        }
      }
    }
  }
}
</style>
