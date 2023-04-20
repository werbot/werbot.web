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
              name: 'projects-projectId-servers-serverId-members',
              params: {
                projectId: props.projectId,
                serverId: props.serverId,
              },
            }"
            >Members</router-link
          >
        </span>
        <span>Logs</span>
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
  memberId: String,
});
</script>
