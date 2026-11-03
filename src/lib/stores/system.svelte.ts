import pkg from "../../../package.json";

export interface SystemState {
  versions: {
    ui: string;
    api: string;
  };
  invites: {
    project: null | string;
  };
}

function createVersions(): SystemState["versions"] {
  return {
    ui: "1.0 (00000000)",
    api: "1.0 (00000000)"
  };
}

const state = $state<SystemState>({
  versions: createVersions(),
  invites: {
    project: null
  }
});

export const systemStore = {
  get versions(): SystemState["versions"] {
    return state.versions;
  },

  get invites(): SystemState["invites"] {
    return state.invites;
  },

  get getVersions(): SystemState["versions"] {
    return state.versions;
  },

  resetStore(): void {
    state.versions = createVersions();
    state.invites = { project: null };
  },

  async getVersion(): Promise<void> {
    state.versions.ui = `${pkg.version} (${pkg.commit})`;
  }
};
