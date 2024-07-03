<template>
  <div class="artboard">
    <header>
      <h1>Members</h1>
    </header>
    <Tabs :tabs="tabMenu" />

    <table v-if="pageData.base.total > 0">
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
        <tr v-for="(item, index) in pageData.base.members" :key="index">
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
              <FormToggle :id="index" v-model="item.active" @change="changeMemberActive(index, item.active)" />
            </div>
          </td>
          <td>
            <router-link
              active-class="current"
              :to="{ name: 'projects-projectId-members', params: { projectId: props.projectId } }"
            >
              <SvgIcon name="setting" class="text-gray-700" />
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="desc">Empty</div>

    <Pagination :total="pageData.base.total" class="content" @select-page="onSelectPage" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store";
import { SvgIcon, Pagination, Badge, FormToggle, Tabs } from "@/components";
import { PageData, defaultPageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { UpdateProjectMember_Request } from "@proto/member";
import { Role } from "@proto/user";

// Tabs section
import { tabMenu } from "./tab";

const route = useRoute();
const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const props = defineProps({
  projectId: {
    type: String,
    default: null
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getData = async (routeQuery: any): Promise<void> => {
  try {
    if (authStore.hasUserRole === 3) {
      routeQuery.member_id = authStore.hasUserID;
    }

    const queryParams = {
      owner_id: routeQuery.member_id,
      project_id: props.projectId,
      ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
      ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
    };

    const res = await api().GET(`/v1/members`, queryParams);
    if (res.data) {
      pageData.value.base = res.data.result;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const onSelectPage = (e: unknown): void => {
  getData(e);
};

const changeMemberActive = async (index: number, online: boolean): Promise<void> => {
  try {
    const bodyParams = <UpdateProjectMember_Request>{
      owner_id: authStore.hasUserID,
      project_id: props.projectId,
      member_id: pageData.value.base.members[Number(index)].member_id,
      setting: {
        active: online
      }
    };

    const res = await api().UPDATE(`/v1/members/active`, {}, bodyParams);
    if (res.data) {
      pageData.value.base.members[Number(index)].active = online;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

onMounted(async () => {
  document.title = "Members list";
  await getData(route.query);
});
</script>
