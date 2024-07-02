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
          <FormInput name="Name" v-model.trim="pageData.base.name" :error="pageData.error['user_name']" :disabled="pageData.loading" class="mr-5 flex-grow" />
          <FormInput name="Surname" v-model.trim="pageData.base.surname" :error="pageData.error['user_surname']" :disabled="pageData.loading" class="flex-grow" />
        </div>
        <FormInput name="Email" v-model.trim="pageData.base.email" :error="pageData.error['email']" :disabled="pageData.loading" class="flex-grow mt-5" />

        <FormButton class="mt-8" @click="onSendInvite()" :loading="pageData.loading">Send invite</FormButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import { Tabs, FormInput, FormButton } from "@/components";
import { showMessage } from "@/utils";
import { PageData, defaultPageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { AddMemberInvite_Request } from "@proto/member";

// Tabs section
import { tabMenu } from "./tab";

const router = useRouter();
const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const props = defineProps({
  projectId: String,
});

const onSendInvite = async () => {
  try {
    pageData.value.loading = true;

    const bodyParams = <AddMemberInvite_Request>{
      owner_id: authStore.hasUserID,
      project_id: props.projectId,
      user_name: pageData.value.base.name,
      user_surname: pageData.value.base.surname,
      email: pageData.value.base.email,
    };

    const res = await api().POST(`/v1/members/invite`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.result);
      pageData.value.error = {};
      router.push({
        name: "projects-projectId-members-invites",
        params: {
          projectId: props.projectId,
        },
      });
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
  document.title = "New member";
});
</script>
