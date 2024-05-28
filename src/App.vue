<template>
  <component :is="route.meta.layoutComponent">
    <RouterView />
  </component>
  <Alert />
</template>

<script setup lang="ts">
import { onMounted} from "vue";
import { RouterView, useRoute } from "vue-router";
import { Alert } from "@/components";

const route = useRoute();

//import { onMounted, watchEffect, provide, computed } from "vue";
//import { useAuthStore, useSystemStore } from "@/store";
//import { useWebSocket } from "@vueuse/core";

/*
const authStore = useAuthStore()

const webSocketUrl = computed(() => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return apiUrl.replace('http', 'ws') + '/ws';
});

const { status, data, send } = useWebSocket(webSocketUrl.value, {
  autoReconnect: true,
});

provide("wsStatus", status);
provide("wsData", data);
provide("wsSend", send);


watchEffect(() => {
  const userID = authStore.hasUserID;
  if (userID && status.value === "OPEN") {
    firstSend(userID);
  }
});

watchEffect(() => {
 if (data.value){
  console.log(data.value)
  useSystemStore().versions = data.value
 }
});

function firstSend(userID: string) {
  const message = JSON.stringify({ action: 'subscribe', user_id: userID });
  send(message);
}
*/

onMounted(() => {
  document.title = "Werbot";
});
</script>
