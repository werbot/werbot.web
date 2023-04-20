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
        <span>Server information</span>
      </div>
    </header>

    <div class="desc">
      Several options for adding new members are available. Choose the right one and follow the
      instructions.
    </div>

  </div>
</template>

<script setup lang="ts">
  import { getCurrentInstance } from "vue";
  import { BServerName } from "@/components";

  const { proxy } = getCurrentInstance() as any;
  const props = defineProps({
    projectId: String,
    serverId: String,
  });
  </script>
