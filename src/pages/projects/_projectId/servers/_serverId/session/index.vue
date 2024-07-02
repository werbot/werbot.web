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

    <table>
      <thead>
        <tr>
          <th>Session ID</th>
          <th>Start session</th>
          <th>Client ip</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0c3</td>
          <td>login_success</td>
          <td>162.158.90.222</td>
          <td>2.612766</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore, useServerStore } from "@/store";
import { Tabs } from "@/components";

// Tabs section
import { tabMenu } from "../tab";

const serverStore = useServerStore();

const props = defineProps({
  projectId: String,
  serverId: String,
});

onMounted(async () => {
  document.title = "Server session list";
  serverStore.serverNameByID(props.projectId, props.serverId);
});
</script>
