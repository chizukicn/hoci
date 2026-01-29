import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  entry: "index.ts",
  exports: true,
  outExtensions: () => {
    return {
      js: ".js",
      dts: ".d.ts"
    };
  }
});
