<script lang="ts">
  import { onMount } from "svelte";

  import SchemePicker from "$lib/components/SchemePicker.svelte";

  const groups = [
    [
      { name: "MySQL", image: "/img/schemes/databases/mysql.svg" },
      { name: "Postgres", image: "/img/schemes/databases/postgresql.svg" },
      { name: "Redis", image: "/img/schemes/databases/redis.svg" },
      { name: "MongoDB", image: "/img/schemes/databases/mongodb.svg" },
      { name: "Elastic", image: "/img/schemes/databases/elastic.svg" }
    ]
  ];

  onMount(() => {
    document.title = "Step 1: Select the scheme you want to add";
  });
</script>

<SchemePicker title="Databases" {groups} />
