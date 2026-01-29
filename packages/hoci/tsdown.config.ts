import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  entry: ["index.ts", "resolver.ts"],
  exports: true,
  outExtensions: () => {
    return {
      js: ".js",
      dts: ".d.ts"
    };
  }
});
