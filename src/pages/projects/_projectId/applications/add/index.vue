<template>
  <div class="artboard">
    <header>
      <h1>Applications</h1>
      <div class="breadcrumbs">Select scheme</div>
    </header>
    <div class="desc">Step 1: Select the scheme you want to add.</div>

    <div class="content">
      <ol class="schemes">
        <li class="element disable">
          <img src="/img/schemes/applications/site.svg" />
          <div>Site</div>
        </li>
      </ol>
      <ol class="schemes">
        <li class="element disable">
          <img src="/img/schemes/applications/grafana.svg" />
          <div>Grafana</div>
        </li>
      </ol>
      <ol class="schemes">
        <li class="element disable">
          <img src="/img/schemes/applications/kibana.svg" />
          <div>Kibana</div>
        </li>
      </ol>
      <ol class="schemes">
        <li class="element disable">
          <img src="/img/schemes/applications/portainer.svg" />
          <div>Portainer</div>
        </li>
      </ol>
      <ol class="schemes">
        <li class="element disable">
          <img src="/img/schemes/applications/rancher.svg" />
          <div>Rancher</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(async () => {
  document.title = "Step 1: Select the scheme you want to add";
});
</script>
