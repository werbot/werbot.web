<template>
  <div class="artboard">
    <header>
      <h1>Setting</h1>
    </header>
    <Tabs :tabs="tabMenu" />

    <div class="artboard-content p-5">
      <form @submit.prevent>
        <div class="mb-5 flex flex-row">
          <FormInput name="Title" v-model="data.title" :error="proxy.$errorStore.errors['title']" class="mr-5 flex-grow" />
          <FormInput name="Login" v-model.trim="data.login" :error="proxy.$errorStore.errors['login']" class="flex-grow" />
        </div>

        <div class="mt-6">
          <div class="flex-none">
            <button type="submit" @click="onUpdate(false)" class="btn mr-5">Update</button>
            <button type="submit" @click="onUpdate(true)" class="btn">Update and close</button>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { Tabs, FormInput } from "@/components";
import { getProject, updateProject } from "@/api/project";
import { Project_Request, UpdateProject_Request } from "@proto/project";
import { showMessage } from "@/utils/message";

// Tabs section
import { tabMenu } from "./tab";

const { proxy } = getCurrentInstance() as any;
const data: any = ref({});
const router = useRouter();
const props = defineProps({
  projectId: String,
});

const onUpdate = async (redirect: boolean) => {
  let message: any = {
    warn: false,
    text: "Project settings updated",
  };

  await updateProject(<UpdateProject_Request>{
    project_id: props.projectId,
    owner_id: proxy.$authStore.hasUserID,
    title: data.value.title,
    login: data.value.login,
  })
    .then((res) => {
      if (res.data.success) {
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

onMounted(async () => {
  await getProject(<Project_Request>{
    project_id: props.projectId,
    owner_id: proxy.$authStore.hasUserID,
  }).then((res) => {
    data.value = res.data.result;
  });
})

onBeforeUnmount(() => proxy.$errorStore.$reset());

document.title = "setting projects";
</script>
