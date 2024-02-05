import { App } from "vue";
import { createPinia } from "pinia";

import { useAuthStore } from "@/store/modules/auth";
import { useSystemStore } from "@/store/modules/system";
import { useErrorStore } from "@/store/modules/error";

export default {
  install: (app: App) => {
    app.use(createPinia());

    const stores = {
      authStore: useAuthStore(),
      systemStore: useSystemStore(),
      errorStore: useErrorStore(),
    };

    Object.entries(stores).forEach(([name, store]) => {
      app.config.globalProperties[`$${name}`] = store;
    });

    const { authStore, systemStore } = stores;

    if (authStore.logged_in) {
      authStore.getProfile();
      //systemStore.getVersion(); // Get the version from the system store
    }
  },
};

export {
  useAuthStore, // This function is used to access and manipulate data related to authentication.
  useSystemStore, // This function is used to access and manipulate system information data.
  useErrorStore, // This function is used to access and manipulate error handling related data.
};
