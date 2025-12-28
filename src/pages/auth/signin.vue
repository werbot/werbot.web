<template>
  <img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
  <div class="card w-[22rem]">
    <span class="title">Sign In</span>
    <form @submit.prevent>
      <FormInput
        v-model.trim="pageData.base.email"
        name="Email"
        :error="authStore.error?.['email']"
        autocomplete="username"
        :disabled="pageData.loading"
      />
      <FormInput
        v-model.trim="pageData.base.password"
        name="Password"
        :error="authStore.error?.['password']"
        type="password"
        autocomplete="current-password"
        :disabled="pageData.loading"
        class="mt-5"
      />
      <div class="form-control pt-8">
        <FormButton :loading="pageData.loading" @click="onSubmit()">Login</FormButton>
      </div>
    </form>
  </div>

  <div class="mt-10">
    <router-link :to="{ name: 'auth-password_reset' }" class="mt-2">Forgot password?</router-link>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore, useSystemStore } from "@/store";
import { FormButton, FormInput } from "@/components";
import { SignIn_Request } from "@proto/account";
import { usePageData } from "@/interface/page";

const router = useRouter();
const authStore = useAuthStore();
const systemStore = useSystemStore();
const pageData = usePageData();

const onSubmit = async (): Promise<void> => {
  try {
    pageData.value.loading = true;

    await authStore.login(<SignIn_Request>{
      email: pageData.value.base.email,
      password: pageData.value.base.password
    });

    if (systemStore.invites.project) {
      const invite = systemStore.invites.project;
      router.push({ name: "invite-project-invite", params: { invite } });
    } else {
      router.push({ name: "index" });
    }
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Sign In";

  if (authStore.logged_in) {
    router.push({ name: "index" });
  }
});
</script>
