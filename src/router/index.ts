import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { useAuthStore } from "@/store";

import { route } from "virtual:werbot-addon/route";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    meta: { layout: "private", layoutStyle: "blank", requiresAuth: true },
    component: () => import("@pages/index.vue")
  },
  ...route,
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    meta: { layout: "404", requiresAuth: false },
    component: () => import("@pages/404.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, _from, next) => {
  NProgress.start();

  loadLayoutMiddleware(to);

  const isAuthenticated = useAuthStore().logged_in;

  if (!isAuthenticated && to.meta.requiresAuth) {
    next({ name: "auth-signin" });
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

router.onError((error) => {
  console.log(error);
  NProgress.done();
});

async function loadLayoutMiddleware(route: any): Promise<void> {
  let layoutComponent: any;
  try {
    layoutComponent = await import(`@/layouts/${route.meta.layout}.vue`);
  } catch (e) {
    layoutComponent = await import(`@/layouts/blank.vue`);
  }

  route.meta.layoutComponent = layoutComponent.default;
}

export default router;
