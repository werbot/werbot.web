<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ serverName }}
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
import { onMounted, getCurrentInstance, ref } from "vue";
import { Tabs } from "@/components";
import { serverNameByID } from "@/api/server";
import { ServerNameByID_Request } from "@proto/server";

const serverName: any = ref("");

// Tabs section
import { tabMenu } from "../../tab";

const { proxy } = getCurrentInstance() as any;
const props = defineProps({
  projectId: String,
  serverId: String,
  memberId: String,
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
