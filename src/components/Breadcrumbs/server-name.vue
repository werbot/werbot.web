<template>
  <router-link :to="{ name: 'projects-projectId-servers' }">
    {{ serverStore.getServerNameByID(props.projectId, props.serverId) }}
  </router-link>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useServerStore } from "@/store";

const serverStore = useServerStore();

const props = defineProps<{
  memberId: string;
  serverId: string;
  projectId: string;
}>();

onMounted(async () => {
  serverStore.serverNameByID(props.projectId, props.serverId);
});
</script>
