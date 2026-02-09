# @hoci/components

[English](README.md) | 中文

基于 [@hoci/core](../core/README.zh-CN.md) 无样式基础逻辑的 Vue 3 组件封装。适用于需要即用型组件、统一命名（`Hi*` / `hi-*`）以及一次 `install()` 全局注册的场景。

> **💡 推荐：** 大多数场景下，我们推荐使用 **hoci** 主包，而不是直接安装 `@hoci/components`。**hoci** 包提供了统一的入口，包含组件、组合式函数和自动导入解析器（`HociResolver`）。

## 安装

```sh
pnpm add @hoci/components
```

**依赖要求：** Vue 3.3+、[@vueuse/core](https://vueuse.org/) 10.5+。

**内部依赖：** [@hoci/core](../core/README.zh-CN.md)、[@hoci/shared](../shared/README.zh-CN.md)。

## 组件列表

| 组件 | 说明 | 主要特性 |
|------|------|----------|
| **HiAffix** | 滚动时将内容固定在视口或目标元素 | 支持顶部/底部定位、自定义偏移量、滚动容器 |
| **HiAffixTarget** | Affix 定位的目标元素 | 为 affix 组件提供上下文 |
| **HiConfigProvider** | 全局配置提供者 | 设置默认图标配置、子组件的激活事件 |
| **HiFileUpload** | 支持拖拽的文件上传 | 单选/多选文件、文件校验 |
| **HiIcon** | 图标封装组件 | 尺寸、颜色、遮罩支持，灵活的图标源 |
| **HiItem** | 可选项列表项 | 与 HiSelection 配合使用，支持自定义标签 |
| **HiPopover** | 可控制位置的浮动面板 | 多种位置、触发事件（点击、悬停等）、传送支持 |
| **HiSelection** | 单选/多选容器 | 支持单选/多选、自定义类名、可清除 |
| **HiSwitch** | 开关切换组件 | 布尔状态、激活/非激活类名、禁用状态 |
| **HiTabs** | 标签页容器组件 | 标签切换逻辑，与 HiTabPane 配合使用 |
| **HiTabPane** | 单个标签页面板 | 在 HiTabs 容器内使用 |
| **HiVirtualList** | 大列表虚拟滚动 | 高效渲染、滚动处理、可自定义项大小 |

## 使用方式

### 完整导入

如果不太在意打包体积，完整导入更方便。

```ts
import * as HociComponents from "@hoci/components";
// main.ts
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.use(HociComponents);
app.mount("#app");
```

### 手动导入

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

## 许可

MIT
