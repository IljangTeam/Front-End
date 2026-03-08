import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    rules: {
      /* FSD 단방향 의존성을 위한 규칙 */
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            /* pages */
            { target: "./src/pages", from: "./src/app" },
            /* widgets */
            { target: "./src/widgets", from: "./src/app" },
            { target: "./src/widgets", from: "./src/pages" },
            /* features */
            { target: "./src/features", from: "./src/app" },
            { target: "./src/features", from: "./src/widgets" },
            { target: "./src/features", from: "./src/pages" },
            /* entities */
            { target: "./src/entities", from: "./src/app" },
            { target: "./src/entities", from: "./src/widgets" },
            { target: "./src/entities", from: "./src/pages" },
            { target: "./src/entities", from: "./src/features" },
            /* shared */
            { target: "./src/shared", from: "./src/app" },
            { target: "./src/shared", from: "./src/widgets" },
            { target: "./src/shared", from: "./src/pages" },
            { target: "./src/shared", from: "./src/features" },
            { target: "./src/shared", from: "./src/entities" },
          ],
        },
      ],
    },
  },
]);
