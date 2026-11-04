<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { api } from "$lib/api";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import Textarea from "$lib/components/form/Textarea.svelte";
  import Toggle from "$lib/components/form/Toggle.svelte";
  import { serverTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { projectStore, usePageData } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  import { AuthMethod } from "@proto/scheme/auth";

  const pageData = usePageData();

  pageData.base = {
    host: {},
    access: {}
  };
  pageData.tmp = {
    new_key: false,
    loading_key: false,
    schemeKey: null
  };

  const params = $derived(page.params as { projectId?: string; serverId?: string });
  const projectId = $derived(params.projectId ?? "");
  const serverId = $derived(params.serverId ?? "");

  let copied = $state(false);

  const getData = async (): Promise<void> => {
    try {
      const [serverRes, accessRes] = await Promise.all([
        api().GET(`/v1/schemes/${projectId}/${serverId}`),
        api().GET(`/v1/schemes/${projectId}/${serverId}/access`)
      ]);

      if (serverRes.data) {
        const server = serverRes.data.result;
        pageData.base.host = {
          ...server,
          auth: server.auth_method
        };
      }

      if (accessRes.data) {
        const accessScheme = accessRes.data.result?.scheme;
        const [schemeKey, scheme] = Object.entries(accessScheme ?? {})[0] ?? [];

        if (schemeKey && scheme) {
          const schemeData = scheme as any;
          pageData.tmp.schemeKey = schemeKey;
          pageData.base.host.address = schemeData.address;
          pageData.base.host.port = schemeData.port;

          const [authKey, authData] = Object.entries(schemeData.access ?? {})[0] ?? [];
          const auth = authData as any;

          if (authKey === "password") {
            pageData.base.access.auth = AuthMethod.password;
            pageData.base.host.auth = AuthMethod.password;
            pageData.base.host.login = auth.login;
            pageData.base.access.password = "";
          } else if (authKey === "key") {
            pageData.base.access.auth = AuthMethod.key;
            pageData.base.host.auth = AuthMethod.key;
            pageData.base.host.login = auth.login;
            pageData.base.access.key_id = auth.key_id;
            pageData.base.access.public_key = auth.key?.public ?? "";
          }
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const buildAccessScheme = (): Record<string, any> | null => {
    const { base, tmp } = pageData;
    const schemeKey = tmp.schemeKey;

    if (!schemeKey) {
      return null;
    }

    let access: Record<string, any> | null = null;
    const login = base.host.login?.trim();

    switch (base.host.auth) {
      case AuthMethod.password:
        // The backend keeps the stored password when the field is left empty.
        access = { password: { login, password: String(base.access.password ?? "").trim() } };
        break;
      case AuthMethod.key:
        if (base.access.key_id) {
          access = { key: { login, key_id: base.access.key_id } };
        }
        break;
      default:
        access = null;
    }

    if (!access) {
      return null;
    }

    return {
      [schemeKey]: {
        address: base.host.address?.trim(),
        port: base.host.port === "" || base.host.port == null ? base.host.port : Number(base.host.port),
        access
      }
    };
  };

  const onUpdate = async (typeData: string): Promise<void> => {
    const { title, description, active, audit } = pageData.base.host;

    const message: { warn: boolean; text: string } = {
      warn: false,
      text: ""
    };

    const setMessage = (text: string, warn: boolean = false): void => {
      message.text = text;
      message.warn = warn;
    };

    try {
      if (typeData === "info") {
        pageData.loading = true;
      }

      let requests: Promise<any>[] = [];

      switch (typeData) {
        case "info": {
          requests = [
            api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { title }),
            api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { description })
          ];

          const access = buildAccessScheme();
          if (access) {
            requests.push(api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { scheme: access }));
          }
          setMessage("Server settings updated");
          break;
        }
        case "active":
          requests = [api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { active })];
          setMessage(active ? "Server enabled" : "Server disabled", !active);
          break;
        case "audit":
          requests = [api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { audit })];
          setMessage(audit ? "Audit settings enabled" : "Audit settings disabled", !audit);
          break;
        default:
          console.log("exit");
          return;
      }

      const responses = await Promise.all(requests);
      const failed = responses.find((res) => res.error);

      if (failed) {
        if (typeData === "info") {
          pageData.error = failed.error.result;
        }
        await showApiError(failed.error);
        return;
      }

      if (typeData === "info") {
        await projectStore.updateServerNameByID(projectId, serverId, title);
        ["address", "port", "login", "description"].forEach((field) => {
          pageData.error[`info.${field}`] = null;
        });
      }

      showMessage(message.text, message.warn ? "connextWarning" : undefined);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.loading = false;
    }
  };

  const onUpdateAccess = async (): Promise<void> => {
    try {
      pageData.tmp.loading_key = true;

      const access = buildAccessScheme();
      if (!access) {
        return;
      }

      const res = await api().UPDATE(`/v1/schemes/${projectId}/${serverId}`, {}, { scheme: access });
      if (res.data) {
        pageData.base.access.key = null;
        pageData.base.access.password = null;
        showMessage(res.data.message);
        pageData.error.password = null;
      }
      if (res.error && pageData.base.access.auth === AuthMethod.password) {
        pageData.error.password = res.error.result.password;
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.tmp.loading_key = false;
    }
  };

  const genNewKey = async (): Promise<void> => {
    try {
      pageData.tmp.new_key = true;
      const res = await api().GET(`/v1/keys/generate`);
      if (res.data) {
        pageData.base.access.public_key = res.data.result.public;
        pageData.base.access.key_id = res.data.result.uuid;
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.tmp.new_key = false;
    }
  };

  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(pageData.base.access.public_key ?? "");
      copied = true;
      showMessage("The key has been copied to the clipboard");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  $effect(() => {
    if (!copied) {
      return;
    }

    const timer = setTimeout((): void => {
      copied = false;
    }, 1500);

    return (): void => clearTimeout(timer);
  });

  onMount(async () => {
    document.title = "Server setting";
    void projectStore.serverNameByID(projectId, serverId);
    await getData();

    if (pageData.base.host.audit === undefined) {
      pageData.base.host.audit = false;
    }

    if (pageData.base.host.active === undefined) {
      pageData.base.host.active = false;
    }
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <div class="breadcrumbs">{projectStore.getServerNameByID(projectId, serverId)}</div>
  </header>
  <Tabs tabs={serverTabs} />
  <div class="desc">
    Several options for adding new members are available. Choose the right one and follow the instructions.
  </div>

  <form
    onsubmit={(event): void => {
      event.preventDefault();
    }}
  >
    <div class="content">
      <Input bind:value={pageData.base.host.title} name="Title" error={pageData.error["title"]} class="flex-grow" />

      <div class="mt-5 w-full">
        <div class="flex">
          <Input
            bind:value={pageData.base.host.address}
            name="Address"
            error={pageData.error["info.address"]}
            class="mr-5 flex-grow"
            required={true}
          />
          <Input
            bind:value={pageData.base.host.port}
            name="Port"
            error={pageData.error["info.port"]}
            class="mr-5 flex-grow"
            required={true}
          />
          <Input
            bind:value={pageData.base.host.login}
            name="Login"
            error={pageData.error["info.login"]}
            class="flex-grow"
            required={true}
          />
        </div>

        <div class="mt-5 flex">
          <Textarea
            bind:value={pageData.base.host.description}
            name="Description"
            error={pageData.error["info.description"]}
            rows={6}
            class="flex-grow"
          />
        </div>

        <div class="mt-5 flex">
          <Toggle
            id="active"
            bind:value={pageData.base.host.active}
            name="Active"
            class="mr-5 flex-grow"
            onchange={(): void => {
              void onUpdate("active");
            }}
          />
          <Toggle
            id="audit"
            bind:value={pageData.base.host.audit}
            name="Audit"
            class="flex-grow"
            onchange={(): void => {
              void onUpdate("audit");
            }}
          />
        </div>
      </div>
    </div>

    <div class="divider before:bg-gray-100 after:bg-gray-100"></div>

    <div class="content">
      <Button
        disabled={pageData.loading}
        loading={pageData.loading}
        onclick={(): void => {
          void onUpdate("info");
        }}
      >
        Update
      </Button>
    </div>
  </form>
</div>

<div class="artboard">
  <header class="mt-3">
    <h1>Access section</h1>
  </header>
  <div class="divider"></div>
  <div class="content">
    <form
      onsubmit={(event): void => {
        event.preventDefault();
      }}
    >
      {#if pageData.base.host.auth == AuthMethod.password}
        <div>
          <Input
            bind:value={pageData.base.access.password}
            name="Password (hidden, can only be overwritten)"
            error={pageData.error["password"]}
            class="flex-grow"
            type="password"
            autocomplete="current-password"
          />
        </div>
      {/if}

      {#if pageData.base.host.auth == AuthMethod.key}
        <div class="flex-grow">
          <div class="flex">
            <Input
              bind:value={pageData.base.access.public_key}
              name="Public key"
              error={pageData.error["public_key"]}
              class="grow"
              disabled={true}
              required={true}
            />

            <Button lite class="mt-8 ml-2 flex-none" onclick={copy}>
              <span>{copied ? "Copied" : "Copy"}</span>
            </Button>
            <Button
              lite
              disabled={pageData.tmp.new_key}
              rotate={pageData.tmp.new_key}
              class="mt-8 ml-2 flex-none"
              onclick={genNewKey}
            >
              <SvgIcon name="refresh" />
            </Button>
          </div>
        </div>
      {/if}

      {#if pageData.base.access.key_id || pageData.base.access.password > 3}
        <Button
          class="mt-8"
          disabled={pageData.tmp.loading_key}
          loading={pageData.tmp.loading_key}
          onclick={onUpdateAccess}
        >
          Update key
        </Button>
      {/if}
    </form>
  </div>
</div>
