<template>
  <div class="artboard">
    <header>
      <h1>Servers</h1>
      <div class="breadcrumbs">
        <router-link :to="{
          name: 'projects-projectId-servers-add',
          params: {
            projectId: props.projectId,
          },
        }">
          Select scheme
        </router-link>
        <span>{{ props.scheme }}</span>
      </div>
    </header>

    <div class="desc">Step 2: Fill in the fields to connect.</div>

    <form @submit.prevent>
      <!-- SSH -->
      <div class="artboard-content" v-if="props.scheme == ServerScheme[3]">
        <FormInput name="Title" v-model="data.title" :error="error.errors.title" class="flex-grow" />

        <div class="w-full">
          <div class="flex flex-row">
            <FormInput name="Address" v-model.trim="data.address" :error="error.errors.address" class="mr-5 flex-grow"
              :required="true" />

            <FormInput name="Port" v-model.number="data.port" :error="error.errors.port" class="mr-5 flex-grow"
              :required="true" />

            <FormInput name="Login" v-model.trim="data.login" :error="error.errors.login" class="flex-grow"
              :required="true" />
          </div>

          <div class="flex flex-row">
            <FormTextarea name="Description" v-model="data.description" :error="error.errors.description" :rows="6"
              class="flex-grow" />
          </div>

          <div class="mt-5 flex flex-row">
            <Toggle name="Active" v-model="data.active" class="mr-5 flex-grow" id="active" />
            <Toggle name="Audit" v-model="data.audit" class="flex-grow" id="audit" />
          </div>

          <Select name="Auth" v-model="data.auth" :options="[Auth[1], Auth[2]]" />

          <div v-if="data.auth == Auth[1]">
            <FormInput name="Password" v-model.trim="data.access.password" :error="error.errors.password"
              class="flex-grow" type="password" autocomplete="current-password" />
          </div>

          <div v-if="data.auth == Auth[2]">
            <FormInput name="Public key" v-model.trim="data.public_key" :error="error.errors.public_key" :disabled="true"
              class="flex-grow" />
          </div>
        </div>
      </div>

      <div class="divider mt-5 before:bg-gray-100 after:bg-gray-100"></div>
      <div class="artboard-content py-5">
        <div class="flex-none">
          <button type="submit" @click="onSubmit()" class="btn mr-5">Add server</button>
        </div>
        <div class="flex-grow"></div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, getCurrentInstance } from "vue";
import { useErrorStore } from "@/store";

import { useRouter } from "vue-router";
import { Auth, ServerScheme, AddServer_Request } from "@proto/server";
import { FormInput, FormTextarea, Toggle, Select } from "@/components";
import { newKey } from "@/api/key";
import { addServer } from "@/api/server";
import { showMessage } from "@/utils/message";

const { proxy } = getCurrentInstance() as any;
const loading = ref(false);
const router = useRouter();
const error: any = useErrorStore();
const props = defineProps({
  projectId: String,
  scheme: String,
});

const data: any = ref(<AddServer_Request>{
  project_id: props.projectId,
  scheme: ServerScheme[props.scheme],
  access: {},
});

if (!Object.values(ServerScheme).includes(props.scheme!)) {
  router.push({ name: "projects-projectId-servers-add" });
}

const genNewKey = async () => {
  await newKey().then((res) => {
    data.value.public_key = res.data.result.public;
    data.value.access.key = res.data.result.uuid;
  });
};

watch(
  () => data.value.auth,
  () => {
    // for password
    if (data.value.auth == Auth[1]) {
      data.value.access.password = "";
      delete data.value.public_key;
      delete data.value.access.key;
    }
    // for key
    if (data.value.auth == Auth[2]) {
      genNewKey();
      delete data.value.access.password;
    }
  }
);

const onSubmit = async () => {
  loading.value = !loading.value;

  await addServer(data.value)
    .then((res) => {
      showMessage(res.data.message);
      proxy.$errorStore.$reset();
      router.push({ name: "projects-projectId-servers", params: { projectId: props.projectId } });
    })
    .catch((err) => {
      showMessage(err.response.data.message, "connextError");
      loading.value = !loading.value;
    });
};

onBeforeUnmount(() => proxy.$errorStore.$reset());

document.title = "Step 2: Fill in the fields to connect";
</script>
