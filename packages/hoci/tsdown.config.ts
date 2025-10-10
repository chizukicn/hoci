import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  format: ["cjs", "esm"],
  entry: ["index.ts", "resolver.ts"],
  exports: true
});
