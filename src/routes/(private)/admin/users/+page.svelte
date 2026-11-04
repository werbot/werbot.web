<script lang="ts">
  import { onMount } from "svelte";

  import { createProfileToken, listProfileTokens, registrationInviteLink, tokenStatusName } from "$lib/api/token";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { usePageData } from "$lib/stores";
  import { showApiError, showMessage, toDate } from "$lib/utils";

  const pageData = usePageData();

  // The legacy template read `pageData.base.tokens.length` before the API filled
  // it and crashed. Seed the list so the first render is always safe.
  pageData.base.tokens = [];
  pageData.base.email = "";
  pageData.base.name = "";
  pageData.base.surname = "";

  const getData = async (): Promise<void> => {
    const res = await listProfileTokens();
    if (res.data) {
      pageData.base.tokens = res.data.result?.tokens ?? [];
    }
    if (res.error) {
      await showApiError(res.error, [404]);
      pageData.base.tokens = [];
    }
  };

  const onCreate = async (): Promise<void> => {
    pageData.loading = true;
    try {
      const res = await createProfileToken({
        email: pageData.base.email?.trim(),
        name: pageData.base.name?.trim(),
        surname: pageData.base.surname?.trim()
      });
      if (res.data) {
        pageData.tmp.link = registrationInviteLink(res.data.result.token);
        pageData.base.email = "";
        pageData.base.name = "";
        pageData.base.surname = "";
        showMessage(res.data.message);
        await getData();
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } finally {
      pageData.loading = false;
    }
  };

  onMount(async () => {
    document.title = "Users";
    await getData();
  });
</script>

<div class="artboard">
  <header>
    <h1>Users</h1>
  </header>
  <div class="desc">Invite a new user by email. The invitation link opens the registration page.</div>

  <div class="content">
    <form
      class="flex flex-wrap items-end gap-4"
      onsubmit={(event): void => {
        event.preventDefault();
      }}
    >
      <Input bind:value={pageData.base.email} name="Email" placeholder="user@werbot.net" />
      <Input bind:value={pageData.base.name} name="Name" placeholder="Name" />
      <Input bind:value={pageData.base.surname} name="Surname" placeholder="Surname" />
      <Button loading={pageData.loading} onclick={onCreate}>Create invite</Button>
    </form>

    {#if pageData.tmp.link}
      <div class="mt-6 break-all">
        <b>Invitation link:</b>
        <a href={pageData.tmp.link}>{pageData.tmp.link}</a>
      </div>
    {/if}

    {#if pageData.base.tokens.length}
      <div class="mt-8 w-full overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {#each pageData.base.tokens as item, index (index)}
              <tr>
                <td>{item.profile?.email ?? item.email}</td>
                <td>{item.profile?.name ?? item.name} {item.profile?.surname ?? item.surname}</td>
                <td>{tokenStatusName(item.status)}</td>
                <td>{toDate(item.created_at)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <div class="desc mt-8">No registration invitations yet.</div>
    {/if}
  </div>
</div>
