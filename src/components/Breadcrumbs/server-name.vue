<template>
  <router-link :to="{ name: 'projects-projectId-servers' }"> {{ data.server_name }} </router-link>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { serverNameByID } from "@/api/server";
import { ServerNameByID_Request } from "@proto/server";

interface ServerData {
  server_name: string;
}

const data = ref<ServerData | null>(null);

const props = defineProps<{
  memberId: string;
  serverId: string;
  projectId: string;
}>();

onMounted(async () => {
  const response = await serverNameByID(<ServerNameByID_Request>{
    user_id: props.memberId,
    server_id: props.serverId,
    project_id: props.projectId,
  });

  data.value = response.data.result;
});
</script>
