<template>
  <div class="artboard">
    <header>
      <h1>Projects list</h1>
      <router-link :to="{ name: 'projects-add' }" class="breadcrumbs">
        <SvgIcon name="plus_square" class="mr-3" />
        add new
      </router-link>
    </header>

    <table v-if="pageData.base.total > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th class="w-40">Login</th>
          <th class="w-14">
            <SvgIcon name="users" />
          </th>
          <th class="w-14">
            <SvgIcon name="server" />
          </th>
          <th class="w-32">Created</th>
          <th class="w-14"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pageData.base.projects" :key="index">
          <td>
            <router-link
              active-class="current"
              :to="{ name: 'projects-projectId', params: { projectId: item.project_id } }"
            >
              {{ item.title }}
            </router-link>
          </td>
          <td>{{ item.login }}</td>
          <td>{{ item.members_count }}</td>
          <td>{{ item.servers_count }}</td>
          <td>{{ toDate(item.created_at, "lite") }}</td>
          <td>
            <router-link
              active-class="current"
              :to="{ name: 'projects-projectId-setting', params: { projectId: item.project_id } }"
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store";
import { Pagination, SvgIcon } from "@/components";
import { showApiError, toDate } from "@/utils";
import { defaultPageData, PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { ListProjects_Request } from "@proto/project";

const route = useRoute();
const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const onSelectPage = (e: unknown): void => {
  getData(e);
};

const getData = async (routeQuery: any): Promise<void> => {
  try {
    if (authStore.hasUserRole === 3) {
      routeQuery.member_id = authStore.hasUserID;
    }

    const queryParams = <ListProjects_Request>{
      ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
      ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
    };

    const res = await api().GET(`/v1/projects`, queryParams);
    if (res.data) {
      pageData.value.base = res.data.result;
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

onMounted(async () => {
  document.title = "Projects list";
  await getData(route.query);
});
</script>
