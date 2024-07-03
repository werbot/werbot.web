<template>
  <div class="versions">
    <div>ui: {{ $systemStore.versions.ui }}</div>
    <div>api: {{ $systemStore.versions.api }}</div>
  </div>
</template>

<style lang="scss">
.versions {
  @apply hidden text-xs text-gray-200 sm:inline-block;
}
</style>
