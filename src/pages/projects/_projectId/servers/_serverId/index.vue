<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ serverStore.getServerNameByID(props.projectId, props.serverId) }}</div>
    </header>
    <Tabs :tabs="tabMenu" />
    <div class="desc">
      Several options for adding new members are available. Choose the right one and follow the instructions.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useServerStore } from "@/store";
import { Tabs } from "@/components";

// Tabs section
import { tabMenu } from "./tab";

const serverStore = useServerStore();

const props = defineProps({
  projectId: {
    type: String,
    default: null
  },
  serverId: {
    type: String,
    default: null
  }
});

onMounted(async () => {
  document.title = "Server info";
  serverStore.serverNameByID(props.projectId, props.serverId);
});
</script>
