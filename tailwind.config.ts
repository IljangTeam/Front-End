import type { Config } from "tailwindcss";
import { tailwindTypo } from "./src/shared/ui/typography";

const config: Config = {
  theme: {
    extend: {
      fontFamily: tailwindTypo.fontFamily,
      fontSize: tailwindTypo.fontSize,
    },
  },
};

export default config;
