<template>
  <div class="artboard">
    <header>
      <h1>Databases</h1>
      <router-link :to="{ name: 'projects-projectId-databases-add' }">
        <label class="plus">
          <SvgIcon name="plus_square" />
          add new
        </label>
      </router-link>
    </header>
    <div class="desc">Empty</div>
    <div class="content">section under development</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { SvgIcon } from "@/components";

onMounted(async () => {
  document.title = "Databases";
});
</script>
