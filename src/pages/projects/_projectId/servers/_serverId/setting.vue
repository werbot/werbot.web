<template>
  <div class="artboard">
    <header>
      <h1><router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">Servers</router-link></h1>
      <div class="breadcrumbs">{{ data.host.title }}</div>
    </header>
    <Tabs :tabs="tabMenu" />
    <div class="desc">Several options for adding new members are available. Choose the right one and follow the instructions.</div>

    <form @submit.prevent>
      <div class="artboard-content">
        <FormInput name="Title" v-model="data.host.title" :error="error.errors.title" class="flex-grow" />
      </div>

      <div class="artboard-content mb-5">
        <div class="w-full">
          <div class="flex flex-row">
            <FormInput name="Address" v-model.trim="data.host.address" :error="error.errors.address" class="mr-5 flex-grow" :required="true" />
            <FormInput name="Port" v-model.number="data.host.port" :error="error.errors.port" class="mr-5 flex-grow" :required="true" />
            <FormInput name="Login" v-model.trim="data.host.login" :error="error.errors.login" class="flex-grow" :required="true" />
          </div>

          <div class="flex flex-row">
            <FormTextarea name="Description" v-model="data.host.description" :error="error.errors.description" :rows="6" class="flex-grow" />
          </div>

          <div class="mt-5 flex flex-row">
            <Toggle name="Active" v-model="data.host.active" class="mr-5 flex-grow" id="active" @change="onUpdate('active', false)" />
            <Toggle name="Audit" v-model="data.host.audit" class="flex-grow" id="audit" @change="onUpdate('audit', false)" />
          </div>
        </div>
      </div>

      <div class="divider before:bg-gray-100 after:bg-gray-100"></div>

      <div class="artboard-content py-5">
        <div class="flex-none">
          <button type="submit" @click="onUpdate('info', false)" class="btn mr-5">Update</button>
          <button type="submit" @click="onUpdate('info', true)" class="btn">Update and close</button>
        </div>
        <div class="flex-grow"></div>
        <button type="submit" @click="openModal()" class="btn">Delete server</button>
      </div>
    </form>
  </div>

  <div class="artboard">
    <header class="mt-3">
      <h1>Access section</h1>
    </header>
    <div class="divider"></div>
    <div class="artboard-content">
      <form @submit.prevent>
        <div v-if="data.host.auth == Auth.password">
          <FormInput name="Password (hidden, can only be overwritten)" v-model.trim="data.access.password" :error="error.errors.password" class="flex-grow" type="password"
            autocomplete="current-password" />
        </div>

        <div v-if="data.host.auth == Auth.key">
          <FormInput name="Public key" v-model="data.access.public_key" :error="error.errors.public_key" class="w-full" :disabled="true" :required="true" />

          <button type="submit" class="btn mt-5 bg-green-500" @click="genNewKey()">
            Generate new key
          </button>
        </div>

        <div class="my-5">
          <button v-if="data.access.key || data.access.password > 3" type="submit" class="btn" @click="onUpdateAccess" :disabled="loading">
            <div v-if="loading">
              <span>Loading...</span>
            </div>
            <span v-else>Update access</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <Modal :showModal="modalActive" @close="closeModal" title="Are you sure you want to delete this server?">
    <p>
      This action CANNOT be undone. This will permanently delete the server and if you’d like to use
      it in the future, you will need to added it again.<br />
    </p>
    <template v-slot:footer>
      <div class="flex flex-row justify-end">
        <button class="btn btn-red" @click="remoteServer()">Delete server</button>
        <button class="btn ml-5" @click="closeModal">Close</button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { server, updateServer, updateAccess, deleteServer, access } from "@/api/server";
import { newKey } from "@/api/key";
import {
  Server_Request,
  UpdateServer_Request,
  UpdateServer_Info,
  DeleteServer_Request,
  ServerAccess_Request,
  UpdateServerAccess_Request,
  Auth,
} from "@proto/server";
import { Tabs, FormInput, FormTextarea, Toggle, Modal } from "@/components";
import { useErrorStore } from "@/store";
import { showMessage } from "@/utils/message";

