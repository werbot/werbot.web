import path from "node:path";

// Shared by svelte.config.js (alias) and vite.config.ts (dev fs allow) so a
// custom ADDON_ROOTS root resolves in both.
const [root] = (process.env.ADDON_ROOTS ?? "").split(":").filter(Boolean);

export const addonRoot = path.resolve(root ?? "../add-on");
