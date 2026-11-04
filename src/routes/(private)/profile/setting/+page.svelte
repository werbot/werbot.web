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

  const onUpdateProfile = async (): Promise<void> => {
    try {
      pageData.loading = true;

      const fields = {
        email: authStore.user.email?.trim(),
        name: authStore.user.name?.trim(),
        surname: authStore.user.surname?.trim()
      };

      const responses = await Promise.all(
        Object.entries(fields)
          .filter(([, value]) => Boolean(value))
          .map(([field, value]) => api().UPDATE(`/v1/profiles`, {}, { [field]: value }))
      );
      const failed = responses.find((res) => res.error);

      if (!failed) {
        showMessage("Profile updated");
        pageData.error = {};
        return;
      }

      const result = failed.error.result;
      if (result && typeof result === "object") {
        pageData.error = {
          "info.email": result.email ?? null,
          "info.name": result.name ?? null,
          "info.surname": result.surname ?? null
        };
      }
      await showApiError(failed.error);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.loading = false;
    }
  };

  onMount(() => {
    document.title = "Profile setting";
  });
</script>

<div class="artboard">
  <header>
    <h1>Profile setting</h1>
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
          bind:value={authStore.user.email}
          name="Email"
          error={pageData.error["info.email"]}
          disabled={pageData.loading}
          class="flex-grow"
        />
      </div>

      <div class="mt-5 flex flex-row">
        <Input
          bind:value={authStore.user.name}
          name="Name"
          error={pageData.error["info.name"]}
          disabled={pageData.loading}
          class="mr-5 flex-grow"
        />
        <Input
          bind:value={authStore.user.surname}
          name="Surname"
          error={pageData.error["info.surname"]}
          disabled={pageData.loading}
          class="flex-grow"
        />
      </div>

      <Button class="mt-8" loading={pageData.loading} onclick={onUpdateProfile}>Update profile</Button>
    </form>
  </div>
</div>
