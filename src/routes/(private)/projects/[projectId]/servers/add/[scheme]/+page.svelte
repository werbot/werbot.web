<script lang="ts">
  import { onMount, untrack } from "svelte";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import Select from "$lib/components/form/Select.svelte";
  import Textarea from "$lib/components/form/Textarea.svelte";
  import Toggle from "$lib/components/form/Toggle.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import { routePath } from "$lib/navigation/registry";
  import { usePageData } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  import { SchemeType as ServerScheme } from "@proto/scheme/access";
  import { AuthMethod } from "@proto/scheme/auth";

  const pageData = usePageData();

  pageData.base = {
    access: {}
  };
  pageData.tmp = {
    new_key: false
  };

  const params = $derived(page.params as { projectId?: string; scheme?: string });
  const projectId = $derived(params.projectId ?? "");
  const scheme = $derived(params.scheme ?? null);

  let copied = $state(false);

  const supportedServerSchemes = ["server_ssh", "server_telnet"];

  const resolveSchemeKey = (value: string | null): string | null => {
    if (!value) {
      return null;
    }

    const numericValue = Number(value);
    const schemeName = Number.isNaN(numericValue) ? value : ServerScheme[numericValue];

    return typeof schemeName === "string" && supportedServerSchemes.includes(schemeName) ? schemeName : null;
  };

  const showServerFields = $derived(["server_ssh", "server_telnet"].includes(resolveSchemeKey(scheme) ?? ""));
  const schemeKey = $derived(resolveSchemeKey(scheme) ?? "server_ssh");
  const isTelnet = $derived(schemeKey === "server_telnet");
  const authKey = $derived(pageData.base.auth === AuthMethod.key ? "key" : "password");
  const errorKeys = $derived({
    address: `scheme.${schemeKey}.address`,
    port: `scheme.${schemeKey}.port`,
    login: isTelnet ? `scheme.${schemeKey}.access.login` : `scheme.${schemeKey}.${authKey}.login`,
    password: isTelnet ? `scheme.${schemeKey}.access.password` : `scheme.${schemeKey}.${authKey}.password`,
    key: `scheme.${schemeKey}.key.key_id`
  });

  const buildAccessScheme = (): Record<string, any> => {
    const { base } = pageData;
    const address = base.address?.trim();
    const login = base.login?.trim();
    const port = base.port === "" || base.port == null ? base.port : Number(base.port);

    if (isTelnet) {
      return {
        [schemeKey]: {
          address,
          port,
          access: {
            login,
            password: base.access.password?.trim()
          }
        }
      };
    }

    const auth =
      base.auth === AuthMethod.key
        ? { key: { login, key_id: base.access.key_id } }
        : { password: { login, password: base.access.password?.trim() } };

    return {
      [schemeKey]: {
        address,
        port,
        // SSH keeps the auth method as a sibling of address/port; other server
        // types nest it under `access`.
        ...(schemeKey === "server_ssh" ? auth : { access: auth })
      }
    };
  };

  const genNewKey = async (): Promise<void> => {
    try {
      pageData.tmp.new_key = true;
      const res = await api(false).GET(`/v1/keys/generate`);
      if (res.data) {
        pageData.base.public_key = res.data.result.public;
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
      await navigator.clipboard.writeText(pageData.base.public_key ?? "");
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

  $effect(() => {
    const auth = pageData.base.auth;

    untrack(() => {
      if (auth == AuthMethod.password) {
        pageData.base.access.password = "";
        delete pageData.base.public_key;
        delete pageData.base.access.key;
      } else if (auth == AuthMethod.key) {
        void genNewKey();
        if (pageData.base.access.password) {
          delete pageData.base.access.password;
        }
      }
      pageData.error.auth = null;
    });
  });

  const onSubmit = async (): Promise<void> => {
    if (isTelnet && !pageData.base.access.password?.trim()) {
      pageData.error[errorKeys.password] = "password is required";
      showMessage("password is required", "connextWarning");
      return;
    }

    try {
      pageData.loading = true;

      const bodyParams = {
        title: pageData.base.title,
        audit: Boolean(pageData.base.audit),
        active: Boolean(pageData.base.active),
        description: pageData.base.description,
        scheme: buildAccessScheme()
      };

      const res = await api().POST(`/v1/schemes/${projectId}/server`, {}, bodyParams);
      if (res.data) {
        showMessage(res.data.message);
        pageData.error = {};
        await goto(routePath("projects-projectId-servers", { projectId }));
      }
      if (res.error) {
        pageData.error = res.error.result;
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.loading = false;
    }
  };

  onMount(() => {
    document.title = "Step 2: Fill in the fields to connect";

    pageData.base.access = {};
    pageData.tmp.new_key = false;

    if (isTelnet) {
      pageData.base.auth = AuthMethod.password;
    }

    if (!scheme || !resolveSchemeKey(scheme)) {
      void goto(routePath("projects-projectId-servers-add", { projectId }));
    }
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <div class="breadcrumbs">
      <a href={routePath("projects-projectId-servers-add", { projectId })}>Select scheme</a>
      <span>{scheme}</span>
    </div>
  </header>
  <div class="desc">Step 2: Fill in the fields to connect.</div>

  <form
    onsubmit={(event): void => {
      event.preventDefault();
    }}
  >
    <!-- SSH / Telnet -->
    {#if showServerFields}
      <div class="content">
        <Input bind:value={pageData.base.title} name="Title" error={pageData.error["title"]} class="flex-grow" />

        <div class="mt-5 w-full">
          <div class="flex">
            <Input
              bind:value={pageData.base.address}
              name="Address"
              error={pageData.error[errorKeys.address]}
              class="mr-5 flex-grow"
              required={true}
            />
            <Input
              bind:value={pageData.base.port}
              name="Port"
              error={pageData.error[errorKeys.port]}
              class="mr-5 flex-grow"
              required={true}
            />
            <Input
              bind:value={pageData.base.login}
              name="Login"
              error={pageData.error[errorKeys.login]}
              class="flex-grow"
              required={true}
            />
          </div>

          <div class="mt-5 flex">
            <Textarea
              bind:value={pageData.base.description}
              name="Description"
              error={pageData.error["description"]}
              rows={6}
              class="flex-grow"
            />
          </div>

          <div class="mt-5 flex">
            <Toggle id="active" bind:value={pageData.base.active} name="Active" class="mr-5 flex-grow" />
            <Toggle id="audit" bind:value={pageData.base.audit} name="Audit" class="flex-grow" />
          </div>
        </div>
      </div>
    {/if}

    <div class="divider before:bg-gray-100 after:bg-gray-100"></div>
    <div class="content">
      {#if !isTelnet}
        <Select
          bind:value={pageData.base.auth}
          name="Auth"
          options={[
            { value: AuthMethod.password, label: "Password" },
            { value: AuthMethod.key, label: "Key" }
          ]}
          error={pageData.error["auth"]}
          class="mr-5"
        />
      {/if}

      {#if isTelnet || pageData.base.auth == AuthMethod.password}
        <div>
          <Input
            bind:value={pageData.base.access.password}
            name="Password"
            error={pageData.error[errorKeys.password]}
            type="password"
            autocomplete="current-password"
          />
        </div>
      {/if}

      {#if !isTelnet && pageData.base.auth == AuthMethod.key}
        <div class="flex-grow">
          <div class="flex">
            <Input
              bind:value={pageData.base.public_key}
              name="Public key"
              error={pageData.error[errorKeys.key]}
              disabled={true}
              class="grow"
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
    </div>

    <div class="divider before:bg-gray-100 after:bg-gray-100"></div>
    <div class="content">
      <div class="flex-none">
        <Button class="mr-5" loading={pageData.loading} onclick={onSubmit}>Add server</Button>
      </div>
      <div class="flex-grow"></div>
    </div>
  </form>
</div>
