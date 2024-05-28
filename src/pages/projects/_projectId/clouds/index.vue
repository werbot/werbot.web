<template>
  <div class="artboard">
    <header>
      <h1>Clouds</h1>
      <router-link :to="{ name: 'projects-projectId-clouds-add' }">
        <label class="plus">
          <SvgIcon name="plus_square" />
          add new
        </label>
      </router-link>
    </header>
    <div class="desc">Empty</div>

    <div class="content">section under development</div>
  </div>
</template>

<script setup lang="ts">
import { SvgIcon } from "@/components";
</script>
