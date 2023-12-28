<template>
  <div class="artboard">
    <header>
      <h1>Profile setting</h1>
    </header>
    <Tabs :tabs="tabMenu" />

    <div class="artboard-content">
      <form @submit.prevent>
        <div class="mb-5 flex flex-row">
          <FormInput name="Email" v-model.trim="data.email" :error="proxy.$errorStore.errors['email']" :disabled="loading" class="flex-grow" />
        </div>

        <div class="mb-5 flex flex-row">
          <FormInput name="Name" v-model.trim="data.name" :error="proxy.$errorStore.errors['name']" :disabled="loading" class="mr-5 flex-grow" />
          <FormInput name="Surname" v-model.trim="data.surname" :error="proxy.$errorStore.errors['surname']" :disabled="loading" class="flex-grow" />
        </div>

        <div class="my-6">
          <button type="submit" class="btn" @click="onUpdateProfile" :disabled="loading">
            <div v-if="loading">
              <span>Loading...</span>
            </div>
            <span v-else>Update profile</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import { getUser, updateUser } from "@/api/user";
import {
  User_Request,
  UpdateUser_Request,
  UpdateUser_Info,
} from "@proto/user";
import { FormInput, Tabs } from "@/components";
import { showMessage } from "@/utils/message";

// Tabs section
import { tabMenu } from "./tab";

const { proxy } = getCurrentInstance() as any;
const data: any = ref({});
const loading = ref(false);

const onUpdateProfile = async () => {
  await updateUser(<UpdateUser_Request>{
    user_id: proxy.$authStore.hasUserID,
    request: {
      info: <UpdateUser_Info>{
        email: data.value.email,
        name: data.value.name,
        surname: data.value.surname,
      },
    },
  })
    .then((res) => {
      showMessage(res.data.message);
      proxy.$errorStore.$reset();
    })
    .catch((err) => {
      showMessage(err.response.data.message, "connextError");
    });
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
