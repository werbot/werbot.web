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
    <div class="desc">
      Several options for adding new members are available. Choose the right one and follow the instructions.
    </div>

    <form @submit.prevent>
      <div class="content">
        <FormInput v-model="pageData.base.host.title" name="Title" :error="pageData.error['title']" class="flex-grow" />

        <div class="mt-5 w-full">
          <div class="flex">
            <FormInput
              v-model.trim="pageData.base.host.address"
              name="Address"
              :error="pageData.error['info.address']"
              class="mr-5 flex-grow"
              :required="true"
            />
            <FormInput
              v-model.number="pageData.base.host.port"
              name="Port"
              :error="pageData.error['info.port']"
              class="mr-5 flex-grow"
              :required="true"
            />
            <FormInput
              v-model.trim="pageData.base.host.login"
              name="Login"
              :error="pageData.error['info.login']"
              class="flex-grow"
              :required="true"
            />
          </div>

          <div class="mt-5 flex">
            <FormTextarea
              v-model="pageData.base.host.description"
              name="Description"
              :error="pageData.error['info.description']"
              :rows="6"
              class="flex-grow"
            />
          </div>

          <div class="mt-5 flex">
            <FormToggle
              id="active"
              v-model="pageData.base.host.active"
              name="Active"
              class="mr-5 flex-grow"
              @change="onUpdate('active')"
            />
            <FormToggle
              id="audit"
              v-model="pageData.base.host.audit"
              name="Audit"
              class="flex-grow"
              @change="onUpdate('audit')"
            />
          </div>
        </div>
      </div>

      <div class="divider before:bg-gray-100 after:bg-gray-100"></div>

      <div class="content">
        <FormButton :disabled="pageData.loading" :loading="pageData.loading" @click="onUpdate('info')"
          >Update</FormButton
        >
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
        <div v-if="pageData.base.host.auth == AuthMethod.password">
          <FormInput
            v-model.trim="pageData.base.access.password"
            name="Password (hidden, can only be overwritten)"
            :error="pageData.error['password']"
            class="flex-grow"
            type="password"
            autocomplete="current-password"
          />
        </div>

        <div v-if="pageData.base.host.auth == AuthMethod.key" class="flex-grow">
          <div class="flex">
            <FormInput
              v-model="pageData.base.access.public_key"
              name="Public key"
              :error="pageData.error['public_key']"
              class="grow"
              :disabled="true"
              :required="true"
            />

            <FormButton lite class="mt-8 ml-2 flex-none" @click="copy(pageData.base.access.public_key)">
              <span>{{ copied ? "Copied" : "Copy" }}</span>
            </FormButton>
            <FormButton
              lite
              :disabled="pageData.tmp.new_key"
              :rotate="pageData.tmp.new_key"
              class="mt-8 ml-2 flex-none"
              @click="genNewKey()"
            >
              <SvgIcon name="refresh" />
            </FormButton>
          </div>
        </div>

        <FormButton
          v-if="pageData.base.access.key_id || pageData.base.access.password > 3"
          class="mt-8"
          :disabled="pageData.tmp.loading_key"
          :loading="pageData.tmp.loading_key"
          @click="onUpdateAccess()"
        >
          Update key
        </FormButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useProjectStore } from "@/store";
import { useClipboard } from "@vueuse/core";
import { FormButton, FormInput, FormTextarea, FormToggle, SvgIcon, Tabs } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { AuthMethod } from "@proto/scheme/auth";

// Tabs section
import { tabMenu } from "./tab";

