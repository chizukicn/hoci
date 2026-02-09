# hoci

[中文](README.zh-CN.md) | English

A headless component library for Vue 3. Re-exports [@hoci/components](../components/README.md) and [@hoci/core](../core/README.md), provides a global install helper and an [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) resolver for auto-import.

## Install

```sh
# npm
npm install hoci

# yarn
yarn add hoci

# pnpm
pnpm add hoci
```

**Peer dependencies:** Vue 3.3+, [@vueuse/core](https://vueuse.org/) 10.5+. For auto-import, optionally install [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components).

## Usage

### Global install

```ts
import Hoci from "hoci";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).use(Hoci).mount("#app");
```

### Manual import

```ts
import { HiItem, HiSelection } from "hoci";
```

### Auto-import (unplugin-vue-components)

```ts
import { HociResolver } from "hoci/resolver";
// vite.config.ts
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  plugins: [
    Components({
      resolvers: [HociResolver()],
    }),
  ],
});
```

Components whose names match `Hi*` or `hi-*` will be resolved from `hoci` and auto-imported.

## Exports

- **Default:** `{ install }` — Vue plugin for global registration.
- **Named:** All components and utilities from `@hoci/components` and `@hoci/core`.
- **Subpath:** `hoci/resolver` — `HociResolver` for unplugin-vue-components.

## License

MIT
