<template>
  <div v-if="pageData.base.message == 'Invite is invalid'" class="artboard red">
    <header>
      <h1>Invitation to join the project</h1>
    </header>
    <div class="desc">The link to join the project is invalid.</div>
  </div>

  <div v-if="pageData.base.message == 'Wrong user'" class="artboard red">
    <header>
      <h1>Invitation to join the project</h1>
    </header>
    <div class="desc">
      <b>Possible reasons for this warning:</b><br />
      1. You are not authorized. To continue -
      <router-link :to="{ name: 'index' }">login</router-link>.<br />
      2. You are authorized, but the invite is not intended for the current account. You must be logged in with the
      correct account (the email address you received the invitation to is the correct account)
    </div>
  </div>

  <div v-if="pageData.base.message == 'Invite is activated'" class="artboard yellow">
    <header>
      <h1>Invitation to join the project</h1>
    </header>
    <div class="desc">
      This prompt is not valid because it has already been used to add the current account to the project.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSystemStore } from "@/store";
import { showApiError } from "@/utils";
import { usePageData } from "@/interface/page";

// API section
import { api } from "@/api";

const router = useRouter();
const systemStore = useSystemStore();
const pageData = usePageData();

const props = defineProps({
  invite: {
    type: String,
    default: null
  }
});

onMounted(async () => {
  document.title = "Invitation to join the project";
  systemStore.invites.project = props.invite;

  try {
    const res = await api().POST(`/v1/members/invite/${props.invite}`);
    if (res.data) {
      pageData.value.base = res.data.result;
      if (pageData.value.base.project_id) {
        systemStore.invites.project = null;
        router.push({ name: "index" });
      }
    }
    if (res.error) {
      showApiError(res.error);
      if (res.error.result == "New user") {
        router.push({ name: "auth-signup" });
      }
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
});
</script>
