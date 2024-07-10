<template>
  <div class="artboard">
    <header>
      <h1>API</h1>
    </header>
    <Tabs :tabs="tabMenu" />

    <div class="desc">Description</div>
    <div class="content">section under development</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Tabs } from "@/components";

// Tabs section
import { tabMenu } from "./tab";

onMounted(async () => {
  document.title = "Teams";
});
</script>
