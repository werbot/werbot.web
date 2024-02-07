import { defineConfig } from "vite";
import path from "path";
import * as fs from "fs/promises";

import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@proto": path.resolve(__dirname, "./src/proto"),
      "@protobuf-ts": path.resolve(__dirname, "./node_modules/@protobuf-ts"),

      "@addon": path.resolve(__dirname, "../add-on"),
    },
    //extensions: [".js", ".ts", ".json", ".vue"],
  },

  plugins: [
    {
      name: "check-addon",
      buildStart: async () => {
        buildProjects();
      },
    },

    Vue(),
    Pages({
      routeStyle: "nuxt",
      dirs: [
        { dir: "src/pages", baseRoute: "" },
        { dir: "../add-on/ee/web/pages", baseRoute: "" },
        { dir: "../add-on/saas/web/pages", baseRoute: "" },
      ],
      exclude: ["**/_menu_/index.vue"],
      //syncIndex: false,
      //importMode: "async",
    }),
    Layouts({
      defaultLayout: "private",
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "./src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],

  //build: {
  //  rollupOptions: {
  //    output: {
  //      manualChunks(id) {
  //        if (id.includes("node_modules")) {
  //          return id.toString().split("node_modules/")[1].split("/")[0].toString();
  //        }
  //      },
  //    },
  //  },
  //},
});

async function buildProjects() {
  try {
    const directories = await scanFolder("../add-on/");
    const importLines: string[] = [
      "// The file is generated automatically, do not edit!",
      'import { ref, App } from "vue";',
      'import { mergeMenus } from "@/utils/object";',
      'import { menu as mainAdminMenu } from "@/pages/admin/menu";',
      'import { menu as mainProfileMenu } from "@/pages/profile/menu";',
      'import { menu as mainProjectMenu } from "@/pages/projects/menu";',
      "",
    ];
    const adminMenus: string[] = ["mainAdminMenu"];
    const profileMenus: string[] = ["mainProfileMenu"];
    const projectMenus: string[] = ["mainProjectMenu"];

    for (const directory of directories) {
      const sections = ["admin", "profile", "project"];
      const checkExistencePromises = sections.map((section) =>
        checkFileExists(`../add-on/${directory}/web/pages/${section}/menu.ts`),
      );
      const results = await Promise.all(checkExistencePromises);

      sections.forEach((section, index) => {
        const menuName = `${section}_${directory}`;
        if (results[index]) {
          importLines.push(
            `import { menu as ${menuName} } from "@addon/${directory}/web/pages/${section}/menu";`,
          );
          if (section === "admin") adminMenus.push(menuName);
          if (section === "profile") profileMenus.push(menuName);
          if (section === "project") projectMenus.push(menuName);
        }
      });
    }

    const mainMenu = `${importLines.join("\n")}

export default {
  async install(app: App) {
    const adminMenu = ref(mergeMenus([${adminMenus.join(", ")}]));
    const profileMenu = ref(mergeMenus([${profileMenus.join(", ")}]));
    const projectMenu = ref(mergeMenus([${projectMenus.join(", ")}]));

    app.provide("adminMenu", adminMenu);
    app.provide("profileMenu", profileMenu);
    app.provide("projectMenu", projectMenu);
  },
};`;

    try {
      await fs.writeFile("./src/plugins/menu.ts", mainMenu);
    } catch (writeError) {
      console.error("Error writing file ./src/plugins/menu.ts:", writeError);
    }
  } catch (error) {
    console.error("Error building projects:", error);
  }
}

async function scanFolder(path: string): Promise<string[]> {
  try {
    const dirents = await fs.readdir(path, { withFileTypes: true });
    return dirents.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
  } catch (err) {
    console.error("Error reading directory:", err);
    return [];
  }
}

async function checkFileExists(file: string): Promise<boolean> {
  try {
    await fs.access(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}
