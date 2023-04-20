<template>
  <RouterView />
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance() as any;
const router = useRouter();

if (proxy.$authStore.hasUserRole != 3) {
  router.push({ name: "error404" });
}

document.title = "Admin";
</script>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
