<template>
  <div class="artboard">
    <header>
      <h1>Project information</h1>
    </header>

    <div class="content">{{ pageData.base }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { PageData, defaultPageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { Project_Request } from "@proto/project";

const pageData = ref<PageData>(defaultPageData);

const props = defineProps({
  projectId: {
    type: String,
    default: null
  }
});

const getData = async (): Promise<void> => {
  try {
    const queryParams = <Project_Request>{
      project_id: props.projectId
    };

    const res = await api().GET(`/v1/projects`, queryParams);
    if (res.data) {
      pageData.value.base = res.data.result;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

watch(() => props.projectId, getData);

onMounted(async () => {
  document.title = "Project information";
  await getData();
});
</script>
