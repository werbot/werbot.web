<template>
  <div class="artboard">
    <header>
      <h1>Servers</h1>
      <div class="breadcrumbs">
        <BServerName
          :memberId="proxy.$authStore.hasUserID"
          :serverId="props.serverId!"
          :projectId="props.projectId!"
        />
        <span>
          <router-link
            :to="{
              name: 'projects-projectId-servers-serverId-sessions',
              params: {
                projectId: props.projectId,
                serverId: props.serverId,
              },
            }">Sessions</router-link>
        </span>
        <span>Session</span>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { BServerName } from "@/components";

const { proxy } = getCurrentInstance() as any;
const props = defineProps({
  projectId: String,
  serverId: String,
  sessionId: String,
});
</script>
