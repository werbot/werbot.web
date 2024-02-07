// The file is generated automatically, do not edit!
import { ref, App } from "vue";
import { mergeMenus } from "@/utils/object";
import { menu as mainAdminMenu } from "@/pages/admin/menu";
import { menu as mainProfileMenu } from "@/pages/profile/menu";
import { menu as mainProjectMenu } from "@/pages/projects/menu";

import { menu as admin_ee } from "@addon/ee/web/pages/admin/menu";
import { menu as profile_ee } from "@addon/ee/web/pages/profile/menu";
import { menu as project_ee } from "@addon/ee/web/pages/project/menu";
import { menu as admin_saas } from "@addon/saas/web/pages/admin/menu";
import { menu as profile_saas } from "@addon/saas/web/pages/profile/menu";
import { menu as project_saas } from "@addon/saas/web/pages/project/menu";

export default {
  async install(app: App) {
    const adminMenu = ref(mergeMenus([mainAdminMenu, admin_ee, admin_saas]));
    const profileMenu = ref(mergeMenus([mainProfileMenu, profile_ee, profile_saas]));
    const projectMenu = ref(mergeMenus([mainProjectMenu, project_ee, project_saas]));

    app.provide("adminMenu", adminMenu);
    app.provide("profileMenu", profileMenu);
    app.provide("projectMenu", projectMenu);
  },
};