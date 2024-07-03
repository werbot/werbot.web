import { defineStore } from "pinia";
//import { getVersion } from "@/api/info";
//import { api } from "@/api";
import pkg from "../../../package.json";

interface SystemState {
  versions: {
    ui: string;
    api: string;
  };
  invites: {
    project: null | string;
  };
}

export const useSystemStore = defineStore("system", {
  state: (): SystemState => ({
    versions: {
      ui: "1.0 (00000000)",
      api: "1.0 (00000000)"
    },
    invites: {
      project: null
    }
  }),

  getters: {
    getVersions: (state): SystemState["versions"] => state.versions
  },

  actions: {
    resetStore() {
      this.$reset();
    },

    async getVersion() {
      this.versions.ui = `${pkg.version} (${pkg.commit})`;
      // TODO: receive via ws
      //try {
      //  const res = await api().GET(`/v1/version`);
      //  if (res.data) {
      //    this.versions.api = res.data.result.api;
      //  }
      //} catch (err) {
      //  console.error("Unexpected error:", err);
      //}
    }
  }
});
