import type { useAuthStore, useProjectStore, useSystemStore } from "@/store";

declare module "vue" {
  interface ComponentCustomProperties {
    $authStore: ReturnType<typeof useAuthStore>;
    $projectStore: ReturnType<typeof useProjectStore>;
    $systemStore: ReturnType<typeof useSystemStore>;
  }
}

export {};
