<script lang="ts">
  import SvgIcon from "$lib/components/SvgIcon.svelte";

  interface Props {
    title: string;
    addHref: string;
  }

  let { title, addHref }: Props = $props();
</script>

<div class="artboard">
  <header>
    <h1>{title}</h1>
    <a href={addHref} class="breadcrumbs">
      <SvgIcon name="plus_square" class="mr-3" />
      add new
    </a>
  </header>
  <div class="desc">Empty</div>

  <div class="content">section under development</div>
</div>
