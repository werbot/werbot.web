import { App } from "vue";
import { createPinia } from "pinia";

import { useAuthStore } from "@/store/modules/auth";
import { useSystemStore } from "@/store/modules/system";
import { useErrorStore } from "@/store/modules/error";

export default {
  install: (app: App) => {
    app.use(createPinia()); // Use the Pinia plugin in the Vue app

    const stores = {
      // Combine all three stores into a single object to avoid repeating assignments
      authStore: useAuthStore(),
      systemStore: useSystemStore(),
      errorStore: useErrorStore(),
    };

    Object.entries(stores).forEach(([name, store]) => {
      // Iterate over the stores object and assign them to globalProperties
      app.config.globalProperties[`$${name}`] = store;
    });

    const { authStore, systemStore } = stores; // Destructure the stores object to avoid repeating code

    if (authStore.loggedIn) {
      // If the user is logged in
      authStore.getProfile(); // Get the user profile from the auth store
      systemStore.getVersion(); // Get the version from the system store
    }
  },
};

// This line exports three functions - useAuthStore, useSystemStore, and useErrorStore.
export {
  useAuthStore, // This function is used to access and manipulate data related to authentication.
  useSystemStore, // This function is used to access and manipulate system information data.
  useErrorStore, // This function is used to access and manipulate error handling related data.
};
