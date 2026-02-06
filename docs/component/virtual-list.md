# Virtual List

VirtualList uses TanStack Virtual for high-performance virtual scrolling. Suited for large lists; you control how each item is rendered.

## Basic usage

<demo src="../examples/virtual-list/basic.vue"/>

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| count | `number` | `0` | Total number of items |
| estimate-size | `number \| (index: number) => number` | `50` | Estimated item size (px); can be a function |
| horizontal | `boolean` | `false` | Horizontal scrolling |
| options | `object` | `{}` | Extra options passed to the virtualizer |

## Slots

| Name | Slot props | Description |
| --- | --- | --- |
| item | `{ index, style }` | Renders each item |

## Events

| Name | Payload | Description |
| --- | --- | --- |
| scrollEnd | - | Fired when scrolled to the end |
| scrollStart | - | Fired when scrolled to the start |
| scroll | visible index array | Fired while scrolling |
