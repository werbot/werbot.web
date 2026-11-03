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
          <FormInput
            v-model.trim="pageData.base.name"
            name="Name"
            :error="pageData.error['user_name']"
            :disabled="pageData.loading"
            class="mr-5 flex-grow"
          />
          <FormInput
            v-model.trim="pageData.base.surname"
            name="Surname"
            :error="pageData.error['user_surname']"
            :disabled="pageData.loading"
            class="flex-grow"
          />
        </div>
        <FormInput
          v-model.trim="pageData.base.email"
          name="Email"
          :error="pageData.error['email']"
          :disabled="pageData.loading"
          class="mt-5 flex-grow"
        />

        <FormButton class="mt-8" :loading="pageData.loading" @click="onSendInvite()">Send invite</FormButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { FormButton, FormInput, Tabs } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { usePageData } from "@/interface/page";

// API section
import { createProjectToken, tokenInviteLink } from "@/api/token";

type AddInvite_Request = {
  name: string;
  surname: string;
  email: string;
};

// Tabs section
import { tabMenu } from "./tab";

const router = useRouter();
const pageData = usePageData();

const props = defineProps({
  projectId: {
    type: String,
    default: null
  }
});

const onSendInvite = async (): Promise<void> => {
  try {
    pageData.value.loading = true;

    const bodyParams = <AddInvite_Request>{
      name: pageData.value.base.name,
      surname: pageData.value.base.surname,
      email: pageData.value.base.email
    };

    const res = await createProjectToken(props.projectId, bodyParams);
    if (res.data) {
      const token = res.data.result?.token;
      showMessage(token ? `Invitation created: ${tokenInviteLink(token)}` : res.data.message);
      pageData.value.error = {};
      router.push({
        name: "projects-projectId-members-invites",
        params: {
          projectId: props.projectId
        }
      });
    }
    if (res.error) {
      pageData.value.error = res.error.result;
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "New member";
});
</script>
