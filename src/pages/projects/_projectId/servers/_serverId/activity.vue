<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ projectStore.getServerNameByID(props.projectId, props.serverId) }}</div>
    </header>
    <Tabs :tabs="tabMenu" />
    <div class="desc">Time at which access to the server is possible</div>

    <form @submit.prevent>
      <table>
        <tr v-for="(itemDay, day) in pageData.base" :key="day">
          <td class="worktime-weekday w-10 select-none pr-5 outline-none">
            <span
              class="cursor-pointer"
              :class="{ 'text-red-500': ['saturday', 'sunday'].includes(String(day)) }"
              @click="invertDay(day)"
            >
              {{ day }}
            </span>
          </td>
          <td>
            <div class="flex outline-none">
              <label
                v-for="(itemHour, hour) in itemDay"
                :key="hour"
                class="worktime-hours-item mr-1 grow cursor-pointer"
                @mousemove="invert('mousemove', day, hour)"
                @mousedown="startDrag"
              >
                <input
                  class="absolute -left-64 h-0 w-0"
                  type="checkbox"
                  :checked="itemHour"
                  @click="invert('click', day, hour)"
                />
                <span
                  class="square inline-flex h-8 w-6 items-center justify-center rounded bg-gray-300 text-white lg:w-full"
                >
                  {{ hour }}
                </span>
              </label>
            </div>
          </td>
        </tr>
      </table>

      <div class="content">
        <Badge name="Select All" class="cursor-pointer" @click.prevent="selectAll" />
        <Badge name="Unselect All" class="cursor-pointer" @click.prevent="selectNone" />
        <Badge name="Select Work Time" class="cursor-pointer" @click.prevent="selectWorkTime" />
      </div>

      <div class="divider"></div>

      <div class="content">
        <FormButton class="mr-5" :loading="pageData.loading" @click="onUpdate()">Update</FormButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useProjectStore } from "@/store";
import { showApiError, showMessage } from "@/utils";
import { Badge, FormButton, Tabs } from "@/components";
import { usePageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { ServerActivity_Request, UpdateServerActivity_Request } from "@proto/server";

// Tabs section
import { tabMenu } from "./tab";

const projectStore = useProjectStore();
const pageData = usePageData();

const props = defineProps({
  projectId: {
    type: String,
    default: null
  },
  serverId: {
    type: String,
    default: null
  }
});

const getData = async (): Promise<void> => {
  try {
    const queryParams = <ServerActivity_Request>{
      project_id: props.projectId,
      server_id: props.serverId
    };

    const res = await api().GET(`/v1/servers/activity`, queryParams);
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

const invert = (e: string, day: number, hour: number): void => {
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

const startDrag = (): void => {
  pageData.value.tmp.md = true;
  document.addEventListener("mouseup", stopDrag);
};

const stopDrag = (): void => {
  pageData.value.tmp.md = false;
  document.addEventListener("mouseup", stopDrag);
};

const invertDay = (day: number): void => {
  pageData.value.base[day] = pageData.value.base[day].map((item: number) => Number(!item));
};

const selectAll = (): void => {
  selectTimeWork(() => 1);
};

const selectNone = (): void => {
  selectTimeWork(() => 0);
};

const selectWorkTime = (): void => {
  selectTimeWork((_, prop, hour) => templateWork[prop][hour]);
};

const selectTimeWork = (e: any): void => {
  Object.keys(pageData.value.base).forEach((day) => {
    pageData.value.base[day] = pageData.value.base[day].map((item: number, hour: number) => e(item, day, hour));
  });
};

const onUpdate = async (): Promise<void> => {
  try {
    pageData.value.loading = true;

    const bodyParams = <UpdateServerActivity_Request>{
      project_id: props.projectId,
      server_id: props.serverId,
      activity: pageData.value.base
    };

    const res = await api().UPDATE(`/v1/servers/activity`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

// prettier-ignore
const templateWork = {
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
  projectStore.serverNameByID(props.projectId, props.serverId);
  await getData();
});
</script>

<style>
.worktime-hours-item input:checked ~ .square {
  background-color: #3dcc38;
}
</style>
