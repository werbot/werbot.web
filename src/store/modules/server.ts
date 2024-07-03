import { defineStore } from "pinia";
import { api } from "@/api";
import { ServerNameByID_Request } from "@proto/server";
import { checkTimestampDifference } from "@/utils";

interface ServerState {
  [key: string]: {
    [key: string]: {
      name: string;
      timestamp: number;
    };
  };
}

export const useServerStore = defineStore("server", {
  state: () => ({
    base: <ServerState>{}
  }),

  getters: {
    getServerNameByID:
      (state) =>
      (project_id: string, server_id: string): string => {
        return state.base?.[project_id]?.[server_id]?.name ?? undefined;
      }
  },

  actions: {
    resetStore() {
      this.$reset();
    },

    async serverNameByID(project_id: string, server_id: string) {
      if (
        this.base?.[project_id]?.[server_id]?.name !== undefined &&
        checkTimestampDifference(this.base[project_id][server_id].timestamp)
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
          this.base = {
            ...this.base,
            [project_id]: {
              ...this.base[project_id],
              [server_id]: {
                name: res.data.result.server_name,
                timestamp: new Date().getTime()
              }
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
