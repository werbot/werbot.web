import { defineStore } from "pinia";
import { getVersion } from "@/api/info"; // import the 'getVersion' function from an external module
import pkg from "../../../package.json"; // import the 'package.json' file as a module

// define an interface for the store state to ensure strict typing
interface SystemState {
  versions: {
    ui: string;
    api: string;
  };
  invites: {
    project: null | string;
  };
}

// define a reactive 'system' store with initial state and its type
export const useSystemStore = defineStore("system", {
  state: (): SystemState => ({
    versions: {
      ui: "1.0 (00000000)", // default UI version number
      api: "1.0 (00000000)", // default API version number
    },
    invites: {
      project: null, // default project invite
    },
  }),

  getters: {
    // define a getter to get both UI and API versions
    // from the store state by returning the 'versions' object
    getVersions: (state): SystemState["versions"] => state.versions,
  },

  actions: {
    // reset the entire store state back to its default values
    resetStore() {
      this.$reset();
    },

    // asynchronously update the UI and API version numbers of the store state
    async getVersion() {
      this.versions.ui = `${pkg.version} (${pkg.commit})`; // set the UI version based on the values in 'package.json'
      const res = await getVersion(); // call the 'getVersion()' function to get the API version
      this.versions.api = res.data.result.api; // set the API version based on the response from the API
    },
  },
});
