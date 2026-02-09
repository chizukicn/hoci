# @hoci/core

[English](README.md) | 中文

[hoci](../hoci/README.zh-CN.md) 的核心组合式函数、props、emits 与类型。**不提供 Vue 组件** — 即用型组件请使用 [@hoci/components](../components/README.zh-CN.md)。基于 Vue 3 与 [@vueuse/core](https://vueuse.org/)。

> **💡 推荐：** 大多数场景下，我们推荐使用 **hoci** 主包，而不是直接安装 `@hoci/core`。**hoci** 包提供了统一的入口，包含组件、组合式函数和自动导入解析器。

## 安装

```sh
pnpm add @hoci/core
```

**依赖要求：** Vue 3.3+、[@vueuse/core](https://vueuse.org/) 10.5+。

## 组合式函数 API

| 组合式函数 | 返回值 | 说明 |
|------------|--------|------|
| **useAffix** | `{ className, wrapperRef, isFixed, placeholderStyle, fixedStyle, updatePosition }` | 滚动时将内容固定在视口或目标。返回固定状态、样式和引用。 |
| **useFileUpload** | `{ inputRef, files, handleChange, handleDrop, handleDragOver }` | 支持拖拽的文件上传。返回文件列表和处理函数。 |
| **useIcon** | `{ style }` | 图标逻辑（尺寸、颜色、遮罩）。返回计算后的样式。 |
| **useSelectionItem** | `{ isActive, activate, reject, className }` | 可选项逻辑。返回激活状态和处理函数。 |
| **usePopover** | `{ visible, show, close, popupRef, triggerRef, placement, offset }` | 可控制位置的浮动面板。返回可见性状态和引用。 |
| **useSelectionList** | `{ options, actives, isActive, changeActive, renderItem, render }` | 单选/多选状态管理。返回选择状态和渲染函数。 |
| **useSelectionContext** | `HiSelectionContext` | 从父级 HiSelection 注入选择上下文。返回包含 activate、isActive 等的上下文。 |
| **useSwitch** | `{ toggle, modelValue, className, isDisabled, activateEvent }` | 开关逻辑。返回状态和切换处理函数。 |
| **useVirtualList** | `{ virtualizer, scrollToIndex, scrollToOffset }` | 大列表虚拟滚动。返回虚拟化实例和滚动方法。 |

## Props 与 Emits

| 模块 | Props | Emits | 说明 |
|------|-------|-------|------|
| **Affix** | `affixProps` | `affixEmits` | 固定定位属性（offset、position、target、zIndex）和事件（scroll、change） |
| **ConfigProvider** | `configProviderProps` | - | 全局配置属性（icon、activateEvent） |
| **FileUpload** | `fileUploadProps` | `fileUploadEmits` | 文件选择属性（modelValue、multiple）和事件（update:modelValue、change） |
| **Icon** | `iconProps` | - | 图标属性（src、size、width、height、color、mask） |
| **Item** | `itemProps` | `itemEmits` | 选择项属性（value、disabled）和事件（reject） |
| **Popover** | `popoverProps` | `popoverEmits` | 浮动面板属性（placement、triggerEvent、offset、visible）和事件（update:visible、change） |
| **Selection** | `selectionProps` | `selectionEmits` | 选择属性（modelValue、multiple、activeClass、itemClass）和事件（update:modelValue、change） |
| **Switch** | `switchProps` | `switchEmits` | 开关属性（modelValue、activeClass、disabled）和事件（update:modelValue、change、reject） |
| **VirtualList** | `virtualListProps` | `virtualListEmits` | 虚拟列表属性（count、estimateSize、options）和事件（scroll、scrollStart、scrollEnd） |

## 工具函数

| 导出 | 说明 |
|------|------|
| **provideAffixTarget** | 为子组件提供 affix 目标元素 |
| **AFFIX_TARGET_KEY** | Affix 目标上下文的注入键 |

类型、组合式函数（如 `useShowable`）与工具由 [@hoci/shared](../shared/README.zh-CN.md) 重新导出。

## 使用方式

基于组合式函数进行二次组件开发；若需要现成 Vue 组件，请使用 **@hoci/components** 或 **hoci**。

```ts
import { selectionEmits, selectionProps, useSelectionList } from "@hoci/core";

// 在你自己的组件中使用
const { isActive, changeActive, render } = useSelectionList(props, { emit, slots });
```

## 许可

MIT
