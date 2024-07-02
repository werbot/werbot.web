<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ serverStore.getServerNameByID(props.projectId, props.serverId) }}
        <span>
          <router-link :to="{ name: 'projects-projectId-servers-serverId-members', params: { projectId: props.projectId, serverId: props.serverId } }">
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
import { useServerStore } from "@/store";
import { Tabs } from "@/components";

// Tabs section
import { tabMenu } from "../../tab";

const serverStore = useServerStore();

const props = defineProps({
  projectId: String,
  serverId: String,
  memberId: String,
});

onMounted(async () => {
  document.title = "Server member";
  serverStore.serverNameByID(props.projectId, props.serverId);
});
</script>
