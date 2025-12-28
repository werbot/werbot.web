<template>
  <div class="artboard">
    <header>
      <h1>Invites</h1>
      <router-link :to="{ name: 'projects-projectId-members-add' }" class="breadcrumbs">
        <SvgIcon name="plus_square" class="mr-3" />
        new member
      </router-link>
    </header>
    <Tabs :tabs="tabMenu" />

    <table v-if="pageData.base.total > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th class="w-40">Invited</th>
          <th class="w-24">Status</th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pageData.base.invites" :key="index">
          <td>{{ item.name }} {{ item.surname }}</td>
          <td>{{ item.email }}</td>
          <td>{{ toDate(item.created_at) }}</td>
          <td>
            <Badge v-if="item.status == 'activated'" :name="item.status" color="green" />
            <Badge v-if="item.status == 'send'" :name="item.status" color="yellow" />
          </td>
          <td>
            <SvgIcon
              v-if="item.status == 'send'"
              name="delete"
              class="cursor-pointer text-red-500"
              @click="openModal(index)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="desc">Empty</div>

    <Pagination :total="pageData.base.total" class="content" @select-page="onSelectPage" />
  </div>

  <Modal :show-modal="pageData.modal" title="Are you sure you want to delete this invite" @close="closeModal">
    <p>This action CANNOT be undone.<br /></p>
    <template #footer>
      <div class="flex flex-row justify-end">
        <FormButton class="red" @click="removeInvite(pageData.tmp)">Delete invite</FormButton>
        <FormButton class="ml-5" @click="closeModal()">Close</FormButton>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store";
import { showApiError, showMessage, toDate } from "@/utils";
import { Badge, FormButton, Modal, Pagination, SvgIcon, Tabs } from "@/components";
import { usePageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { DeleteMemberToken_Request, ListMembersToken_Request } from "@proto/member";

// Tabs section
import { tabMenu } from "./tab";

const route = useRoute();
const authStore = useAuthStore();
const pageData = usePageData();

const props = defineProps({
  projectId: {
    type: String,
    default: null
  }
});

const getData = async (routeQuery: any): Promise<void> => {
  try {
    if (authStore.hasUserRole === 3) {
      routeQuery.member_id = authStore.hasUserID;
    }

    const queryParams = <ListMembersToken_Request>{
      ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
      ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
    };

    const res = await api().GET(`/v1/members/invite/project/${props.projectId}`, queryParams);
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

const openModal = async (id: number): Promise<void> => {
  pageData.value.modal = true;
  pageData.value.tmp = id;
};

const closeModal = (): void => {
  pageData.value.modal = false;
};

const removeInvite = async (id: number): Promise<void> => {
  try {
    const queryParams = <DeleteMemberToken_Request>{
      owner_id: authStore.hasUserID,
      project_id: props.projectId,
      invite_id: pageData.value.base.invites[id].id
    };

    const res = await api().DELETE(`/v1/members/invite`, queryParams);
    if (res.data) {
      closeModal();
      pageData.value.base.invites.splice(id, 1);
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

onMounted(async () => {
  document.title = "Add member";
  await getData(route.query);
});
</script>
