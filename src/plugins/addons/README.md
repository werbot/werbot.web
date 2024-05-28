This module is designed for automatic updating of routes and the navigation menu when there are add-ons in the add-on folder.

## Updating paths
virtual:werbot-addon/route  

### Install
In the root file with route settings, you need to add a new import
`import { route } from "virtual:werbot-addon/route";`
then connect the imported route to the system: 
```
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    meta: { layout: "private", layoutStyle: "blank", requiresAuth: true },
    component: () => import("@pages/index.vue"),
  },
  ...route,
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    meta: { layout: "404", requiresAuth: false },
    component: () => import("@pages/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
```

By default, in folder `./router/`, the system includes the following canned routes `admin`, `auth`, `invite`, `profile`, `project`. The addon automatically scans the `./router/` folder and nested folders, and modifies the found routes if necessary.

### Usage
For correct operation, you need to create a `./web/router/` folder at the root of the add-on, in which you should add 3 folders: `admin`, `profile`, `project`. In each folder, there should be an `index.mjs` file with a minimal instruction:
`export const children = [];`
If necessary, the children constant needs to be edited using vue-route instructions.

Example `./web/router/admin/index.mjs`:
```
export const children = [  
  {
    path: "license1",
    name: "admin-license1",
    component: () => import("@addon/saas/web/pages/admin/license1.vue"),
  },
  {
    path: "license2",
    name: "admin-license2",
    component: () => import("@addon/saas/web/pages/admin/license2.vue"),
  },
];
```
## Updating menu
virtual:werbot-addon/menu  

### Install
A new import is added to the startup script:
`import menu from "virtual:werbot-addon/menu";`
next, we add the imported constant:
```
const app = createApp(Vue);
app.use(menu);
app.mount("#app");
```

### Usage
If you need to add a menu item, you need to add a file named `menu.ts` with the menu settings. 

For example, to add new pages in the admin section, you need to do the following - in the addon folder `./web/pages/admin/`, add a file named `menu.ts` with the following content:  

```
export const menu = {
//  group10: [],
  group20: [
    {
      name: "SaaS License 1",
      link: { name: "admin-license1" },
      icon: "license",
    },
    {
      name: "SaaS License 2",
      link: { name: "admin-license2" },
      icon: "license",
    },
  ],
//  group30: [],
};
```

`export const menu = {}` - main side menu.  
`export const topMenu = {}` - used only for the profile in the dropdown menu in the header.  

`group10`, `group20`, `group30` - this is a sorting key. Depending on the value of the number, it will be sorted higher or lower.  
