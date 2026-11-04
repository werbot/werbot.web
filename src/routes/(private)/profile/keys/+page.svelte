<script lang="ts">
  import { onMount } from "svelte";

  import { resolve } from "$app/paths";
  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Button from "$lib/components/form/Button.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import { usePageData } from "$lib/stores";
  import { showApiError, showMessage, toDate } from "$lib/utils";

  const pageData = usePageData();

  function queryFromUrl(): Record<string, string> {
    const params: Record<string, string> = {};
    const limit = page.url.searchParams.get("limit");
    const offset = page.url.searchParams.get("offset");

    if (limit !== null) {
      params.limit = limit;
    }
    if (offset !== null) {
      params.offset = offset;
    }

    return params;
  }

  const getData = async (query: { limit?: string | number; offset?: string | number } = {}): Promise<void> => {
    try {
      const queryParams = {
        ...(query?.limit !== undefined && { limit: query.limit }),
        ...(query?.offset !== undefined && { offset: query.offset })
      };

      const res = await api().GET(`/v1/keys`, queryParams);
      if (res.data) {
        pageData.base = res.data.result;
      }
      if (res.error) {
        await showApiError(res.error, [404]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const onSelectPage = (event: { limit: number; offset: number }): void => {
    void getData(event);
  };

  const openModal = (id: number): void => {
    pageData.modal = true;
    pageData.tmp.id = id;
  };

  const closeModal = (): void => {
    pageData.modal = false;
  };

  const removeKey = async (id: number): Promise<void> => {
    try {
      const res = await api().DELETE(`/v1/keys/${pageData.base.public_keys[id].key_id}`);
      if (res.data) {
        closeModal();
        pageData.base.public_keys.splice(id, 1);
        pageData.base.total = pageData.base.total - 1;
        showMessage(res.data.message);
      }
      if (res.error) {
        closeModal();
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  onMount(() => {
    document.title = "SSH keys";
    void getData(queryFromUrl());
  });
</script>

<div class="artboard">
  <header>
    <h1>SSH keys</h1>
    <a href={resolve("/profile/keys/add")} class="breadcrumbs">
      <SvgIcon name="plus_square" class="mr-3" />
      add new
    </a>
  </header>
  <div class="desc">
    This is a list of SSH keys associated with your account. Remove any keys that you do not recognize.
  </div>

  {#if pageData.base.total > 0}
    <table>
      <tbody>
        {#each pageData.base.public_keys ?? [] as item, index (index)}
          <tr>
            <td>
              <div class="font-bold">{item.title}</div>
              <div>{item.fingerprint}</div>
            </td>
            <td class="adaptive-md">
              <div><span class="font-bold">Added on:</span> {toDate(item.created_at)}</div>
              {#if item.updated_at}
                <div>
                  <span class="font-bold">Last used:</span>
                  {toDate(item.updated_at)}
                </div>
              {:else}
                <div class="text-gray-400"><span class="font-bold">Last used:</span> no used</div>
              {/if}
            </td>
            <td class="w-6">
              <SvgIcon
                name="delete"
                class="cursor-pointer text-red-500"
                onclick={(): void => openModal(Number(index))}
              />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <div class="content p-5">Empty</div>
  {/if}

  <Pagination total={pageData.base.total} class="content" onselectPage={onSelectPage} />
</div>

<div class="m-6">
  Check out our guide to
  <!-- svelte-ignore a11y_invalid_attribute -->
  <a href="#">generating SSH keys</a> or troubleshoot
  <!-- svelte-ignore a11y_invalid_attribute -->
  <a href="#">common SSH problems</a>.
</div>

<Modal showModal={pageData.modal} title="Are you sure you want to delete this SSH key?" onclose={closeModal}>
  <p>
    This action CANNOT be undone. This will permanently delete the SSH key and if you’d like to use it in the future,
    you will need to upload it again. <br />
  </p>
  {#snippet footer()}
    <div class="flex flex-row justify-end">
      <Button
        class="red"
        onclick={(): void => {
          void removeKey(pageData.tmp.id);
        }}>Delete SSH key</Button
      >
      <Button class="ml-5" onclick={closeModal}>Close</Button>
    </div>
  {/snippet}
</Modal>
