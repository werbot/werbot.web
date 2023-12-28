<template>
  <div class="artboard">
    <header>
      <h1>Password update</h1>
    </header>

    <Tabs :tabs="tabMenu" />

    <div class="artboard-content">
      <form @submit.prevent>
        <FormInput name="Current Password" v-model.trim="data.old_password" :error="proxy.$errorStore.errors['old_password']" :disabled="loading" class="w-80" type="password"
          autocomplete="current-password" />

        <div class="mb-5 flex flex-row">
          <FormInput name="New password" v-model.trim="data.new_password" :error="proxy.$errorStore.errors['new_password']" :disabled="loading" class="mr-5 flex-grow" type="password"
            autocomplete="new-password" />
          <FormInput name="Re-Type New Password" v-model="data.new_password2" :error="proxy.$errorStore.errors['new_password2']" :disabled="loading" class="flex-grow" type="password"
            autocomplete="new-password" />
        </div>

        <div class="my-6">
          <button type="submit" class="btn" @click="onUpdatePassword" :disabled="loading">
            <div v-if="loading">
              <span>Loading...</span>
            </div>
            <span v-else>Update password</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import { getUser, updatePassword } from "@/api/user";
import {
  User_Request,
  UpdatePassword_Request,
} from "@proto/user";
import { FormInput, Tabs } from "@/components";
import { showMessage } from "@/utils/message";

// Tabs section
import { tabMenu } from "./tab";

const { proxy } = getCurrentInstance() as any;
const data: any = ref({});
const loading = ref(false);

const onUpdatePassword = async () => {
  proxy.$errorStore.$reset();

  if (!data.value.old_password) {
    proxy.$errorStore.errors["old_password"] = "Weak password";
    return;
  }

  if (data.value.new_password.length < 8 || !data.value.new_password) {
    proxy.$errorStore.errors["new_password"] = proxy.$errorStore.errors["new_password2"] =
      "Weak password";
    return;
  }

  if (data.value.new_password != data.value.new_password2) {
    proxy.$errorStore.errors["new_password"] = proxy.$errorStore.errors["new_password2"] =
      "Passwords do not match";
    return;
  }

  if (data.value.old_password && data.value.new_password) {
    await updatePassword(<UpdatePassword_Request>{
      user_id: proxy.$authStore.hasUserID,
      old_password: data.value.old_password,
      new_password: data.value.new_password,
    })
      .then((res) => {
        showMessage(res.data.message);
        proxy.$authStore.refreshToken();

        data.value.old_password = "";
        data.value.new_password = "";
        data.value.new_password2 = "";
        proxy.$errorStore.$reset();
      })
      .catch((err) => {
        proxy.$errorStore.errors["old_password"] = err.response.data.message;
      });
  }
};


onMounted(async () => {
  await getUser(<User_Request>{
    user_id: proxy.$authStore.hasUserID,
  }).then((res) => {
    data.value = res.data.result;
  });
});

onBeforeUnmount(() => proxy.$errorStore.$reset());
</script>
