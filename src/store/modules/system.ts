import { defineStore } from "pinia";
import { getVersion } from "@/api/info";
import pkg from "../../../package.json";

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
      ui: "1.0 (00000000)",
      api: "1.0 (00000000)",
    },
    invites: {
      project: null,
    },
  }),

  getters: {
    getVersions: (state): SystemState["versions"] => state.versions,
  },

  actions: {
    resetStore() {
      this.$reset();
    },

    //async getVersion() {
    //  this.versions.ui = `${pkg.version} (${pkg.commit})`;
    //  const res: any = await getVersion();
    //  this.versions.api = res.data.result.api;
    //},
  },
});
