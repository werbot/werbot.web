<template>
  <router-link :to="{ name: 'projects-projectId-servers' }">
    {{ projectStore.getServerNameByID(props.projectId, props.serverId) }}
  </router-link>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useProjectStore } from "@/store";

const projectStore = useProjectStore();

const props = defineProps<{
  memberId: string;
  serverId: string;
  projectId: string;
}>();

onMounted(async () => {
  projectStore.serverNameByID(props.projectId, props.serverId);
});
</script>
