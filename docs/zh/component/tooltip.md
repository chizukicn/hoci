# 提示 (Tooltip)

Tooltip 在悬停时显示简短提示。基于 [Popover](/zh/component/popover) 实现，默认 `triggerEvent="hover"`。

## 基础用法

使用 `content` 属性传入简单文本，或使用 `#popup` 插槽自定义内容。

<demo src="../../examples/tooltip/basic.vue"/>

## 全局配置

通过 `HiConfigProvider` 的 `tooltip.class` 设置默认提示样式：

```vue
<template>
  <hi-config-provider :tooltip="{ class: 'bg-gray-800 text-white px-2 py-1 rounded text-sm' }">
    <hi-tooltip content="提示">
      <button>悬停我</button>
    </hi-tooltip>
  </hi-config-provider>
</template>
```

## Tooltip 参数

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `content` | `string` | - | 简单文本提示内容 |
| `class` | `ClassType` | - | 提示层 class（会与全局 `tooltip.class` 合并） |
| `placement` | `Placement` | `"top"` | 提示位置：`bottom`、`top`、`left`、`right`、`auto`、`top-left`、`top-right`、`bottom-left`、`bottom-right`、`left-top`、`left-bottom`、`right-top`、`right-bottom` |
| `triggerEvent` | `TriggerEvent` | `"hover"` | 触发方式：`click`、`mousedown`、`dblclick`、`hover`、`contextmenu`、`focus`、`touch` |
| `offset` | `number` | `8` | 提示与触发元素间距（px） |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `popupAs` | `string \| Component` | `"div"` | 提示层标签或组件 |
| `as` | `string` | `"div"` | 触发区域根节点标签名 |

## Tooltip 插槽

| 名称 | 说明 |
| --- | --- |
| default | 触发元素（被包裹的内容） |
| popup | 提示内容；提供时覆盖 `content` 属性 |
