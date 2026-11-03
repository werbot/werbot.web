<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">
        <router-link :to="{ name: 'projects-projectId-servers-add', params: { projectId: props.projectId } }">
          Select scheme
        </router-link>
        <span>{{ props.scheme }}</span>
      </div>
    </header>
    <div class="desc">Step 2: Fill in the fields to connect.</div>

    <form @submit.prevent>
      <!-- SSH -->
      <div v-if="props.scheme == ServerScheme[3]" class="content">
        <FormInput v-model="pageData.base.title" name="Title" :error="pageData.error['title']" class="flex-grow" />

        <div class="mt-5 w-full">
          <div class="flex">
            <FormInput
              v-model.trim="pageData.base.address"
              name="Address"
              :error="pageData.error['address']"
              class="mr-5 flex-grow"
              :required="true"
            />
            <FormInput
              v-model.number="pageData.base.port"
              name="Port"
              :error="pageData.error['port']"
              class="mr-5 flex-grow"
              :required="true"
            />
            <FormInput
              v-model.trim="pageData.base.login"
              name="Login"
              :error="pageData.error['login']"
              class="flex-grow"
              :required="true"
            />
          </div>

          <div class="mt-5 flex">
            <FormTextarea
              v-model="pageData.base.description"
              name="Description"
              :error="pageData.error['description']"
              :rows="6"
              class="flex-grow"
            />
          </div>

          <div class="mt-5 flex">
            <FormToggle id="active" v-model="pageData.base.active" name="Active" class="mr-5 flex-grow" />
            <FormToggle id="audit" v-model="pageData.base.audit" name="Audit" class="flex-grow" />
          </div>
        </div>
      </div>

      <div class="divider before:bg-gray-100 after:bg-gray-100"></div>
      <div class="content">
        <FormSelect
          v-model="pageData.base.auth"
          name="Auth"
          :options="[AuthMethod.password, AuthMethod.key]"
          :error="pageData.error['auth']"
          class="mr-5"
        />

        <div v-if="pageData.base.auth == AuthMethod.password">
          <FormInput
            v-model.trim="pageData.base.access.password"
            name="Password"
            :error="pageData.error['password']"
            type="password"
            autocomplete="current-password"
          />
        </div>

        <div v-if="pageData.base.auth == AuthMethod.key" class="flex-grow">
          <div class="flex">
            <FormInput
              v-model.trim="pageData.base.public_key"
              name="Public key"
              :error="pageData.error['public_key']"
              :disabled="true"
              class="grow"
            />

            <FormButton lite class="mt-8 ml-2 flex-none" @click="copy(pageData.base.public_key)">
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
      </div>

      <div class="divider before:bg-gray-100 after:bg-gray-100"></div>
      <div class="content">
        <div class="flex-none">
          <FormButton class="mr-5" :loading="pageData.loading" @click="onSubmit()">Add server</FormButton>
        </div>
        <div class="flex-grow"></div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useClipboard } from "@vueuse/core";
import { FormButton, FormInput, FormSelect, FormTextarea, FormToggle, SvgIcon } from "@/components";
import { showApiError, showMessage } from "@/utils";
import { usePageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { AuthMethod } from "@proto/scheme/auth";
import { SchemeType as ServerScheme } from "@proto/scheme/access";

const { copy, copied } = useClipboard();
const router = useRouter();
const pageData = usePageData();

const props = defineProps({
  projectId: {
    type: String,
    default: null
  },
  scheme: {
    type: String,
    default: null
  }
});

const resolveSchemeKey = (value: string | null): string | null => {
  if (!value) {
    return null;
  }

  const numericValue = Number(value);
  const schemeName = Number.isNaN(numericValue) ? value : ServerScheme[numericValue];

  return typeof schemeName === "string" && schemeName.startsWith("server_") ? schemeName : null;
};

const buildAccessScheme = (): Record<string, any> => {
  const schemeKey = resolveSchemeKey(props.scheme) ?? "server_ssh";
  const { base } = pageData.value;

  return {
    [schemeKey]: {
      address: base.address,
      port: base.port,
      access:
        base.auth === AuthMethod.key
          ? { key: { login: base.login, key_id: base.access.key_id } }
          : { password: { login: base.login, password: base.access.password } }
    }
  };
};

const genNewKey = async (): Promise<void> => {
  const { tmp, base } = pageData.value;

  try {
    tmp.new_key = true;
    const res = await api(false).GET(`/v1/keys/generate`);
    if (res.data) {
      base.public_key = res.data.result.public;
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

watch(copied, (val) => {
  if (val) {
    showMessage("The key has been copied to the clipboard");
  }
});

watch(
  () => pageData.value.base.auth,
  (newAuth) => {
    if (newAuth == AuthMethod.password) {
      pageData.value.base.access.password = "";
      delete pageData.value.base.public_key;
      delete pageData.value.base.access.key;
    } else if (newAuth == AuthMethod.key) {
      genNewKey();
      if (pageData.value.base.access.password) {
        delete pageData.value.base.access.password;
      }
    }
    pageData.value.error.auth = null;
  }
);

const onSubmit = async (): Promise<void> => {
  try {
    pageData.value.loading = true;

    const bodyParams = {
      title: pageData.value.base.title,
      audit: Boolean(pageData.value.base.audit),
      active: Boolean(pageData.value.base.active),
      description: pageData.value.base.description,
      scheme: buildAccessScheme()
    };

    const res = await api().POST(`/v1/schemes/${props.projectId}/server`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.error = {};
      router.push({ name: "projects-projectId-servers", params: { projectId: props.projectId } });
    }
    if (res.error) {
      pageData.value.error = res.error.result;
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    pageData.value.loading = false;
  }
};

onMounted(async () => {
  document.title = "Step 2: Fill in the fields to connect";

  pageData.value.base.access = {};
  pageData.value.tmp.new_key = false;

  if (!props.scheme || !resolveSchemeKey(props.scheme)) {
    router.push({ name: "projects-projectId-servers-add" });
  }
});
</script>
