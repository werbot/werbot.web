<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  import { api } from "$lib/api";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import Textarea from "$lib/components/form/Textarea.svelte";
  import { usePageData } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  import { type AddKey_Request } from "@proto/key/message";

  const pageData = usePageData();

  const onSubmit = async (): Promise<void> => {
    try {
      pageData.loading = true;
      const bodyParams = {
        title: pageData.base.title,
        key: pageData.base.key
      } as AddKey_Request;

      const res = await api().POST(`/v1/keys`, {}, bodyParams);
      if (res.data) {
        showMessage(res.data.message);
        pageData.error = {};
        await goto(resolve("/profile/keys"));
      }
      if (res.error) {
        const errorResult = res.error.result;
        if (errorResult === "The public key has a broken") {
          pageData.error.key = errorResult;
          return;
        } else {
          pageData.error = errorResult;
        }
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.loading = false;
    }
  };

  onMount(() => {
    document.title = "Add new key";
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={resolve("/profile/keys")}> SSH keys </a>
      <span>Add new</span>
    </h1>
  </header>
  <div class="desc">
    Check out our guide to
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="#">generating SSH keys</a> or troubleshoot
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="#">common SSH problems</a>.
  </div>

  <div class="content">
    <form
      onsubmit={(event): void => {
        event.preventDefault();
      }}
    >
      <Input
        bind:value={pageData.base.title}
        name="Title"
        error={pageData.error["title"]}
        disabled={pageData.loading}
        class="w-80"
      />
      <Textarea
        bind:value={pageData.base.key}
        name="Key"
        error={pageData.error["key"]}
        disabled={pageData.loading}
        rows={6}
        class="mt-5"
        placeholder="Begins with 'ssh-rsa', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521', 'ssh-ed25519', 'sk-ecdsa-sha2-nistp256@openssh.com', or 'sk-ssh-ed25519@openssh.com'"
      />

      <Button class="mt-8" loading={pageData.loading} onclick={onSubmit}>Add SSH key</Button>
    </form>
  </div>
</div>
