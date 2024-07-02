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
    <div class="desc">Several options for adding new members are available. Choose the right one and follow the instructions.</div>

    <form @submit.prevent>
      <div class="content">
        <FormInput name="Title" v-model="pageData.base.host.title" :error="pageData.error['title']" class="flex-grow" />

        <div class="mt-5 w-full">
          <div class="flex">
            <FormInput name="Address" v-model.trim="pageData.base.host.address" :error="pageData.error['info.address']" class="mr-5 flex-grow" :required="true" />
            <FormInput name="Port" v-model.number="pageData.base.host.port" :error="pageData.error['info.port']" class="mr-5 flex-grow" :required="true" />
            <FormInput name="Login" v-model.trim="pageData.base.host.login" :error="pageData.error['info.login']" class="flex-grow" :required="true" />
          </div>

          <div class="mt-5 flex">
            <FormTextarea name="Description" v-model="pageData.base.host.description" :error="pageData.error['info.description']" :rows="6" class="flex-grow" />
          </div>

          <div class="mt-5 flex">
            <FormToggle name="Active" v-model="pageData.base.host.active" class="mr-5 flex-grow" id="active" @change="onUpdate('active')" />
            <FormToggle name="Audit" v-model="pageData.base.host.audit" class="flex-grow" id="audit" @change="onUpdate('audit')" />
          </div>
        </div>
      </div>

      <div class="divider before:bg-gray-100 after:bg-gray-100"></div>

      <div class="content">
        <FormButton @click="onUpdate('info')" :disabled="pageData.loading" :loading="pageData.loading">Update</FormButton>
      </div>
    </form>
  </div>

  <div class="artboard">
    <header class="mt-3">
      <h1>Access section</h1>
    </header>
    <div class="divider"></div>
    <div class="content">
      <form @submit.prevent>
        <div v-if="pageData.base.host.auth == Auth.password">
          <FormInput name="Password (hidden, can only be overwritten)" v-model.trim="pageData.base.access.password" :error="pageData.error['password']" class="flex-grow"
            type="password" autocomplete="current-password" />
        </div>

        <div v-if="pageData.base.host.auth == Auth.key" class="flex-grow">
          <div class="flex">
            <FormInput name="Public key" v-model="pageData.base.access.public_key" :error="pageData.error['public_key']" class="grow" :disabled="true" :required="true" />

            <FormButton lite class="ml-2 mt-8 flex-none" @click="copy(pageData.base.access.public_key)">
              <span>{{ (copied ? 'Copied' : 'Copy') }}</span>
            </FormButton>
            <FormButton lite :disabled="pageData.tmp.new_key" :rotate="pageData.tmp.new_key" class="ml-2 mt-8 flex-none" @click="genNewKey()">
              <SvgIcon name="refresh" />
            </FormButton>
          </div>
        </div>

        <FormButton v-if="pageData.base.access.key || pageData.base.access.password > 3" class="mt-8" @click="onUpdateAccess()" :disabled="pageData.tmp.loading_key"
          :loading="pageData.tmp.loading_key">Update key</FormButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useServerStore } from "@/store";
