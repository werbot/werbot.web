<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ serverName }} <span>
          <router-link :to="{ name: 'projects-projectId-servers-serverId-members', params: { projectId: props.projectId, serverId: props.serverId } }">
            Members
          </router-link>
        </span>
        <span>Add new</span>
      </div>
    </header>
    <Tabs :tabs="tabMenu" />

    <table v-if="data.total > 0">
      <thead>
        <tr>
          <th>Member</th>
          <th>Login</th>
          <th class="w-20">Status</th>
          <th class="w-20">Add</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.members" :key="index">
          <td>{{ item.user_name }} {{ item.user_surname }}</td>
          <td>{{ item.user_login }}</td>
          <td>
            <Badge v-if="item.active" name="online" color="green" />
            <Badge v-else name="offline" color="red" />
          </td>
          <td>
            <div class="flex items-center">
              <SvgIcon name="plus_square" @click="addingMember(index)" class="cursor-pointer" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="desc">Empty</div>

    <Pagination :total="data.total" @selectPage="onSelectPage" class="content" />
  </div>

  <div class="m-6">
    In order to add a new member, he must first be invited to the general list of
    <router-link :to="{ name: 'projects-projectId-members', params: { projectId: props.projectId } }">
      project members
    </router-link>.
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { Tabs, SvgIcon, Badge, Pagination } from "@/components";
import { showMessage } from "@/utils/message";
import { serverNameByID } from "@/api/server";
import { ServerNameByID_Request } from "@proto/server";
import { getMembersWithoutServer, postServerMember } from "@/api/member/server";
import { MembersWithoutServer_Request, AddServerMember_Request } from "@proto/member";

const serverName: any = ref("");

// Tabs section
import { tabMenu } from "../tab";

const { proxy } = getCurrentInstance() as any;
const data: any = ref({});
const route = useRoute();

const props = defineProps({
  projectId: String,
  serverId: String,
});

const getData = async (routeQuery: any) => {
  if (proxy.$authStore.hasUserRole === 3) {
    routeQuery.owner_id = proxy.$authStore.hasUserID;
  }
  routeQuery.project_id = props.projectId;
  routeQuery.server_id = props.serverId;
  await getMembersWithoutServer(<MembersWithoutServer_Request>{
    limit: routeQuery.limit,
    offset: routeQuery.offset,
    owner_id: routeQuery.owner_id,
    project_id: routeQuery.project_id,
    server_id: routeQuery.server_id,
    login: "",
  }).then((res) => {
    data.value = res.data.result;
  });
};

const onSelectPage = (e: any) => {
  getData(e);
};

onMounted(async () => {
  document.title = "Server member add";

  getData(route.query);

  await serverNameByID(<ServerNameByID_Request>{
    user_id: proxy.$authStore.hasUserID,
    server_id: props.serverId,
    project_id: props.projectId,
  }).then((res) => {
    serverName.value = res.data.result.server_name;
  });
});

const addingMember = async (index: number) => {
  var active = data.value.members[Number(index)].active;
  if (!active) {
    active = false;
  }

  await postServerMember(<AddServerMember_Request>{
    owner_id: proxy.$authStore.hasUserID,
    project_id: props.projectId,
    server_id: props.serverId,
    member_id: data.value.members[Number(index)].member_id,
    active: active,
  })
    .then((res) => {
      if (res.data.code === 200) {
        data.value.members.splice(index, 1);
        data.value.total = data.value.total - 1;

        showMessage(res.data.message);
        proxy.$errorStore.$reset();
      }
    })
    .catch((err) => {
      showMessage(err.response.data.message, "connextError");
      proxy.$errorStore.$reset();
    });
};
</script>
