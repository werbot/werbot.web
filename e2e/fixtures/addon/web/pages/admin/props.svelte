<script lang="ts">
  let { fixtureId }: { fixtureId: string } = $props();
</script>

<div class="artboard">
  <header>
    <h1>Add-on props fixture</h1>
  </header>
  <div class="desc">Route params arrive as props</div>
  <div class="content">fixtureId: {fixtureId}</div>
</div>
