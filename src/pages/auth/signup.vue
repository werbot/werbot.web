<template>
  <img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
  <div class="card w-[22rem]">
    <span class="title">Sign Up</span>
    <form @submit.prevent>
      <FormInput name="Email" v-model.trim="data.email" placeholder='user@werbot.net' disabled />
      <FormInput name="Password" v-model.trim="data.password" :error="$errorStore.errors['password']" type="password" autocomplete="current-password" :disabled="loading"
        class="mt-5" />
      <FormInput name="Re-Type Password" v-model.trim="data.password2" :error="$errorStore.errors['password2']" type="password" autocomplete="current-password" :disabled="loading"
        class="mt-5" />

      <div class="form-control pt-8">
        <button type="submit" class="btn" :disabled="loading">
          <div v-if="loading">
            <span>Loading...</span>
          </div>
          <span v-else @click="onSubmit">Registration</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { FormInput } from "@/components";

const { proxy } = getCurrentInstance() as any;

interface FormData {
  email: string;
  password: string;
  password2: string;
}

const data = ref(<FormData>{
  email: "",
  password: "",
  password2: "",
});
const loading = ref(false);
const router = useRouter();

const onSubmit = async () => {
  //loading.value = !loading.value;
};

onMounted(async () => {
  document.title = "Sign Up";

  if (proxy.$authStore.logged_in) {
    router.push({ name: "index" });
  }
});

onBeforeUnmount(() => proxy.$errorStore.$reset());
</script>
