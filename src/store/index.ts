import { App } from "vue";
import { createPinia } from "pinia";

import { useAuthStore } from "@/store/modules/auth";
import { useSystemStore } from "@/store/modules/system";
import { useProjectStore } from "@/store/modules/project";

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  install: (app: App) => {
    app.use(createPinia());

    const stores = {
      authStore: useAuthStore(),
      systemStore: useSystemStore(),
      projectStore: useProjectStore()
    };

    Object.keys(stores).forEach((name) => {
      app.config.globalProperties[`$${name}`] = stores[name];
    });

    const { authStore, systemStore } = stores;

    if (authStore.logged_in) {
      authStore.getProfile();
      systemStore.getVersion();
    }
  }
};

export { useAuthStore, useSystemStore, useProjectStore };