// Tabs section
import { tabMenu } from "./tab";

const { proxy } = getCurrentInstance() as any;
const error: any = useErrorStore();
const router = useRouter();
const data: any = ref({
  host: <any>{},
  access: <any>{},
});
const loading = ref(false);
const props = defineProps({
  projectId: String,
  serverId: String,
});

const modalActive = ref(false);
const openModal = async () => {
  modalActive.value = true;
};
const closeModal = () => {
  modalActive.value = false;
};

const onUpdate = async (typeData: string, redirect: boolean) => {
  delete data.value.scheme;
  let update = <UpdateServer_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
  };
  let message: any = {
    warn: false,
    text: "",
  };

  switch (typeData) {
    case "info": {
      update.setting = <any>{
        info: <UpdateServer_Info>{
          address: data.value.host.address,
          port: data.value.host.port,
          login: data.value.host.login,
          title: data.value.host.title,
          description: data.value.host.description,
        },
      };
      message.text = "Server settings updated";
      break;
    }
    case "active": {
      update.setting = <any>{
        active: data.value.host.active,
      };
      if (data.value.host.active === false) {
        message.warn = true;
        message.text = "Server disabled";
      } else {
        message.text = "Server enabled";
      }
      break;
    }
    case "audit": {
      update.setting = <any>{
        audit: data.value.host.audit,
      };
      if (data.value.host.audit === false) {
        message.warn = true;
        message.text = "Audit settings disabled";
      } else {
        message.text = "Audit settings enabled";
      }
      break;
    }
    default: {
      console.log("exit");
      break;
    }
  }

  await updateServer(update)
    .then((res) => {
      if (res.data.code === 200) {
        if (message.warn) {
          showMessage(message.text, "connextWarning");
        } else {
          showMessage(message.text);
        }
        proxy.$errorStore.$reset();
      }
    })
    .catch((err) => {
      showMessage(err.response.data.message, "connextError");
    });

  if (redirect) {
    router.push({ name: "projects-projectId-servers" });
  }
};

const onUpdateAccess = async () => {
  console.log(data.value.access);
  let update = <UpdateServerAccess_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
  };

  switch (data.value.access.auth) {
    case Auth.password: {
      update.access = <any>{
        password: data.value.access.password,
      };
      break;
    }
    case Auth.key: {
      update.access = <any>{
        key: data.value.access.key,
      };
      break;
    }

    default: {
      console.log("exit");
      break;
    }
  }

  await updateAccess(update)
    .then((res) => {
      if (res.data.code === 200) {
        showMessage(res.data.message);
        proxy.$errorStore.$reset();
      }
    })
    .catch((err) => {
      showMessage(err.response.data.message, "connextError");
    });
};

const remoteServer = async () => {
  await deleteServer(<DeleteServer_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
  }).then((res) => {
    if (res.data.code === 200) {
      const eventError = new CustomEvent("connextSuccess", {
        detail: res.data.message,
      });
      dispatchEvent(eventError);
    }
  });

  router.push({ name: "projects-projectId-servers" });
};

const genNewKey = async () => {
  await newKey().then((res) => {
    data.value.access.public_key = res.data.result.public;
    data.value.access.key = res.data.result.uuid;
  });
};

onMounted(async () => {
  await access(<ServerAccess_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
  }).then((res) => {
    data.value.access.auth = res.data.result.auth;

    switch (res.data.result.auth) {
      case Auth.password:
        data.value.access.password = res.data.result.Access.password;
        break;

      case Auth.key:
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

  if (data.value.host.audit === undefined) {
    data.value.host.audit = false;
  }

  if (data.value.host.active === undefined) {
    data.value.host.active = false;
  }
});

onBeforeUnmount(() => error.$reset());

document.title = "server edit";
</script>
