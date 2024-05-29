<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ serverName }}</div>
      <router-link :to="{ name: 'projects-projectId-servers-serverId-members-add' }">
        <label class="plus">
          <SvgIcon name="plus_square" />
          add new
        </label>
      </router-link>
    </header>
    <Tabs :tabs="tabMenu" />

    <table v-if="data.total > 0">
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
        <tr v-for="(item, index) in data.members" :key="index">
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
              <FormToggle v-model="item.active" :id="index" @change="changeMemberActive(index, item.active)" />
            </div>
          </td>
          <td>
            <router-link active-class="current"
              :to="{ name: 'projects-projectId-servers-serverId-members-memberId', params: { projectId: props.projectId, serverId: props.serverId, memberId: item.member_id } }">
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

    <Pagination :total="data.total" @selectPage="onSelectPage" class="content" />
  </div>

  <Modal :showModal="modalActive" @close="closeModal" title="Are you sure you want to delete this member?">
    <p>This action CANNOT be undone. But this member can be added again.<br /></p>
    <template v-slot:footer>
      <div class="flex flex-row justify-end">
        <button class="btn btn-red" @click="removeMember(member.id)">Delete member</button>
        <button class="btn ml-5" @click="closeModal">Close</button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { toDate } from "@/utils/time";
import { Tabs, SvgIcon, Modal, FormToggle, Pagination } from "@/components";
import { showMessage } from "@/utils/message";
import { serverNameByID } from "@/api/server";
import { ServerNameByID_Request } from "@proto/server";
import {
  getServerMembers,
  updateServerMemberActive,
  deleteServerMember,
} from "@/api/member/server";
import { UpdateServerMember_Request, DeleteServerMember_Request } from "@proto/member";

// Tabs section
import { tabMenu } from "../tab";

const serverName: any = ref("");

const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const data: any = ref({});
const member: any = ref({});
const props = defineProps({
  projectId: String,
  serverId: String,
});
const modalActive = ref(false);

const openModal = async (id: number) => {
  modalActive.value = true;
  member.value.id = id;
};

const closeModal = () => {
  modalActive.value = false;
};

const removeMember = async (id: number) => {
  await deleteServerMember(<DeleteServerMember_Request>{
    owner_id: proxy.$authStore.hasUserID,
    project_id: props.projectId,
    server_id: props.serverId,
    member_id: data.value.members[Number(id)].member_id,
  }).then((res) => {
    if (res.data.code === 200) {
      closeModal();
      data.value.members.splice(id, 1);
      data.value.total = data.value.total - 1;

      showMessage(res.data.message);
      proxy.$errorStore.$reset();
    }
  });
};

const getData = async (routeQuery: any) => {
  if (proxy.$authStore.hasUserRole === 3) {
    routeQuery.member_id = proxy.$authStore.hasUserID;
  }
  routeQuery.project_id = props.projectId;
  routeQuery.server_id = props.serverId;
  await getServerMembers(
    routeQuery.member_id,
    routeQuery.project_id,
    routeQuery.server_id,
    routeQuery
  ).then((res) => {
    data.value = res.data.result;
  });
};

const onSelectPage = (e: any) => {
  getData(e);
};

onMounted(async () => {
  document.title = "Server member";

  getData(route.query);

  await serverNameByID(<ServerNameByID_Request>{
    user_id: proxy.$authStore.hasUserID,
    server_id: props.serverId,
    project_id: props.projectId,
  }).then((res) => {
    serverName.value = res.data.result.server_name;
  });
});

const changeMemberActive = async (index: number, online: boolean) => {
  data.value.members[Number(index)].active = online;

  await updateServerMemberActive(<UpdateServerMember_Request>{
    owner_id: proxy.$authStore.hasUserID,
    project_id: props.projectId,
    member_id: data.value.members[Number(index)].member_id,
    server_id: props.serverId,
    setting: {
      active: online,
    },
  })
    .then((res) => {
      if (!online) {
        showMessage(res.data.message, "connextWarning");
      } else {
        showMessage(res.data.message);
      }
      proxy.$errorStore.$reset();
    })
    .catch((err) => {
      showMessage(err.response.data.message, "connextError");
    });
};
</script>
