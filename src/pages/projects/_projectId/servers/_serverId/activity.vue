<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ serverStore.getServerNameByID(props.projectId, props.serverId) }}</div>
    </header>
    <Tabs :tabs="tabMenu" />
    <div class="desc">Time at which access to the server is possible</div>

    <form @submit.prevent>
      <div class="flex w-full flex-row">
        <table>
          <tr v-for="(itemDay, day) in pageData.base" :key="day">
            <td class="worktime-weekday select-none pr-5 outline-none">
              <span class="cursor-pointer" @click="invertDay(day)" :class="{ 'text-red-500': ['saturday', 'sunday'].includes(String(day)) }">{{ day }}</span>
            </td>
            <td>
              <div class="flex select-none outline-none">
                <label v-for="(itemHour, hour) in itemDay" class="worktime-hours-item mr-1 cursor-pointer" @mousemove="invert('mousemove', day, hour)" @mousedown="startDrag">
                  <input class="absolute -left-64 h-0 w-0" type="checkbox" :checked="itemHour" @click="invert('click', day, hour)" />
                  <span class="square inline-flex h-8 w-8 select-none items-center justify-center rounded bg-gray-300 text-center text-white">{{ hour }}</span>
                </label>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div class="content">
        <Badge name="Select All" class="cursor-pointer" @click.prevent="selectAll" />
        <Badge name="Unselect All" class="cursor-pointer" @click.prevent="selectNone" />
        <Badge name="Select Work Time" class="cursor-pointer" @click.prevent="selectWorkTime" />
      </div>

      <div class="divider"></div>

      <div class="content">
        <FormButton class="mr-5" @click="onUpdate()" :loading="pageData.loading">Update</FormButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useServerStore } from "@/store";
import { showMessage } from "@/utils";
import { Tabs, Badge, FormButton } from "@/components";
import { PageData, defaultPageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { ServerActivity_Request, UpdateServerActivity_Request } from "@proto/server";

// Tabs section
import { tabMenu } from "./tab";

const serverStore = useServerStore();
const pageData = ref<PageData>(defaultPageData);

const props = defineProps({
  projectId: String,
  serverId: String,
});

const getData = async () => {
  try {
    const queryParams = <ServerActivity_Request>{
      project_id: props.projectId,
      server_id: props.serverId,
    };

    const res = await api().GET(`/v1/servers/activity`, queryParams);
    if (res.data) {
      pageData.value.base = res.data.result;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const invert = (e: String, day: number, hour: number) => {
  if (pageData.value.tmp.md && e == "mousemove") {
    if (pageData.value.tmp.prevDay == day && pageData.value.tmp.prevHour == hour) {
      return;
    }
    pageData.value.tmp.prevDay = day;
    pageData.value.tmp.prevHour = hour;

    pageData.value.base[day][hour] = Number(!pageData.value.base[day][hour]);
  }

  if (e == "click") {
    pageData.value.base[day][hour] = Number(!pageData.value.base[day][hour]);
  }
};

const startDrag = () => {
  pageData.value.tmp.md = true;
  document.addEventListener("mouseup", stopDrag);
};

const stopDrag = () => {
  pageData.value.tmp.md = false;
  document.addEventListener("mouseup", stopDrag);
};

const invertDay = (day: number) => {
  pageData.value.base[day] = pageData.value.base[day].map((item: number) => Number(!item));
};

const selectAll = () => {
  selectTimeWork(() => 1);
};

const selectNone = () => {
  selectTimeWork(() => 0);
};

const selectWorkTime = () => {
  selectTimeWork((_, prop, hour) => templateWork[prop][hour]);
};

const selectTimeWork = (e: any) => {
  Object.keys(pageData.value.base).forEach((day) => {
    pageData.value.base[day] = pageData.value.base[day].map((item: number, hour: number) => e(item, day, hour));
  });
};

const onUpdate = async () => {
  try {
    pageData.value.loading = true;

    const bodyParams = <UpdateServerActivity_Request>{
      project_id: props.projectId,
      server_id: props.serverId,
      activity: pageData.value.base,
    };

    const res = await api().UPDATE(`/v1/servers/activity`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

// prettier-ignore
const templateWork: any = {
  //0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23
  monday: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  thursday: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  friday: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  saturday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  sunday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

onMounted(async () => {
  document.title = "Server activity";
  serverStore.serverNameByID(props.projectId, props.serverId);
  await getData();
});
</script>

<style>
.worktime-hours-item input:checked~.square {
  background-color: #3dcc38;
}
</style>
