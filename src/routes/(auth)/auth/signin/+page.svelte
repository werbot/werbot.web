<script lang="ts">
  import type { SignIn_Request } from "@proto/profile/message";
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { routePath } from "$lib/navigation/registry";
  import { authStore, systemStore, usePageData } from "$lib/stores";

  const pageData = usePageData();

  const pendingToken = (): string | null => {
    return page.url.searchParams.get("token") || systemStore.invites.project;
  };

  const target = (): string => {
    const token = pendingToken();

    if (token) {
      systemStore.invites.project = token;
      return routePath("invite-project-invite", { invite: token });
    }

    return routePath("index");
  };

  const onSubmit = async (): Promise<void> => {
    try {
      pageData.loading = true;

      await authStore.login({
        email: pageData.base.email?.trim(),
        password: pageData.base.password?.trim()
      } as SignIn_Request);

      if (!authStore.logged_in) {
        return;
      }

      await goto(target());
    } finally {
      pageData.loading = false;
    }
  };

  onMount(() => {
    document.title = "Sign In";

    if (authStore.logged_in) {
      void goto(target());
    }
  });
</script>

<img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
<div class="card w-[22rem]">
  <span class="title">Sign In</span>
  <form
    onsubmit={(event): void => {
      event.preventDefault();
    }}
  >
    <Input
      bind:value={pageData.base.email}
      name="Email"
      error={authStore.error?.["email"]}
      autocomplete="username"
      disabled={pageData.loading}
    />
    <Input
      bind:value={pageData.base.password}
      name="Password"
      error={authStore.error?.["password"]}
      type="password"
      autocomplete="current-password"
      disabled={pageData.loading}
      class="mt-5"
    />
    <div class="form-control pt-8">
      <Button loading={pageData.loading} onclick={onSubmit}>Login</Button>
    </div>
  </form>
</div>

<div class="mt-10">
  <a href={routePath("auth-password_reset")} class="mt-2">Forgot password?</a>
</div>
