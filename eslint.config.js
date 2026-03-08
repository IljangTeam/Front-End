import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

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
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            /* pages */
            { target: "./src/pages", from: "./src/app" },
            /* features */
            { target: "./src/features", from: "./src/app" },
            { target: "./src/features", from: "./src/widgets" },
            /* entities */
            { target: "./src/entities", from: "./src/app" },
            { target: "./src/entities", from: "./src/widgets" },
            { target: "./src/entities", from: "./src/features" },
            /* shared */
            { target: "./src/shared", from: "./src/app" },
            { target: "./src/shared", from: "./src/widgets" },
            { target: "./src/shared", from: "./src/features" },
            { target: "./src/shared", from: "./src/entities" },
          ],
        },
      ],
    },
  },
]);
