<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects' }"> Projects list </router-link>
      </h1>
      <div class="breadcrumbs">New project</div>
    </header>

    <div class="desc">Create a new project where you can add new servers and invite members.</div>

    <div class="content">
      <form @submit.prevent>
        <div class="flex flex-row">
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

        <FormButton class="mt-8" :loading="pageData.loading" @click="onSubmit()">Add project</FormButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { FormButton, FormInput } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { defaultPageData, PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { AddProject_Request } from "@proto/project";

const router = useRouter();
const pageData = ref<PageData>(defaultPageData);

const onSubmit = async (): Promise<void> => {
  try {
    pageData.value.loading = true;

    const bodyParams = <AddProject_Request>{
      title: pageData.value.base.title,
      login: pageData.value.base.login
    };

    const res = await api().POST(`/v1/projects`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.error = {};
      const projectId = res.data.result.project_id;
      router.push({ name: "projects-projectId", params: { projectId } });
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
  document.title = "New project";
});
</script>
