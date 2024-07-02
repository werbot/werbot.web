<template>
  <img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
  <div class="card w-[22rem]">
    <span class="title">Sign Up</span>
    <form @submit.prevent>
      <FormInput name="Email" v-model.trim="pageData.base.email" placeholder="user@werbot.net" disabled />
      <FormInput name="Password" v-model.trim="pageData.base.password" :error="authStore.error['password']" type="password" autocomplete="current-password"
        :disabled="pageData.loading" class="mt-5" />
      <FormInput name="Re-Type Password" v-model.trim="pageData.base.password2" :error="authStore.error['password2']" type="password" autocomplete="current-password"
        :disabled="pageData.loading" class="mt-5" />

      <div class="form-control pt-8">
        <FormButton @click="onSubmit()" :loading="pageData.loading">Registration</FormButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import { FormInput, FormButton } from "@/components";
import { PageData, defaultPageData } from "@/interface/page";

const router = useRouter();
const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const onSubmit = async () => {
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
