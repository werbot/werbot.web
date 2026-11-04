<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { acceptToken, getTokenInfo, isTokenUsable } from "$lib/api/token";
  import { routePath, routePathWithQuery } from "$lib/navigation/registry";
  import { systemStore, usePageData } from "$lib/stores";
  import { authStore } from "$lib/stores/auth.svelte";
  import { showApiError } from "$lib/utils";

  const pageData = usePageData();
  const invite = $derived(page.params.invite ?? null);

  const load = async (token: string): Promise<void> => {
    systemStore.invites.project = token;

    try {
      const res = await getTokenInfo(token);
      if (res.error) {
        systemStore.invites.project = null;
        await showApiError(res.error, [404]);
        pageData.base.message = "Invite is invalid";
        return;
      }

      const info = res.data.result;
      if (!isTokenUsable(info)) {
        systemStore.invites.project = null;
        pageData.base.message = "Invite is activated";
        return;
      }

      if (!authStore.logged_in) {
        const profileExists = info.profile_exists ?? !!info.profile_id;

        if (profileExists) {
          await goto(routePathWithQuery("auth-signin", { token }));
        } else {
          await goto(routePath("auth-signup", { token }));
        }
        return;
      }

      const acceptRes = await acceptToken(token);
      if (acceptRes.data) {
        systemStore.invites.project = null;
        await goto(routePath("index"));
        return;
      }

      pageData.base.message = acceptRes.error?.code === 403 ? "Wrong user" : "Invite is invalid";
      await showApiError(acceptRes.error);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  onMount(() => {
    document.title = "Invitation to join the project";

    if (!invite) {
      pageData.base.message = "Invite is invalid";
      return;
    }

    void load(invite);
  });
</script>

{#if pageData.base.message == "Invite is invalid"}
  <div class="artboard red">
    <header>
      <h1>Invitation to join the project</h1>
    </header>
    <div class="desc">The link to join the project is invalid.</div>
  </div>
{/if}

{#if pageData.base.message == "Wrong user"}
  <div class="artboard red">
    <header>
      <h1>Invitation to join the project</h1>
    </header>
    <div class="desc">
      <b>Possible reasons for this warning:</b><br />
      1. You are not authorized. To continue -
      <a href={routePath("index")}>login</a>.<br />
      2. You are authorized, but the invite is not intended for the current account. You must be logged in with the correct
      account (the email address you received the invitation to is the correct account)
    </div>
  </div>
{/if}

{#if pageData.base.message == "Invite is activated"}
  <div class="artboard yellow">
    <header>
      <h1>Invitation to join the project</h1>
    </header>
    <div class="desc">
      This prompt is not valid because it has already been used to add the current account to the project.
    </div>
  </div>
{/if}
