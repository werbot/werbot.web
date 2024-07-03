<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <h1>Member log</h1>
    </header>
    <Tabs :tabs="tabMenu" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Tabs } from "@/components";

// Tabs section
import { tabMenu } from "@/pages/projects/_projectId/servers/_serverId/tab";

const props = defineProps({
  projectId: {
    type: String,
    default: null
  },
  serverId: {
    type: String,
    default: null
  },
  memberId: {
    type: String,
    default: null
  }
});

onMounted(async () => {
  document.title = "Server member";
});
</script>
