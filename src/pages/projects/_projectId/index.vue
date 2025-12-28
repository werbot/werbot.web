<template>
  <div class="artboard">
    <header>
      <h1>{{ pageData.base.title }}</h1>
    </header>

    <div class="desc">Project information</div>

    <div class="content">
      <dl class="info">
        <router-link
          v-for="item in infoItems"
          :key="item.countKey"
          :to="{ name: item.routeName, params: { projectId: props.projectId } }"
        >
          <div>
            <dt>{{ item.label }}</dt>
            <dd>{{ projectStore.projects[props.projectId]?.info[item.countKey] || 0 }}</dd>
          </div>
        </router-link>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { usePageData } from "@/interface/page";
import { useProjectStore } from "@/store";

// API section
const projectStore = useProjectStore();
const pageData = usePageData();

const props = defineProps({
  projectId: {
    type: String,
    default: null
  }
});

const getData = async (): Promise<void> => {
  projectStore.projectInfo(props.projectId);
};

watch(() => props.projectId, getData);

onMounted(async () => {
  document.title = "Project information";
  await getData();
});

const infoItems = [
  { label: "Servers", routeName: "projects-projectId-servers", countKey: "servers_count" },
  { label: "Databases", routeName: "projects-projectId-databases", countKey: "database_count" },
  { label: "Applications", routeName: "projects-projectId-applications", countKey: "applications_count" },
  { label: "Desktops", routeName: "projects-projectId-desktops", countKey: "desktops_count" },
  { label: "Containers", routeName: "projects-projectId-containers", countKey: "containers_count" },
  { label: "Clouds", routeName: "projects-projectId-clouds", countKey: "clouds_count" }
];
</script>

<style>
@reference "tailwindcss";

dl.info {
  @apply flex flex-wrap gap-4;

  a {
    @apply no-underline;
  }

  div {
    @apply flex w-32 flex-col rounded-sm border border-gray-100 px-4 py-8 text-center;

    dt {
      @apply order-last text-lg font-medium text-gray-500;
    }

    dd {
      @apply text-4xl font-extrabold text-gray-600 md:text-5xl;
    }
  }
}
</style>
