<template>
  <div class="artboard">
    <header>
      <h1>Servers</h1>

      <router-link :to="{ name: 'projects-projectId-servers-add' }" class="breadcrumbs">
        <SvgIcon name="plus_square" class="mr-3" />
        add new
      </router-link>
    </header>

    <table v-if="pageData.base.total > 0">
      <thead>
        <tr>
          <th class="w-12"></th>
          <th>Title</th>
          <th class="w-16">Users</th>
          <th class="w-32">Address</th>
          <th class="w-16">Auth</th>
          <th class="w-20">Scheme</th>
          <th class="w-20">Activity</th>
          <th class="w-8"></th>
          <th class="w-8"></th>
          <th class="w-8"></th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pageData.base.servers" :key="index">
          <td>
            <div class="flex items-center">
              <span class="dot" :class="item.online ? 'bg-green-500' : 'bg-gray-200'"></span>
            </div>
          </td>
          <td>
            <router-link
              active-class="current"
              :to="{
                name: 'projects-projectId-servers-serverId-session',
                params: { projectId: props.projectId, serverId: item.server_id }
              }"
            >
              {{ item.title }}
            </router-link>
          </td>

          <td class="flex items-center">
            <div v-if="item.count_members">{{ item.count_members }}</div>
            <div v-else>0</div>
          </td>

          <td class="pr-1.5">
            <Badge :name="(addressType = getAddressType(item.address))" :color="addressColor(addressType)" />
          </td>
          <td>
            <div class="flex items-center">
              <SvgIcon v-if="item.auth == 1" name="password" />
              <SvgIcon v-else-if="item.auth == 2" name="key" />
              <SvgIcon v-else name="agent" />
            </div>
          </td>
          <td class="flex items-center">
            <Badge :name="ServerScheme[item.scheme]" :color="serverSchemeToColor[item.scheme]" />
          </td>
          <td>
            <div class="flex items-center">
              <FormToggle :id="index" v-model="item.active" @change="changeServerActive(index, item.active)" />
            </div>
          </td>
          <td>
            <router-link
              active-class="current"
              :to="{
                name: 'projects-projectId-servers-serverId-members',
                params: { projectId: props.projectId, serverId: item.server_id }
              }"
            >
              <SvgIcon name="users" class="text-gray-700" />
            </router-link>
          </td>
          <td>
            <router-link
              active-class="current"
              :to="{
                name: 'projects-projectId-servers-serverId-activity',
                params: { projectId: props.projectId, serverId: item.server_id }
              }"
            >
              <SvgIcon name="clock" class="text-gray-700" />
            </router-link>
          </td>
          <td>
            <router-link
              active-class="current"
              :to="{
                name: 'projects-projectId-servers-serverId-firewall',
                params: { projectId: props.projectId, serverId: item.server_id }
              }"
            >
              <SvgIcon name="firewall" class="text-gray-700" />
            </router-link>
          </td>
          <td>
            <router-link
              active-class="current"
              :to="{
                name: 'projects-projectId-servers-serverId-setting',
                params: { projectId: props.projectId, serverId: item.server_id }
              }"
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
import { Badge, FormToggle, Pagination, SvgIcon } from "@/components";
import { addressToColor, getAddressType, serverSchemeToColor, showApiError, showMessage } from "@/utils";
import { defaultPageData, PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { ListServers_Request, ServerScheme } from "@proto/server";

const route = useRoute();
const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const props = defineProps({
  projectId: {
    type: String,
    default: null
  }
});

const getData = async (routeQuery: any): Promise<void> => {
  try {
    if (authStore.hasUserRole === 3) {
      routeQuery.user_id = authStore.hasUserID;
    }

    const queryParams = <ListServers_Request>{
      project_id: props.projectId,
      ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
      ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
    };

    const res = await api().GET(`/v1/servers`, queryParams);
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

const onSelectPage = (e: unknown): void => {
  getData(e);
};

const changeServerActive = async (index: number, online: boolean): Promise<void> => {
  try {
    const bodyParams = {
      user_id: authStore.hasUserID,
      server_id: pageData.value.base.servers[Number(index)].server_id,
      project_id: props.projectId,
      active: online
    };

    const res = await api(false).UPDATE(`/v1/servers`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message, online ? undefined : "connextWarning");
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

function addressColor(address: string): string {
  const addressToColorMap = {
    IPv4: addressToColor[1],
    IPv6: addressToColor[2]
  };

  return addressToColorMap[address] || addressToColor[3];
}

onMounted(async () => {
  document.title = "Servers list";
  await getData(route.query);
});
</script>
