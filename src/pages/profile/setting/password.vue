<template>
  <div class="artboard">
    <header>
      <h1>Password update</h1>
    </header>

    <Tabs :tabs="tabMenu" />

    <div class="content">
      <form @submit.prevent>
        <div class="flex flex-row">
          <FormInput
            v-model.trim="pageData.base.old_password"
            name="Current Password"
            :error="pageData.error['old_password']"
            :disabled="pageData.loading"
            class="w-80"
            type="password"
            autocomplete="current-password"
          />
        </div>

        <div class="mt-5 flex flex-row">
          <FormInput
            v-model.trim="pageData.base.new_password"
            name="New password"
            :error="pageData.error['new_password']"
            :disabled="pageData.loading"
            class="mr-5 flex-grow"
            type="password"
            autocomplete="new-password"
          />
          <FormInput
            v-model="pageData.base.new_password2"
            name="Re-Type New Password"
            :error="pageData.error['new_password2']"
            :disabled="pageData.loading"
            class="flex-grow"
            type="password"
            autocomplete="new-password"
          />
        </div>

        <FormButton class="mt-8" :loading="pageData.loading" @click="onUpdatePassword()">Update password</FormButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store";
import { FormButton, FormInput, Tabs } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { defaultPageData, PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { UpdatePassword_Request } from "@proto/user";

// Tabs section
import { tabMenu } from "./tab";

const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const onUpdatePassword = async (): Promise<void> => {
  try {
    pageData.value.error = {};
    const { old_password, new_password, new_password2 } = pageData.value.base;

    if (!old_password) {
      pageData.value.error["old_password"] = "Weak password";
      return;
    }

    if (!new_password || new_password.length < 8) {
      pageData.value.error["new_password"] = pageData.value.error["new_password2"] = "Weak password";
      return;
    }

    if (new_password !== new_password2) {
      pageData.value.error["new_password"] = pageData.value.error["new_password2"] = "Passwords do not match";
      return;
    }

    if (old_password == new_password && new_password == new_password2) {
      pageData.value.error["new_password"] = pageData.value.error["new_password2"] =
        "The password must be different from the current one";
      return;
    }

    pageData.value.loading = true;

    const bodyParams = <UpdatePassword_Request>{
      user_id: authStore.hasUserID,
      old_password: pageData.value.base.old_password,
      new_password: pageData.value.base.new_password
    };

    const res = await api().UPDATE(`/v1/users/password`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.base.old_password = "";
      pageData.value.base.new_password = "";
      pageData.value.base.new_password2 = "";
      authStore.refreshToken();
      pageData.value.error = {};
    }
    if (res.error) {
      if (res.error.result === "Password is not valid") {
        pageData.value.error["old_password"] = res.error.result;
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
  document.title = "Password update";
});
</script>
