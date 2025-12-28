import { defineStore } from "pinia";
import { useProjectStore } from "@/store";

import { api } from "@/api";
import { SignIn_Request, Token_Request } from "@proto/account";
import { User_Request } from "@proto/user";

import { getStorage, parseJwt, removeStorage, setStorage } from "@/utils";

interface AuthState {
  logged_in: boolean;
  expires_at: number | null;
  session_id: string | null;
  user: {
    id: string | null;
    name: string | null;
    surname: string | null;
    email: string | null;
    role: number | null;
  };
  invites: {
    project: string | null;
  };
  error: Record<string, null>;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    logged_in: !!getStorage("access_token"),
    expires_at: null,
    session_id: null,
    user: {
      id: null,
      name: null,
      surname: null,
      email: null,
      role: null
    },
    invites: {
      project: null
    },
    error: {}
  }),

  getters: {
    hasExpiresAt: (state) => state.expires_at,
    hasSessionID: (state) => state.session_id,

    hasUserName: (state) => state.user.name,
    hasUserSurname: (state) => state.user.surname,
    hasUserEmail: (state) => state.user.email,
    hasUserRole: (state) => state.user.role,
    hasUserID: (state) => state.user.id
  },

  actions: {
    resetStore() {
      removeStorage("access_token");
      removeStorage("refresh_token");

      this.logged_in = false;
      this.$reset();
      useProjectStore().resetStore();
    },

    resetError() {
      this.error = {};
    },

    setError(error: Record<string, null>) {
      this.error = error;
    },

    async login(loginForm: SignIn_Request) {
      try {
        const res = await api().POST(`/auth/signin`, {}, loginForm);
        if (res.data) {
          setStorage("access_token", res.data.result.access_token);
          setStorage("refresh_token", res.data.result.refresh_token);

          //const jwt = parseJwt(res.result.access_token);
          //const expires_at = new Date(jwt.exp * 1000).toISOString();
          //setStorage("expires_at", expires_at);
          this.logged_in = true;
          this.getProfile();
          this.resetError();
        }
        if (res.error) {
          this.error = res.error.result;
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    },

    async refreshToken() {
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

          this.logged_in = true;
          this.getProfile();
        }
      } catch (err) {
        this.resetStore();
        console.error("Unexpected error:", err);
      }
    },

    async logout() {
      if (this.logged_in) {
        try {
          await api().POST(`/auth/logout`);
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      }
      this.resetStore();
    },

    getToken() {
      return getStorage("access_token");
    },

    async getProfile() {
      try {
        // data from jwt
        const jwt = parseJwt(getStorage("access_token"));
        this.user = {
          ...this.user,
          name: jwt.User.name,
          role: jwt.User.roles,
          id: jwt.User.profile_id
        };

        this.session_id = jwt.sub;
        this.expires_at = jwt.exp;

        // data from api
        const queryParams = {
          profile_id: jwt.User.profile_id
        };

        const res = await api(false).GET(`/v1/profiles`, queryParams);
        if (res.data) {
          this.user = {
            ...this.user,
            surname: res.data.result.surname,
            email: res.data.result.email
          };
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    }
  }
});
