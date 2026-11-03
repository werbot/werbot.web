<template>
  <div class="artboard">
    <header>
      <h1>Users</h1>
    </header>
    <div class="desc">Invite a new user by email. The invitation link opens the registration page.</div>

    <div class="content">
      <form class="flex flex-wrap items-end gap-4" @submit.prevent>
        <FormInput v-model.trim="pageData.base.email" name="Email" placeholder="user@werbot.net" />
        <FormInput v-model.trim="pageData.base.name" name="Name" placeholder="Name" />
        <FormInput v-model.trim="pageData.base.surname" name="Surname" placeholder="Surname" />
        <FormButton :loading="pageData.loading" @click="onCreate()">Create invite</FormButton>
      </form>

      <div v-if="pageData.tmp.link" class="mt-6 break-all">
        <b>Invitation link:</b>
        <router-link :to="pageData.tmp.link">{{ pageData.tmp.link }}</router-link>
      </div>

      <div v-if="pageData.base.tokens.length" class="mt-8 overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pageData.base.tokens" :key="index">
              <td>{{ item.profile?.email ?? item.email }}</td>
              <td>{{ item.profile?.name ?? item.name }} {{ item.profile?.surname ?? item.surname }}</td>
              <td>{{ tokenStatusName(item.status) }}</td>
              <td>{{ toDate(item.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="desc mt-8">No registration invitations yet.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { FormButton, FormInput } from "@/components";
import { showApiError, showMessage, toDate } from "@/utils";
import { usePageData } from "@/interface/page";
import { createProfileToken, listProfileTokens, registrationInviteLink, tokenStatusName } from "@/api/token";

const pageData = usePageData();

const getData = async (): Promise<void> => {
  const res = await listProfileTokens();
  if (res.data) {
    pageData.value.base.tokens = res.data.result.tokens ?? [];
  }
  if (res.error) {
    showApiError(res.error, [404]);
    pageData.value.base.tokens = [];
  }
};

const onCreate = async (): Promise<void> => {
  pageData.value.loading = true;
  try {
    const res = await createProfileToken({
      email: pageData.value.base.email,
      name: pageData.value.base.name,
      surname: pageData.value.base.surname
    });
    if (res.data) {
      pageData.value.tmp.link = registrationInviteLink(res.data.result.token);
      pageData.value.base.email = "";
      pageData.value.base.name = "";
      pageData.value.base.surname = "";
      showMessage(res.data.message);
      await getData();
    }
    if (res.error) {
      showApiError(res.error);
    }
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Users";
  await getData();
});
</script>
