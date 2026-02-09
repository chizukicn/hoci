# @hoci/components

[中文](README.zh-CN.md) | English

Vue 3 components that wrap [@hoci/core](../core/README.md) headless primitives. Use these when you want ready-to-use components with consistent naming (`Hi*` / `hi-*`) and a single `install()` for global registration.

> **💡 Recommendation:** For most use cases, we recommend using the **hoci** package instead of directly installing `@hoci/components`. The **hoci** package provides a unified entry point with components, composables, and auto-import resolver (`HociResolver`).

## Install

```sh
pnpm add @hoci/components
```

**Peer dependencies:** Vue 3.3+, [@vueuse/core](https://vueuse.org/) 10.5+.

**Dependencies:** [@hoci/core](../core/README.md), [@hoci/shared](../shared/README.md).

## Components

| Component | Description | Key Features |
|-----------|-------------|--------------|
| **HiAffix** | Pin content to viewport or target element while scrolling | Supports top/bottom positioning, custom offset, scroll container |
| **HiAffixTarget** | Target element for affix positioning | Provides context for affix components |
| **HiConfigProvider** | Global configuration provider | Sets default icon config, activate event for child components |
| **HiFileUpload** | File input with drag-and-drop support | Single/multiple file selection, file validation |
| **HiIcon** | Icon wrapper component | Size, color, mask support, flexible icon sources |
| **HiItem** | Selectable list item | Works with HiSelection, supports custom labels |
| **HiPopover** | Floating panel with placement control | Multiple placements, trigger events (click, hover, etc.), teleport support |
| **HiSelection** | Single/multi selection container | Supports single/multiple selection, custom classes, clearable |
| **HiSwitch** | Toggle switch component | Boolean state, active/inactive classes, disabled state |
| **HiTabs** | Tab container component | Tab switching logic, works with HiTabPane |
| **HiTabPane** | Individual tab panel | Used within HiTabs container |
| **HiVirtualList** | Virtualized list for large datasets | Efficient rendering, scroll handling, customizable item size |

## Usage

### Full Import

If you don't care about the bundle size so much, it's more convenient to use full import.

```ts
// main.ts
import { createApp } from "vue";
import * as HociComponents from "@hoci/components";
import App from "./App.vue";

const app = createApp(App);
app.use(HociComponents);
app.mount("#app");
```

### Manually import

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

## License

MIT
