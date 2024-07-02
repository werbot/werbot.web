import { App } from "vue";
import { createPinia } from "pinia";

import { useAuthStore } from "@/store/modules/auth";
import { useSystemStore } from "@/store/modules/system";
import { useServerStore } from "@/store/modules/server";

export default {
  install: (app: App) => {
    app.use(createPinia());

    const stores = {
      authStore: useAuthStore(),
      systemStore: useSystemStore(),
      serverStore: useServerStore(),
    };

    Object.keys(stores).forEach((name) => {
      app.config.globalProperties[`$${name}`] = stores[name];
    });

    const { authStore, systemStore } = stores;

    if (authStore.logged_in) {
      authStore.getProfile();
      systemStore.getVersion();
    }
  },
};

export { useAuthStore, useSystemStore, useServerStore };
