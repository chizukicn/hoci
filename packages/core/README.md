# @hoci/core

[中文](README.zh-CN.md) | English

Core composables, props, emits, and types for [hoci](../hoci/README.md). **No Vue components** — use [@hoci/components](../components/README.md) for ready-made components. Built on Vue 3 and [@vueuse/core](https://vueuse.org/).

## Install

```sh
pnpm add @hoci/core
```

**Peer dependencies:** Vue 3.3+, [@vueuse/core](https://vueuse.org/) 10.5+.

## Exports (composables & primitives)

| Area | Exports | Description |
|------|---------|-------------|
| **Affix** | `useAffix`, `affixProps`, `affixEmits`, `provideAffixTarget`, `AFFIX_TARGET_KEY` | Pin content to viewport or target while scrolling. |
| **ConfigProvider** | `configProviderProps` | Global config (e.g. icon, activateEvent). |
| **FileUpload** | `useFileUpload`, `fileUploadProps`, `fileUploadEmits` | File input with drag-and-drop and validation. |
| **Icon** | `useIcon`, `iconProps` | Icon logic (size, color, mask). |
| **Item** | `useSelectionItem`, `itemProps`, `itemEmits` | Selectable list item (used with Selection). |
| **Popover** | `usePopover`, `popoverProps`, `popoverEmits` | Floating panel placement and trigger. |
| **Selection** | `useSelectionList`, `useSelectionContext`, `selectionProps`, `selectionEmits` | Single/multi selection state and context. |
| **Switch** | `useSwitch`, `switchProps`, `switchEmits` | Toggle (boolean) state. |
| **VirtualList** | `useVirtualList`, `virtualListProps`, `virtualListEmits` | Virtualized list for large data. |

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
