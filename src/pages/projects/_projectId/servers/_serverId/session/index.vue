<template>
  <div class="artboard">
    <header>
      <h1>Servers</h1>
      <div class="breadcrumbs">
        <BServerName
          :memberId="proxy.$authStore.hasUserID"
          :serverId="props.serverId!"
          :projectId="props.projectId!"
        />
        <span>Sessions</span>
      </div>

    </header>

    <table>
      <thead>
        <tr>
          <th>Session ID</th>
          <th>Start session</th>
          <th>Client ip</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0c3</td>
          <td>login_success</td>
          <td>162.158.90.222</td>
          <td>2.612766</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { BServerName } from "@/components";

const { proxy } = getCurrentInstance() as any;
const props = defineProps({
  projectId: String,
  serverId: String,
});
</script>
