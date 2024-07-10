<template>
  <div class="artboard red">
    <header>
      <h1>Destroy your profile</h1>
    </header>
    <Tabs :tabs="tabMenu" />
    <div class="desc">This operation will permanently delete your user account. It CAN NOT be undone.</div>

    <div class="content">
      <form @submit.prevent>
        <div class="flex flex-row">
          <FormInput
            v-model="pageData.base.password"
            name="Password"
            :error="pageData.error['password']"
            :disabled="pageData.loading"
            class="w-80"
            type="password"
            autocomplete="current-password"
          />
        </div>

        <FormButton class="red mt-8" :loading="pageData.loading" @click="onDelete()">
          Send me email for delete
        </FormButton>
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
import { tabMenu } from "@/pages/profile/setting/tab";

const authStore = useAuthStore();
const pageData = usePageData();

const onDelete = async (): Promise<void> => {
  if (!pageData.value.base.password) {
    pageData.value.error["password"] = "Password required";
    return;
  }

  if (pageData.value.base.password.length < 8) {
    pageData.value.error["password"] = "Weak password";
    return;
  }

  // step 1
  try {
    pageData.value.loading = true;

    const bodyParams = {
      user_id: authStore.hasUserID,
      password: pageData.value.base.password
    };

    const res = await api().DELETE(`/v1/users`, {}, bodyParams);
    if (res.data) {
      pageData.value.base.password = "";
      pageData.value.error = {};
      showMessage(res.data.message);
      authStore.refreshToken();
    }
    if (res.error) {
      if (res.error.result === "Password is not valid") {
        pageData.value.error["password"] = res.error.result;
      }
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Destroy profile";
});
</script>
