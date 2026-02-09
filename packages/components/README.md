# @hoci/components

[中文](README.zh-CN.md) | English

Vue 3 components that wrap [@hoci/core](../core/README.md) headless primitives. Use these when you want ready-to-use components with consistent naming (`Hi*` / `hi-*`) and a single `install()` for global registration.

## Install

```sh
pnpm add @hoci/components
```

**Peer dependencies:** Vue 3.3+, [@vueuse/core](https://vueuse.org/) 10.5+.

**Dependencies:** [@hoci/core](../core/README.md), [@hoci/shared](../shared/README.md).

## Exported components

Same set as core, as concrete Vue components:

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

## Usage

### Global registration

```ts
import { install } from "@hoci/components";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).use(install).mount("#app");
```

### Direct import

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

For a single entry point (install + resolver + all exports), use the **hoci** package instead.

## License

MIT
