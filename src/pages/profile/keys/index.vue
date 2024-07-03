<template>
  <Skeleton v-if="!pageData.base.total" class="text-gray-200" />

  <div v-else class="artboard">
    <header>
      <h1>SSH keys</h1>
      <router-link :to="{ name: 'profile-keys-add' }" class="breadcrumbs">
        <SvgIcon name="plus_square" class="mr-3" />
        add new
      </router-link>
    </header>
    <div class="desc">
      This is a list of SSH keys associated with your account. Remove any keys that you do not recognize.
    </div>

    <table v-if="pageData.base.total > 0">
      <tbody>
        <tr v-for="(item, index) in pageData.base.public_keys" :key="index">
          <td>
            <div class="font-bold">{{ item.title }}</div>
            <div>{{ item.fingerprint }}</div>
          </td>
          <td class="adaptive-md">
            <div><span class="font-bold">Added on:</span> {{ toDate(item.created_at, "lite") }}</div>
            <div v-if="item.updated_at.seconds > 0">
              <span class="font-bold">Last used:</span> {{ toDate(item.updated_at, "lite") }}
            </div>
            <div v-else class="text-gray-400"><span class="font-bold">Last used:</span> no used</div>
          </td>
          <td class="w-6">
            <SvgIcon name="delete" class="cursor-pointer text-red-500" @click="openModal(index)" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="content p-5">Empty</div>

    <Pagination :total="pageData.base.total" class="content" @select-page="onSelectPage" />
  </div>

  <div class="m-6">
    Check out our guide to <a href="#">generating SSH keys</a> or troubleshoot <a href="#">common SSH problems</a>.
  </div>

  <Modal :show-modal="pageData.modal" title="Are you sure you want to delete this SSH key?" @close="closeModal">
    <p>
      This action CANNOT be undone. This will permanently delete the SSH key and if you’d like to use it in the future,
      you will need to upload it again. <br />
    </p>
    <template #footer>
      <div class="flex flex-row justify-end">
        <FormButton class="red" @click="removeKey(pageData.tmp.id)">Delete SSH key</FormButton>
        <FormButton class="ml-5" @click="closeModal()">Close</FormButton>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store";
import { showMessage, toDate } from "@/utils";
import { Skeleton, SvgIcon, Modal, Pagination, FormButton } from "@/components";
import { PageData, defaultPageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { DeleteKey_Request } from "@proto/key";

const route = useRoute();
const authStore = useAuthStore();
const pageData = ref<PageData>(defaultPageData);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getData = async (routeQuery: any): Promise<void> => {
  try {
    if (authStore.hasUserRole === 3) {
      routeQuery.user_id = authStore.hasUserID;
    }

    const queryParams = {
      user_id: routeQuery?.user_id,
      ...(routeQuery?.limit !== undefined && { limit: routeQuery.limit }),
      ...(routeQuery?.offset !== undefined && { offset: routeQuery.offset })
    };

    const res = await api().GET(`/v1/keys`, queryParams);
    if (res.data) {
      pageData.value.base = res.data.result;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const onSelectPage = (e: unknown): void => {
  getData(e);
};

const openModal = async (id: number): Promise<void> => {
  pageData.value.modal = true;
  pageData.value.tmp.id = id;
};

const closeModal = (): void => {
  pageData.value.modal = false;
};

const removeKey = async (id: number): Promise<void> => {
  try {
    const queryParams = <DeleteKey_Request>{
      user_id: authStore.hasUserID,
      key_id: pageData.value.base.public_keys[id].key_id
    };

    const res = await api().DELETE(`/v1/keys`, queryParams);
    if (res.data) {
      closeModal();
      pageData.value.base.public_keys.splice(id, 1);
      pageData.value.base.total = pageData.value.base.total - 1;
      showMessage(res.data.message);
    }
    if (res.error) {
      closeModal();
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

onMounted(async () => {
  document.title = "SSH keys";
  await getData(route.query);
});
</script>
