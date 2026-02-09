# @hoci/core

[English](README.md) | 中文

[hoci](../hoci/README.zh-CN.md) 的核心组合式函数、props、emits 与类型。**不提供 Vue 组件** — 即用型组件请使用 [@hoci/components](../components/README.zh-CN.md)。基于 Vue 3 与 [@vueuse/core](https://vueuse.org/)。

## 安装

```sh
pnpm add @hoci/core
```

**依赖要求：** Vue 3.3+、[@vueuse/core](https://vueuse.org/) 10.5+。

## 导出（组合式与原始 API）

| 模块 | 导出 | 说明 |
|------|------|------|
| **Affix** | `useAffix`、`affixProps`、`affixEmits`、`provideAffixTarget`、`AFFIX_TARGET_KEY` | 滚动时将内容固定在视口或目标。 |
| **ConfigProvider** | `configProviderProps` | 全局配置（如 icon、activateEvent）。 |
| **FileUpload** | `useFileUpload`、`fileUploadProps`、`fileUploadEmits` | 支持拖拽与校验的文件上传。 |
| **Icon** | `useIcon`、`iconProps` | 图标逻辑（尺寸、颜色、遮罩）。 |
| **Item** | `useSelectionItem`、`itemProps`、`itemEmits` | 可选项（与 Selection 配合）。 |
| **Popover** | `usePopover`、`popoverProps`、`popoverEmits` | 浮动面板位置与触发。 |
| **Selection** | `useSelectionList`、`useSelectionContext`、`selectionProps`、`selectionEmits` | 单选/多选状态与上下文。 |
| **Switch** | `useSwitch`、`switchProps`、`switchEmits` | 开关（布尔）状态。 |
| **VirtualList** | `useVirtualList`、`virtualListProps`、`virtualListEmits` | 大列表虚拟滚动。 |

类型、组合式函数（如 `useShowable`）与工具由 [@hoci/shared](../shared/README.zh-CN.md) 重新导出。

## 使用方式

用组合式函数在自己组件里拼装模板；若需要现成 Vue 组件，请使用 **@hoci/components** 或 **hoci**。

```ts
import { selectionEmits, selectionProps, useSelectionList } from "@hoci/core";

// 在你自己的组件中使用
const { isActive, changeActive, render } = useSelectionList(props, { emit, slots });
```

## 许可

MIT
