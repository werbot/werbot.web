<template>
  <div class="artboard">
    <header>
      <h1>Databases</h1>
      <div class="breadcrumbs">Select scheme</div>
    </header>
    <div class="desc">Step 1: Select the scheme you want to add.</div>

    <div class="content">
      <ol class="schemes">
        <li class="element disable">
          <img src="/img/schemes/databases/mysql.svg" />
          <div>MySQL</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/databases/postgresql.svg" />
          <div>Postgres</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/databases/redis.svg" />
          <div>Redis</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/databases/mongodb.svg" />
          <div>MongoDB</div>
        </li>
        <li class="element disable">
          <img src="/img/schemes/databases/elastic.svg" />
          <div>Elastic</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
document.title = "Step 1: Select the scheme you want to add";
</script>
