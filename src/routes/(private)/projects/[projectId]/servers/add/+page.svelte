<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { routePath } from "$lib/navigation/registry";

  const params = $derived(page.params as { projectId?: string });
  const projectId = $derived(params.projectId ?? "");

  onMount(() => {
    document.title = "Step 1: Select the scheme you want to add";
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <div class="breadcrumbs">Select scheme</div>
  </header>
  <div class="desc">Step 1: Select the scheme you want to add.</div>

  <div class="content">
    <ol class="schemes">
      <li class="element">
        <a
          href={routePath("projects-projectId-servers-add-scheme", {
            projectId,
            scheme: "server_ssh"
          })}
        >
          <img src="/img/schemes/servers/ssh.svg" alt="" />
          <div>SSH</div>
        </a>
      </li>
      <li class="element">
        <a
          href={routePath("projects-projectId-servers-add-scheme", {
            projectId,
            scheme: "server_telnet"
          })}
        >
          <img src="/img/schemes/servers/telnet.svg" alt="" />
          <div>Telnet</div>
        </a>
      </li>
      <li class="element disable">
        <img src="/img/schemes/servers/tcp.svg" alt="" />
        <div>TCP</div>
      </li>
      <li class="element disable">
        <img src="/img/schemes/servers/udp.svg" alt="" />
        <div>UDP</div>
      </li>
    </ol>
  </div>
</div>
