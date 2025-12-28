<template>
  <div class="artboard red">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ projectStore.getServerNameByID(props.projectId, props.serverId) }}</div>
    </header>

    <Tabs :tabs="tabMenu" />
    <div class="desc">
      This action CANNOT be undone. This will permanently delete the server and if you’d like to use it in the future,
      you will need to added it again.
    </div>

    <div class="content">
      <form @submit.prevent>
        <FormButton class="red" @click="onDelete()">Delete this server</FormButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore, useProjectStore } from "@/store";
import { FormButton, Tabs } from "@/components";
import { showApiError, showMessage } from "@/utils";

// API section
import { api } from "@/api";
import { DeleteScheme_Request as DeleteServer_Request } from "@proto/scheme/scheme";

// Tabs section
import { tabMenu } from "./tab";

const router = useRouter();
const authStore = useAuthStore();
const projectStore = useProjectStore();

const props = defineProps({
  projectId: {
    type: String,
    default: null
  },
  serverId: {
    type: String,
    default: null
  }
});

const onDelete = async (): Promise<void> => {
  try {
    const queryParams = <DeleteServer_Request>{
      user_id: authStore.hasUserID,
      project_id: props.projectId,
      server_id: props.serverId
    };

    const res = await api().DELETE(`/v1/servers`, queryParams);
    if (res.data) {
      showMessage(res.data.message);
      router.push({ name: "projects-projectId-servers" });
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

onMounted(async () => {
  document.title = "Destroy server";
  projectStore.serverNameByID(props.projectId, props.serverId);
});
</script>
