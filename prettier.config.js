export default {
  plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
  tailwindStylesheet: "./src/app.css",

  printWidth: 120,
  semi: true,
  tabWidth: 2,
  trailingComma: "none"
};
