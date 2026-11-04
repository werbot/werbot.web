<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { routePath, routePathWithQuery } from "$lib/navigation/registry";
  import { authStore, usePageData } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  import { acceptToken, getTokenInfo, isTokenUsable, registerToken, tokenProfile } from "$lib/api/token";

  const pageData = usePageData();
  const token = $derived(page.params.token ?? null);

  const onSubmit = async (): Promise<void> => {
    if (!token || !pageData.tmp.canRegister) {
      return;
    }

    pageData.error = {};

    const password: string = pageData.base.password?.trim() ?? "";
    const password2: string = pageData.base.password2?.trim() ?? "";

    if (!password || password.length < 8) {
      pageData.error["password"] = "Weak password";
      return;
    }

    if (password !== password2) {
      pageData.error["password2"] = "Passwords do not match";
      return;
    }

    try {
      pageData.loading = true;

      const res = await (Number(pageData.tmp.tokenSection) === 1
        ? registerToken(token, password)
        : acceptToken(token, { password }));

      if (res.data) {
        showMessage(res.data.message ?? "Registration completed");
        await goto(routePath("auth-signin"));
        return;
      }

      if (res.error) {
        if (res.error.result && typeof res.error.result === "object") {
          pageData.error = res.error.result;
        } else {
          pageData.base.message = res.error.result ?? res.error.message;
        }
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.loading = false;
    }
  };

  const loadToken = async (invite: string): Promise<void> => {
    try {
      const res = await getTokenInfo(invite);

      if (res.error) {
        await showApiError(res.error, [404]);
        pageData.base.message = "This invitation link is invalid or has expired.";
        return;
      }

      const info = res.data.result;
      if (!isTokenUsable(info)) {
        pageData.base.message = "This invitation has already been used.";
        return;
      }

      const profileExists = info.profile_exists ?? !!info.profile_id;
      if (profileExists) {
        await goto(routePathWithQuery("auth-signin", { token: invite }));
        return;
      }

      pageData.tmp.tokenSection = Number(info.section);
      pageData.base.email = tokenProfile(info).email;
      pageData.tmp.canRegister = true;
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  onMount(() => {
    document.title = "Sign Up";

    if (authStore.logged_in) {
      void goto(routePath("index"));
      return;
    }

    if (!token) {
      pageData.base.message = "Registration is available by invitation only.";
      return;
    }

    void loadToken(token);
  });
</script>

<img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
<div class="card w-[22rem]">
  <span class="title">Sign Up</span>
  {#if pageData.base.message}
    <div class="desc">{pageData.base.message}</div>
  {/if}
  <form
    onsubmit={(event): void => {
      event.preventDefault();
    }}
  >
    <Input bind:value={pageData.base.email} name="Email" placeholder="user@werbot.net" disabled class="mt-5" />
    <Input
      bind:value={pageData.base.password}
      name="Password"
      error={pageData.error["password"]}
      type="password"
      autocomplete="current-password"
      disabled={pageData.loading || !pageData.tmp.canRegister}
      class="mt-5"
    />
    <Input
      bind:value={pageData.base.password2}
      name="Re-Type Password"
      error={pageData.error["password2"]}
      type="password"
      autocomplete="current-password"
      disabled={pageData.loading || !pageData.tmp.canRegister}
      class="mt-5"
    />

    <div class="form-control pt-8">
      <Button loading={pageData.loading} disabled={!pageData.tmp.canRegister} onclick={onSubmit}>Registration</Button>
    </div>
  </form>
</div>
