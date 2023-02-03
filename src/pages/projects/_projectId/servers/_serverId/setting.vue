<template>
  <div class="artboard">
    <header>
      <h1>Servers</h1>
      <div class="breadcrumbs">
        <BServerName
          :memberId="proxy.$authStore.hasUserID"
          :serverId="props.serverId"
          :projectId="props.projectId"
        />
        <span>Setting</span>
      </div>
    </header>

    <div class="desc">
      Several options for adding new members are available. Choose the right one and follow the
      instructions.
    </div>

    <form @submit.prevent>
      <div class="artboard-content">
        <FormInput
          name="Title"
          v-model="data.host.title"
          :error="error.errors.title"
          class="flex-grow"
        />
      </div>

      <div v-if="data.host.auth == 'password'" class="artboard-content">
        <FormInput
          name="Password (hidden, can only be overwritten)"
          v-model.trim="data.access.password"
          :error="error.errors.password"
          class="flex-grow"
          type="password"
          autocomplete="current-password"
        />
      </div>

      <div v-if="data.host.auth == 'key'" class="artboard-content">
        <FormTextarea
          name="Public key"
          v-model="data.access.public_key"
          :error="error.errors.public_key"
          class="w-full"
          :disabled="true"
          :required="true"
          :rows="6"
        />

        <button type="submit" class="btn mt-5" @click="genNewKey()">Generate new key</button>
      </div>

      <div class="artboard-content mb-5">
        <div class="w-full">
          <div class="mt-5 flex flex-row">
            <FormInput
              name="Address"
              v-model.trim="data.host.address"
              :error="error.errors.address"
              class="mr-5 flex-grow"
              :required="true"
            />

            <FormInput
              name="Port"
              v-model.number="data.host.port"
              :error="error.errors.port"
              class="mr-5 flex-grow"
              :required="true"
            />

            <FormInput
              name="Login"
              v-model.trim="data.host.login"
              :error="error.errors.login"
              class="flex-grow"
              :required="true"
            />
          </div>

          <div class="flex flex-row">
            <FormTextarea
              name="Public Description"
              v-model="data.host.description"
              :error="error.errors.description"
              :rows="6"
              class="flex-grow"
            />

          </div>

          <div class="mt-5 flex flex-row">
            <Toggle name="Active" v-model="data.host.active" class="mr-5 flex-grow" />
            <Toggle name="Audit" v-model="data.host.audit" class="flex-grow" />
          </div>
        </div>
      </div>

      <div class="divider before:bg-gray-100 after:bg-gray-100"></div>

      <div class="artboard-content py-5">
        <div class="flex-none">
          <button type="submit" @click="onUpdate('info', false)" class="btn mr-5">Update</button>
          <button type="submit" @click="onUpdate('info', true)" class="btn">
            Update and close
          </button>
        </div>
        <div class="flex-grow"></div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { server, updateServer, deleteServer, access } from "@/api/server";
import { newKey } from "@/api/key";
import {
  Server_Request,
  UpdateServer_Request,
  UpdateServer_Info,
  DeleteServer_Request,
  ServerAccess_Request,
} from "@proto/server";
import { FormInput, FormTextarea, BServerName, Toggle } from "@/components";
import { useErrorStore } from "@/store";
import { exit } from "process";

const { proxy } = getCurrentInstance();
const error: any = useErrorStore();
const router = useRouter();
const data: any = ref({
  host: {},
  access: {},
});
const loading = ref(false);
const props = defineProps({
  projectId: String,
  serverId: String,
});

const onUpdate = async (typeData: string, redirect: boolean) => {
  delete data.value.scheme;

  console.log(typeData);

  switch (typeData) {
    case "info": {
      console.log("info");
      break;
    }
    case "audit": {
      console.log("audit");
      break;
    }
    case "active": {
      console.log("active");
      break;
    }
    default: {
      console.log("exit");
      break;
    }
  }

  /*
  await updateServer(<UpdateServer_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
    setting: {
      info: <UpdateServer_Info>{
        address: data.value.host.address,
        port: data.value.host.port,
        login: data.value.host.login,
        title: data.value.host.title,
        description: data.value.host.description,
      },
    },
  }).then((res) => {
    if (res.data.success) {
      const eventError = new CustomEvent("connextSuccess", {
        detail: res.data.message,
      });
      dispatchEvent(eventError);
    }
  });

  //if (redirect) {
  //  router.push({ name: "users-userId-projects-projectId-servers" });
  //}
  */
};

const remoteServer = async () => {
  await deleteServer(<DeleteServer_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
  }).then((res) => {
    if (res.data.success) {
      const eventError = new CustomEvent("connextSuccess", {
        detail: res.data.message,
      });
      dispatchEvent(eventError);
    }
  });

  // router.push({ name: "users-userId-projects-projectId-servers" });
};

const genNewKey = async () => {
  await newKey().then((res) => {
    data.value.access.public_key = res.data.result.public;
    data.value.access.key_uuid = res.data.result.uuid;
  });
};

onMounted(async () => {
  await access(<ServerAccess_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
  }).then((res) => {
    data.value.access.auth = res.data.result.auth;

    switch (res.data.result.auth) {
      case 1: // 1 - password
        data.value.access.password = res.data.result.Access.password;
        break;

      case 2: // 2 - key
        data.value.access.public_key = res.data.result.Access.Key.public;
        break;
    }
  });

  await server(<Server_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
  }).then((res) => {
    data.value.host = res.data.result;
  });
});

onBeforeUnmount(() => error.$reset());

document.title = "server edit";
</script>
