import { defineConfig } from "vite";
import path from "path";
import Vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import VueDevTools from 'vite-plugin-vue-devtools'
import AddonsRouter from "./src/plugins/addons";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@proto": path.resolve(__dirname, "./src/proto"),
      "@protobuf-ts": path.resolve(__dirname, "./node_modules/@protobuf-ts"),
      "@addon": path.resolve(__dirname, "../add-on"),
    },
    extensions: [".js", ".mjs", ".ts", ".json", ".vue"],
  },

  plugins: [
    VueDevTools(),
    AddonsRouter(),
    Vue(),
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
