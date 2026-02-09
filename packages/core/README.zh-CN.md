# @hoci/core

[English](README.md) | 中文

[hoci](../hoci/README.zh-CN.md) 的核心无样式组件与逻辑层。不包含默认样式，需自行编写结构和样式，基于 Vue 3 与 [@vueuse/core](https://vueuse.org/)。

## 安装

```sh
pnpm add @hoci/core
```

**依赖要求：** Vue 3.3+、[@vueuse/core](https://vueuse.org/) 10.5+。

## 组件与模块

| 导出 | 说明 |
|------|------|
| **Affix** | 滚动时将内容固定在视口或目标元素。 |
| **AffixTarget** | Affix 定位的目标元素。 |
| **ConfigProvider** | 全局组件配置的上下文。 |
| **FileUpload** | 支持拖拽与校验的文件上传。 |
| **Icon** | 支持尺寸/颜色/遮罩的图标封装。 |
| **Item** | 通用可选项（与 Selection 配合使用）。 |
| **Popover** | 可控制位置与触发的浮动面板。 |
| **Selection** | 单选/多选容器，用于包裹 Item。 |
| **Switch** | 开关（布尔值），可选标签。 |
| **TabPane** | 单个标签页（与 Tabs 配合使用）。 |
| **Tabs** | 标签容器与切换逻辑。 |
| **VirtualList** | 大列表虚拟滚动。 |

类型、组合式函数（如 `useShowable`）与工具由 [@hoci/shared](../shared/README.zh-CN.md) 重新导出。

## 使用方式

作为无样式基础块，搭配自己的模板和 CSS 使用：

```tsx
import { HiItem, HiSelection } from "@hoci/core";

// 与你的布局和 class 组合
<HiSelection v-model={value} activeClass="bg-blue-500" unactiveClass="bg-gray-500">
  <HiItem value="a" />
  <HiItem value="b" />
</HiSelection>;
```

完整组件与安装入口请使用 **@hoci/components** 或 **hoci**。

## 许可

MIT
