export const route = [
  {
    path: "/admin",
    children: [
      {
        path: "fixture",
        name: "admin-fixture",
        component: () => import("@addon/addon/web/pages/admin/fixture.vue"),
        props: true
      }
    ]
  }
];
