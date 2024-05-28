export const route = [
  {
    path: "/admin",
    meta: { layout: "private", requiresAuth: true, name: "Admin" },
    children: [
      {
        path: "",
        name: "admin",
        component: () => import("@pages/admin/index.vue"),
        "props": true
      },
      {
        path: "licenses",
        name: "admin-license",
        meta: { name: "Licenses", icon: "ticket" },
        component: () => import("@pages/admin/license/index.vue"),
        "props": true
      },
      {
        path: "projects",
        name: "admin-projects",
        meta: { name: "Projects", icon: "banknotes" },
        component: () => import("@pages/admin/projects/index.vue"),
        "props": true
      },
      {
        path: "settings",
        name: "admin-settings",
        meta: { name: "Settings", icon: "tooth" },
        component: () => import("@pages/admin/settings/index.vue"),
        "props": true
      },
      {
        path: "subscriptions",
        name: "admin-subscriptions",
        meta: { name: "Subscriptions", icon: "tooth" },
        component: () => import("@pages/admin/subscriptions/index.vue"),
        "props": true
      },
      {
        path: "users",
        name: "admin-users",
        meta: { name: "Users", icon: "tooth" },
        component: () => import("@pages/admin/users/index.vue"),
        "props": true
      },
    ],
  },
];


