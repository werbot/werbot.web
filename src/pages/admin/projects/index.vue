<template>
  <div class="artboard">
    <header>
      <h1>Projects</h1>
    </header>
    <div class="desc">Description</div>

    <div class="content">section under development</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(async () => {
  document.title = "Projects";
});
</script>
