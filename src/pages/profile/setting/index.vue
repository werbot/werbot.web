<template>
  <div class="artboard">
    <header>
      <h1>Profile setting</h1>
    </header>
    <Tabs :tabs="tabMenu" />

    <div class="content">
      <form @submit.prevent>
        <div class="flex flex-row">
          <FormInput name="Email" v-model.trim="authStore.user.email" :error="pageData.error['info.email']" :disabled="pageData.loading" class="flex-grow" />
        </div>

        <div class="flex flex-row mt-5">
          <FormInput name="Name" v-model.trim="authStore.user.name" :error="pageData.error['info.name']" :disabled="pageData.loading" class="mr-5 flex-grow" />
          <FormInput name="Surname" v-model.trim="authStore.user.surname" :error="pageData.error['info.surname']" :disabled="pageData.loading" class="flex-grow" />
        </div>

        <FormButton class="mt-8" @click="onUpdateProfile()" :loading="pageData.loading">Update profile</FormButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store";
import { FormInput, Tabs, FormButton } from "@/components";
import { showMessage } from "@/utils";
import { PageData, defaultPageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { UpdateUser_Info } from "@proto/user";

// Tabs section
import { tabMenu } from "./tab";

const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const onUpdateProfile = async () => {
  try {
    pageData.value.loading = true;

    const bodyParams = {
      user_id: authStore.hasUserID,
      info: <UpdateUser_Info>{
        email: authStore.user.email,
        name: authStore.user.name,
        surname: authStore.user.surname,
      },
    };

    const res = await api().UPDATE(`/v1/users`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.error = {};
    }
    if (res.error) {
      pageData.value.error = res.error.result
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Profile setting";
});
</script>
