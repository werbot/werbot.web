<template>
  <div role="status">Please wait...</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import { showMessage } from "@/utils";

// API section
import { api } from "@/api";

const router = useRouter();
const authStore = useAuthStore();

const props = defineProps({
  token: String,
});

onMounted(async () => {
  try {
    const bodyParams = {
      user_id: authStore.hasUserID,
      token: props.token,
    };

    const res = await api().DELETE(`/v1/users`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
      authStore.resetStore();
      router.push({ name: "auth-signin" });
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    router.push({ name: "index" });
  }
});
</script>
