/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const route = [
  {
    path: "/auth",
    meta: { layout: "auth", requiresAuth: false },
    children: [
      {
        path: "",
        name: "auth",
        redirect: { name: "auth-signin" }
      },
      {
        path: "signin",
        name: "auth-signin",
        component: () => import("@pages/auth/signin.vue"),
        props: true
      },
      {
        path: "signup",
        name: "auth-signup",
        component: () => import("@pages/auth/signup.vue"),
        props: true
      },
      {
        path: "logout",
        name: "auth-logout",
        meta: { requiresAuth: true },
        component: () => import("@pages/auth/logout.vue"),
        props: true
      },
      {
        path: "password_reset",
        children: [
          {
            path: "",
            name: "auth-password_reset",
            component: () => import("@pages/auth/password_reset/index.vue"),
            props: true
          },
          {
            path: ":token",
            name: "auth-password_reset-token",
            component: () => import("@pages/auth/password_reset/_token.vue"),
            props: true
          }
        ]
      }
    ]
  }
];
