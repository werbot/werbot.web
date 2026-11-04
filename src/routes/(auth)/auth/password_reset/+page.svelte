<script lang="ts">
  import { onMount } from "svelte";

  import { api } from "$lib/api";
  import Button from "$lib/components/form/Button.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { routePath } from "$lib/navigation/registry";
  import { usePageData } from "$lib/stores";
  import { authStore } from "$lib/stores/auth.svelte";
  import { showApiError } from "$lib/utils";

  const pageData = usePageData();

  const onSubmit = async (): Promise<void> => {
    try {
      pageData.loading = true;

      const res = await api().POST(
        `/auth/password_reset`,
        {},
        {
          email: pageData.base.email?.trim()
        }
      );
      if (res.data) {
        pageData.base.message = res.data.message;
        authStore.resetError();
      }
      if (res.error) {
        authStore.setError(res.error.result);
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.loading = false;
    }
  };

  onMount(() => {
    document.title = "Reset password";
  });
</script>

<img class="mb-8 w-32" src="/img/logo_mini.svg" alt="Werbot" />
<div class="card w-[22rem]">
  <span class="title">Reset password</span>
  {#if !pageData.base.message}
    <form
      onsubmit={(event): void => {
        event.preventDefault();
      }}
    >
      <Input
        bind:value={pageData.base.email}
        name="Email"
        error={authStore.error?.["email"]}
        autocomplete="email"
        disabled={pageData.loading}
      />
      <div class="form-control pt-8">
        <Button loading={pageData.loading} onclick={onSubmit}>Send me message</Button>
      </div>
    </form>
  {/if}

  {#if pageData.base.message}
    <div>
      <span class="message">An email has been sent. It contains a link you must click to reset your password.</span>
      <span class="message">Note: You can only request a new password once within 24 hours.</span>
      <span class="message">If you don't get an email check your spam folder or try again.</span>
    </div>
  {/if}
</div>

<div class="mt-10">
  <p>
    Already have an account?
    <a href={routePath("auth-signin")}>Sign in</a>
  </p>
</div>
