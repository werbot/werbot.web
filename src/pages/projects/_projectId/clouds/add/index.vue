<template>
  <div class="artboard">
    <header>
      <h1>Clouds</h1>
      <div class="breadcrumbs">Select scheme</div>
    </header>
    <div class="desc">Step 1: Select the scheme you want to add.</div>

    <div class="artboard-content p-5">
      <ol class="schemes">
        <li class="element disable">
          <img src="/img/schemes/clouds/amazon.svg" />
          <div>Amazon</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/clouds/azure.svg" />
          <div>Azure</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/clouds/google.svg" />
          <div>Google</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/clouds/digitalocean.svg" />
          <div>DO</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/clouds/hetzner.svg" />
          <div>Hetzner</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
document.title = "Step 1: Select the scheme you want to add";
</script>
