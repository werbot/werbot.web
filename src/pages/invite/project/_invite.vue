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
import { useAuthStore, useSystemStore } from "@/store";
import { showApiError } from "@/utils";
import { usePageData } from "@/interface/page";

// API section
import { acceptToken, getTokenInfo, isTokenUsable } from "@/api/token";

const router = useRouter();
const authStore = useAuthStore();
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

  if (!props.invite) {
    pageData.value.base.message = "Invite is invalid";
    return;
  }

  systemStore.invites.project = props.invite;

  try {
    const res = await getTokenInfo(props.invite);
    if (res.error) {
      systemStore.invites.project = null;
      showApiError(res.error, [404]);
      pageData.value.base.message = "Invite is invalid";
      return;
    }

    const token = res.data.result;
    if (!isTokenUsable(token)) {
      systemStore.invites.project = null;
      pageData.value.base.message = "Invite is activated";
      return;
    }

    if (!authStore.logged_in) {
      const profileExists = token.profile_exists ?? !!token.profile_id;
      if (profileExists) {
        router.push({ name: "auth-signin", query: { token: props.invite } });
      } else {
        router.push({ name: "auth-signup", params: { token: props.invite } });
      }
      return;
    }

    const acceptRes = await acceptToken(props.invite);
    if (acceptRes.data) {
      systemStore.invites.project = null;
      router.push({ name: "index" });
      return;
    }

    pageData.value.base.message = acceptRes.error?.code === 403 ? "Wrong user" : "Invite is invalid";
    showApiError(acceptRes.error);
  } catch (err) {
    console.error("Unexpected error:", err);
  }
});
</script>
