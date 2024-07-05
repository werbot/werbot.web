import type { RouteParamsRaw } from "vue-router";
import type { MenuList } from "./types";
import { checkFileExists, scanFolder } from "./utils";
import { menuAddon } from "./codegen/menu";
import { routeAddon } from "./codegen/route";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createContext() {
  const routeList: Array<RouteParamsRaw> = [];
  const menuList: MenuList = {
    admin: ["mainAdminMenu"],
    profile: ["mainProfileMenu"],
    project: ["mainProjectMenu"]
  };

  async function init(): Promise<void> {
    // route section
    const router: string[] = await scanFolder("./src/router");
    await Promise.all(
      router.map(async (section: string) => {
        if (!Object.prototype.hasOwnProperty.call(routeList, section)) {
          routeList[section] = {};
        }

        const mainRoutePath = `./src/router/${section}/index.mjs?v=${Math.random()}`;
        const { route } = await import(mainRoutePath);
        //routeList[section] = route[0];
        routeList[section] = route;
      })
    );

    // addon menu section
    const addons: string[] = await scanFolder("../add-on/");
    await Promise.all(
      addons.map(async (addon: string) => {
        const addonWebPath: string = `../add-on/${addon}/web`;
        const checkExistencePromises = Object.keys(menuList).map(async (section: string) => {
          const routeExists = await checkFileExists(`${addonWebPath}/router/${section}/index.mjs`);
          return { section, routeExists };
        });
        const results = await Promise.all(checkExistencePromises);

        for (const result of results) {
          const { section, routeExists } = result;
          const sectionName = `${section}_${addon}`;
          menuList[section].push(sectionName);

          if (routeExists) {
            const addonPath: string = `${addonWebPath}/router/${section}/index.mjs?v=${Math.random()}`;
            const addonRouters = await import(addonPath);

            if (addonRouters.route.length > 0) {
              const routesMap = new Map(routeList[section].map((ch) => [ch.path, ch]));
              addonRouters.route.forEach((child: { path: string; children: any[] }) => {
                const route = routesMap.get(child.path);
                if (route) {
                  if (!route["children"]) {
                    route["children"] = [];
                  }
                  route["children"].push(...child.children);
                } else {
                  routesMap.set(child.path, child);
                  routeList[section].push(child);
                }
              });
            }
          }
        }
      })
    );
  }

  function routes(): Array<RouteParamsRaw> {
    return routeList;
  }

  function addonNames(): string[] {
    return Object.keys(menuList);
  }

  function routeNames(): string[] {
    return Object.keys(routeList);
  }

  function routeGen(): string {
    return routeAddon(routeList);
  }

  function menuGen(): string {
    return menuAddon(menuList);
  }

  return {
    init,
    routes,

    addonNames,
    routeNames,
    routeGen,
    menuGen
  };
}
