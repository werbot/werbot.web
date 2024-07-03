<template>
  <div ref="projectMenu" class="relative">
    <button
      class="dropdown"
      :class="{ active: (route.name as string).startsWith('projects') }"
      type="button"
      @click="toggleDropdown"
    >
      <SvgIcon name="project" />
      <span class="hidden md:block">{{ projectTitle }}</span>
      <SvgIcon name="chevron_down" />
    </button>

    <ul v-if="isDropdownOpen" class="dropdown-menu" @click="closeDropdown()">
      <li v-for="(item, index) in data.projects" :key="index">
        <router-link
          active-class="current"
          :to="{ name: 'projects-projectId', params: { projectId: item.project_id } }"
        >
          <SvgIcon name="project" />
          <span>{{ item.title }}</span>
        </router-link>
      </li>
      <div v-if="data.total > 5">
        <li>
          <hr />
        </li>
        <li>
          <router-link :to="{ name: 'projects' }">
            <SvgIcon name="project" />
            <span>Show all projects</span>
          </router-link>
        </li>
      </div>
      <li>
        <hr />
      </li>
      <li>
        <router-link active-class="current" :to="{ name: 'projects-add' }">
          <SvgIcon name="plus" />
          <span>Add new project</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { SvgIcon } from "@/components";
import { onClickOutside } from "@vueuse/core";

// API section
import { api } from "@/api";
import { ListProjects_Request } from "@proto/project";

const route = useRoute();

const projectMenu = ref(null);
const data: any = ref({});
const isDropdownOpen = ref(false);

const props = defineProps<{
  isLoading?: boolean;
}>();

onClickOutside(projectMenu, () => closeDropdown());

const openDropdown = (): boolean => !props.isLoading && (isDropdownOpen.value = !isDropdownOpen.value);
const closeDropdown = (): boolean => (isDropdownOpen.value = false);
const toggleDropdown = (): boolean => (isDropdownOpen.value ? closeDropdown() : openDropdown());

const projectTitle = computed(() => {
  const projects = data.value?.projects || [];
  const project = projects.find((p) => p.project_id === route.params.projectId);
  return project ? project.title : "Projects";
});

watch(
  () => props.isLoading,
  (isLoading) => {
    if (isLoading) {
      closeDropdown();
    }
  }
);

onMounted(async () => {
  try {
    const queryParams = <ListProjects_Request>{
      limit: 5
    };

    const res = await api().GET(`/v1/projects`, queryParams);
    if (res.data) {
      data.value = res.data.result;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
});
</script>
