<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">
        <div class="breadcrumbs">{{ serverStore.getServerNameByID(props.projectId, props.serverId) }}</div>
        <span>
          <router-link :to="{ name: 'projects-projectId-servers-serverId-sessions', params: { projectId: props.projectId, serverId: props.serverId } }">
            Sessions
          </router-link>
        </span>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useServerStore } from "@/store";

const serverStore = useServerStore();

const props = defineProps({
  projectId: String,
  serverId: String,
  sessionId: String,
});

onMounted(async () => {
  document.title = "Server session info";
  serverStore.serverNameByID(props.projectId, props.serverId);
});
</script>
