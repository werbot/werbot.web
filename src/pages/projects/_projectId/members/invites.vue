<template>
  <div class="artboard">
    <header>
      <h1>Invites</h1>
      <router-link :to="{ name: 'projects-projectId-members-add' }">
        <label class="plus">
          <SvgIcon name="plus_square" />
          new member
        </label>
      </router-link>
    </header>
    <Tabs :tabs="tabMenu" />

    <table v-if="data.total > 0">
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
        <tr v-for="(item, index) in data.invites" :key="index">
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

    <Pagination :total="data.total" @selectPage="onSelectPage" class="content" />
  </div>

  <Modal :showModal="modalActive" @close="closeModal" title="Are you sure you want to delete this invite">
    <p>This action CANNOT be undone.<br /></p>
    <template v-slot:footer>
      <div class="flex flex-row justify-end">
        <button class="btn btn-red" @click="removeInvite(invite.id)">Delete invite</button>
        <button class="btn ml-5" @click="closeModal">Close</button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { toDate } from "@/utils/time";
import { SvgIcon, Pagination, Tabs, Badge, Modal } from "@/components";
import { showMessage } from "@/utils/message";

import { getProjectMembersInvite, deleteProjectMemberInvite } from "@/api/member/project";
import { ListMembersInvite_Request, DeleteMemberInvite_Request } from "@proto/member";

// Tabs section
import { tabMenu } from "./tab";

const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const data: any = ref({});
const invite: any = ref({});
const modalActive = ref(false);
const props = defineProps({
  projectId: String,
});

const openModal = async (id: number) => {
  modalActive.value = true;
  invite.value.id = id;
};

const closeModal = () => {
  modalActive.value = false;
};

const removeInvite = async (id: number) => {
  await deleteProjectMemberInvite(<DeleteMemberInvite_Request>{
    owner_id: proxy.$authStore.hasUserID,
    project_id: props.projectId,
    invite_id: data.value.invites[id].id
  }).then((res) => {
    if (res.data.code === 200) {
      closeModal();
      data.value.invites.splice(id, 1);
      data.value.total = data.value.total - 1;

      showMessage(res.data.message);
      proxy.$errorStore.$reset();
    }
  });
};

const getData = async (routeQuery: any) => {
  if (proxy.$authStore.hasUserRole === 3) {
    routeQuery.owner_id = proxy.$authStore.hasUserID;
  }
  routeQuery.project_id = props.projectId;

  await getProjectMembersInvite(<ListMembersInvite_Request>{
    limit: routeQuery.limit,
    offset: routeQuery.offset,
    owner_id: routeQuery.owner_id,
    project_id: routeQuery.project_id,
  }).then((res) => {
    data.value = res.data.result;
  });
};

const onSelectPage = (e: any) => {
  getData(e);
};

onMounted(async () => {
  document.title = "Add member";

  getData(route.query);
});

onBeforeUnmount(() => proxy.$errorStore.$reset());
</script>
