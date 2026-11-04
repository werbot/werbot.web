<script lang="ts">
  import { systemStore } from "$lib/stores";
</script>

<div class="versions">
  <div>ui: {systemStore.versions.ui}</div>
  <div>api: {systemStore.versions.api}</div>
</div>
