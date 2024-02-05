import { defineStore } from "pinia";
import { signIn, logout, refresh } from "@/api/auth";
import { RefreshTokenRequest } from "@proto/account";
import { SignIn_Request } from "@proto/account";
import { getStorage, setStorage, removeStorage } from "@/utils/storage";
import { parseJwt } from "@/utils/jwt";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    logged_in: !!getStorage("access_token"),
    expires_at: null,
    session_id: null,
    user: {
      user: null,
      name: undefined,
      role: null,
    },
  }),

  getters: {
    hasExpiresAt: (state) => state.expires_at,
    hasSessionID: (state) => state.session_id,

    hasUserName: (state) => state.user.name,
    hasUserRole: (state) => state.user.role,
    hasUserID: (state) => state.user.user,
  },

  actions: {
    resetStore() {
      removeStorage("access_token");
      removeStorage("refresh_token");
      //removeStorage("expires_at");

      this.logged_in = false;
      this.$reset();
    },

    async login(loginForm: SignIn_Request) {
      await signIn(loginForm).then((res: any) => {
        if (res.data.result.access_token && res.data.result.refresh_token) {
          setStorage("access_token", res.data.result.access_token);
          setStorage("refresh_token", res.data.result.refresh_token);

          //const jwt = parseJwt(res.data.result.access_token);
          //const expires_at = new Date(jwt.exp * 1000).toISOString();
          //setStorage("expires_at", expires_at);
          this.logged_in = true;
          this.getProfile();
        }
      });
    },

    async refreshToken() {
      const token: RefreshTokenRequest = {
        refresh_token: getStorage("refresh_token"),
      };

      await refresh(token)
        .then((res: any) => {
          if (res.status === 200) {
            setStorage("access_token", res.data.result.access_token);

            if (res.data.result.refresh_token) {
              setStorage("refresh_token", res.data.result.refresh_token);
            }
            //const jwt = parseJwt(res.data.result.access_token);
            //const expires_at = new Date(jwt.exp * 1000).toISOString();
            //setStorage("expires_at", expires_at);

            this.getProfile();
          }
        })
        .catch((err) => {
          this.resetStore();
        });
    },

    async logout() {
      if (this.logged_in) {
        await logout().catch((err) => {
          console.log(err.response);
        });
      }
      this.resetStore();
    },

    async getProfile() {
      const jwt = parseJwt(getStorage("access_token"));
      this.user.name = jwt.User.user_name;
      this.user.role = jwt.User.roles;
      this.user.user = jwt.User.user_id;
      this.session_id = jwt.sub;
      this.expires_at = getStorage("expires_at");
      this.expires_at = jwt.exp;
    },
  },
});
