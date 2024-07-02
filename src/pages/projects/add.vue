<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects' }">
          Projects list
        </router-link>
      </h1>
      <div class="breadcrumbs">New project</div>
    </header>

    <div class="desc">Create a new project where you can add new servers and invite members.</div>

    <div class="content">
      <form @submit.prevent>
        <div class="flex flex-row">
          <FormInput name="Title" v-model="pageData.base.title" :error="pageData.error['title']" class="mr-5 flex-grow" />
          <FormInput name="Login" v-model.trim="pageData.base.login" :error="pageData.error['login']" class="flex-grow" />
        </div>

        <FormButton class="mt-8" @click="onSubmit()" :loading="pageData.loading">Add project</FormButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { FormInput, FormButton } from "@/components";
import { showMessage } from "@/utils";
import { PageData, defaultPageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { AddProject_Request } from "@proto/project";

const router = useRouter();
const pageData = ref<PageData>(defaultPageData);

const onSubmit = async () => {
  try {
    pageData.value.loading = true;

    const bodyParams = <AddProject_Request>{
      title: pageData.value.base.title,
      login: pageData.value.base.login,
    };

    const res = await api().POST(`/v1/projects`, {}, bodyParams)
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.error = {};
      const projectId = res.data.result.project_id;
      router.push({ name: "projects-projectId", params: { projectId } });
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
  document.title = "New project";
});
</script>
