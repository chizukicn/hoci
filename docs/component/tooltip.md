# Tooltip

Tooltip shows a short hint on hover. It is built on top of [Popover](/component/popover), defaulting to `triggerEvent="hover"`.

## Basic

Use the `content` prop for simple text, or the `#popup` slot for custom content.

<demo src="../examples/tooltip/basic.vue"/>

## Global config

Use `HiConfigProvider` to set default tooltip styles via `tooltip.class`:

```vue
<template>
  <hi-config-provider :tooltip="{ class: 'bg-gray-800 text-white px-2 py-1 rounded text-sm' }">
    <hi-tooltip content="Hint">
      <button>Hover me</button>
    </hi-tooltip>
  </hi-config-provider>
</template>
```

## Tooltip Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `string` | - | Simple text content for the tooltip |
| `class` | `ClassType` | - | Class for the tooltip layer (merged with global `tooltip.class`) |
| `placement` | `Placement` | `"top"` | Position: `bottom`, `top`, `left`, `right`, `auto`, `top-left`, `top-right`, `bottom-left`, `bottom-right`, `left-top`, `left-bottom`, `right-top`, `right-bottom` |
| `triggerEvent` | `TriggerEvent` | `"hover"` | Trigger: `click`, `mousedown`, `dblclick`, `hover`, `contextmenu`, `focus`, `touch` |
| `offset` | `number` | `8` | Gap between tooltip and trigger (px) |
| `disabled` | `boolean` | `false` | Whether the tooltip is disabled |
| `popupAs` | `string \| Component` | `"div"` | Tag or component for the tooltip layer |
| `as` | `string` | `"div"` | Root element tag of the trigger wrapper |

## Tooltip Slots

| Name | Description |
| --- | --- |
| default | Trigger element (wrapped content) |
| popup | Tooltip content; overrides `content` prop when provided |
