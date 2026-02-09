# @hoci/core

[中文](README.zh-CN.md) | English

Core headless components and logic for [hoci](../hoci/README.md). No default styling; you bring your own markup and styles. Built on Vue 3 and [@vueuse/core](https://vueuse.org/).

## Install

```sh
pnpm add @hoci/core
```

**Peer dependencies:** Vue 3.3+, [@vueuse/core](https://vueuse.org/) 10.5+.

## Components & modules

| Export | Description |
|--------|-------------|
| **Affix** | Pin content to viewport or a target element while scrolling. |
| **AffixTarget** | Target element for affix positioning. |
| **ConfigProvider** | Context for global component options. |
| **FileUpload** | File input with drag-and-drop and validation. |
| **Icon** | Icon wrapper with size/color/mask support. |
| **Item** | Generic selectable list item (used with Selection). |
| **Popover** | Floating panel with placement and trigger control. |
| **Selection** | Single/multi selection container for Item children. |
| **Switch** | Toggle (boolean) with optional labels. |
| **TabPane** | Single tab panel (used with Tabs). |
| **Tabs** | Tab container and switching logic. |
| **VirtualList** | Virtualized list for large datasets. |

Shared types, composables (e.g. `useShowable`), and utilities are re-exported from [@hoci/shared](../shared/README.md).

## Usage

Use as headless building blocks with your own templates and CSS:

```tsx
import { HiItem, HiSelection } from "@hoci/core";

// Compose with your layout and classes
<HiSelection v-model={value} activeClass="bg-blue-500" unactiveClass="bg-gray-500">
  <HiItem value="a" />
  <HiItem value="b" />
</HiSelection>;
```

Typically you use **@hoci/components** for pre-wired Vue components, or **hoci** for the full library plus install and resolver.

## License

MIT
