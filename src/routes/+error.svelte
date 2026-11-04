<script lang="ts">
  $effect(() => {
    document.title = "404 - Page Not Found";
  });
</script>

<!-- The legacy app rendered the 404 page inside its own 404 layout (`div.fon.center`). -->
<div class="fon center">
  <div>
    <h1>404 - Page Not Found</h1>
    <p>This page no longer exists or was moved to another location.</p>
  </div>
</div>
