import { defineStore } from "pinia";
import { postSignIn, postLogout, postRefresh, getProfile } from "@/api/auth";
import { RefreshTokenRequest } from "@proto/account";
import { SignIn_Request } from "@proto/account";

import { getStorage, setStorage, removeStorage } from "@/utils/storage";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loggedIn: !!getStorage("access_token"),
    user: {
      name: undefined,
      user_role: null,
      user_id: null,
    },
  }),

  getters: {
    hasUserName: (state) => state.user.name,
    hasUserRole: (state) => state.user.user_role,
    hasUserID: (state) => state.user.user_id,
  },

  actions: {
    resetStore() {
      removeStorage("access_token");
      removeStorage("refresh_token");

      this.$reset();
    },

    async login(loginForm: SignIn_Request) {
      await postSignIn(loginForm).then((res) => {
        if (res.data.access_token && res.data.refresh_token) {
          setStorage("access_token", res.data.access_token);
          setStorage("refresh_token", res.data.refresh_token);
          this.loggedIn = true;
          this.getProfile();
        }
      });
    },

    async refreshToken() {
      const token: RefreshTokenRequest = {
        refresh_token: getStorage("refresh_token"),
      };

      await postRefresh(token)
        .then((res) => {
          if (res.status === 200) {
            setStorage("access_token", res.data.access_token);
            setStorage("refresh_token", res.data.refresh_token);
            this.getProfile();
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.resetStore();
          } else {
            console.log(err.response);
          }
        });
    },

    async logout() {
      if (this.loggedIn) {
        await postLogout().catch((err) => {
          console.log(err.response);
        });
      }
      this.resetStore();
    },

    async getProfile() {
      await getProfile().then((r) => {
        this.user = r.data.result;
      });
    },
  },
});
