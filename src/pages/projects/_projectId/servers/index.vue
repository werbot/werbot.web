<template>
  <div class="artboard">
    <header>
      <h1>Servers</h1>
      <router-link :to="{ name: 'projects-projectId-servers-add' }">
        <label class="plus">
          <SvgIcon name="plus_square" />
          add new
        </label>
      </router-link>
    </header>

    <table v-if="data.total > 0">
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
        <tr v-for="(item, index) in data.servers" :key="index">
          <td>
            <div class="flex items-center">
              <span class="dot" :class="item.online ? 'bg-green-500' : 'bg-gray-200'"></span>
            </div>
          </td>
          <td>
            <router-link active-class="current" :to="{ name: 'projects-projectId-servers-serverId-session', params: { projectId: props.projectId, serverId: item.server_id } }">
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
              <FormToggle v-model="item.active" :id="index" @change="changeServerActive(index, item.active)" />
            </div>
          </td>
          <td>
            <router-link active-class="current" :to="{ name: 'projects-projectId-servers-serverId-members', params: { projectId: props.projectId, serverId: item.server_id } }">
              <SvgIcon name="users" class="text-gray-700" />
            </router-link>
          </td>
          <td>
            <router-link active-class="current" :to="{ name: 'projects-projectId-servers-serverId-activity', params: { projectId: props.projectId, serverId: item.server_id } }">
              <SvgIcon name="clock" class="text-gray-700" />
            </router-link>
          </td>
          <td>
            <router-link active-class="current" :to="{ name: 'projects-projectId-servers-serverId-firewall', params: { projectId: props.projectId, serverId: item.server_id } }">
              <SvgIcon name="firewall" class="text-gray-700" />
            </router-link>
          </td>
          <td>
            <router-link active-class="current" :to="{ name: 'projects-projectId-servers-serverId-setting', params: { projectId: props.projectId, serverId: item.server_id } }">
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
import { ref, onMounted, getCurrentInstance, reactive } from "vue";
import { useRoute } from "vue-router";
import { SvgIcon, Pagination, FormToggle, Badge } from "@/components";
import { showMessage } from "@/utils/message";

import { getAddressType } from "@/utils/network";
import { addressToColor, serverSchemeToColor } from "@/utils/color";
import { servers, updateServer } from "@/api/server";
import { ServerScheme, UpdateServer_Request } from "@proto/server";

const { proxy } = getCurrentInstance() as any;

//const addressType = reactive(null);
const route = useRoute();
const data: any = ref({});
const props = defineProps({
  projectId: String,
});

const getData = async (routeQuery: any) => {
  if (proxy.$authStore.hasUserRole === 3) {
    routeQuery.user_id = proxy.$authStore.hasUserID;
  }
  routeQuery.project_id = props.projectId;
  await servers(routeQuery.user_id, routeQuery.project_id, routeQuery).then((res) => {
    data.value = res.data.result;
  });
};

const onSelectPage = (e: any) => {
  getData(e);
};

onMounted(async () => {
  document.title = "Servers list";

  getData(route.query);
});

const changeServerActive = async (index: number, online: boolean) => {
  data.value.servers[Number(index)].active = online;

  await updateServer(<UpdateServer_Request>{
    user_id: proxy.$authStore.hasUserID,
    server_id: data.value.servers[Number(index)].server_id,
    project_id: props.projectId,
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


function addressColor(address: string): string {
  switch (address) {
    case "IPv4":
      return addressToColor[1];
    case "IPv6":
      return addressToColor[2];
    default:
      return addressToColor[3];
  }
}

</script>
