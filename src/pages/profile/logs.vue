<template>
  <Skeleton v-if="!pageData.base.total" class="text-gray-200" />

  <div v-else class="artboard">
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
        <tr v-for="(item, index) in pageData.base.records" :key="index" class="cursor" @click="openDrawer(item.id)">
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

    <Pagination :total="pageData.base.total" class="content" @select-page="onSelectPage" />
  </div>

  <Drawer :is-open="pageData.modal" title="Name" max-width="600px" @close="closeDrawer()">
    <table class="mini">
      <tr v-if="pageData.tmp.event">
        <td width="120">Event</td>
        <td>
          <Badge :name="EventType[pageData.tmp.event]" :color="eventTypeToColor[pageData.tmp.event]" />
        </td>
      </tr>
      <tr>
        <td>ID</td>
        <td>{{ pageData.tmp.id }}</td>
      </tr>
      <tr>
        <td>User ID</td>
        <td>{{ pageData.tmp.user_id }}</td>
      </tr>
      <tr>
        <td>Remote IP</td>
        <td>{{ pageData.tmp.ip }}</td>
      </tr>
      <tr>
        <td>User Agent</td>
        <td>{{ pageData.tmp.user_agent }}</td>
      </tr>
      <tr>
        <td>Created</td>
        <td>{{ toDate(Object(pageData.tmp.created_at), "full") }}</td>
      </tr>
      <tr v-if="pageData.tmp.meta_data">
        <td>Metadata</td>
        <td>{{ decodeBase64(pageData.tmp.meta_data) }}</td>
      </tr>
    </table>
  </Drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store";
import { Badge, Drawer, Pagination, Skeleton, SvgIcon } from "@/components";
import { decodeBase64, eventTypeToColor, showApiError, toDate } from "@/utils";
import { defaultPageData, PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { EventType, Profile_Section } from "@proto/event";

const route = useRoute();
const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

const openDrawer = async (id: string): Promise<void> => {
  try {
    const res = await api().GET(`/v1/event/profile/${authStore.hasUserID}/${id}`);
    if (res.data) {
      pageData.value.tmp = res.data.result;
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.modal = true;
  }
};

const closeDrawer = async (): Promise<void> => {
  pageData.value.tmp = {};
  pageData.value.modal = false;
};

const getData = async (routeQuery?: any): Promise<void> => {
  try {
    const queryParams = {
      ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
      ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
    };

    const res = await api().GET(`/v1/event/profile/${authStore.hasUserID}`, queryParams);
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

const onSelectPage = (e: unknown): void => {
  getData(e);
};

onMounted(async () => {
  document.title = "Profile logs";
  await getData(route.query);
});
</script>
