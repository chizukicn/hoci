# @hoci/core

[中文](README.zh-CN.md) | English

Core composables, props, emits, and types for [hoci](../hoci/README.md). **No Vue components** — use [@hoci/components](../components/README.md) for ready-made components. Built on Vue 3 and [@vueuse/core](https://vueuse.org/).

> **💡 Recommendation:** For most use cases, we recommend using the **hoci** package instead of directly installing `@hoci/core`. The **hoci** package provides a unified entry point with components, composables, and auto-import resolver.

## Install

```sh
pnpm add @hoci/core
```

**Peer dependencies:** Vue 3.3+, [@vueuse/core](https://vueuse.org/) 10.5+.

## Composables API

| Composable | Returns | Description |
|------------|---------|-------------|
| **useAffix** | `{ className, wrapperRef, isFixed, placeholderStyle, fixedStyle, updatePosition }` | Pin content to viewport or target while scrolling. Returns fixed state, styles, and refs. |
| **useFileUpload** | `{ inputRef, files, handleChange, handleDrop, handleDragOver }` | File input with drag-and-drop. Returns file list and handlers. |
| **useIcon** | `{ style }` | Icon logic (size, color, mask). Returns computed styles. |
| **useSelectionItem** | `{ isActive, activate, reject, className }` | Selectable list item logic. Returns active state and handlers. |
| **usePopover** | `{ visible, show, close, popupRef, triggerRef, placement, offset }` | Floating panel with placement control. Returns visibility state and refs. |
| **useSelectionList** | `{ options, actives, isActive, changeActive, renderItem, render }` | Single/multi selection state management. Returns selection state and render function. |
| **useSelectionContext** | `HiSelectionContext` | Inject selection context from parent HiSelection. Returns context with activate, isActive, etc. |
| **useSwitch** | `{ toggle, modelValue, className, isDisabled, activateEvent }` | Toggle switch logic. Returns state and toggle handler. |
| **useVirtualList** | `{ virtualizer, scrollToIndex, scrollToOffset }` | Virtualized list for large data. Returns virtualizer instance and scroll methods. |

## Props & Emits

| Area | Props | Emits | Description |
|------|-------|-------|-------------|
| **Affix** | `affixProps` | `affixEmits` | Fixed positioning props (offset, position, target, zIndex) and events (scroll, change) |
| **ConfigProvider** | `configProviderProps` | - | Global config props (icon, activateEvent) |
| **FileUpload** | `fileUploadProps` | `fileUploadEmits` | File selection props (modelValue, multiple) and events (update:modelValue, change) |
| **Icon** | `iconProps` | - | Icon props (src, size, width, height, color, mask) |
| **Item** | `itemProps` | `itemEmits` | Selection item props (value, disabled) and events (reject) |
| **Popover** | `popoverProps` | `popoverEmits` | Popover props (placement, triggerEvent, offset, visible) and events (update:visible, change) |
| **Selection** | `selectionProps` | `selectionEmits` | Selection props (modelValue, multiple, activeClass, itemClass) and events (update:modelValue, change) |
| **Switch** | `switchProps` | `switchEmits` | Switch props (modelValue, activeClass, disabled) and events (update:modelValue, change, reject) |
| **VirtualList** | `virtualListProps` | `virtualListEmits` | Virtual list props (count, estimateSize, options) and events (scroll, scrollStart, scrollEnd) |

## Utilities

| Export | Description |
|--------|-------------|
| **provideAffixTarget** | Provide affix target element for child components |
| **AFFIX_TARGET_KEY** | Injection key for affix target context |

Shared types, composables (e.g. `useShowable`), and utilities are re-exported from [@hoci/shared](../shared/README.md).

## Usage

Use composables to build your own templates; for pre-built Vue components, use **@hoci/components** or **hoci**.

```ts
import { selectionEmits, selectionProps, useSelectionList } from "@hoci/core";

// Use in your own component
const { isActive, changeActive, render } = useSelectionList(props, { emit, slots });
```

## License

MIT
