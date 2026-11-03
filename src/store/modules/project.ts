import { defineStore } from "pinia";
import { api } from "@/api";
import { Project_Request } from "@proto/project/message";
import { checkTimestampDifference } from "@/utils";

interface ProjectState {
  [key: string]: {
    info: any;
    servers: {
      [key: string]: {
        name: string;
        timestamp: number;
      };
    };
    timestamp: number;
  };
}

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: <ProjectState>{}
  }),

  getters: {
    getProjectInfo:
      (state) =>
      (project_id: string): string => {
        return state.projects?.[project_id]?.info ?? undefined;
      },

    getServerNameByID:
      (state) =>
      (project_id: string, server_id: string): string => {
        return state.projects?.[project_id]?.servers?.[server_id]?.name ?? undefined;
      }
  },

  actions: {
    resetStore() {
      this.$reset();
    },

    async projectInfo(project_id: string) {
      if (
        this.projects?.[project_id]?.timestamp &&
        checkTimestampDifference(this.projects[project_id].timestamp, 3600)
      ) {
        return;
      }

      try {
        const queryParams = <Project_Request>{ project_id: project_id };
        const res = await api().GET(`/v1/projects`, queryParams);
        if (res.data) {
          const project = this.projects?.[project_id];

          this.projects = {
            ...this.projects,
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

    async serverNameByID(project_id: string, server_id: string) {
      const project = this.projects?.[project_id];
      const servers = project?.servers ?? {};

      if (servers?.[server_id]?.name !== undefined && checkTimestampDifference(servers[server_id].timestamp, 3600)) {
        return;
      }

      try {
        const res = await api(false).GET(`/v1/schemes/${project_id}/${server_id}`);
        if (res.data) {
          const server = res.data.result;

          this.projects = {
            ...this.projects,
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

    async updateServerNameByID(project_id: string, server_id: string, new_name: string) {
      const project = this.projects?.[project_id];

      if (!project) {
        return;
      }

      this.projects = {
        ...this.projects,
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
  }
});
