<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-members-invites', params: { projectId: props.projectId } }">
          Invites
        </router-link>
        <span>New member</span>
      </h1>
    </header>
    <Tabs :tabs="tabMenu" />

    <div class="desc">Description</div>
    <div class="content">
      <form @submit.prevent>
        <div class="flex flex-row">
          <FormInput name="Name" v-model.trim="data.name" :error="proxy.$errorStore.errors['user_name']" :disabled="loading" class="mr-5 flex-grow" />
          <FormInput name="Surname" v-model.trim="data.surname" :error="proxy.$errorStore.errors['user_surname']" :disabled="loading" class="flex-grow" />
        </div>
        <FormInput name="Email" v-model.trim="data.email" :error="proxy.$errorStore.errors['email']" :disabled="loading" class="flex-grow" />

        <button type="submit" class="btn mt-8" @click="onSendInvite" :disabled="loading">
          <div v-if="loading">
            <span>Loading...</span>
          </div>
          <span v-else>Send invite</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { Tabs, FormInput } from "@/components";
import { showMessage } from "@/utils/message";

import { postProjectMemberInvite } from "@/api/member/project";
import { AddMemberInvite_Request } from "@proto/member";

// Tabs section
import { tabMenu } from "./tab";

const { proxy } = getCurrentInstance() as any;
const data: any = ref({});
const loading = ref(false);
const router = useRouter();

const props = defineProps({
  projectId: String,
});

const onSendInvite = async () => {
  await postProjectMemberInvite(<AddMemberInvite_Request>{
    owner_id: proxy.$authStore,
    project_id: props.projectId,
    user_name: data.value.name,
    user_surname: data.value.surname,
    email: data.value.email,
  })
    .then((res) => {
      showMessage(res.data.result);
      proxy.$errorStore.$reset();
      router.push({
        name: "projects-projectId-members-invites",
        params: {
          projectId: props.projectId,
        },
      });
    })
    .catch((err) => {
      showMessage(err.response.data.message, "connextError");
    });
};

onBeforeUnmount(() => proxy.$errorStore.$reset());
</script>
