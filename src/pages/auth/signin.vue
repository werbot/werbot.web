<template>
  <img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
  <div class="card w-[22rem]">
    <span class="title">Sign In</span>
    <form @submit.prevent>
      <FormInput name="Email" v-model.trim="pageData.base.email" :error="authStore.error['email']" autocomplete="username" :disabled="pageData.loading" />
      <FormInput name="Password" v-model.trim="pageData.base.password" :error="authStore.error['password']" type="password" autocomplete="current-password"
        :disabled="pageData.loading" class="mt-5" />
      <div class="form-control pt-8">
        <FormButton @click="onSubmit()" :loading="pageData.loading">Login</FormButton>
      </div>
    </form>
  </div>

  <div class="mt-10">
    <router-link :to="{ name: 'auth-password_reset' }" class="mt-2">Forgot password?</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore, useSystemStore } from "@/store";
import { FormInput, FormButton } from "@/components";
import { SignIn_Request } from "@proto/account";
import { PageData, defaultPageData } from "@/interface/page";

const router = useRouter();
const authStore = useAuthStore();
const systemStore = useSystemStore();

const pageData = ref<PageData>(defaultPageData);

const onSubmit = async () => {
  try {
    pageData.value.loading = true;

    await authStore.login(<SignIn_Request>{
      email: pageData.value.base.email,
      password: pageData.value.base.password,
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
