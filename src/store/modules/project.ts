import { defineStore } from "pinia";
import { api } from "@/api";
import { Project_Request } from "@proto/project";
import { ServerNameByID_Request } from "@proto/server";
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
        return state.projects?.[project_id]?.servers[server_id]?.name ?? undefined;
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
          const servers = this.projects[project_id] || {};

          this.projects = {
            ...this.projects,
            [project_id]: {
              info: { ...res.data.result },
              servers: servers || {},
              timestamp: Date.now()
            }
          };
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    },

    async serverNameByID(project_id: string, server_id: string) {
      if (
        this.base?.[project_id]?.[server_id]?.name !== undefined &&
        checkTimestampDifference(this.base[project_id][server_id].timestamp, 3600)
      ) {
        return;
      }

      try {
        const queryParams = <ServerNameByID_Request>{
          //user_id
          project_id: project_id,
          server_id: server_id
        };

        const res = await api(false).GET(`/v1/servers/name`, queryParams);
        if (res.data) {
          const project = this.projects[project_id] || {};
          const servers = project.servers || {};
          const info = project.info || {};

          this.projects = {
            ...this.projects,
            [project_id]: {
              info: { ...info },
              servers: {
                ...servers,
                [server_id]: {
                  name: res.data.result.server_name,
                  timestamp: new Date().getTime()
                }
              },
              timestamp: project.timestamp
            }
          };
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    },

    async updateServerNameByID(project_id: string, server_id: string, new_name: string) {
      this.base[project_id][server_id] = {
        name: new_name,
        timestamp: new Date().getTime()
      };
    }
  }
});
