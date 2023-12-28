<template>
  <div class="artboard-red">
    <header>
      <h1>Destroy this project</h1>
    </header>
    <Tabs :tabs="tabMenu" />
    <div class="desc">This operation will permanently delete your project. It CAN NOT be undone.</div>

    <div class="artboard-content">
      <form @submit.prevent>
        <div class="my-6">
          <button type="submit" class="btn" @click="onDelete">
            <span>Delete this project</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { deleteProject } from "@/api/project";
import {
  DeleteProject_Request,
} from "@proto/project";
import { Tabs } from "@/components";
import { showMessage } from "@/utils/message";

// Tabs section
import { tabMenu } from "./tab";

const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const props = defineProps({
  projectId: String,
});

const onDelete = async () => {
  await deleteProject(<DeleteProject_Request>{
    project_id: props.projectId,
    owner_id: proxy.$authStore.hasUserID,
  }).then((res) => {
    showMessage(res.data.message);
    router.push({ name: "projects" });
  });
};
</script>
