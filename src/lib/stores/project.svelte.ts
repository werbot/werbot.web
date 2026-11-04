import { api } from "$lib/api";
import { checkTimestampDifference } from "$lib/utils";

export interface ServerInfo {
  name: string;
  timestamp: number;
}

export interface ProjectInfoState {
  info: any;
  servers: Record<string, ServerInfo>;
  timestamp: number;
}

export interface ProjectState {
  [key: string]: ProjectInfoState;
}

const state = $state<{ projects: ProjectState }>({
  projects: {}
});

export const projectStore = {
  get projects(): ProjectState {
    return state.projects;
  },

  getProjectInfo(project_id: string): any {
    return state.projects?.[project_id]?.info ?? undefined;
  },

  getServerNameByID(project_id: string, server_id: string): string {
    return state.projects?.[project_id]?.servers?.[server_id]?.name ?? undefined;
  },

  resetStore(): void {
    state.projects = {};
  },

  async projectInfo(project_id: string): Promise<void> {
    if (
      state.projects?.[project_id]?.timestamp &&
      checkTimestampDifference(state.projects[project_id].timestamp, 3600)
    ) {
      return;
    }

    try {
      const res = await api().GET(`/v1/projects/${project_id}`);
      if (res.data) {
        const project = state.projects?.[project_id];

        state.projects = {
          ...state.projects,
          [project_id]: {
            info: { ...res.data.result },
            servers: project?.servers ?? {},
            timestamp: Date.now()
          }
        };
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  },

  async serverNameByID(project_id: string, server_id: string): Promise<void> {
    const project = state.projects?.[project_id];
    const servers = project?.servers ?? {};

    if (servers?.[server_id]?.name !== undefined && checkTimestampDifference(servers[server_id].timestamp, 3600)) {
      return;
    }

    try {
      const res = await api(false).GET(`/v1/schemes/${project_id}/${server_id}`);
      if (res.data) {
        const server = res.data.result;

        state.projects = {
          ...state.projects,
          [project_id]: {
            info: { ...(project?.info ?? {}) },
            servers: {
              ...servers,
              [server_id]: {
                name: server.title ?? server.alias ?? "",
                timestamp: Date.now()
              }
            },
            timestamp: project?.timestamp ?? Date.now()
          }
        };
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  },

  async updateServerNameByID(project_id: string, server_id: string, new_name: string): Promise<void> {
    const project = state.projects?.[project_id];

    if (!project) {
      return;
    }

    state.projects = {
      ...state.projects,
      [project_id]: {
        ...project,
        servers: {
          ...project.servers,
          [server_id]: {
            name: new_name,
            timestamp: Date.now()
          }
        }
      }
    };
  }
};
