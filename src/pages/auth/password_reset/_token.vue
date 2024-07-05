<template>
  <img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
  <div class="card w-[22rem]">
    <span class="title">Reset password</span>

    <form @submit.prevent>
      <FormInput
        v-model.trim="pageData.base.password"
        name="New password"
        type="password"
        autocomplete="new-password"
        :error="authStore.error['password']"
        :disabled="pageData.loading"
      />
      <FormInput
        v-model.trim="pageData.base.password2"
        name="Repeat password"
        type="password"
        autocomplete="new-password"
        :error="authStore.error['password2']"
        :disabled="pageData.loading"
        class="mt-5"
      />
      <div class="form-control pt-8">
        <FormButton :loading="pageData.loading" @click="onSubmit()">Save new password</FormButton>
      </div>
    </form>
  </div>

  <div class="mt-10">
    <p>
      Already have an account?
      <router-link :to="{ name: 'auth-signin' }"> Sign in </router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import { FormButton, FormInput } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { defaultPageData, PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { ResetPassword_Password } from "@proto/account";

const router = useRouter();
const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const props = defineProps({
  token: {
    type: String,
    default: null
  }
});

const onSubmit = async (): Promise<void> => {
  let errorMessage: string | null = null;
  if (pageData.value.base.password !== pageData.value.base.password2) {
    errorMessage = "Passwords do not match";
  } else if (pageData.value.base.password.length < 8) {
    errorMessage = "Weak password";
  }

  if (errorMessage) {
    authStore.error = <Record<string, null>>{
      password: errorMessage,
      password2: errorMessage
    };
    return;
  }

  authStore.resetError();

  try {
    pageData.value.loading = true;

    const res = await api().POST(
      `/auth/password_reset`,
      {},
      {
        password: <ResetPassword_Password>{
          password: pageData.value.base.password,
          token: props.token
        }
      }
    );
    if (res.data) {
      showMessage(res.data.result.message);
      router.push({ name: "auth-signin" });
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Reset password";

  try {
    const res = await api().GET(`/auth/password_reset/${props.token!}`);
    if (res.error) {
      if (res.error && ["Not Found", "Token is invalid"].includes(res.error.message)) {
        router.push({ name: "auth-signin" });
      }
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
});
</script>
