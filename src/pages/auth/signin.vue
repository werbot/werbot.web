<template>
  <img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
  <div class="card w-[22rem]">
    <span class="title">Sign In</span>
    <form @submit.prevent>
      <FormInput name="Email" v-model.trim="data.email" :error="$errorStore.errors['email']" autocomplete="username" :disabled="loading" />
      <FormInput name="Password" v-model.trim="data.password" :error="$errorStore.errors['password']" type="password" autocomplete="current-password" :disabled="loading"
        class="mt-5" />
      <div class="form-control pt-8">
        <button type="submit" class="btn" @click="onSubmit" :disabled="loading">
          <div v-if="loading">
            <span>Loading...</span>
          </div>
          <span v-else>Login</span>
        </button>
      </div>
    </form>
  </div>

  <div class="mt-10">
    <router-link :to="{ name: 'auth-password_reset' }" class="mt-2"> Forgot password? </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { FormInput } from "@/components";
import { SignIn_Request } from "@proto/account";
import { showMessage } from "@/utils/message";

const { proxy } = getCurrentInstance() as any;

interface SignInData {
  email: string;
  password: string;
}

const data = ref<SignInData>({ email: "", password: "" });
const loading = ref(false);
const router = useRouter();

const onSubmit = async () => {
  loading.value = true;

  try {
    await proxy.$authStore.login(<SignIn_Request>{
      email: data.value.email,
      password: data.value.password,
    });

    if (proxy.$systemStore.invites.project) {
      const invite = proxy.$systemStore.invites.project;
      router.push({ name: "invite-project-invite", params: { invite } });
    } else {
      router.push({ name: "index" });
    }
  } catch (error) {
    if (error.response.status === 404) {
      showMessage(error.response.data.result, "connextWarning");
      proxy.$errorStore.$reset();
    }
  }

  loading.value = false;
};

onMounted(async () => {
  if (proxy.$authStore.logged_in) {
    router.push({ name: "index" });
  }
});

onBeforeUnmount(() => proxy.$errorStore.$reset());

document.title = "Sign In";
</script>
