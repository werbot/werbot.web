<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">
        {{ projectStore.getServerNameByID(props.projectId, props.serverId) }}
        <span>
          <router-link
            :to="{
              name: 'projects-projectId-servers-serverId-members',
              params: { projectId: props.projectId, serverId: props.serverId }
            }"
          >
            Members
          </router-link>
        </span>
        <span>Logs</span>
      </div>
    </header>
    <Tabs :tabs="tabMenu" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useProjectStore } from "@/store";
import { Tabs } from "@/components";

// Tabs section
import { tabMenu } from "@/pages/projects/_projectId/servers/_serverId/tab";

const projectStore = useProjectStore();

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
  projectStore.serverNameByID(props.projectId, props.serverId);
});
</script>
