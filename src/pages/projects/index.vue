<template>
  <div class="artboard">
    <header>
      <h1>Projects list</h1>
      <router-link :to="{ name: 'projects-add' }">
        <label class="plus">
          <SvgIcon name="plus_square" />
          add new
        </label>
      </router-link>
    </header>

    <table v-if="data.total > 0">
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
        <tr v-for="(item, index) in data.projects" :key="index">
          <td>
            <router-link active-class="current" :to="{ name: 'projects-projectId', params: { projectId: item.project_id } }">
              {{ item.title }}
            </router-link>
          </td>
          <td>{{ item.login }}</td>
          <td>{{ item.members_count }}</td>
          <td>{{ item.servers_count }}</td>
          <td>{{ toDate(item.created_at, "lite") }}</td>
          <td>
            <router-link active-class="current" :to="{ name: 'projects-projectId-setting', params: { projectId: item.project_id } }">
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { toDate } from "@/utils/time";
import { getProjects } from "@/api/project";
import { SvgIcon, Pagination } from "@/components";

const data: any = ref({});
const route = useRoute();

const getData = async (routeQuery: any) => {
  //if (proxy.$authStore.hasUserRole === 3) { // hack for admin user
  //  routeQuery.user_id = proxy.$authStore.hasUserID;
  //}
  await getProjects(routeQuery).then((res) => {
    data.value = res.data.result;
  });
};

const onSelectPage = (e: any) => {
  getData(e);
};

onMounted(async () => {
  document.title = "Projects list";

  getData(route.query);
});
</script>
