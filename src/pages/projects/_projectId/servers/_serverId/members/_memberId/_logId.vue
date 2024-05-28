<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <h1>Member log</h1>
    </header>
    <Tabs :tabs="tabMenu" />

  </div>
</template>

<script setup lang="ts">
import { Tabs } from "@/components";

// Tabs section
import { tabMenu } from "../../tab";

const props = defineProps({
  projectId: String,
  serverId: String,
  memberId: String,
});
</script>
