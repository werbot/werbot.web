<script lang="ts">
  import { onMount } from "svelte";

  import { api } from "$lib/api";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import { profileSettingTabs } from "$lib/menus/profile";
  import { usePageData } from "$lib/stores";
  import { authStore } from "$lib/stores/auth.svelte";
  import { showApiError, showMessage } from "$lib/utils";

  const pageData = usePageData();

  const onUpdatePassword = async (): Promise<void> => {
    try {
      pageData.error = {};
      const old_password = pageData.base.old_password?.trim() ?? "";
      const new_password = pageData.base.new_password?.trim() ?? "";
      // Legacy v-model.trim covers old/new passwords only; the re-typed one is raw.
      const new_password2 = pageData.base.new_password2;

      if (!old_password) {
        pageData.error["old_password"] = "Weak password";
        return;
      }

      if (!new_password || new_password.length < 8) {
        pageData.error["new_password"] = pageData.error["new_password2"] = "Weak password";
        return;
      }

      if (new_password !== new_password2) {
        pageData.error["new_password"] = pageData.error["new_password2"] = "Passwords do not match";
        return;
      }

      if (old_password == new_password && new_password == new_password2) {
        pageData.error["new_password"] = pageData.error["new_password2"] =
          "The password must be different from the current one";
        return;
      }

      pageData.loading = true;

      const bodyParams = {
        old_password,
        new_password
      };

      const res = await api().UPDATE(`/v1/profiles/password`, {}, bodyParams);
      if (res.data) {
        showMessage(res.data.message);
        pageData.base.old_password = "";
        pageData.base.new_password = "";
        pageData.base.new_password2 = "";
        void authStore.refreshToken();
        pageData.error = {};
      }
      if (res.error) {
        if (res.error.result === "Password is not valid") {
          pageData.error["old_password"] = res.error.result;
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
    document.title = "Password update";
  });
</script>

<div class="artboard">
  <header>
    <h1>Password update</h1>
  </header>

  <Tabs tabs={profileSettingTabs} />

  <div class="content">
    <form
      onsubmit={(event): void => {
        event.preventDefault();
      }}
    >
      <div class="flex flex-row">
        <Input
          bind:value={pageData.base.old_password}
          name="Current Password"
          error={pageData.error["old_password"]}
          disabled={pageData.loading}
          class="w-80"
          type="password"
          autocomplete="current-password"
        />
      </div>

      <div class="mt-5 flex flex-row">
        <Input
          bind:value={pageData.base.new_password}
          name="New password"
          error={pageData.error["new_password"]}
          disabled={pageData.loading}
          class="mr-5 flex-grow"
          type="password"
          autocomplete="new-password"
        />
        <Input
          bind:value={pageData.base.new_password2}
          name="Re-Type New Password"
          error={pageData.error["new_password2"]}
          disabled={pageData.loading}
          class="flex-grow"
          type="password"
          autocomplete="new-password"
        />
      </div>

      <Button class="mt-8" loading={pageData.loading} onclick={onUpdatePassword}>Update password</Button>
    </form>
  </div>
</div>
