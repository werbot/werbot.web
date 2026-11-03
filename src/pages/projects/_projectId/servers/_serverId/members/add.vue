<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">
        {{ projectStore.getServerNameByID(props.projectId, props.serverId) }}
        <span>
          <router-link
            :to="{
              name: 'projects-projectId-servers-serverId-members',
              params: { projectId: props.projectId, serverId: props.serverId }
            }"
          >
            Members
          </router-link>
        </span>
        <span>Add new</span>
      </div>
    </header>
    <Tabs :tabs="tabMenu" />

    <table v-if="pageData.base.total > 0">
      <thead>
        <tr>
          <th>Member</th>
          <th>Login</th>
          <th class="w-20">Status</th>
          <th class="w-20">Add</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pageData.base.members" :key="index">
          <td>{{ item.name }} {{ item.surname }}</td>
          <td>{{ item.alias }}</td>
          <td>
            <Badge v-if="item.active" name="online" color="green" />
            <Badge v-else name="offline" color="red" />
          </td>
          <td>
            <div class="flex items-center">
              <SvgIcon name="plus_square" class="cursor-pointer" @click="addingMember(Number(index))" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="desc">Empty</div>

    <Pagination :total="pageData.base.total" class="content" @select-page="onSelectPage" />

    <div class="card mt-8">
      <span class="title">Invite by email</span>
      <div class="desc">
        Send a one-time link to a user who is not in the project yet. Accepting it grants access to this server.
      </div>
      <div class="mt-5 flex flex-wrap items-end gap-4">
        <FormInput v-model.trim="pageData.base.inviteEmail" name="Email" placeholder="user@werbot.net" />
        <FormButton :loading="pageData.loading" @click="sendInvite()">Create invite link</FormButton>
      </div>
      <div v-if="pageData.tmp.inviteLink" class="mt-5 break-all">
        <b>Invitation link:</b>
        <a :href="pageData.tmp.inviteLink">{{ pageData.tmp.inviteLink }}</a>
      </div>
    </div>
  </div>

  <div class="m-6">
    In order to add a new member, he must first be invited to the general list of
    <router-link :to="{ name: 'projects-projectId-members', params: { projectId: props.projectId } }">
      project members </router-link
    >.
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore, useProjectStore } from "@/store";
import { Badge, FormButton, FormInput, Pagination, SvgIcon, Tabs } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { usePageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { createSchemeToken, tokenAcceptLink } from "@/api/token";

// Tabs section
import { tabMenu } from "@/pages/projects/_projectId/servers/_serverId/tab";

const route = useRoute();
const authStore = useAuthStore();
const projectStore = useProjectStore();
const pageData = usePageData();

const props = defineProps({
  projectId: {
    type: String,
    default: null
  },
  serverId: {
    type: String,
    default: null
  }
});

const onSelectPage = (e: any): void => {
  getData(e);
};

const getData = async (routeQuery: any): Promise<void> => {
  const { serverId } = props;

  try {
    const queryParams = {
      ...(authStore.hasUserRole === 3 && { owner_id: authStore.hasUserID }),
      ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
      ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
    };

    const res = await api().GET(`/v1/members/scheme/${serverId}/search`, queryParams);
    if (res.data) {
      pageData.value.base = res.data.result;
    }
    if (res.error) {
      showApiError(res.error, [404]);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const addingMember = async (index: number): Promise<void> => {
  const { serverId } = props;

  try {
    pageData.value.loading = true;
    const member = pageData.value.base.members[Number(index)];

    const bodyParams = {
      member_id: member.member_id,
      active: member.active
    };

    const res = await api().POST(`/v1/members/scheme/${serverId}`, {}, bodyParams);
    if (res.data) {
      pageData.value.base.members.splice(index, 1);
      pageData.value.base.total = pageData.value.base.total - 1;
      showMessage(res.data.message);
      pageData.value.error = {};
    }
    if (res.error) {
      pageData.value.error = res.error.result;
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Server member add";
  projectStore.serverNameByID(props.projectId, props.serverId);
  await getData(route.query);
});

const sendInvite = async (): Promise<void> => {
  if (!pageData.value.base.inviteEmail) {
    return;
  }

  pageData.value.loading = true;
  try {
    const res = await createSchemeToken(props.serverId, { email: pageData.value.base.inviteEmail });
    if (res.data) {
      pageData.value.tmp.inviteLink = tokenAcceptLink(res.data.result.token);
      pageData.value.base.inviteEmail = "";
      showMessage(res.data.message);
    }
    if (res.error) {
      showApiError(res.error);
    }
  } finally {
    pageData.value.loading = false;
  }
};
</script>
