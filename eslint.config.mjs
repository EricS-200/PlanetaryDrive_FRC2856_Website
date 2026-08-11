import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "output/**",
    "tmp/**",
    "components/Unused Pages/**",
    "components/ui/**",
    "components/Footer.jsx",
    "next-env.d.ts",
  ]),
]);
