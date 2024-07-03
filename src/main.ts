import { createApp } from "vue";

import Vue from "@/App.vue";
import router from "@/router";
import store from "@/store";
import menu from "virtual:werbot-addon/menu";

import "@/assets/main.css";
import "virtual:svg-icons-register";

if (import.meta.env.MODE === "production") {
  console.log = function (): void {};
}

const app = createApp(Vue);
app.use(store);
app.use(router);
app.use(menu);
app.mount("#app");
