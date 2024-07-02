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
        <FormInput name="Title" v-model.trim="pageData.base.title" :error="pageData.error['title']" :disabled="pageData.loading" class="w-80" />
        <FormTextarea name="Key" v-model.trim="pageData.base.key" :error="pageData.error['key']" :disabled="pageData.loading" :rows="6" class="mt-5"
          placeholder="Begins with 'ssh-rsa', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521', 'ssh-ed25519', 'sk-ecdsa-sha2-nistp256@openssh.com', or 'sk-ssh-ed25519@openssh.com'" />

        <FormButton class="mt-8" @click="onSubmit()" :loading="pageData.loading">Add SSH key</FormButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { FormInput, FormTextarea, FormButton } from "@/components";
import { showMessage } from "@/utils";
import { PageData, defaultPageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { AddKey_Request } from "@proto/key";

const router = useRouter();
const pageData = ref<PageData>(defaultPageData)

const onSubmit = async () => {
  try {
    pageData.value.loading = true;
    const bodyParams = <AddKey_Request>{
      title: pageData.value.base.title,
      key: pageData.value.base.key,
    };

    const res = await api().POST(`/v1/keys`, {}, bodyParams)
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.error = {};
      router.push({ name: "profile-keys" });
    }
    if (res.error) {
      const errorResult = res.error.result;
      if (errorResult === 'The public key has a broken') {
        pageData.value.error.key = errorResult;
        return;
      } else {
        pageData.value.error = errorResult;
      }
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Add new key";
});
</script>
