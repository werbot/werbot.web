<script lang="ts">
  import { onMount } from "svelte";

  import { api } from "$lib/api";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import { profileSettingTabs } from "$lib/menus/profile";
  import { authStore, usePageData } from "$lib/stores";
  import { showApiError } from "$lib/utils";

  const pageData = usePageData();
  let destroyMessage = $state("");

  const onDelete = async (): Promise<void> => {
    if (!pageData.base.password) {
      pageData.error["password"] = "Password required";
      return;
    }

    if (pageData.base.password.length < 8) {
      pageData.error["password"] = "Weak password";
      return;
    }

    try {
      pageData.loading = true;

      const bodyParams = {
        password: pageData.base.password
      };

      const res = await api().POST(`/v1/profiles/delete`, {}, bodyParams);
      if (res.data) {
        pageData.base.password = "";
        pageData.error = {};

        destroyMessage = res.data.message;
        void authStore.refreshToken();
      }
      if (res.error) {
        if (res.error.result === "Password is not valid") {
          pageData.error["password"] = res.error.result;
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
    document.title = "Destroy profile";
  });
</script>

<div class="artboard red">
  <header>
    <h1>Destroy your profile</h1>
  </header>
  <Tabs tabs={profileSettingTabs} />
  <div class="desc">This operation will permanently delete your user account. It CAN NOT be undone.</div>

  <div class="content">
    {#if destroyMessage}
      <span>{destroyMessage}</span>
    {:else}
      <form
        onsubmit={(event): void => {
          event.preventDefault();
        }}
      >
        <div class="flex flex-row">
          <Input
            bind:value={pageData.base.password}
            name="Password"
            error={pageData.error["password"]}
            disabled={pageData.loading}
            class="w-80"
            type="password"
            autocomplete="current-password"
          />
        </div>

        <Button class="red mt-8" loading={pageData.loading} onclick={onDelete}>Send me email for delete</Button>
      </form>
    {/if}
  </div>
</div>
