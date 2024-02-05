<template>
  <div class="artboard">
    <header>
      <h1>Profile logs</h1>
    </header>

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th class="w-32">Section</th>
          <th class="w-32">Event</th>
          <th class="w-64">Ip</th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.records" :key="index" class="cursor" @click="openDrawer(item.id)">
          <td>{{ toDate(item.created_at, "full") }}</td>
          <td>
            <Badge :name="Profile_Section[item.section]" />
          </td>
          <td>
            <Badge :name="EventType[item.event]" :color="eventTypeToColor[item.event]" />
          </td>
          <td>{{ item.ip }}</td>
          <td>
            <SvgIcon name="chevron_right" />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="artboard-content">
      <Pagination :total="data.total" @selectPage="onSelectPage" />
    </div>
  </div>

  <Drawer :is-open="isDrawerOpen" @close="closeDrawer" title="Name" maxWidth="600px">
    <table class="mini">
      <tr v-if="dataFull.event">
        <td width="120">Event</td>
        <td>
          <Badge :name="EventType[dataFull.event]" :color="eventTypeToColor[dataFull.event]" />
        </td>
      </tr>
      <tr>
        <td>ID</td>
        <td>{{ dataFull.id }}</td>
      </tr>
      <tr>
        <td>User ID</td>
        <td>{{ dataFull.user_id }}</td>
      </tr>
      <tr>
        <td>Remote IP</td>
        <td>{{ dataFull.ip }}</td>
      </tr>
      <tr>
        <td>User Agent</td>
        <td>{{ dataFull.user_agent }}</td>
      </tr>
      <tr>
        <td>Created</td>
        <td>{{ toDate(Object(dataFull.created_at), "full") }}</td>
      </tr>
      <tr v-if="dataFull.meta_data">
        <td>Metadata</td>
        <td>{{ decodeBase64(dataFull.meta_data) }}</td>
      </tr>
    </table>

  </Drawer>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, } from "vue";
import { useRoute } from "vue-router";
import { getEvents, getEvent } from "@/api/event";
import { SvgIcon, Pagination, Drawer, Badge } from "@/components";
import { Profile_Section, EventType } from "@proto/event";
import { toDate } from "@/utils/time";
import { eventTypeToColor } from "@/utils/color";

const { proxy } = getCurrentInstance() as any;
const data: any = ref({});
const dataFull: any = ref({});
const route = useRoute();

const isDrawerOpen = ref(false);
const logDescription: any = ref({});

const openDrawer = async (id: string) => {
  await getEvent("profile", proxy.$authStore.hasUserID, id).then((res) => {
    dataFull.value = res.data.result;
  });

  isDrawerOpen.value = true;
  logDescription.value = id;
};

const closeDrawer = async () => {
  dataFull.value = {};
  isDrawerOpen.value = false;
};

const getData = async (routeQuery: any) => {
  await getEvents("profile", proxy.$authStore.hasUserID, routeQuery).then((res) => {
    data.value = res.data.result;
  });
};

const onSelectPage = (e: any) => {
  getData(e);
};

onMounted(() => {
  getData(route.query);
});

function decodeBase64(encodedString: string): string {
  try {
    return atob(encodedString);
  } catch (e) {
    console.error('Error decoding Base64 string:', e);
    return '';
  }
}

</script>
@/utils/color
