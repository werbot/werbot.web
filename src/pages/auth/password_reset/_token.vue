<template>
  <img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
  <div class="card w-[22rem]">
    <span class="title">Reset password</span>

    <form @submit.prevent>
      <FormInput name="New password" type="password" autocomplete="new-password" v-model.trim="data.password" :error="proxy.$errorStore.errors['password']" :disabled="loading" />
      <FormInput name="Repeat password" type="password" autocomplete="new-password" v-model.trim="data.password2" :error="proxy.$errorStore.errors['password2']"
        :disabled="loading" />
      <div class="form-control mt-6">
        <button type="submit" class="btn" @click="onSubmit" :disabled="loading">
          <div v-if="loading">
            <span>Loading...</span>
          </div>
          <span v-else>Save new password</span>
        </button>
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
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { FormInput } from "@/components";
import { checkResetToken, resetPassword } from "@/api/auth";
import { showMessage } from "@/utils/message";

const props = defineProps({
  token: String,
});

const { proxy } = getCurrentInstance() as any;
const data: any = ref({});
const loading = ref(false);
const router = useRouter();

const onSubmit = async () => {
  if (data.value.password != data.value.password2) {
    proxy.$errorStore.errors["password"] = proxy.$errorStore.errors["password2"] =
      "Passwords do not match";
    return;
  }

  if (data.value.password.length < 8) {
    proxy.$errorStore.errors["password"] = proxy.$errorStore.errors["password2"] = "Weak password";
    return;
  }

  loading.value = !loading.value;

  // @ts-ignore
  try {
    const res: any = await resetPassword(props.token, data.value.password);
    showMessage(res.data.result.message);
    proxy.$errorStore.$reset();
    router.push({ name: "auth-signin" });
  } catch (err) {
    loading.value = !loading.value;
  }
};

onMounted(async () => {
  try {
    await checkResetToken(props.token!);
  } catch (err) {
    switch (err.response.data.message) {
      case "Not Found":
      case "Token is invalid":
        router.push({ name: "auth-signin" });
        break;
      default:
        // Handle other errors here
        break;
    }
  }
});

onBeforeUnmount(() => proxy.$errorStore.$reset());

document.title = "Reset password";
</script>

<route lang="yaml">
meta:
  layout: auth
  requiresAuth: false
</route>
