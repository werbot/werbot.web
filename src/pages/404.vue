<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>This page no longer exists or was moved to another location.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(async () => {
  document.title = "404 - Page Not Found";
});
</script>