const projectStore = useProjectStore();
const pageData = ref<PageData>({
  base: {
    host: {},
    access: {}
  },
  tmp: {
    new_key: false,
    loading_key: false,
    schemeKey: null
  },
  error: {}
});

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
  const { projectId, serverId } = props;

  try {
    const [serverRes, accessRes] = await Promise.all([
      api().GET(`/v1/schemes/${projectId}/${serverId}`),
      api().GET(`/v1/schemes/${projectId}/${serverId}/access`)
    ]);

    if (serverRes.data) {
      const server = serverRes.data.result;
      pageData.value.base.host = {
        ...server,
        auth: server.auth_method
      };
    }

    if (accessRes.data) {
      const accessScheme = accessRes.data.result?.scheme;
      const [schemeKey, scheme] = Object.entries(accessScheme ?? {})[0] ?? [];

      if (schemeKey && scheme) {
        const schemeData = scheme as any;
        pageData.value.tmp.schemeKey = schemeKey;
        pageData.value.base.host.address = schemeData.address;
        pageData.value.base.host.port = schemeData.port;

        const [authKey, authData] = Object.entries(schemeData.access ?? {})[0] ?? [];
        const auth = authData as any;

        if (authKey === "password") {
          pageData.value.base.access.auth = AuthMethod.password;
          pageData.value.base.host.auth = AuthMethod.password;
          pageData.value.base.host.login = auth.login;
          pageData.value.base.access.password = "";
        } else if (authKey === "key") {
          pageData.value.base.access.auth = AuthMethod.key;
          pageData.value.base.host.auth = AuthMethod.key;
          pageData.value.base.host.login = auth.login;
          pageData.value.base.access.key_id = auth.key_id;
          pageData.value.base.access.public_key = auth.key?.public ?? "";
        }
      }
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const buildAccessScheme = (): Record<string, any> | null => {
  const { base, tmp } = pageData.value;
  const schemeKey = tmp.schemeKey;

  if (!schemeKey) {
    return null;
  }

  let access: Record<string, any> | null = null;

  switch (base.host.auth) {
    case AuthMethod.password:
      if (base.access.password) {
        access = { password: { login: base.host.login, password: base.access.password } };
      }
      break;
    case AuthMethod.key:
      if (base.access.key_id) {
        access = { key: { login: base.host.login, key_id: base.access.key_id } };
      }
      break;
    default:
      access = null;
  }

  if (!access) {
    return null;
  }

  return {
    [schemeKey]: {
      address: base.host.address,
      port: base.host.port,
      access
    }
  };
};

const onUpdate = async (typeData: string): Promise<void> => {
  const { projectId, serverId } = props;
  const { title, description, active, audit } = pageData.value.base.host;

  let message: any = {
    warn: false,
    text: ""
  };

  const setMessage = (text: string, warn: boolean = false): void => {
    message.text = text;
    message.warn = warn;
  };

  try {
    if (typeData === "info") {
      pageData.value.loading = true;
    }

    let requests: Promise<any>[] = [];

    switch (typeData) {
      case "info": {
        requests = [
          api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { title }),
          api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { description })
        ];

        const access = buildAccessScheme();
        if (access) {
          requests.push(api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { scheme: access }));
        }
        // TODO: address/port cannot be saved for password auth without re-entering the password.
        setMessage("Server settings updated");
        break;
      }
      case "active":
        requests = [api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { active })];
        setMessage(active ? "Server enabled" : "Server disabled", !active);
        break;
      case "audit":
        requests = [api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { audit })];
        setMessage(audit ? "Audit settings enabled" : "Audit settings disabled", !audit);
        break;
      default:
        console.log("exit");
        return;
    }

    const responses = await Promise.all(requests);
    const failed = responses.find((res) => res.error);

    if (failed) {
      if (typeData === "info") {
        pageData.value.error = failed.error.result;
      }
      showApiError(failed.error);
      return;
    }

    if (typeData === "info") {
      projectStore.updateServerNameByID(props.projectId, props.serverId, title);
      ["address", "port", "login", "description"].forEach((field) => {
        pageData.value.error[`info.${field}`] = null;
      });
    }

    showMessage(message.text, message.warn ? "connextWarning" : undefined);
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

const onUpdateAccess = async (): Promise<void> => {
  const { projectId, serverId } = props;
  const { base, tmp, error } = pageData.value;

  try {
    tmp.loading_key = true;

    const access = buildAccessScheme();
    if (!access) {
      return;
    }

    const res = await api().UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { scheme: access });
    if (res.data) {
      base.access.key = null;
      base.access.password = null;
      showMessage(res.data.message);
      error.password = null;
    }
    if (res.error && base.access.auth === AuthMethod.password) {
      error.password = res.error.result.password;
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    tmp.loading_key = false;
  }
};

const genNewKey = async (): Promise<void> => {
  const { tmp, base } = pageData.value;

  try {
    tmp.new_key = true;
    const res = await api().GET(`/v1/keys/generate`);
    if (res.data) {
      base.access.public_key = res.data.result.public;
      base.access.key_id = res.data.result.uuid;
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
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
  projectStore.serverNameByID(props.projectId, props.serverId);
  await getData();

  if (pageData.value.base.host.audit === undefined) {
    pageData.value.base.host.audit = false;
  }

  if (pageData.value.base.host.active === undefined) {
    pageData.value.base.host.active = false;
  }
});
</script>
