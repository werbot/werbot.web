<template>
  <div class="artboard">
    <header>
      <h1>Members</h1>
    </header>
    <Tabs :tabs="tabMenu" />

    <table v-if="data.total > 0">
      <thead>
        <tr>
          <th class="w-12"></th>
          <th>Name</th>
          <th class="w-12">
            <SvgIcon name="server" class="text-gray-700" />
          </th>
          <th class="w-12">
            <SvgIcon name="database" class="text-gray-700" />
          </th>
          <th class="w-12">
            <SvgIcon name="application" class="text-gray-700" />
          </th>
          <th class="w-12">
            <SvgIcon name="desktop" class="text-gray-700" />
          </th>
          <th class="w-12">
            <SvgIcon name="container" class="text-gray-700" />
          </th>
          <th class="w-12">
            <SvgIcon name="cloud" class="text-gray-700" />
          </th>
          <th class="w-20">Role</th>
          <th class="w-20">Activity</th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.members" :key="index">
          <td>
            <div class="flex items-center">
              <span class="dot" :class="item.online ? 'bg-green-500' : 'bg-gray-200'"></span>
            </div>
          </td>
          <td>{{ item.user_name }}</td>
          <td>{{ item.servers_count }}</td>
          <td>999</td>
          <td>999</td>
          <td>999</td>
          <td>999</td>
          <td>999</td>
          <td class="flex items-center">
            <Badge :name="Role[item.role]" />
          </td>
          <td>
            <div class="flex items-center">
              <FormToggle v-model="item.active" :id="index" @change="changeMemberActive(index, item.active)" />
            </div>
          </td>
          <td>
            <router-link active-class="current" :to="{ name: 'projects-projectId-members', params: { projectId: props.projectId } }">
              <SvgIcon name="setting" class="text-gray-700" />
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="desc">Empty</div>

    <Pagination :total="data.total" @selectPage="onSelectPage" class="content" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { SvgIcon, Pagination, Badge, FormToggle, Tabs } from "@/components";
import { showMessage } from "@/utils/message";

import { getProjectMembers, updateProjectMemberStatus } from "@/api/member/project";
import { UpdateProjectMember_Request } from "@proto/member";
import { Role } from "@proto/user";

// Tabs section
import { tabMenu } from "./tab";

const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const data: any = ref({});
const props = defineProps({
  projectId: String,
});

const getData = async (routeQuery: any) => {
  if (proxy.$authStore.hasUserRole === 3) {
    routeQuery.member_id = proxy.$authStore.hasUserID;
  }
  routeQuery.project_id = props.projectId;
  await getProjectMembers(routeQuery.member_id, routeQuery.project_id, routeQuery).then((res) => {
    data.value = res.data.result;
  });
};

const onSelectPage = (e: any) => {
  getData(e);
};

onMounted(async () => {
  document.title = "Members list";

  getData(route.query);
});

const changeMemberActive = async (index: number, online: boolean) => {
  data.value.members[Number(index)].active = online;

  await updateProjectMemberStatus(<UpdateProjectMember_Request>{
    owner_id: proxy.$authStore.hasUserID,
    project_id: props.projectId,
    member_id: data.value.members[Number(index)].member_id,
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
