<template>
  <div role="status">Please wait...</div>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance() as any;
const router = useRouter();

onMounted(async () => {
  document.title = "Please wait...";

  try {
    await proxy.$authStore.logout();
  } catch (error) {
    console.error(error);
  } finally {
    router.push({ name: "auth-signin" });
  }
});
</script>
