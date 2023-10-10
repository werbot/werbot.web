<template>
  <div class="artboard">
    <header>
      <h1>Profile logs</h1>
    </header>

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Event</th>
          <th>Ip</th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="cursor" @click="openDrawer(1)">
          <td>25/05/2022 15:31:48</td>
          <td>login_success</td>
          <td>162.158.90.222</td>
          <td>
            <SvgIcon name="chevron_right" />
          </td>
        </tr>
        <tr class="cursor" @click="openDrawer(2)">
          <td>25/05/2022 15:31:48</td>
          <td>login_success</td>
          <td>162.158.90.222</td>
          <td>
            <SvgIcon name="chevron_right" />
          </td>
        </tr>
        <tr class="cursor" @click="openDrawer(3)">
          <td>25/05/2022 15:31:48</td>
          <td>login_success</td>
          <td>162.158.90.222</td>
          <td>
            <SvgIcon name="chevron_right" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Drawer :is-open="isDrawerOpen" @close="closeDrawer" title="Name" maxWidth="600px" >
    <table class="mini">
      <tr>
        <td width="120">ID</td>
        <td>qjeqb78k18tbefl</td>
      </tr>
      <tr>
        <td>Remote IP</td>
        <td>162.158.90.222</td>
      </tr>
      <tr>
        <td>URL</td>
        <td>/api/files/POWMOh0W6IoLUAI/eP2jCr1h3NGtsbz/VPtmjtDBX6noQL6iSg6CEvYVhcaa1uAw.jpg?thumb=100x100&token=</td>
      </tr>
      <tr>
        <td>Created</td>
        <td>25/05/2022 15:31:48</td>
      </tr>
      <tr>
        <td>ID</td>
        <td>qjeqb78k18tbefl</td>
      </tr>
      <tr>
        <td>Remote IP</td>
        <td>162.158.90.222</td>
      </tr>
      <tr>
        <td>URL</td>
        <td>/api/files/POWMOh0W6IoLUAI/eP2jCr1h3NGtsbz/VPtmjtDBX6noQL6iSg6CEvYVhcaa1uAw.jpg?thumb=100x100&token=</td>
      </tr>
      <tr>
        <td>Created</td>
        <td>25/05/2022 15:31:48</td>
      </tr>
      <tr>
        <td>ID</td>
        <td>qjeqb78k18tbefl</td>
      </tr>
      <tr>
        <td>Remote IP</td>
        <td>162.158.90.222</td>
      </tr>
      <tr>
        <td>URL</td>
        <td>/api/files/POWMOh0W6IoLUAI/eP2jCr1h3NGtsbz/VPtmjtDBX6noQL6iSg6CEvYVhcaa1uAw.jpg?thumb=100x100&token=</td>
      </tr>
      <tr>
        <td>Created</td>
        <td>25/05/2022 15:31:48</td>
      </tr>
      <tr>
        <td>ID</td>
        <td>qjeqb78k18tbefl</td>
      </tr>
      <tr>
        <td>Remote IP</td>
        <td>162.158.90.222</td>
      </tr>
      <tr>
        <td>URL</td>
        <td>/api/files/POWMOh0W6IoLUAI/eP2jCr1h3NGtsbz/VPtmjtDBX6noQL6iSg6CEvYVhcaa1uAw.jpg?thumb=100x100&token=</td>
      </tr>
      <tr>
        <td>Created</td>
        <td>25/05/2022 15:31:48</td>
      </tr>
      <tr>
        <td>ID</td>
        <td>qjeqb78k18tbefl</td>
      </tr>
      <tr>
        <td>Remote IP</td>
        <td>162.158.90.222</td>
      </tr>
      <tr>
        <td>URL</td>
        <td>/api/files/POWMOh0W6IoLUAI/eP2jCr1h3NGtsbz/VPtmjtDBX6noQL6iSg6CEvYVhcaa1uAw.jpg?thumb=100x100&token=</td>
      </tr>
      <tr>
        <td>Created</td>
        <td>25/05/2022 15:31:48</td>
      </tr>
    </table>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SvgIcon, Drawer } from "@/components";

const isDrawerOpen = ref(false);
const logDescription: any = ref({});

const openDrawer = async (id: number) => {
  isDrawerOpen.value = true;
  logDescription.value = id;
};

const closeDrawer = async () => {
  isDrawerOpen.value = false
}
</script>
