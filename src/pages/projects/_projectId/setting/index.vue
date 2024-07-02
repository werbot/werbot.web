<template>
  <div class="artboard">
    <header>
      <h1>Setting</h1>
    </header>
    <Tabs :tabs="tabMenu" />

    <div class="content">
      <form @submit.prevent>
        <div class="mb-5 flex flex-row">
          <FormInput name="Title" v-model="pageData.base.title" :error="pageData.error['title']" class="mr-5 flex-grow" />
          <FormInput name="Login" v-model.trim="pageData.base.login" :error="pageData.error['login']" class="flex-grow" />
        </div>

        <div class="mt-6">
          <div class="flex-none">
            <FormButton @click="onUpdate()" class="mr-5" :loading="pageData.loading">Update</FormButton>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store";
import { Tabs, FormInput, FormButton } from "@/components";
import { showMessage } from "@/utils";
import { PageData, defaultPageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { Project_Request, UpdateProject_Request } from "@proto/project";

// Tabs section
import { tabMenu } from "./tab";

const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const props = defineProps({
  projectId: String,
});

const getData = async () => {
  try {
    const queryParams = <Project_Request>{
      project_id: props.projectId,
      owner_id: authStore.hasUserID,
    };

    const res = await api().GET(`/v1/projects`, queryParams);
    if (res.data) {
      pageData.value.base = res.data.result;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

const onUpdate = async () => {
  try {
    pageData.value.loading = true;

    const bodyParams = <UpdateProject_Request>{
      project_id: props.projectId,
      owner_id: authStore.hasUserID,
      title: pageData.value.base.title,
      login: pageData.value.base.login,
    };

    const res = await api().UPDATE(`/v1/projects`, {}, bodyParams)
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.error = {};
    }
    if (res.error) {
      pageData.value.error = res.error.result;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Project setting";
  await getData();
})
</script>
