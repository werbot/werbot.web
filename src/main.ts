import { createApp } from "vue";

import Vue from "@/app.vue";
import Router from "@/router";
import Store, { useAuthStore, useSystemStore, useErrorStore } from "@/store";
import menu from '@/plugins/menu'

import "@/assets/main.css";
import "virtual:svg-icons-register";

if (import.meta.env.MODE === "production") console.log = function () {};

const app = createApp(Vue);
app.use(Store);
app.use(Router);
app.use(menu);
app.mount("#app");

const authStore = useAuthStore();
const systemStore = useSystemStore();
const errorStore = useErrorStore();

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    useAuthStore(): typeof authStore;
    $systemStore: typeof systemStore;
    $errorStore: typeof errorStore;
  }
}
