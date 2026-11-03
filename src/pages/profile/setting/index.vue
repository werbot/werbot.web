<template>
  <div class="artboard">
    <header>
      <h1>Profile setting</h1>
    </header>
    <Tabs :tabs="tabMenu" />

    <div class="content">
      <form @submit.prevent>
        <div class="flex flex-row">
          <FormInput
            v-model.trim="authStore.user.email"
            name="Email"
            :error="pageData.error['info.email']"
            :disabled="pageData.loading"
            class="flex-grow"
          />
        </div>

        <div class="mt-5 flex flex-row">
          <FormInput
            v-model.trim="authStore.user.name"
            name="Name"
            :error="pageData.error['info.name']"
            :disabled="pageData.loading"
            class="mr-5 flex-grow"
          />
          <FormInput
            v-model.trim="authStore.user.surname"
            name="Surname"
            :error="pageData.error['info.surname']"
            :disabled="pageData.loading"
            class="flex-grow"
          />
        </div>

        <FormButton class="mt-8" :loading="pageData.loading" @click="onUpdateProfile()">Update profile</FormButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/store";
import { FormButton, FormInput, Tabs } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { usePageData } from "@/interface/page";

// API section
import { api } from "@/api";

// Tabs section
import { tabMenu } from "./tab";

const authStore = useAuthStore();
const pageData = usePageData();

const onUpdateProfile = async (): Promise<void> => {
  try {
    pageData.value.loading = true;

    const fields = {
      email: authStore.user.email,
      name: authStore.user.name,
      surname: authStore.user.surname
    };

    const responses = await Promise.all(
      Object.entries(fields)
        .filter(([, value]) => Boolean(value))
        .map(([field, value]) => api().UPDATE(`/v1/profiles`, {}, { [field]: value }))
    );
    const failed = responses.find((res) => res.error);

    if (!failed) {
      showMessage("Profile updated");
      pageData.value.error = {};
      return;
    }

    const result = failed.error.result;
    if (result && typeof result === "object") {
      pageData.value.error = {
        "info.email": result.email ?? null,
        "info.name": result.name ?? null,
        "info.surname": result.surname ?? null
      };
    }
    showApiError(failed.error);
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Profile setting";
});
</script>
