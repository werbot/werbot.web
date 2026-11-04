<script lang="ts">
  interface Scheme {
    name: string;
    image: string;
  }

  interface Props {
    title: string;
    groups: Scheme[][];
  }

  let { title, groups }: Props = $props();
</script>

<div class="artboard">
  <header>
    <h1>{title}</h1>
    <div class="breadcrumbs">Select scheme</div>
  </header>
  <div class="desc">Step 1: Select the scheme you want to add.</div>

  <div class="content">
    {#each groups as group, index (index)}
      <ol class="schemes">
        {#each group as scheme (scheme.name)}
          <li class="element disable">
            <img src={scheme.image} alt="" />
            <div>{scheme.name}</div>
          </li>
        {/each}
      </ol>
    {/each}
  </div>
</div>