import { useClipboard } from '@vueuse/core'
import { SvgIcon, Tabs, FormInput, FormTextarea, FormToggle, FormButton } from "@/components";
import { showMessage } from "@/utils";
import { PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { Server_Request, UpdateServer_Info, ServerAccess_Request, UpdateServerAccess_Request, Auth } from "@proto/server";

// Tabs section
import { tabMenu } from "./tab";

const serverStore = useServerStore();
const pageData = ref<PageData>({
  base: {
    host: {},
    access: {},
  },
  tmp: {
    new_key: false,
    loading_key: false,
  },
  error: {},
});

const props = defineProps({
  projectId: String,
  serverId: String,
});

const getData = async () => {
  const { projectId, serverId } = props;

  try {
    const serverRequestParams = <Server_Request>{
      project_id: projectId,
      server_id: serverId,
    };

    const accessRequestParams = <ServerAccess_Request>{
      project_id: projectId,
      server_id: serverId,
    };

    const [serverRes, accessRes] = await Promise.all([
      api().GET(`/v1/servers`, serverRequestParams),
      api().GET(`/v1/servers/access`, accessRequestParams)
    ]);

    if (serverRes.data) {
      pageData.value.base.host = serverRes.data.result;
    }

    if (accessRes.data) {
      pageData.value.base.access.auth = accessRes.data.result.auth;

      switch (accessRes.data.result.auth) {
        case Auth.password:
          pageData.value.base.access.password = accessRes.data.result.Access.password;
          break;

        case Auth.key:
          pageData.value.base.access.public_key = accessRes.data.result.Access.Key.public;
          break;
      }
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

const onUpdate = async (typeData: string) => {
  delete pageData.value.base.scheme;

  const { projectId, serverId } = props;
  const { address, port, login, title, description, active, audit } = pageData.value.base.host;
  const bodyParams: any = {
    project_id: projectId,
    server_id: serverId,
  };

  let message: any = {
    warn: false,
    text: "",
  };

  const setMessage = (text: string, warn: boolean = false) => {
    message.text = text;
    message.warn = warn;
  };

  switch (typeData) {
    case "info":
      bodyParams.info = { address, port: port || null, login, title, description };
      setMessage("Server settings updated");
      break;
    case "active":
      bodyParams.active = active;
      setMessage(active ? "Server enabled" : "Server disabled", !active);
      break;
    case "audit":
      bodyParams.audit = audit;
      setMessage(audit ? "Audit settings enabled" : "Audit settings disabled", !audit);
      break;
    default:
      console.log("exit");
      return;
  }

  try {
    if (typeData === "info") {
      pageData.value.loading = true;
    }

    const res = await api(false).UPDATE(`/v1/servers`, {}, bodyParams);
    if (res.data) {
      if (typeData === "info") {
        serverStore.updateServerNameByID(props.projectId, props.serverId, title);
        ['address', 'port', 'login', 'description'].forEach(field => {
          pageData.value.error[`info.${field}`] = null;
        });
      }
      showMessage(res.data.message);
    }

    if (res.error && typeData === "info") {
      pageData.value.error = res.error.result;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    pageData.value.loading = false;
  }
};

const onUpdateAccess = async () => {
  const { projectId, serverId } = props;
  const { base, tmp, error } = pageData.value;

  try {
    tmp.loading_key = true;

    let bodyParams = {
      project_id: projectId,
      server_id: serverId,
      access: {},
    };

    switch (base.access.auth) {
      case Auth.password:
        bodyParams.access = { password: base.access.password };
        break;
      case Auth.key:
        bodyParams.access = { key: base.access.key };
        break;
      default:
        console.log("exit");
        return;
    }

    const res = await api().UPDATE(`/v1/servers/access`, {}, bodyParams);
    if (res.data) {
      base.access.key = null;
      base.access.password = null;
      showMessage(res.data.message);
      error.password = null;
    }
    if (res.error && base.access.auth === Auth.password) {
      error.password = res.error.result.password;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    tmp.loading_key = false;
  }
};

const genNewKey = async () => {
  const { tmp, base } = pageData.value;

  try {
    tmp.new_key = true;
    const res = await api().GET(`/v1/keys/generate`)
    if (res.data) {
      base.access.public_key = res.data.result.public;
      base.access.key = res.data.result.uuid;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    tmp.new_key = false;
  }
};

const { copy, copied } = useClipboard();
watch(copied, (val) => {
  if (val) {
    showMessage("The key has been copied to the clipboard");
  }
});

onMounted(async () => {
  document.title = "Server setting";
  serverStore.serverNameByID(props.projectId, props.serverId);
  await getData();

  if (pageData.value.base.host.audit === undefined) {
    pageData.value.base.host.audit = false;
  }

  if (pageData.value.base.host.active === undefined) {
    pageData.value.base.host.active = false;
  }
});
</script>
