export const route = [
  {
    path: "/profile",
    meta: { layout: "private", requiresAuth: true, name: "Profile" },
    children: [
      {
        path: "",
        name: "profile",
        redirect: { name: "profile-setting" },
      },
      {
        path: "logs",
        name: "profile-logs",
        meta: { name: "Profile logs" },
        component: () => import("@pages/profile/logs.vue"),
        "props": true
      },
      {
        path: "keys",
        children: [
          {
            path: "",
            name: "profile-keys",
            meta: { name: "SSH keys" },
            component: () => import("@pages/profile/keys/index.vue"),
            "props": true
          },
          {
            path: "add",
            name: "profile-keys-add",
            component: () => import("@pages/profile/keys/add.vue"),
            "props": true
          },
        ],
      },
      {
        path: "setting",
        children: [
          {
            path: "",
            name: "profile-setting",
            meta: { name: "Profile settings" },
            component: () => import("@pages/profile/setting/index.vue"),
            "props": true
          },
          {
            path: "password",
            name: "profile-setting-password",
            meta: { name: "Password" },
            component: () => import("@pages/profile/setting/password.vue"),
            "props": true
          },
          {
            path: "destroy",
            children: [
              {
                path: "",
                name: "profile-setting-destroy",
                meta: { name: "Destroy" },
                component: () => import("@pages/profile/setting/destroy/index.vue"),
                "props": true
              },
              {
                path: ":token",
                name: "profile-setting-destroy-token",
                component: () => import("@pages/profile/setting/destroy/_token.vue"),
                "props": true
              },
            ],
          },
        ],
      },
    ],
  },
];
