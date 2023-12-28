<template>
  <div class="artboard">
    <header>
      <h1><router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">Servers</router-link></h1>
      <div class="breadcrumbs">{{serverName}}</div>
    </header>
    <Tabs :tabs="tabMenu" />
    <div class="desc">Several options for adding new members are available. Choose the right one and follow the instructions.</div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance, ref } from "vue";
import { Tabs } from "@/components";
import { serverNameByID } from "@/api/server";
import { ServerNameByID_Request } from "@proto/server";

// Tabs section
import { tabMenu } from "./tab";

const serverName: any = ref("");

const { proxy } = getCurrentInstance() as any;
const props = defineProps({
  projectId: String,
  serverId: String,
});

onMounted(async () => {
  await serverNameByID(<ServerNameByID_Request>{
    user_id: proxy.$authStore.hasUserID,
    server_id: props.serverId,
    project_id: props.projectId,
  }).then((res) => {
    serverName.value = res.data.result.server_name;
  });
});
</script>
