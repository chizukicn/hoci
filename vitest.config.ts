import { defineConfig } from "vitest/config";
import { alias } from "./alias";

export default defineConfig({
  resolve: {
    alias
  },
  test: {
    environment: "happy-dom",
    coverage: {
      include: ["packages/**/*.{ts,tsx,vue}"],
      exclude: ["node_modules", "**/dist/*", "build", "public", "docs", "config", "test", "**/*.test.ts", "**/*.config.ts"]
    }
  }
});
