# 浮动 (Popover)

## Basic
<demo src="../../examples/popover/basic.vue"/>

## Placement
<demo src="../../examples/popover/placement.vue"/>

## 结合 Showable

HiPopover 内部基于 [Showable](/zh/component/showable) 的 `useShowableContextProvider` 管理显隐，并对外暴露 `show`、`close`。可将 `showableRef` 绑定到 HiPopover，在外部通过 `popoverRef?.show()` 打开气泡框。

```vue
<script setup>
import { showableRef } from "hoci";

const popoverRef = showableRef();
</script>

<template>
  <button @click="popoverRef?.show()">
    外部打开
  </button>
  <hi-popover ref="popoverRef" trigger-event="click">
    <button>触发器</button>
    <template #popup>
      内容
    </template>
  </hi-popover>
</template>
```

## Popover 参数

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `popupClass` | `string` | - | 气泡层根节点 class |
| `placement` | `Placement` | `"auto"` | 气泡相对触发元素的位置：`bottom`、`top`、`left`、`right`、`auto`、`top-left`、`top-right`、`bottom-left`、`bottom-right`、`left-top`、`left-bottom`、`right-top`、`right-bottom` |
| `triggerEvent` | `TriggerEvent` | `"hover"` | 触发方式：`click`、`mousedown`、`dblclick`、`hover`、`contextmenu`、`focus`、`touch` |
| `offset` | `number` | `8` | 气泡与触发元素间距（px） |
| `lazy` | `boolean` | `false` | 为 `true` 时，hover 触发需悬停更久才打开（约 800ms） |
| `visible` | `boolean` | `false` | 是否显示，支持 `v-model:visible` |
| `disabled` | `boolean` | `false` | 是否禁用触发 |
| `teleport` | `string \| HTMLElement \| boolean` | `true` | 气泡挂载目标，`true` 为 `body`，`false` 不 Teleport |
| `as` | `string` | `"div"` | 触发区域根节点标签名 |

## Popover 事件

| 名称 | 说明 |
| --- | --- |
| `update:visible` | `visible` 变化时触发，用于 `v-model:visible` |
| `change` | 显隐状态变化时触发，参数为当前是否显示 `(value: boolean)` |

## Ref 暴露方法

通过 `ref` 绑定组件后，可调用以下方法：

| 方法 | 说明 |
| --- | --- |
| `show()` | 打开气泡框 |
| `close()` | 关闭气泡框 |
