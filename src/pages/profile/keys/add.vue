<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'profile-keys' }"> SSH keys </router-link>
        <span>Add new</span>
      </h1>
    </header>
    <div class="desc">
      Check out our guide to <a href="#">generating SSH keys</a> or troubleshoot <a href="#">common SSH problems</a>.
    </div>

    <div class="content">
      <form @submit.prevent>
        <FormInput
          v-model.trim="pageData.base.title"
          name="Title"
          :error="pageData.error['title']"
          :disabled="pageData.loading"
          class="w-80"
        />
        <FormTextarea
          v-model.trim="pageData.base.key"
          name="Key"
          :error="pageData.error['key']"
          :disabled="pageData.loading"
          :rows="6"
          class="mt-5"
          placeholder="Begins with 'ssh-rsa', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521', 'ssh-ed25519', 'sk-ecdsa-sha2-nistp256@openssh.com', or 'sk-ssh-ed25519@openssh.com'"
        />

        <FormButton class="mt-8" :loading="pageData.loading" @click="onSubmit()">Add SSH key</FormButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { FormButton, FormInput, FormTextarea } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { defaultPageData, PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { AddKey_Request } from "@proto/key";

const router = useRouter();
const pageData = ref<PageData>(defaultPageData);

const onSubmit = async (): Promise<void> => {
  try {
    pageData.value.loading = true;
    const bodyParams = <AddKey_Request>{
      title: pageData.value.base.title,
      key: pageData.value.base.key
    };

    const res = await api().POST(`/v1/keys`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.error = {};
      router.push({ name: "profile-keys" });
    }
    if (res.error) {
      const errorResult = res.error.result;
      if (errorResult === "The public key has a broken") {
        pageData.value.error.key = errorResult;
        return;
      } else {
        pageData.value.error = errorResult;
      }
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Add new key";
});
</script>
