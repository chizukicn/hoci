# Popover

## Basic
<demo src="../examples/popover/basic.vue"/>

## Placement
<demo src="../examples/popover/placement.vue"/>

## With Showable

HiPopover uses [Showable](/component/showable)'s `useShowableContextProvider` for visibility and exposes `show` and `close`. Bind `showableRef` to HiPopover to open the popover from outside via `popoverRef?.show()`.

```vue
<script setup>
import { showableRef } from "hoci";

const popoverRef = showableRef();
</script>

<template>
  <button @click="popoverRef?.show()">
    Open from outside
  </button>
  <hi-popover ref="popoverRef" trigger-event="click">
    <button>Trigger</button>
    <template #popup>
      Content
    </template>
  </hi-popover>
</template>
```

## Popover Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `popupClass` | `string` | - | Root class of the popup layer |
| `placement` | `Placement` | `"auto"` | Position relative to trigger: `bottom`, `top`, `left`, `right`, `auto`, `top-left`, `top-right`, `bottom-left`, `bottom-right`, `left-top`, `left-bottom`, `right-top`, `right-bottom` |
| `triggerEvent` | `TriggerEvent` | `"hover"` | Trigger: `click`, `mousedown`, `dblclick`, `hover`, `contextmenu`, `focus`, `touch` |
| `offset` | `number` | `8` | Gap between popup and trigger (px) |
| `lazy` | `boolean` | `false` | When `true`, hover trigger requires longer delay (~800ms) to open |
| `visible` | `boolean` | `false` | Whether visible; supports `v-model:visible` |
| `disabled` | `boolean` | `false` | Whether trigger is disabled |
| `teleport` | `string \| HTMLElement \| boolean` | `true` | Teleport target; `true` for `body`, `false` to disable |
| `as` | `string` | `"div"` | Tag name of the trigger root |

## Popover Events

| Name | Description |
| --- | --- |
| `update:visible` | Emitted when `visible` changes (for `v-model:visible`) |
| `change` | Emitted when visibility changes; payload is current visibility `(value: boolean)` |

## Ref methods

When the component is bound via `ref`, you can call:

| Method | Description |
| --- | --- |
| `show()` | Open the popover |
| `close()` | Close the popover |
