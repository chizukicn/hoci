import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["index"],
  clean: true,
  declaration: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: false
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsx: "preserve",
      jsxImportSource: "vue"
    }
  }
});
