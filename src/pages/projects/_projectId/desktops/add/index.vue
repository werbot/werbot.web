<template>
  <div class="artboard">
    <header>
      <h1>Desktops</h1>
      <div class="breadcrumbs">Select scheme</div>
    </header>
    <div class="desc">Step 1: Select the scheme you want to add.</div>

    <div class="artboard-content p-5">
      <ol class="schemes">
        <li class="element disable">
          <img src="/img/schemes/desktops/rdp.svg" />
          <div>RDP</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/desktops/vnc.svg" />
          <div>VNC</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
document.title = "Step 1: Select the scheme you want to add";
</script>
