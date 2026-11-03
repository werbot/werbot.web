<script lang="ts">
  // eslint-disable-next-line no-relative-import-paths/no-relative-import-paths -- global stylesheet lives at src/app.css
  import "../app.css";
  import "virtual:svg-icons-register";

  let { children } = $props();
</script>

{@render children()}
<div id="alert"></div>
