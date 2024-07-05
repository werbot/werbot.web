<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">
        <div class="breadcrumbs">{{ projectStore.getServerNameByID(props.projectId, props.serverId) }}</div>
        <span>
          <router-link
            :to="{
              name: 'projects-projectId-servers-serverId-sessions',
              params: { projectId: props.projectId, serverId: props.serverId }
            }"
          >
            Sessions
          </router-link>
        </span>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useProjectStore } from "@/store";

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
  sessionId: {
    type: String,
    default: null
  }
});

onMounted(async () => {
  document.title = "Server session info";
  projectStore.serverNameByID(props.projectId, props.serverId);
});
</script>
