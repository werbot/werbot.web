<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ serverName }}</div>
    </header>
    <Tabs :tabs="tabMenu" />
    <div class="desc">Time at which access to the server is possible</div>

    <form @submit.prevent>
      <div class="flex w-full flex-row">
        <table>
          <tr v-for="(itemDay, day) in data" :key="day">
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
        <button type="submit" class="btn mr-5" @click="onUpdate(false)" :disabled="loading">
          <div v-if="loading">
            <span>Loading...</span>
          </div>
          <span v-else>Update</span>
        </button>

        <button type="submit" class="btn" @click="onUpdate(true)" :disabled="loading">
          <div v-if="loading">
            <span>Loading...</span>
          </div>
          <span v-else>Update and close</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { serverNameByID, activity, updateActivity } from "@/api/server";
import { ServerNameByID_Request, ServerActivity_Request, UpdateServerActivity_Request } from "@proto/server";
import { useErrorStore } from "@/store";
import { Tabs, Badge } from "@/components";

// Tabs section
import { tabMenu } from "./tab";

const { proxy } = getCurrentInstance() as any;
const error: any = useErrorStore();
const router = useRouter();
const data: any = ref({});
const serverName: any = ref("");
const loading = ref(false);
const props = defineProps({
  projectId: String,
  serverId: String,
});

const serverActivity: any = ref({});
const invert = (event: String, day: number, hour: number) => {
  if (serverActivity.value.md && event == "mousemove") {
    if (serverActivity.value.prevDay == day && serverActivity.value.prevHour == hour) {
      return;
    }
    serverActivity.value.prevDay = day;
    serverActivity.value.prevHour = hour;

    data.value[day][hour] = Number(!data.value[day][hour]);
  }

  if (event == "click") {
    data.value[day][hour] = Number(!data.value[day][hour]);
  }
};

const startDrag = () => {
  serverActivity.value.md = true;
  document.addEventListener("mouseup", stopDrag);
};

const stopDrag = () => {
  serverActivity.value.md = false;
};

const invertDay = (day: number) => {
  data.value[day].map((item: number, hour: number) => {
    data.value[day][hour] = Number(!item);
  });
};

const selectAll = () => {
  selectTimeWork(() => {
    return 1;
  });
};

const selectNone = () => {
  selectTimeWork(() => {
    return 0;
  });
};
const selectWorkTime = () => {
  selectTimeWork((_day: any, prop: string, hour: number) => {
    return templateWork[prop][hour];
  });
};

const selectTimeWork = (e: any) => {
  for (var day in data.value) {
    data.value[day] = data.value[day].map((item: number, hour: number) => {
      return e(item, day, hour);
    });
  }
};

const onUpdate = async (redirect: boolean) => {
  await updateActivity(<UpdateServerActivity_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
    activity: data.value,
  }).then((res) => {
    if (res.data.code === 200) {
      const eventError = new CustomEvent("connextSuccess", {
        detail: res.data.message,
      });
      dispatchEvent(eventError);
    }
  });

  if (redirect) {
    router.push({ name: "projects-projectId-servers" });
  }
};

onMounted(async () => {
  document.title = "Server activity";

  await serverNameByID(<ServerNameByID_Request>{
    user_id: proxy.$authStore.hasUserID,
    server_id: props.serverId,
    project_id: props.projectId,
  }).then((res) => {
    serverName.value = res.data.result.server_name;
  });


  await activity(<ServerActivity_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
  }).then((res) => {
    data.value = res.data.result;
  });
});

onBeforeUnmount(() => error.$reset());

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
</script>

<style>
.worktime-hours-item input:checked~.square {
  background-color: #3dcc38;
}
</style>
