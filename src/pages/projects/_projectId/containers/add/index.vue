<template>
  <div class="artboard">
    <header>
      <h1>Containers</h1>
      <div class="breadcrumbs">Select scheme</div>
    </header>
    <div class="desc">Step 1: Select the scheme you want to add.</div>

    <div class="artboard-content p-5">
      <ol class="schemes">
        <li class="element disable">
          <img src="/img/schemes/containers/docker.svg" />
          <div>Docker</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/containers/k8s.svg" />
          <div>K8S</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/containers/podman.svg" />
          <div>podman</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
document.title = "Step 1: Select the scheme you want to add";
</script>
