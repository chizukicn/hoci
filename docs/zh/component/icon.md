# 图标 (Icon)

Icon组件提供了一个灵活的方式来展示SVG和图片图标，支持自定义大小、颜色等属性。

:::tip
本组件的实现灵感来自于 [Anthony Fu](https://github.com/antfu) 的文章 [《Icons in Pure CSS》](https://antfu.me/posts/icons-in-pure-css), 感谢 Anthony Fu 的分享。
:::

## Basic Usage (基本使用)
<demo src="../../examples/icon/basic.vue"/>

## Custom Size (自定义大小)
Icon组件支持多种方式设置图标尺寸：

1. 通过 `size` 属性设置（同时设置宽高）：
   - 支持数字（默认单位为px）：`:size="16"`
   - 支持带单位的字符串：`size="2rem"`, `size="16px"`
2. 通过 `width` 和 `height` 属性分别设置宽高
3. 通过 CSS 的 `width` 和 `height` 属性设置（推荐）

<demo src="../../examples/icon/size.vue"/>

## Custom Color (自定义颜色)
Icon组件支持两种设置颜色的方式：
1. 通过 `color` 属性直接设置颜色
2. 通过CSS的 `color` 属性设置颜色（推荐）

使用CSS的 `color` 属性可以更灵活地控制颜色，支持主题色变量，并且可以通过伪类（如 `:hover`）实现颜色过渡效果。

<demo src="../../examples/icon/color.vue"/>

## Render Mode (渲染模式)
Icon组件支持两种渲染模式：

- mask模式：适用于需要改变颜色的SVG图标
- background模式：适用于普通图片图标

<demo src="../../examples/icon/mask.vue"/>

## Global Config (全局配置)

你可以通过 `HiConfigProvider` 组件为所有图标提供默认配置：

```vue
<template>
  <hi-config-provider :icon="{ size: 24, sizeUnit: 'px' }">
    <hi-icon src="/hoci.svg" />
  </hi-config-provider>
</template>
```

## Icon Props (参数)
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | - | 图标的源地址，支持SVG和图片格式 |
| size | `number \| string` | - | 图标的大小，同时设置宽度和高度 |
| width | `number \| string` | - | 图标宽度 |
| height | `number \| string` | - | 图标高度 |
| color | `string` | `currentColor` | 图标颜色（仅在mask模式下生效） |
| mask | `boolean \| "auto"` | `"auto"` | 渲染模式 |
| as | `string` | `"div"` | 渲染的HTML标签 |

## ConfigProvider Props (配置参数)
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `number` | - | 默认图标大小 |
| sizeUnit | `string` | `"px"` | 尺寸单位 |
