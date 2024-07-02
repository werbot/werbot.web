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
            <SvgIcon v-if="item.status == 'send'" name="delete" class="cursor-pointer text-red-500" @click="openModal(index)" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="desc">Empty</div>

    <Pagination :total="pageData.base.total" @selectPage="onSelectPage" class="content" />
  </div>

  <Modal :showModal="pageData.modal" @close="closeModal" title="Are you sure you want to delete this invite">
    <p>This action CANNOT be undone.<br /></p>
    <template v-slot:footer>
      <div class="flex flex-row justify-end">
        <FormButton class="red" @click="removeInvite(pageData.tmp)">Delete invite</FormButton>
        <FormButton class="ml-5" @click="closeModal()">Close</FormButton>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store";
import { toDate, showMessage } from "@/utils";
import { SvgIcon, Pagination, Tabs, Badge, Modal, FormButton } from "@/components";
import { PageData, defaultPageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { ListMembersInvite_Request, DeleteMemberInvite_Request } from "@proto/member";

// Tabs section
import { tabMenu } from "./tab";

const route = useRoute();
const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const props = defineProps({
  projectId: String,
});

const getData = async (routeQuery: any) => {
  try {
    if (authStore.hasUserRole === 3) {
      routeQuery.member_id = authStore.hasUserID;
    }

    const queryParams = <ListMembersInvite_Request>{
      owner_id: routeQuery.member_id,
      project_id: props.projectId,
      ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
      ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
    };

    const res = await api().GET(`/v1/members/invite`, queryParams);
    if (res.data) {
      pageData.value.base = res.data.result;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

const onSelectPage = (e: any) => {
  getData(e);
};

const openModal = async (id: number) => {
  pageData.value.modal = true;
  pageData.value.tmp = id;
};

const closeModal = () => {
  pageData.value.modal = false;
};

const removeInvite = async (id: number) => {
  try {
    const queryParams = <DeleteMemberInvite_Request>{
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
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

onMounted(async () => {
  document.title = "Add member";
  await getData(route.query);
});
</script>
