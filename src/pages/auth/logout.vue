<template>
  <div role="status">Please wait...</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  document.title = "Please wait...";

  try {
    await authStore.logout();
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    router.push({ name: "auth-signin" });
  }
});
</script>
