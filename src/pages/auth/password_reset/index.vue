<template>
  <img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
  <div class="card w-[22rem]">
    <span class="title">Reset password</span>
    <form v-if="!pageData.base.message" @submit.prevent>
      <FormInput
        v-model.trim="pageData.base.email"
        name="Email"
        :error="authStore.error['email']"
        autocomplete="email"
        :disabled="pageData.loading"
      />
      <div class="form-control pt-8">
        <FormButton :loading="pageData.loading" @click="onSubmit()">Send me message</FormButton>
      </div>
    </form>

    <div v-if="pageData.base.message === 'Verification email has been sent'">
      <span class="message">Bad An email has been sent. It contains a link you must click to reset your password.</span>
      <span class="message">Note: You can only request a new password once within 24 hours.</span>
      <span class="message">If you don't get an email check your spam folder or try again.</span>
    </div>

    <div v-if="pageData.base.message === 'Resend only after 24 hours'">
      <span class="message">In the last 24 hours, you have already been sent a password reset email</span>
      <span class="message">If you don't get an email check your spam folder or try again.</span>
    </div>
  </div>

  <div class="mt-10">
    <p>
      Already have an account?
      <router-link :to="{ name: 'auth-signin' }"> Sign in </router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/store";
import { FormButton, FormInput } from "@/components";
import { showApiError } from "@/utils";
import { usePageData } from "@/interface/page";

// API section
import { api } from "@/api";

const authStore = useAuthStore();
const pageData = usePageData();

const onSubmit = async (): Promise<void> => {
  try {
    pageData.value.loading = true;

    const res = await api().POST(
      `/auth/password_reset`,
      {},
      {
        email: pageData.value.base.email
      }
    );
    if (res.data) {
      pageData.value.base = res.data.result;
      authStore.resetError();
    }
    if (res.error) {
      authStore.setError(res.error.result);
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
});
</script>
