import type { SignIn_Request, Token_Request } from "@proto/profile/message";

import { api } from "$lib/api";
import { projectStore } from "$lib/stores/project.svelte";
import { getStorage, parseJwt, removeStorage, setStorage } from "$lib/utils";

export interface AuthUser {
  id: string | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  role: number | null;
}

export interface AuthState {
  logged_in: boolean;
  expires_at: number | null;
  session_id: string | null;
  user: AuthUser;
  invites: {
    project: string | null;
  };
  error: Record<string, null>;
}

function createUser(): AuthUser {
  return {
    id: null,
    name: null,
    surname: null,
    email: null,
    role: null
  };
}

const state = $state<AuthState>({
  logged_in: !!getStorage("access_token"),
  expires_at: null,
  session_id: null,
  user: createUser(),
  invites: {
    project: null
  },
  error: {}
});

export const authStore = {
  get logged_in(): boolean {
    return state.logged_in;
  },

  get expires_at(): number | null {
    return state.expires_at;
  },

  get session_id(): string | null {
    return state.session_id;
  },

  get user(): AuthUser {
    return state.user;
  },

  get invites(): AuthState["invites"] {
    return state.invites;
  },

  get error(): Record<string, null> {
    return state.error;
  },

  get hasExpiresAt(): number | null {
    return state.expires_at;
  },

  get hasSessionID(): string | null {
    return state.session_id;
  },

  get hasUserName(): string | null {
    return state.user.name;
  },

  get hasUserSurname(): string | null {
    return state.user.surname;
  },

  get hasUserEmail(): string | null {
    return state.user.email;
  },

  get hasUserRole(): number | null {
    return state.user.role;
  },

  get hasUserID(): string | null {
    return state.user.id;
  },

  resetStore(): void {
    removeStorage("access_token");
    removeStorage("refresh_token");

    state.logged_in = false;
    state.expires_at = null;
    state.session_id = null;
    state.user = createUser();
    state.invites = { project: null };
    state.error = {};
    projectStore.resetStore();
  },

  resetError(): void {
    state.error = {};
  },

  setError(error: Record<string, null>): void {
    state.error = error;
  },

  async login(loginForm: SignIn_Request): Promise<void> {
    try {
      const res = await api().POST(`/auth/signin`, {}, loginForm);
      if (res.data) {
        setStorage("access_token", res.data.result.access_token);
        setStorage("refresh_token", res.data.result.refresh_token);

        state.logged_in = true;
        authStore.getProfile();
        authStore.resetError();
      }
      if (res.error) {
        state.error = res.error.result;
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  },

  async refreshToken(): Promise<void> {
    try {
      const token: Token_Request = {
        refresh: getStorage("refresh_token")
      };

      const res = await api().POST(`/auth/refresh`, {}, token);
      if (res.data) {
        setStorage("access_token", res.data.result.access_token);
        if (res.data.result.refresh_token) {
          setStorage("refresh_token", res.data.result.refresh_token);
        }

        state.logged_in = true;
        authStore.getProfile();
      }
    } catch (err) {
      authStore.resetStore();
      console.error("Unexpected error:", err);
    }
  },

  async logout(): Promise<void> {
    if (state.logged_in) {
      try {
        await api().POST(`/auth/logout`);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    }
    authStore.resetStore();
  },

  getToken(): string {
    return getStorage("access_token");
  },

  async getProfile(): Promise<void> {
    try {
      // data from jwt
      const jwt = parseJwt(getStorage("access_token"));
      state.user = {
        ...state.user,
        name: jwt.User.name,
        role: jwt.User.roles,
        id: jwt.User.profile_id
      };

      state.session_id = jwt.sub;
      state.expires_at = jwt.exp;

      // data from api
      const queryParams = {
        profile_id: jwt.User.profile_id
      };

      const res = await api(false).GET(`/v1/profiles`, queryParams);
      if (res.data) {
        state.user = {
          ...state.user,
          surname: res.data.result.surname,
          email: res.data.result.email
        };
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }
};
