<template>
  <div class="artboard">
    <header>
      <h1>Setting</h1>
    </header>
    <Tabs :tabs="tabMenu" />

    <div class="content">
      <form @submit.prevent>
        <div class="mb-5 flex flex-row">
          <FormInput
            v-model="pageData.base.title"
            name="Title"
            :error="pageData.error['title']"
            class="mr-5 flex-grow"
          />
          <FormInput
            v-model.trim="pageData.base.login"
            name="Login"
            :error="pageData.error['login']"
            class="flex-grow"
          />
        </div>

        <div class="mt-6">
          <div class="flex-none">
            <FormButton class="mr-5" :loading="pageData.loading" @click="onUpdate()">Update</FormButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store";
import { FormButton, FormInput, Tabs } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { defaultPageData, PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { Project_Request, UpdateProject_Request } from "@proto/project";

// Tabs section
import { tabMenu } from "./tab";

const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const props = defineProps({
  projectId: {
    type: String,
    default: null
  }
});

const getData = async (): Promise<void> => {
  try {
    const queryParams = <Project_Request>{
      project_id: props.projectId,
      owner_id: authStore.hasUserID
    };

    const res = await api().GET(`/v1/projects`, queryParams);
    if (res.data) {
      pageData.value.base = res.data.result;
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const onUpdate = async (): Promise<void> => {
  try {
    pageData.value.loading = true;

    const bodyParams = <UpdateProject_Request>{
      project_id: props.projectId,
      owner_id: authStore.hasUserID,
      title: pageData.value.base.title,
      login: pageData.value.base.login
    };

    const res = await api().UPDATE(`/v1/projects`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.error = {};
    }
    if (res.error) {
      pageData.value.error = res.error.result;
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Project setting";
  await getData();
});
</script>
