/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Plugin } from "vite";

import {
  MODULE_ID,
  RESOLVED_MODULE_ID,
  MODULE_ROUTE_ID,
  RESOLVED_MODULE_ROUTE_ID,
  MODULE_MENU_ID,
  RESOLVED_MODULE_MENU_ID
} from "./options";
import { createContext } from "./context";

export default function AddonsRouter(): Plugin {
  const ctx = createContext();

  return {
    name: "werbotAddon",
    enforce: "pre",

    buildStart: () => ctx.init(),

    resolveId(id: string | undefined) {
      if (id === MODULE_ID) {
        return RESOLVED_MODULE_ID;
      }
      if (id === MODULE_ROUTE_ID) {
        return RESOLVED_MODULE_ROUTE_ID;
      }
      if (id === MODULE_MENU_ID) {
        return RESOLVED_MODULE_MENU_ID;
      }
    },

    load(id: string) {
      // virtual:werbot-addon
      if (id === RESOLVED_MODULE_ID) {
        return `export const msg = "from virtual module";`;
      }

      // virtual:werbot-addon/route
      if (id === RESOLVED_MODULE_ROUTE_ID) {
        //const routes = ctx.routes();
        //console.log(routes["admin"].children.length);
        return ctx.routeGen().trimStart();
      }

      // virtual:werbot-addon/menu
      if (id === RESOLVED_MODULE_MENU_ID) {
        return ctx.menuGen().trimStart();
      }
    }
  };
}
