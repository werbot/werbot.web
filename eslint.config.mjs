import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

import configPrettier from "eslint-config-prettier";

import pluginSvelte from "eslint-plugin-svelte";
import pluginPrettier from "eslint-plugin-prettier";
import pluginImportPath from "eslint-plugin-no-relative-import-paths";
import pluginUnusedImports from "eslint-plugin-unused-imports";

export default [
  {
    ignores: [
      ".legacy/",
      ".svelte-kit/",
      "build/",
      "dist/",
      "public/",
      "vite.config.{js,ts,mjs}",
      "vitest.config.{js,ts,mjs}",
      "svelte.config.{js,ts,mjs}",
      "prettier.config.{js,ts,mjs}",
      "playwright.config.{js,ts,mjs}",
      "eslint.config.{js,ts,mjs}",
      "*.json",
      "**/proto/",
      "*.d.ts",
      "src/api/",
      "src/components/",
      "src/interface/page.ts",
      "src/pages/",
      "src/plugins/",
      "src/router/",
      "src/store/"
    ]
  },

  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...pluginSvelte.configs["flat/recommended"],
  configPrettier,

  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },

      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".svelte"]
      }
    },

    plugins: {
      prettier: pluginPrettier,
      "no-relative-import-paths": pluginImportPath,
      "unused-imports": pluginUnusedImports
    },

    rules: {
      radix: ["error", "always"], // Enforce radix when using parseInt()
      curly: 1, // Enforce curly braces for control statements
      "@typescript-eslint/explicit-function-return-type": [2], // Enforce explicit return types for functions
      "@typescript-eslint/prefer-ts-expect-error": [2], // Prefer @ts-expect-error over @ts-ignore
      "@typescript-eslint/ban-ts-comment": [0], // Allow @ts-comment
      "object-literal-sort-keys": [0], // Allow/disallow sorting of object literal keys
      "new-parens": 1, // Enforce parentheses with 'new'
      "no-bitwise": 1, // Disallow bitwise operators
      "no-cond-assign": 1, // Disallow assignment within conditionals
      "no-trailing-spaces": 0, // Allow/disallow trailing spaces
      "eol-last": 1, // Enforce newline at end of files
      "func-style": ["error", "declaration", { allowArrowFunctions: true }], // Enforce function style
      "no-var": 2, // Disallow 'var' keyword
      "prettier/prettier": "warn", // Integrate Prettier and warn about style discrepancies
      "no-void": ["error", { allowAsStatement: true }], // Disallow 'void' operator, except as a statement
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        { allowSameFolder: true, rootDir: "src", prefix: "@" }
      ], // No relative imports
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type
      "sort-imports": ["error", { ignoreCase: true, ignoreDeclarationSort: true }], // Enforce sorted import declarations within modules

      // Find and remove unused ES6 module imports.
      "no-unused-vars": "off", // Disable ESLint's 'no-unused-vars'
      "unused-imports/no-unused-imports": "error", // Disallow unused imports
      "unused-imports/no-unused-vars": [
        "error",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }
      ] // Disallow unused variables and arguments
    }
  },

  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".svelte"]
      }
    }
  },

  {
    // These components build links from the route registry (routePath/menuHref),
    // not from SvelteKit route ids, so resolve() cannot be applied to their hrefs.
    // The auth and invite routes follow the same registry-based navigation.
    files: [
      "src/lib/components/AssetSection.svelte",
      "src/lib/components/Header.svelte",
      "src/lib/components/Navigation.svelte",
      "src/lib/components/Pagination.svelte",
      "src/lib/components/Tabs.svelte",
      "src/lib/components/BServerName.svelte",
      "src/lib/components/ProjectInvite.svelte",
      "src/routes/(auth)/**/*.svelte",
      "src/routes/(private)/projects/**/*.svelte"
    ],
    rules: {
      "svelte/no-navigation-without-resolve": ["error", { ignoreGoto: true, ignoreLinks: true }]
    }
  },

  {
    files: ["**/*.svelte.ts"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
];
