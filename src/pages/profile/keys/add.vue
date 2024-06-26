<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'profile-keys' }"> SSH keys </router-link>
        <span>Add new</span>
      </h1>
    </header>
    <div class="desc">Check out our guide to <a href="#">generating SSH keys</a> or troubleshoot <a href="#">common SSH problems</a>.</div>

    <div class="content">
      <form @submit.prevent>
        <FormInput name="Title" v-model.trim="data.title" :error="$errorStore.errors['title']" :disabled="loading" class="w-80" />
        <FormTextarea name="Key" v-model.trim="data.key" :error="$errorStore.errors['key']" :disabled="loading" :rows="6" class="mt-5"
          placeholder="Begins with 'ssh-rsa', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521', 'ssh-ed25519', 'sk-ecdsa-sha2-nistp256@openssh.com', or 'sk-ssh-ed25519@openssh.com'" />

        <button type="submit" class="btn mt-8" @click="onSubmit" :disabled="loading">
          <div v-if="loading">
            <span>Loading...</span>
          </div>
          <span v-else>Add SSH key</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { FormInput, FormTextarea } from "@/components";
import { showMessage } from "@/utils/message";

import { postKey } from "@/api/key";
import { AddKey_Request } from "@proto/key";

const { proxy } = getCurrentInstance() as any;
const data: any = ref({});
const loading = ref(false);
const router = useRouter();

const onSubmit = async () => {
  loading.value = !loading.value;

  await postKey(<AddKey_Request>{
    title: data.value.title,
    key: data.value.key,
  })
    .then((res) => {
      showMessage(res.data.message);
      proxy.$errorStore.$reset();
      router.push({ name: "profile-keys" });
    })
    .catch((err) => {
      showMessage(err.response.data.message, "connextError");
      loading.value = !loading.value;
    });
};

onMounted(async () => {
  document.title = "Add new key";
});

onBeforeUnmount(() => proxy.$errorStore.$reset());
</script>
