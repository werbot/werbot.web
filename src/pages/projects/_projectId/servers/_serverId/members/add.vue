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
          <td>{{ item.user_name }} {{ item.user_surname }}</td>
          <td>{{ item.user_login }}</td>
          <td>
            <Badge v-if="item.active" name="online" color="green" />
            <Badge v-else name="offline" color="red" />
          </td>
          <td>
            <div class="flex items-center">
              <SvgIcon name="plus_square" class="cursor-pointer" @click="addingMember(index)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="desc">Empty</div>

    <Pagination :total="pageData.base.total" class="content" @select-page="onSelectPage" />
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
import { Badge, Pagination, SvgIcon, Tabs } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { usePageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { AddServerMember_Request, MembersWithoutServer_Request } from "@proto/member";

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
  const { projectId, serverId } = props;

  try {
    if (authStore.hasUserRole === 3) {
      routeQuery.owner_id = authStore.hasUserID;
    }

    const queryParams = <MembersWithoutServer_Request>{
      owner_id: routeQuery.owner_id,
      project_id: projectId,
      server_id: serverId,
      ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
      ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
    };

    const res = await api().GET(`/v1/members/server/search`, queryParams);
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
  const { projectId, serverId } = props;

  try {
    pageData.value.loading = true;
    const bodyParams = <AddServerMember_Request>{
      owner_id: authStore.hasUserID,
      project_id: projectId,
      server_id: serverId,
      member_id: pageData.value.base.members[Number(index)].member_id,
      active: pageData.value.base.members[Number(index)].active
    };

    const res = await api().POST(`/v1/members/server`, {}, bodyParams);
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
</script>
