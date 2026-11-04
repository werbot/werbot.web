<script lang="ts">
  import type { ResetPassword_Password } from "@proto/profile/message";
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { api } from "$lib/api";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { routePath } from "$lib/navigation/registry";
  import { usePageData } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  const pageData = usePageData();
  const token = $derived(page.params.token ?? null);

  const onSubmit = async (): Promise<void> => {
    const password: string = pageData.base.password?.trim() ?? "";
    const password2: string = pageData.base.password2?.trim() ?? "";
    let errorMessage: string | null = null;

    if (password !== password2) {
      errorMessage = "Passwords do not match";
    } else if (password.length < 8) {
      errorMessage = "Weak password";
    }

    if (errorMessage) {
      pageData.error = {
        password: errorMessage,
        password2: errorMessage
      };
      return;
    }

    try {
      pageData.loading = true;

      const res = await api().POST(
        `/auth/password_reset`,
        {},
        {
          password: {
            password,
            token
          } as ResetPassword_Password
        }
      );
      if (res.data) {
        showMessage(res.data.message);
        await goto(routePath("auth-signin"));
      }
      if (res.error) {
        pageData.error.password = res.error.result["password.password"];
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.loading = false;
    }
  };

  const validateToken = async (value: string): Promise<void> => {
    try {
      const res = await api().GET(`/auth/password_reset/${value}`);
      if (res.error) {
        if (["Not Found", "Token is invalid"].includes(res.error.result)) {
          await goto(routePath("auth-signin"));
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  onMount(() => {
    document.title = "Reset password";

    if (!token) {
      void goto(routePath("auth-signin"));
      return;
    }

    void validateToken(token);
  });
</script>

<img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
<div class="card w-[22rem]">
  <span class="title">Reset password</span>

  <form
    onsubmit={(event): void => {
      event.preventDefault();
    }}
  >
    <Input
      bind:value={pageData.base.password}
      name="New password"
      type="password"
      autocomplete="new-password"
      error={pageData.error["password"]}
      disabled={pageData.loading}
    />
    <Input
      bind:value={pageData.base.password2}
      name="Repeat password"
      type="password"
      autocomplete="new-password"
      error={pageData.error["password2"]}
      disabled={pageData.loading}
      class="mt-5"
    />
    <div class="form-control pt-8">
      <Button loading={pageData.loading} onclick={onSubmit}>Save new password</Button>
    </div>
  </form>
</div>

<div class="mt-10">
  <p>
    Already have an account?
    <a href={routePath("auth-signin")}>Sign in</a>
  </p>
</div>
