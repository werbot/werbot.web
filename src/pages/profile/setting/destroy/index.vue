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
          <FormInput name="Password" v-model="data.password" :error="proxy.$errorStore.errors['password']" :disabled="loading" class="w-80" type="password"
            autocomplete="current-password" />
        </div>

        <button type="submit" class="btn mt-8" @click="onDelete" :disabled="loading">
          <div v-if="loading">
            <span>Loading...</span>
          </div>
          <span v-else>Send me email for delete</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import { getUser, deleteUserStep1 } from "@/api/user";
import {
  User_Request,
  DeleteUser_Request,
} from "@proto/user";
import { FormInput, Tabs } from "@/components";
import { showMessage } from "@/utils/message";

// Tabs section
import { tabMenu } from "../tab";

const { proxy } = getCurrentInstance() as any;
const data: any = ref({});
const loading = ref(false);

const onDelete = async () => {
  proxy.$errorStore.$reset();

  if (!data.value.password) {
    proxy.$errorStore.errors["password"] = "Password required";
    return;
  }

  if (data.value.password.length < 8) {
    proxy.$errorStore.errors["password"] = "Weak password";
    return;
  }

  await deleteUserStep1(<DeleteUser_Request>{
    user_id: proxy.$authStore.hasUserID,
    request: {
      password: data.value.password,
    },
  }).then((res) => {
    showMessage(res.data.message);
    proxy.$authStore.refreshToken();

    data.value.password = "";
    proxy.$errorStore.$reset();
  });
};

onMounted(async () => {
  document.title = "Destroy profile";

  await getUser(<User_Request>{
    user_id: proxy.$authStore.hasUserID,
  }).then((res) => {
    data.value = res.data.result;
  });
});

onBeforeUnmount(() => proxy.$errorStore.$reset());
</script>
