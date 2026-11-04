import { defineConfig } from "vite";
import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import tailwindcss from "@tailwindcss/vite";

import { addonRoot } from "./addon-root.js";

export default defineConfig({
  server: {
    fs: {
      allow: [".", addonRoot]
    }
  },

  resolve: {
    alias: {
      "@protobuf-ts": path.resolve(__dirname, "./node_modules/@protobuf-ts")
    },
    extensions: [".js", ".mjs", ".ts", ".json", ".svelte"]
  },

  plugins: [
    sveltekit(),
    tailwindcss(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    })
  ]
});
