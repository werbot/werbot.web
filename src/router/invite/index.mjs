/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const route = [
  {
    path: "/invite",
    meta: { layout: "blank", requiresAuth: false },
    children: [
      {
        path: "",
        name: "invite",
        redirect: { name: "404" }
      },
      {
        path: "token/:invite",
        name: "invite-token",
        meta: { layout: "auth" },
        component: () => import("@pages/invite/project/_invite.vue"),
        props: true
      },
      {
        path: "project",
        children: [
          {
            path: "",
            name: "invite-project",
            redirect: { name: "auth-signin" }
          },
          {
            path: ":invite",
            name: "invite-project-invite",
            meta: { layout: "auth" },
            component: () => import("@pages/invite/project/_invite.vue"),
            props: true
          }
        ]
      }
    ]
  }
];
