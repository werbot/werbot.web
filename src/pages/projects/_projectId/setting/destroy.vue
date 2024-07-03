<template>
  <div class="artboard red">
    <header>
      <h1>Destroy this project</h1>
    </header>
    <Tabs :tabs="tabMenu" />
    <div class="desc">This operation will permanently delete your project. It CAN NOT be undone.</div>

    <div class="content">
      <form @submit.prevent>
        <FormButton class="red" @click="onDelete()">Delete this project</FormButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import { Tabs, FormButton } from "@/components";
import { showMessage } from "@/utils";

// API section
import { api } from "@/api";
import { DeleteProject_Request } from "@proto/project";

// Tabs section
import { tabMenu } from "./tab";

const authStore = useAuthStore();
const router = useRouter();

const props = defineProps({
  projectId: {
    type: String,
    default: null
  }
});

const onDelete = async (): Promise<void> => {
  try {
    const queryParams = <DeleteProject_Request>{
      project_id: props.projectId,
      owner_id: authStore.hasUserID
    };

    const res = await api().DELETE(`/v1/projects`, queryParams);
    if (res.data) {
      showMessage(res.data.message);
      router.push({ name: "projects" });
    }
    if (res.error) {
      showMessage(res.error.result, "connextError");
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

onMounted(async () => {
  document.title = "Destroy project";
});
</script>
