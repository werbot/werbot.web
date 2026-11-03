<template>
  <img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
  <div class="card w-[22rem]">
    <span class="title">Sign Up</span>
    <div v-if="pageData.base.message" class="desc">{{ pageData.base.message }}</div>
    <form @submit.prevent>
      <FormInput v-model.trim="pageData.base.email" name="Email" placeholder="user@werbot.net" disabled class="mt-5" />
      <FormInput
        v-model.trim="pageData.base.password"
        name="Password"
        :error="pageData.error['password']"
        type="password"
        autocomplete="current-password"
        :disabled="pageData.loading || !pageData.tmp.canRegister"
        class="mt-5"
      />
      <FormInput
        v-model.trim="pageData.base.password2"
        name="Re-Type Password"
        :error="pageData.error['password2']"
        type="password"
        autocomplete="current-password"
        :disabled="pageData.loading || !pageData.tmp.canRegister"
        class="mt-5"
      />

      <div class="form-control pt-8">
        <FormButton :loading="pageData.loading" :disabled="!pageData.tmp.canRegister" @click="onSubmit()"
          >Registration</FormButton
        >
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import { FormButton, FormInput } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { usePageData } from "@/interface/page";

// API section
import { acceptToken, getTokenInfo, isTokenUsable, registerToken, tokenProfile } from "@/api/token";

const router = useRouter();
const authStore = useAuthStore();
const pageData = usePageData();

const props = defineProps({
  token: {
    type: String,
    default: null
  }
});

const onSubmit = async (): Promise<void> => {
  if (!props.token || !pageData.value.tmp.canRegister) {
    return;
  }

  pageData.value.error = {};

  if (!pageData.value.base.password || pageData.value.base.password.length < 8) {
    pageData.value.error["password"] = "Weak password";
    return;
  }

  if (pageData.value.base.password !== pageData.value.base.password2) {
    pageData.value.error["password2"] = "Passwords do not match";
    return;
  }

  try {
    pageData.value.loading = true;

    const res = await (Number(pageData.value.tmp.tokenSection) === 1
      ? registerToken(props.token, pageData.value.base.password)
      : acceptToken(props.token, { password: pageData.value.base.password }));
    if (res.data) {
      showMessage(res.data.message ?? "Registration completed");
      router.push({ name: "auth-signin" });
      return;
    }

    if (res.error) {
      if (res.error.result && typeof res.error.result === "object") {
        pageData.value.error = res.error.result;
      } else {
        pageData.value.base.message = res.error.result ?? res.error.message;
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
  document.title = "Sign Up";

  if (authStore.logged_in) {
    router.push({ name: "index" });
    return;
  }

  if (!props.token) {
    pageData.value.base.message = "Registration is available by invitation only.";
    return;
  }

  try {
    const res = await getTokenInfo(props.token);
    if (res.error) {
      showApiError(res.error, [404]);
      pageData.value.base.message = "This invitation link is invalid or has expired.";
      return;
    }

    const token = res.data.result;
    if (!isTokenUsable(token)) {
      pageData.value.base.message = "This invitation has already been used.";
      return;
    }

    const profileExists = token.profile_exists ?? !!token.profile_id;
    if (profileExists) {
      router.push({ name: "auth-signin", query: { token: props.token } });
      return;
    }

    pageData.value.tmp.tokenSection = Number(token.section);
    pageData.value.base.email = tokenProfile(token).email;
    pageData.value.tmp.canRegister = true;
  } catch (err) {
    console.error("Unexpected error:", err);
  }
});
</script>
