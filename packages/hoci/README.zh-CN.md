# hoci

[English](README.md) | 中文

Vue 3 无样式组件库。聚合 [@hoci/components](../components/README.zh-CN.md) 与 [@hoci/core](../core/README.zh-CN.md)，提供全局安装方法以及 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 的解析器，支持按需自动导入。

## 安装

```sh
# npm
npm install hoci

# yarn
yarn add hoci

# pnpm
pnpm add hoci
```

**依赖要求：** Vue 3.3+、[@vueuse/core](https://vueuse.org/) 10.5+。若需自动导入，可额外安装 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)。

## 使用方式

### 全局安装

```ts
import Hoci from "hoci";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).use(Hoci).mount("#app");
```

### 手动导入

```ts
import { HiItem, HiSelection } from "hoci";
```

### 自动导入（unplugin-vue-components）

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

组件名匹配 `Hi*` 或 `hi-*` 时会从 `hoci` 解析并自动导入。

## 导出说明

- **默认导出：** `{ install }` — 用于全局注册的 Vue 插件。
- **具名导出：** 来自 `@hoci/components` 和 `@hoci/core` 的全部组件与工具。
- **子路径：** `hoci/resolver` — 供 unplugin-vue-components 使用的 `HociResolver`。

## 许可

MIT
