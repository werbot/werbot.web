<template>
  <div class="px-6">
    <Header />

    <div class="content" v-if="!router.currentRoute.value.meta.layoutStyle">
      <div class="left">
        <Navigation />
        <Version />
      </div>
      <div class="right">
        <div id="alert"></div>
        <RouterView />
      </div>
    </div>

    <div class="content" v-if="router.currentRoute.value.meta.layoutStyle === 'blank'">
      <div id="alert"></div>
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, provide, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import { useWebSocket } from "@vueuse/core";
import { Header, Navigation, Version } from "@/components";

const router = useRouter();

const isSubscribe = ref(false);
const authStore = useAuthStore();
const { status, data, send, open, close } = useWebSocket(
  import.meta.env.VITE_API_URL.replace("http", "ws") + "/ws/" + authStore.hasSessionID,
  {
    autoReconnect: true,
  },
);

provide("wsStatus", status);
provide("wsData", data);
provide("wsSend", send);

if (router.currentRoute.value.fullPath.startsWith('/admin') && authStore.hasUserRole != 3) {
  router.push({ name: "404" });
}

watchEffect(() => {
  if (!data.value) return;

  const resp = JSON.parse(data.value);
  const { code, action } = resp;

  if (code === 200 && action === "subscribe") {
    isSubscribe.value = true;
    send(JSON.stringify({ action: "info" }));
  } else if (code === 401) {
    isSubscribe.value = false;
    close();
    open();
  }
});

/*
const checkExpiration = () => {
  const expiresAt = new Date(authStore.expires_at).getTime();
  const currentTime = Date.now();
  const secondsLeft = (expiresAt - currentTime) / 1000;

  if (secondsLeft < 5) {
    const message = JSON.stringify({ action: "refresh" });
    send(message);
    authStore.refreshToken();
  }
};
checkExpiration();
const intervalId = setInterval(checkExpiration, 5000)
*/
</script>
