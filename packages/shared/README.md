# @hoci/shared

[中文](README.zh-CN.md) | English

Shared types, composables, and utilities for the [hoci](../hoci/README.md) ecosystem. Used by [@hoci/core](../core/README.md) and [@hoci/components](../components/README.md); typically you depend on **hoci** or **@hoci/core** rather than this package directly.

## Install

```sh
pnpm add @hoci/shared
```

**Peer dependencies:** Vue 3.3+, [@vueuse/core](https://vueuse.org/) 10.5+.

## Contents

| Category | Description |
|----------|-------------|
| **Composables** | e.g. `useShowable` — open/close state and callbacks for modals, popovers, etc. |
| **Provides** | Config and dependency-injection helpers. |
| **Types** | `HookComponent`, `Showable`, `ShowableStatus`, `ActivateEvent`, `ElementLike`, and other shared types. |
| **Utils** | Array, DOM, type checks (`is`), and RAF helpers. |
| **Constants** | Shared constant values. |
| **define** | Helpers for defining components or options. |

## Usage

```ts
import type { Showable, ShowableStatus } from "@hoci/shared";
import {

  useShowable
} from "@hoci/shared";
```

Most users should use **hoci** or **@hoci/core**; use **@hoci/shared** only when you need low-level types or composables without pulling in components.

## License

MIT
