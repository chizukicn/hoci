# @hoci/shared

[English](README.md) | 中文

[hoci](../hoci/README.zh-CN.md) 生态共用的类型、组合式函数与工具。被 [@hoci/core](../core/README.zh-CN.md) 与 [@hoci/components](../components/README.zh-CN.md) 使用；一般通过 **hoci** 或 **@hoci/core** 间接使用，无需直接依赖本包。

## 安装

```sh
pnpm add @hoci/shared
```

**依赖要求：** Vue 3.3+、[@vueuse/core](https://vueuse.org/) 10.5+。

## 内容概览

| 类别 | 说明 |
|------|------|
| **Composables** | 如 `useShowable` — 弹窗、气泡等开关状态与回调。 |
| **Provides** | 配置与依赖注入辅助。 |
| **Types** | `HookComponent`、`Showable`、`ShowableStatus`、`ActivateEvent`、`ElementLike` 等共享类型。 |
| **Utils** | 数组、DOM、类型判断（`is`）、RAF 等工具。 |
| **Constants** | 共享常量。 |
| **define** | 定义组件或选项的辅助。 |

## 使用方式

```ts
import type { Showable, ShowableStatus } from "@hoci/shared";
import { useShowable } from "@hoci/shared";
```

多数场景请使用 **hoci** 或 **@hoci/core**；仅在需要底层类型或组合式且不想引入组件时再直接依赖 **@hoci/shared**。

## 许可

MIT
