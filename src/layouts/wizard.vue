<template>
  <div class="px-6">
    <Header />

    <div class="content">
      <div class="left">
        <nav class="sidebar">
          <ul>
            <li>
              <router-link active-class="current" :to="{ name: 'projects-projectId-servers-add' }">
                <SvgIcon name="profile" />
                <span>Step 1</span>
              </router-link>
            </li>
            <li>
              <router-link active-class="current" :to="{ name: 'projects-projectId-servers-add-scheme' }">
                <SvgIcon name="key" />
                <span>Step 2</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <Version />
      </div>
      <div class="right">
        <div id="alert"></div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Header, Version, SvgIcon } from "@/components";
</script>
