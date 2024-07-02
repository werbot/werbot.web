import { MenuList } from "../types";

export function menuAddon(addonMenu: MenuList): string {
  let importLines: string = `import { ref } from "vue";
import { mergeMenus } from "@/utils";
import { menu as mainAdminMenu } from "@pages/admin/menu";
import { menu as mainProfileMenu } from "@pages/profile/menu";
import { menu as mainProjectMenu } from "@pages/projects/menu";\n\n`;

  const exclude: string[] = ["mainAdminMenu", "mainProfileMenu", "mainProjectMenu"];

  for (const key in addonMenu) {
    if (addonMenu.hasOwnProperty(key)) {
      addonMenu[key]
        .filter((value: string) => !exclude.includes(value))
        .forEach((filteredValue: string) => {
          const parts = filteredValue.split("_");
          importLines += `import { menu as ${filteredValue} } from "@addon/${parts[1]}/web/pages/${parts[0]}/menu";\n`;
        });
    }
  }

  const exportLines: string = `export default {
  async install(app) {
    const adminMenu = ref(mergeMenus([${addonMenu.admin.join(", ")}]));
    const profileMenu = ref(mergeMenus([${addonMenu.profile.join(", ")}]));
    const projectMenu = ref(mergeMenus([${addonMenu.project.join(", ")}]));

    app.provide("adminMenu", adminMenu);
    app.provide("profileMenu", profileMenu);
    app.provide("projectMenu", projectMenu);
  },
};`;

  return `${importLines}\n${exportLines}`;
}
