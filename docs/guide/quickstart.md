# 快速开始

## 使用包管理器安装

```sh
# 使用 npm
npm install hoci

# 使用 yarn
yarn add hoci

# 使用 pnpm
pnpm add hoci

```

## 完整引入

```ts
import hoci from "hoci";
import { createApp } from "vue";

const app = createApp();
app.use(hoci);
app.mount("#app");
```

## 按需引入

你可以使用unplugin-vue-components按需引入组件

```sh
npm install -D unplugin-vue-components
```

在vite.config中配置
```ts
import vue from "@vitejs/plugin-vue";
import { HociResolver } from "hoci/resolver";
import components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue(),
    components({
      resolvers: [
        HociResolver(),
      ],
    }),
  ],
});
```

## 在JSX中使用
在 `jsx` 或 `tsx` 中使用时，推荐以直接引入的方式使用组件
```jsx
import logo from "@/assets/logo.svg";
import { HiIcon } from "hoci";
export default defineComponent({
  setup() {
    return () => <HiIcon icon={logo} />;
  },
});
```
