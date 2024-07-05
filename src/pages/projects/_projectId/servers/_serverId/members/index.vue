<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ projectStore.getServerNameByID(props.projectId, props.serverId) }}</div>
      <router-link :to="{ name: 'projects-projectId-servers-serverId-members-add' }" class="breadcrumbs">
        <SvgIcon name="plus_square" class="mr-3" />
        add new
      </router-link>
    </header>
    <Tabs :tabs="tabMenu" />

    <table v-if="pageData.base.total > 0">
      <thead>
        <tr>
          <th class="w-12"></th>
          <th>Member</th>
          <th>Login</th>
          <th class="w-40">Last update</th>
          <th class="w-20">Activity</th>
          <th class="w-8"></th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pageData.base.members" :key="index">
          <td>
            <div class="flex items-center">
              <span class="dot bg-green-500"></span>
            </div>
          </td>
          <td>{{ item.user_name }} {{ item.user_surname }}</td>
          <td>{{ item.user_login }}</td>
          <td>{{ item.updated_at.seconds > 0 ? toDate(item.updated_at) : "" }}</td>
          <td>
            <div class="flex items-center">
              <FormToggle :id="index" v-model="item.active" @change="changeMemberActive(index, item.active)" />
            </div>
          </td>
          <td>
            <router-link
              active-class="current"
              :to="{
                name: 'projects-projectId-servers-serverId-members-memberId',
                params: { projectId: props.projectId, serverId: props.serverId, memberId: item.member_id }
              }"
            >
              <SvgIcon name="logs" class="text-gray-700" />
            </router-link>
          </td>
          <td>
            <SvgIcon name="delete" class="cursor-pointer text-red-500" @click="openModal(index)" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="desc">Empty</div>

    <Pagination :total="pageData.base.total" class="content" @select-page="onSelectPage" />
  </div>

  <Modal :show-modal="pageData.modal" title="Are you sure you want to delete this member?" @close="closeModal()">
    <p>This action CANNOT be undone. But this member can be added again.<br /></p>
    <template #footer>
      <div class="flex flex-row justify-end">
        <FormButton class="red" @click="removeMember(pageData.tmp.id)">Delete member</FormButton>
        <FormButton class="ml-5" @click="closeModal()">Close</FormButton>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore, useProjectStore } from "@/store";
import { showApiError, showMessage, toDate } from "@/utils";
import { FormButton, FormToggle, Modal, Pagination, SvgIcon, Tabs } from "@/components";
import { defaultPageData, PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { DeleteServerMember_Request, UpdateServerMember_Request } from "@proto/member";

// Tabs section
import { tabMenu } from "@/pages/projects/_projectId/servers/_serverId/tab";

const route = useRoute();
const authStore = useAuthStore();
const projectStore = useProjectStore();
const pageData = ref<PageData>(defaultPageData);

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

const getData = async (routeQuery: any): Promise<void> => {
  const { projectId, serverId } = props;

  try {
    if (authStore.hasUserRole === 3) {
      routeQuery.member_id = authStore.hasUserID;
    }

    const queryParams = {
      owner_id: routeQuery.member_id,
      project_id: projectId,
      server_id: serverId,
      ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
      ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
    };

    const res = await api().GET(`/v1/members/server`, queryParams);
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

const onSelectPage = (e: any): void => {
  getData(e);
};

const changeMemberActive = async (index: number, online: boolean): Promise<void> => {
  const { projectId, serverId } = props;

  try {
    const bodyParams = <UpdateServerMember_Request>{
      owner_id: authStore.hasUserID,
      project_id: projectId,
      server_id: serverId,
      member_id: pageData.value.base.members[Number(index)].member_id,
      setting: {
        active: online
      }
    };

    const res = await api().UPDATE(`/v1/members/server/active`, {}, bodyParams);
    if (res.data) {
      pageData.value.base.members[Number(index)].active = online;
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const removeMember = async (id: number): Promise<void> => {
  const { projectId, serverId } = props;

  try {
    const queryParams = <DeleteServerMember_Request>{
      owner_id: authStore.hasUserID,
      project_id: projectId,
      server_id: serverId,
      member_id: pageData.value.base.members[Number(id)].member_id
    };

    const res = await api().DELETE(`/v1/members/server`, queryParams);
    if (res.data) {
      closeModal();
      pageData.value.base.members.splice(id, 1);
      pageData.value.base.total = pageData.value.base.total - 1;
      showMessage(res.data.message);
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const openModal = async (id: number): Promise<void> => {
  pageData.value.modal = true;
  pageData.value.tmp.id = id;
};

const closeModal = (): void => {
  pageData.value.modal = false;
};

onMounted(async () => {
  document.title = "Server member";
  projectStore.serverNameByID(props.projectId, props.serverId);
  await getData(route.query);
});
</script>
