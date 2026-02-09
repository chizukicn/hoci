# @hoci/components

[English](README.md) | 中文

基于 [@hoci/core](../core/README.zh-CN.md) 无样式原语的 Vue 3 组件封装。适用于需要即用型组件、统一命名（`Hi*` / `hi-*`）以及一次 `install()` 全局注册的场景。

## 安装

```sh
pnpm add @hoci/components
```

**依赖要求：** Vue 3.3+、[@vueuse/core](https://vueuse.org/) 10.5+。

**内部依赖：** [@hoci/core](../core/README.zh-CN.md)、[@hoci/shared](../shared/README.zh-CN.md)。

## 导出组件

与 core 一一对应，以具体 Vue 组件形式导出：

- **HiAffix** / **HiAffixTarget**
- **HiConfigProvider**
- **HiFileUpload**
- **HiIcon**
- **HiItem**
- **HiPopover**
- **HiSelection**
- **HiSwitch**
- **HiTabPane** / **HiTabs**
- **HiVirtualList**

## 使用方式

### 全局注册

```ts
import { install } from "@hoci/components";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).use(install).mount("#app");
```

### 直接导入

```ts
import {
  HiAffix,
  HiAffixTarget,
  HiConfigProvider,
  HiFileUpload,
  HiIcon,
  HiItem,
  HiPopover,
  HiSelection,
  HiSwitch,
  HiTabPane,
  HiTabs,
  HiVirtualList,
} from "@hoci/components";
```

若需要统一入口（含 install 与 unplugin 解析器），请使用 **hoci** 包。

## 许可

MIT
