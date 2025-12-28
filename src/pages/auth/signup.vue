<template>
  <img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
  <div class="card w-[22rem]">
    <span class="title">Sign Up</span>
    <form @submit.prevent>
      <FormInput v-model.trim="pageData.base.email" name="Email" placeholder="user@werbot.net" disabled />
      <FormInput
        v-model.trim="pageData.base.password"
        name="Password"
        :error="authStore.error?.['password']"
        type="password"
        autocomplete="current-password"
        :disabled="pageData.loading"
        class="mt-5"
      />
      <FormInput
        v-model.trim="pageData.base.password2"
        name="Re-Type Password"
        :error="authStore.error?.['password2']"
        type="password"
        autocomplete="current-password"
        :disabled="pageData.loading"
        class="mt-5"
      />

      <div class="form-control pt-8">
        <FormButton :loading="pageData.loading" @click="onSubmit()">Registration</FormButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import { FormButton, FormInput } from "@/components";
import { usePageData } from "@/interface/page";

const router = useRouter();
const authStore = useAuthStore();
const pageData = usePageData();

const onSubmit = async (): Promise<void> => {
  pageData.value.loading = true;
  //
  // TODO
  //
  pageData.value.loading = false;
};

onMounted(async () => {
  document.title = "Sign Up";

  if (authStore.logged_in) {
    router.push({ name: "index" });
  }
});
</script>
