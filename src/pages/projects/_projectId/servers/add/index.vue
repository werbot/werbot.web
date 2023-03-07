<template>
  <div class="artboard">
    <header>
      <h1>Servers</h1>
      <div class="breadcrumbs">Select scheme</div>
    </header>

    <div class="desc">
      Step 1: Select the scheme you want to add.
    </div>

    <div class="artboard-content p-5">
      <ol class="schemes">
        <li class="element">
          <router-link
            :to="{
              name: 'projects-projectId-servers-add-scheme',
              params: {
                projectId: props.projectId,
                scheme: ServerScheme[3],
              },
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
          <div>Telnet</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/servers/udp.svg" />
          <div>Telnet</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ServerScheme } from "@proto/server";

const props = defineProps({
  projectId: String,
});

document.title = "Step 1: Select the scheme you want to add";
</script>
