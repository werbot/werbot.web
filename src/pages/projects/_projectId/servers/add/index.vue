<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">Select scheme</div>
    </header>
    <div class="desc">Step 1: Select the scheme you want to add.</div>

    <div class="content">
      <ol class="schemes">
        <li class="element">
          <router-link
            :to="{
              name: 'projects-projectId-servers-add-scheme',
              params: { projectId: props.projectId, scheme: ServerScheme[3] }
            }"
          >
            <img src="/img/schemes/servers/ssh.svg" />
            <div>SSH</div>
          </router-link>
        </li>
        <li class="element disable">
          <img src="/img/schemes/servers/telnet.svg" />
          <div>Telnet</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/servers/tcp.svg" />
          <div>TCP</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/servers/udp.svg" />
          <div>UDP</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ServerScheme } from "@proto/server";

const props = defineProps({
  projectId: {
    type: String,
    default: null
  }
});

onMounted(async () => {
  document.title = "Step 1: Select the scheme you want to add";
});
</script>
