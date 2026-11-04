export const route = [
  {
    path: "/admin",
    children: [
      {
        path: "fixture",
        name: "admin-fixture",
        component: () => import("../../pages/admin/fixture.svelte"),
        props: true
      },
      {
        path: "props/:fixtureId",
        name: "admin-props",
        component: () => import("../../pages/admin/props.svelte"),
        props: true
      }
    ]
  }
];
